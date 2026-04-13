import { E as Timer, ft as screenshotVideo } from './card-edc26888.js';

// The number of seconds to hide the video controls for after loading (in order
// to give a cleaner UI appearance, see:
// https://github.com/dermotduffy/advanced-camera-card/issues/856
const MEDIA_LOAD_CONTROLS_HIDE_SECONDS = 2;
const MEDIA_SEEK_CONTROLS_HIDE_SECONDS = 1;
/**
 * Sets the controls on a video and removes a timer that may have been added by
 * hideMediaControlsTemporarily.
 * @param video
 * @param value
 */
const setControlsOnVideo = (video, value) => {
    if (video._controlsHideTimer) {
        video._controlsHideTimer.stop();
        delete video._controlsHideTimer;
        delete video._controlsOriginalValue;
    }
    video.controls = value;
};
/**
 * Temporarily hide media controls.
 * @param element Any HTMLElement that has a controls property (e.g.
 * HTMLVideoElement, AdvancedCameraCardHaHlsPlayer)
 * @param seconds The number of seconds to hide the controls for.
 */
const hideMediaControlsTemporarily = (video, seconds = MEDIA_SEEK_CONTROLS_HIDE_SECONDS) => {
    const oldValue = video._controlsOriginalValue ?? video.controls;
    setControlsOnVideo(video, false);
    video._controlsHideTimer ??= new Timer();
    video._controlsOriginalValue = oldValue;
    // LitElement may change the src attribute of the video element during
    // rendering, so we need to ensure that the controls are reset on the 'old'
    // video. See:
    // https://github.com/dermotduffy/advanced-camera-card/issues/1310
    const resetIfReloaded = () => {
        setControlsOnVideo(video, oldValue);
        video.removeEventListener('loadstart', resetIfReloaded);
    };
    video.addEventListener('loadstart', resetIfReloaded);
    video._controlsHideTimer.start(seconds, () => {
        setControlsOnVideo(video, oldValue);
    });
};

class VideoMediaPlayerController {
    constructor(host, getVideoCallback, getControlsDefaultCallback) {
        this._host = host;
        this._getVideoCallback = getVideoCallback;
        this._getControlsDefaultCallback = getControlsDefaultCallback ?? null;
    }
    async play() {
        await this._host.updateComplete;
        const video = this._getVideoCallback();
        if (!video?.play) {
            return;
        }
        // If the play call fails, and the media is not already muted, mute it first
        // and then try again. This works around some browsers that prevent
        // auto-play unless the video is muted.
        try {
            await video.play();
        }
        catch (err) {
            if (err.name === 'NotAllowedError' && !this.isMuted()) {
                await this.mute();
                try {
                    await video.play();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                }
                catch (e) {
                    // Pass.
                }
            }
        }
    }
    async pause() {
        await this._host.updateComplete;
        this._getVideoCallback()?.pause();
    }
    async mute() {
        await this._host.updateComplete;
        // The muted property is only for the initial muted state. Must explicitly
        // set the muted on the video player to make the change dynamic.
        const video = this._getVideoCallback();
        if (video) {
            video.muted = true;
        }
    }
    async unmute() {
        await this._host.updateComplete;
        const video = this._getVideoCallback();
        if (video) {
            video.muted = false;
        }
    }
    isMuted() {
        return this._getVideoCallback()?.muted ?? true;
    }
    async seek(seconds) {
        await this._host.updateComplete;
        const video = this._getVideoCallback();
        if (video) {
            hideMediaControlsTemporarily(video);
            video.currentTime = seconds;
        }
    }
    async setControls(controls) {
        await this._host.updateComplete;
        const video = this._getVideoCallback();
        const value = controls ?? this._getControlsDefaultCallback?.();
        if (video && value !== undefined) {
            setControlsOnVideo(video, value);
        }
    }
    isPaused() {
        return this._getVideoCallback()?.paused ?? true;
    }
    async getScreenshotURL() {
        await this._host.updateComplete;
        const video = this._getVideoCallback();
        return video ? screenshotVideo(video) : null;
    }
    getFullscreenElement() {
        return this._getVideoCallback() ?? null;
    }
}

