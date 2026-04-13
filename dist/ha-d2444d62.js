import { _ as __decorate, t, a4 as renderMessage, C as x, a8 as o, e4 as dispatchMediaVolumeChangeEvent, e5 as dispatchMediaPlayEvent, e6 as dispatchMediaPauseEvent, e3 as dispatchMediaLoadedEvent, v as r, fo as i, fe as T, dW as dispatchExistingMediaLoadedInfoAsEvent, u as s, Y as e$1, a0 as n, y as n$1 } from './card-edc26888.js';
import { c as css$1, e } from './image-player-7aff5234.js';
import { d as dispatchLiveErrorEvent } from './dispatch-live-error-79e883a5.js';
import { V as VideoMediaPlayerController, h as hideMediaControlsTemporarily, M as MEDIA_LOAD_CONTROLS_HIDE_SECONDS, a as hasAudio, b as addAudioTracksMuteStateListener } from './audio-53bf6f1a.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
customElements.whenDefined('ha-web-rtc-player').then(() => {
    const HaWebRtcPlayer = customElements.get('ha-web-rtc-player');
    let AdvancedCameraCardHaWebRtcPlayer = 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class AdvancedCameraCardHaWebRtcPlayer extends HaWebRtcPlayer {
        constructor() {
            super(...arguments);
            this._mediaPlayerController = new VideoMediaPlayerController(this, () => this._videoEl, () => this.controls);
            this._audioTracksMuteStateCleanup = null;
            this._addTrack = async (event) => {
                if (!this._remoteStream) {
                    return;
                }
                // Advanced Camera Card note: The HA frontend doesn't add audio tracks if
                // the player is muted. It does not currently respond to unmuting to
                // re-add the audio track, or perhaps assumes that situation would not
                // arise. As such, this code is kept commented out. See:
                // https://github.com/dermotduffy/advanced-camera-card/issues/2235
                // if (event.track.kind === 'audio' && this.muted) {
                //   return;
                // }
                this._remoteStream.addTrack(event.track);
                if (!this.hasUpdated) {
                    await this.updateComplete;
                }
                this._videoEl.srcObject = this._remoteStream;
            };
        }
        async getMediaPlayerController() {
            return this._mediaPlayerController;
        }
        async _startWebRtc() {
            // There is a race condition in the underlying HA frontend code between
            // the element connection and the async start of the WebRTC session. If
            // the element is rapidly connected and disconnected, the RTC connection
            // may be left permanently "dangling" causing leaks. To reproduce (without
            // this workaround), watch the number of open connections on the go2rtc
            // UI, then edit and rapidly save a dashboard with this card -- the number
            // of open connections will not return to 1.
            // See: https://github.com/dermotduffy/advanced-camera-card/issues/1992
            await super._startWebRtc();
            // Workaround: After attempting to start a WebRTC session, check if the
            // element is connected and if not then clean up correctly.
            if (!this.isConnected) {
                this._cleanUp();
            }
        }
        // =====================================================================================
        // Minor modifications from:
        // - https://github.com/home-assistant/frontend/blob/dev/src/components/ha-web-rtc-player.ts
        // =====================================================================================
        render() {
            if (this._error) {
                dispatchLiveErrorEvent(this);
                return renderMessage({
                    type: 'error',
                    message: this._error,
                    context: {
                        entity_id: this.entityid,
                    },
                });
            }
            return x `
        <video
          id="remote-stream"
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          poster=${o(this.posterUrl)}
          @loadedmetadata=${() => {
                if (this.controls) {
                    hideMediaControlsTemporarily(this._videoEl, MEDIA_LOAD_CONTROLS_HIDE_SECONDS);
                }
            }}
          @loadeddata=${(ev) => this._loadedDataHandler(ev)}
          @volumechange=${() => dispatchMediaVolumeChangeEvent(this)}
          @play=${() => dispatchMediaPlayEvent(this)}
          @pause=${() => dispatchMediaPauseEvent(this)}
        ></video>
      `;
        }
        _loadedDataHandler(ev) {
            super._loadedData();
            dispatchMediaLoadedEvent(this, ev, {
                mediaPlayerController: this._mediaPlayerController,
                capabilities: {
                    supportsPause: true,
                    hasAudio: hasAudio(this._videoEl, this._peerConnection),
                },
                technology: ['webrtc'],
            });
            // Listen for audio track mute/unmute changes and re-dispatch
            this._audioTracksMuteStateCleanup?.();
            this._audioTracksMuteStateCleanup = addAudioTracksMuteStateListener(this._peerConnection, () => {
                dispatchMediaLoadedEvent(this, this._videoEl, {
                    mediaPlayerController: this._mediaPlayerController,
                    capabilities: {
                        supportsPause: true,
                        hasAudio: hasAudio(this._videoEl, this._peerConnection),
                    },
                    technology: ['webrtc'],
                });
            });
        }
        _cleanUp() {
            super._cleanUp();
            this._audioTracksMuteStateCleanup?.();
            this._audioTracksMuteStateCleanup = null;
        }
        static get styles() {
            return [
                super.styles,
                r(css$1),
                i `
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `,
            ];
        }
    };
    AdvancedCameraCardHaWebRtcPlayer = __decorate([
        t('advanced-camera-card-ha-web-rtc-player')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ], AdvancedCameraCardHaWebRtcPlayer);
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
customElements.whenDefined('ha-camera-stream').then(() => {
    // ========================================================================================
    // From:
    // - https://github.com/home-assistant/frontend/blob/dev/src/data/camera.ts
    // - https://github.com/home-assistant/frontend/blob/dev/src/common/entity/compute_state_name.ts
    // - https://github.com/home-assistant/frontend/blob/dev/src/common/entity/compute_object_id.ts
    // ========================================================================================
    const computeMJPEGStreamUrl = (entity) => `/api/camera_proxy_stream/${entity.entity_id}?token=${entity.attributes.access_token}`;
    const STREAM_TYPE_HLS = 'hls';
    const STREAM_TYPE_WEB_RTC = 'web_rtc';
    const STREAM_TYPE_MJPEG = 'mjpeg';
    let AdvancedCameraCardHaCameraStream = 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class AdvancedCameraCardHaCameraStream extends customElements.get('ha-camera-stream') {
        constructor() {
            super(...arguments);
            this._mediaLoadedInfoPerStream = {};
            this._mediaLoadedInfoDispatched = null;
        }
        // ========================================================================================
        // Minor modifications from:
        // - https://github.com/home-assistant/frontend/blob/dev/src/components/ha-camera-stream.ts
        // ========================================================================================
        async getMediaPlayerController() {
            await this.updateComplete;
            return (await this._player?.getMediaPlayerController()) ?? null;
        }
        _storeMediaLoadedInfoHandler(stream, ev) {
            this._storeMediaLoadedInfo(stream, ev.detail);
            ev.stopPropagation();
        }
        _storeMediaLoadedInfo(stream, mediaLoadedInfo) {
            this._mediaLoadedInfoPerStream[stream] = mediaLoadedInfo;
            this.requestUpdate();
        }
        _renderStream(stream) {
            if (!this.stateObj) {
                return T;
            }
            if (stream.type === STREAM_TYPE_MJPEG) {
                return x `
          <advanced-camera-card-image-player
            @advanced-camera-card:media:loaded=${(ev) => {
                    this._storeMediaLoadedInfo(STREAM_TYPE_MJPEG, ev.detail);
                    ev.stopPropagation();
                }}
            src=${typeof this._connected == 'undefined' || this._connected
                    ? computeMJPEGStreamUrl(this.stateObj)
                    : this._posterUrl || ''}
            technology="mjpeg"
            class="player"
          ></advanced-camera-card-image-player>
        `;
            }
            if (stream.type === STREAM_TYPE_HLS) {
                return x ` <advanced-camera-card-ha-hls-player
          ?autoplay=${false}
          playsinline
          .allowExoPlayer=${this.allowExoPlayer}
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @advanced-camera-card:media:loaded=${(ev) => {
                    this._storeMediaLoadedInfoHandler(STREAM_TYPE_HLS, ev);
                    ev.stopPropagation();
                }}
          @streams=${this._handleHlsStreams}
          class="player ${stream.visible ? '' : 'hidden'}"
        ></advanced-camera-card-ha-hls-player>`;
            }
            if (stream.type === STREAM_TYPE_WEB_RTC) {
                return x `<advanced-camera-card-ha-web-rtc-player
          ?autoplay=${false}
          playsinline
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @advanced-camera-card:media:loaded=${(ev) => {
                    this._storeMediaLoadedInfoHandler(STREAM_TYPE_WEB_RTC, ev);
                    ev.stopPropagation();
                }}
          @streams=${this._handleWebRtcStreams}
          class="player ${stream.visible ? '' : 'hidden'}"
        ></advanced-camera-card-ha-web-rtc-player>`;
            }
            return T;
        }
        updated(changedProps) {
            super.updated(changedProps);
            const streams = this._streams(this._capabilities?.frontend_stream_types, this._hlsStreams, this._webRtcStreams, this.muted);
            const visibleStream = streams.find((stream) => stream.visible) ?? null;
            if (visibleStream) {
                const mediaLoadedInfo = this._mediaLoadedInfoPerStream[visibleStream.type];
                if (mediaLoadedInfo && mediaLoadedInfo !== this._mediaLoadedInfoDispatched) {
                    this._mediaLoadedInfoDispatched = mediaLoadedInfo;
                    dispatchExistingMediaLoadedInfoAsEvent(this, mediaLoadedInfo);
                }
            }
        }
        static get styles() {
            return [
                super.styles,
                r(css$1),
                i `
          :host {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `,
            ];
        }
    };
    __decorate([
        e('.player:not(.hidden)')
    ], AdvancedCameraCardHaCameraStream.prototype, "_player", void 0);
    AdvancedCameraCardHaCameraStream = __decorate([
        t('advanced-camera-card-ha-camera-stream')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ], AdvancedCameraCardHaCameraStream);
});

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}";

let AdvancedCameraCardLiveHA = class AdvancedCameraCardLiveHA extends s {
    constructor() {
        super(...arguments);
        this.controls = false;
        this._playerRef = e$1();
    }
    async getMediaPlayerController() {
        await this.updateComplete;
        return (await this._playerRef.value?.getMediaPlayerController()) ?? null;
    }
    render() {
        if (!this.hass) {
            return;
        }
        return x ` <advanced-camera-card-ha-camera-stream
      ${n(this._playerRef)}
      .hass=${this.hass}
      .stateObj=${this.cameraConfig?.camera_entity
            ? this.hass.states[this.cameraConfig.camera_entity]
            : undefined}
      .controls=${this.controls}
      .muted=${true}
    >
    </advanced-camera-card-ha-camera-stream>`;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardLiveHA.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardLiveHA.prototype, "cameraConfig", void 0);
__decorate([
    n$1({ attribute: true, type: Boolean })
], AdvancedCameraCardLiveHA.prototype, "controls", void 0);
AdvancedCameraCardLiveHA = __decorate([
    t('advanced-camera-card-live-ha')
], AdvancedCameraCardLiveHA);

export { AdvancedCameraCardLiveHA };
//# sourceMappingURL=ha-d2444d62.js.map
