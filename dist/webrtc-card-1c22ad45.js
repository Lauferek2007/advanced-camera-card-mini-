import { u as s, fu as h, a4 as renderMessage, X as renderTask, e3 as dispatchMediaLoadedEvent, e5 as dispatchMediaPlayEvent, e6 as dispatchMediaPauseEvent, e4 as dispatchMediaVolumeChangeEvent, v as r, _ as __decorate, y as n, x as r$1, t, ec as renderProgressIndicator, l as localize, A as AdvancedCameraCardError, C as x } from './card-edc26888.js';
import { d as dispatchLiveErrorEvent } from './dispatch-live-error-79e883a5.js';
import { g as getTechnologyForVideoRTC } from './get-technology-for-video-rtc-5d3fdd9e.js';
import { V as VideoMediaPlayerController, s as setControlsOnVideo, h as hideMediaControlsTemporarily, m as mayHaveAudio, M as MEDIA_LOAD_CONTROLS_HIDE_SECONDS } from './audio-53bf6f1a.js';

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n/* Don't drop shadow or have radius for nested webrtc card */\n#webrtc ha-card {\n  border-radius: 0px;\n  margin: 0px;\n  box-shadow: none;\n}\n\nha-card,\ndiv.fix-safari,\n#video {\n  background: unset;\n  background-color: unset;\n}\n\n#webrtc #video {\n  object-fit: var(--advanced-camera-card-media-layout-fit, contain);\n  object-position: var(--advanced-camera-card-media-layout-position-x, 50%) var(--advanced-camera-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--advanced-camera-card-media-layout-view-box-top, 0%) var(--advanced-camera-card-media-layout-view-box-right, 0%) var(--advanced-camera-card-media-layout-view-box-bottom, 0%) var(--advanced-camera-card-media-layout-view-box-left, 0%));\n}";

// Create a wrapper for AlexxIT's WebRTC card
//  - https://github.com/AlexxIT/WebRTC
let AdvancedCameraCardLiveWebRTCCard = class AdvancedCameraCardLiveWebRTCCard extends s {
    constructor() {
        super(...arguments);
        this.controls = false;
        this._message = null;
        this._mediaPlayerController = new VideoMediaPlayerController(this, () => this._getVideo(), () => this.controls);
        // A task to await the load of the WebRTC component.
        this._webrtcTask = new h(this, this._getWebRTCCardElement, () => [1]);
    }
    async getMediaPlayerController() {
        return this._mediaPlayerController;
    }
    connectedCallback() {
        super.connectedCallback();
        // Reset the player when reconnected to the DOM.
        // https://github.com/dermotduffy/advanced-camera-card/issues/996
        this.requestUpdate();
    }
    disconnectedCallback() {
        this._message = null;
        super.disconnectedCallback();
    }
    willUpdate(changedProperties) {
        if (['cameraConfig', 'cameraEndpoints'].some((prop) => changedProperties.has(prop))) {
            this._message = null;
        }
    }
    _getVideoRTC() {
        return (this.renderRoot?.querySelector('#webrtc') ?? null);
    }
    /**
     * Get the underlying video player.
     * @returns The player or `null` if not found.
     */
    _getVideo() {
        return this._getVideoRTC()?.video ?? null;
    }
    async _getWebRTCCardElement() {
        await customElements.whenDefined('webrtc-camera');
        return customElements.get('webrtc-camera');
    }
    /**
     * Create the WebRTC element. May throw.
     */
    _createWebRTC() {
        const webrtcElement = this._webrtcTask.value;
        if (webrtcElement && this.hass && this.cameraConfig) {
            const webrtc = new webrtcElement();
            const config = {
                // By default, webrtc-card will stop the video when 50% of the video is
                // hidden. This is incompatible with the card zoom support, since the
                // video will easily stop if the user zooms in too much. Disable this
                // feature by default.
                // See: https://github.com/dermotduffy/advanced-camera-card/issues/1614
                intersection: 0,
                // Advanced Camera Card always starts muted (unlike webrtc-card).
                // See: https://github.com/dermotduffy/advanced-camera-card/issues/1654
                muted: true,
                ...this.cameraConfig.webrtc_card,
            };
            if (!config.url && !config.entity && this.cameraEndpoints?.webrtcCard) {
                config.entity = this.cameraEndpoints.webrtcCard.endpoint;
            }
            webrtc.setConfig(config);
            webrtc.hass = this.hass;
            return webrtc;
        }
        return null;
    }
    render() {
        if (this._message) {
            return renderMessage(this._message);
        }
        const render = () => {
            let webrtcElement;
            try {
                webrtcElement = this._createWebRTC();
            }
            catch (e) {
                this._message = {
                    type: 'error',
                    message: e instanceof AdvancedCameraCardError
                        ? e.message
                        : localize('error.webrtc_card_reported_error') +
                            ': ' +
                            e.message,
                    context: e.context,
                };
                dispatchLiveErrorEvent(this);
                return;
            }
            if (webrtcElement) {
                // Set the id to ensure that the relevant CSS styles will have
                // sufficient specifity to overcome some styles that are otherwise
                // applied to <ha-card> in Safari.
                webrtcElement.id = 'webrtc';
            }
            return x `${webrtcElement}`;
        };
        // Use a task to allow us to asynchronously wait for the WebRTC card to
        // load, but yet still have the card load be followed by the updated()
        // lifecycle callback (unlike just using `until`).
        return renderTask(this._webrtcTask, render, {
            inProgressFunc: () => renderProgressIndicator({
                message: localize('error.webrtc_card_waiting'),
                cardWideConfig: this.cardWideConfig,
            }),
        });
    }
    updated() {
        // Extract the video component after it has been rendered and generate the
        // media load event.
        this.updateComplete.then(() => {
            const videoRTC = this._getVideoRTC();
            const video = this._getVideo();
            if (video) {
                setControlsOnVideo(video, this.controls);
                video.onloadeddata = () => {
                    if (this.controls) {
                        hideMediaControlsTemporarily(video, MEDIA_LOAD_CONTROLS_HIDE_SECONDS);
                    }
                    dispatchMediaLoadedEvent(this, video, {
                        mediaPlayerController: this._mediaPlayerController,
                        capabilities: {
                            supportsPause: true,
                            hasAudio: mayHaveAudio(video),
                        },
                        ...(videoRTC && { technology: getTechnologyForVideoRTC(videoRTC) }),
                    });
                };
                video.onplay = () => dispatchMediaPlayEvent(this);
                video.onpause = () => dispatchMediaPauseEvent(this);
                video.onvolumechange = () => dispatchMediaVolumeChangeEvent(this);
            }
        });
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveWebRTCCard.prototype, "cameraConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveWebRTCCard.prototype, "cameraEndpoints", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveWebRTCCard.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: true, type: Boolean })
], AdvancedCameraCardLiveWebRTCCard.prototype, "controls", void 0);
__decorate([
    r$1()
], AdvancedCameraCardLiveWebRTCCard.prototype, "_message", void 0);
AdvancedCameraCardLiveWebRTCCard = __decorate([
    t('advanced-camera-card-live-webrtc-card')
], AdvancedCameraCardLiveWebRTCCard);

export { AdvancedCameraCardLiveWebRTCCard };
//# sourceMappingURL=webrtc-card-1c22ad45.js.map