// There is currently no consistent cross-browser modern way to determine if a
// video element has audio tracks. The below will work in ~24% of browsers, but
// notably not in Chrome. There used to be a usable
// `webkitAudioDecodedByteCount` property, but this now seems to be consistently
// 0 in Chrome. This generously defaults to assuming there is audio when we
// cannot rule it out.
const mayHaveAudio = (video) => {
    if (video.mozHasAudio !== undefined) {
        return video.mozHasAudio;
    }
    if (video.audioTracks !== undefined) {
        return Boolean(video.audioTracks?.length);
    }
    // Check MediaStream audio tracks (reliable for WebRTC at load time)
    if (typeof MediaStream !== 'undefined' && video.srcObject instanceof MediaStream) {
        return video.srcObject.getAudioTracks().length > 0;
    }
    return true;
};
/**
 * Determine if audio is available for a go2rtc stream.
 * @param pc The RTCPeerConnection (for WebRTC streams).
 * @param mseCodecs The negotiated MSE codecs string (for MSE streams).
 * @param video The video element (fallback for browser-based detection).
 * @returns True if audio is available.
 */
const hasAudio = (video, pc, mseCodecs) => {
    // For WebRTC: Check if there's an audio receiver with an active track.
    // We check that the track is not muted because muted means no media data
    // is flowing (e.g., the source isn't producing audio). It is not related to
    // the audio being muted by the user on the receiving end.
    if (pc) {
        const receivers = pc.getReceivers();
        // Only trust receivers if they're populated (connection established)
        if (receivers.length > 0) {
            return receivers.some((receiver) => receiver.track?.kind === 'audio' && !receiver.track?.muted);
        }
    }
    // For MSE: Check negotiated codecs for audio codecs
    if (mseCodecs) {
        return (mseCodecs.includes('mp4a') ||
            mseCodecs.includes('opus') ||
            mseCodecs.includes('flac'));
    }
    // Fallback to browser-based detection (unreliable in Chrome)
    return mayHaveAudio(video);
};
/**
 * Check if a WebRTC peer connection has an outbound audio channel (i.e. 2-way
 * audio / microphone support).
 * @param pc The RTCPeerConnection to check.
 * @returns True if the connection has an audio transceiver configured to send.
 */
const has2WayAudio = (pc) => {
    return !!pc
        ?.getTransceivers()
        .some((tr) => tr.sender.track?.kind === 'audio' &&
        (tr.direction === 'sendonly' || tr.direction === 'sendrecv'));
};
/**
 * Add listeners for mute/unmute events on all audio tracks in a WebRTC connection.
 * The callback is fired when the aggregate mute state changes between:
 * - All tracks unmuted (hasAudio = true)
 * - All tracks muted (hasAudio = false)
 * Mixed states (some muted, some unmuted) do not trigger the callback.
 * @param pc The RTCPeerConnection to monitor.
 * @param handler Callback fired with `true` when ALL tracks become unmuted,
 *                `false` when ALL tracks become muted.
 * @returns A cleanup function to remove listeners, or null if no audio tracks.
 */
const addAudioTracksMuteStateListener = (pc, handler) => {
    if (!pc) {
        return null;
    }
    const audioTracks = pc
        .getReceivers()
        .map((r) => r.track)
        .filter((t) => t?.kind === 'audio');
    if (audioTracks.length === 0) {
        return null;
    }
    const hasAnyUnmuted = () => audioTracks.some((t) => !t.muted);
    let lastHasAudio = hasAnyUnmuted();
    const _handler = () => {
        const nowHasAudio = hasAnyUnmuted();
        if (nowHasAudio !== lastHasAudio) {
            lastHasAudio = nowHasAudio;
            handler(nowHasAudio);
        }
    };
    audioTracks.forEach((track) => {
        track.addEventListener('unmute', _handler);
        track.addEventListener('mute', _handler);
    });
    return () => audioTracks.forEach((track) => {
        track.removeEventListener('unmute', _handler);
        track.removeEventListener('mute', _handler);
    });
};

export { MEDIA_LOAD_CONTROLS_HIDE_SECONDS as M, VideoMediaPlayerController as V, hasAudio as a, addAudioTracksMuteStateListener as b, has2WayAudio as c, hideMediaControlsTemporarily as h, mayHaveAudio as m, setControlsOnVideo as s };
//# sourceMappingURL=audio-53bf6f1a.js.map
