import { dW as dispatchExistingMediaLoadedInfoAsEvent, _ as __decorate, x as r, y as n, t, u as s, Y as e, dX as dispatchMediaUnloadedEvent, C as x, a4 as renderMessage, l as localize, a0 as n$1, J as e$1, dY as STREAM_TROUBLESHOOTING_URL, v as r$1, dV as configDefaults, dZ as handleZoomSettingsObservedEvent, d_ as getTextDirection, M as stopEventFromActivatingCardWideActions, g as getStreamCameraID, a8 as o, a2 as css$3 } from './card-edc26888.js';
import { i } from './media-dimensions-container-4933e8e0.js';
import { L as LazyLoadController, d as dispatchLiveErrorEvent, M as MediaActionsController, a as MediaHeightController, A as AutoMediaLoadedInfo } from './dispatch-live-error-79e883a5.js';
import { g as getResolvedLiveProvider } from './live-provider-bb334320.js';

class LiveController {
    constructor(host) {
        // Whether or not the live view is currently in the background (i.e. preloaded
        // but not visible).
        this._inBackground = false;
        // MediaLoadedInfo object and target from the underlying live media. In the
        // case of pre-loading these may be propagated later (from the original
        // source).
        this._lastMediaLoadedInfo = null;
        this._handleMediaLoaded = (ev) => {
            this._lastMediaLoadedInfo = {
                source: ev.composedPath()[0],
                mediaLoadedInfo: ev.detail,
            };
            if (this._inBackground) {
                ev.stopPropagation();
            }
        };
        this._host = host;
        host.addController(this);
        this._intersectionObserver = new IntersectionObserver(this._intersectionHandler.bind(this));
    }
    hostConnected() {
        this._intersectionObserver.observe(this._host);
        this._host.addEventListener('advanced-camera-card:media:loaded', this._handleMediaLoaded);
    }
    hostDisconnected() {
        this._intersectionObserver.disconnect();
        this._host.removeEventListener('advanced-camera-card:media:loaded', this._handleMediaLoaded);
    }
    isInBackground() {
        return this._inBackground;
    }
    _intersectionHandler(entries) {
        const wasInBackground = this._inBackground;
        this._inBackground = !entries.some((entry) => entry.isIntersecting);
        if (!this._inBackground && this._lastMediaLoadedInfo) {
            // If this isn't being rendered in the background, the last render did not
            // generate a message and there's a saved MediaInfo, dispatch it upwards.
            dispatchExistingMediaLoadedInfoAsEvent(
            // Specifically dispatch the event "where it came from", as otherwise
            // the intermediate layers (e.g. media-carousel which controls the title
            // popups) will not re-receive the events.
            this._lastMediaLoadedInfo.source, this._lastMediaLoadedInfo.mediaLoadedInfo);
        }
        if (wasInBackground !== this._inBackground) {
            this._host.requestUpdate();
        }
    }
}

var css$2 = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n@keyframes warning-pulse {\n  0% {\n    border: solid 2px var(--trigger-border-color-base);\n  }\n  50% {\n    border: solid 2px var(--trigger-border-color);\n  }\n  100% {\n    border: solid 2px var(--trigger-border-color-base);\n  }\n}\nadvanced-camera-card-mini-live-carousel {\n  --trigger-border-color: var(--advanced-camera-card-trigger-border-color);\n  --trigger-border-color-base: var(\n    --advanced-camera-card-trigger-border-color-base,\n    black\n  );\n}\n\nadvanced-camera-card-mini-live-carousel[triggered] {\n  animation: warning-pulse 5s infinite;\n}\n\nadvanced-camera-card-mini-live-carousel[selected] {\n  --trigger-border-color-base: var(\n    --advanced-camera-card-trigger-border-color-base,\n    var(--advanced-camera-card-foreground-primary)\n  );\n}";

var css$1 = ":host {\n  display: block;\n  --video-max-height: none;\n  transition: max-height 0.1s ease-in-out;\n  position: relative;\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  overflow: hidden;\n}\n\n:host(:not([grid-id])) {\n  height: 100%;\n}\n\n:host([unselected]) advanced-camera-card-carousel {\n  pointer-events: none;\n}\n\n.embla__slide {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex: 0 0 100%;\n}";

var css = ":host {\n  background-color: var(--advanced-camera-card-background);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKGIwYTg0ODY1NDEsIDIwMjItMTItMDEpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJpcmlzLW91dGxpbmUuc3ZnIgogICBpZD0ic3ZnNCIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczgiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHBhZ2Vjb2xvcj0iI2I5M2UzZSIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjYwNzg0MzE0IgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9ImZhbHNlIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMTkuMzc4NTc4IgogICAgIGlua3NjYXBlOmN4PSI4LjI4MjM0MTUiCiAgICAgaW5rc2NhcGU6Y3k9IjEyLjM1OTAwOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTUyNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTA4MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjI3IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnNCIgLz4KICA8ZwogICAgIGlkPSJnMTExOSIKICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjAuMDU7ZmlsbDojZmZmZmZmIj4KICAgIDxjaXJjbGUKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjAuNDk3ODI4MjU7c3Ryb2tlLXdpZHRoOjEuMzk3Mjk7b3BhY2l0eTowLjUiCiAgICAgICBpZD0icGF0aDE3MCIKICAgICAgIGN4PSIxMiIKICAgICAgIGN5PSIxMiIKICAgICAgIGlua3NjYXBlOmxhYmVsPSJCYWNrZ3JvdW5kIgogICAgICAgcj0iMTEuMjUiIC8+CiAgICA8cGF0aAogICAgICAgZD0iTSAxMy43MzAwMDEsMTUgOS44MzAwMDAzLDIxLjc2IEMgMTAuNTMsMjEuOTEgMTEuMjUsMjIgMTIsMjIgYyAyLjQwMDAwMSwwIDQuNiwtMC44NSA2LjMyLC0yLjI1IEwgMTQuNjYwMDAxLDEzLjQgTSAyLjQ2MDAwMDMsMTUgYyAwLjkyLDIuOTIgMy4xNSw1LjI2IDUuOTksNi4zNCBMIDEyLjEyLDE1IG0gLTMuNTc5OTk5NywtMyAtMy45LC02Ljc0OTk5OTYgYyAtMS42NCwxLjc0OTk5OSAtMi42NCw0LjEzOTk5OTMgLTIuNjQsNi43NDk5OTk2IDAsMC42OCAwLjA3LDEuMzUgMC4yLDIgaCA3LjQ5IE0gMjEuOCw5Ljk5OTk5OTcgSCAxNC4zMTAwMDEgTCAxNC42MDAwMDEsMTAuNSAxOS4zNiwxOC43NSBDIDIxLDE2Ljk3IDIyLDE0LjYgMjIsMTIgMjIsMTEuMzEgMjEuOTMsMTAuNjQgMjEuOCw5Ljk5OTk5OTcgbSAtMC4yNiwtMSBDIDIwLjYyLDYuMDcwMDAwNSAxOC4zOSwzLjc0MDAwMDIgMTUuNTUwMDAxLDIuNjYwMDAwMiBMIDExLjg4LDguOTk5OTk5NyBNIDkuNDAwMDAwMywxMC41IDE0LjE3MDAwMSwyLjI0MDAwMDIgYyAtMC43LC0wLjE1IC0xLjQyMDAwMSwtMC4yNCAtMi4xNzAwMDEsLTAuMjQgLTIuMzk5OTk5NywwIC00LjU5OTk5OTcsMC44NCAtNi4zMTk5OTk3LDIuMjUwMDAwMyBsIDMuNjYsNi4zNDk5OTk1IHoiCiAgICAgICBpZD0icGF0aDIiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iSXJpcyIKICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MC41MDIyMTAwMjtmaWxsOiNmZmZmZmY7b3BhY2l0eTowLjc1IiAvPgogIDwvZz4KPC9zdmc+Cg==\");\n  background-size: 10%;\n  background-position: center;\n}\n\n:host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.zoom-wrapper {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.hidden {\n  display: none;\n}\n\nadvanced-camera-card-icon {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  color: var(--primary-color);\n  cursor: help;\n}";

let AdvancedCameraCardLiveProvider = class AdvancedCameraCardLiveProvider extends s {
    constructor() {
        super();
        // Label that is used for ARIA support and as tooltip.
        this.label = '';
        this._isVideoMediaLoaded = false;
        this._hasProviderError = false;
        this._showStreamTroubleshooting = false;
        this._refProvider = e();
        this._lazyLoadController = new LazyLoadController(this);
        // A note on dynamic imports:
        //
        // We gather the dynamic live provider import promises and do not consider the
        // update of the element complete until these imports have returned. Without
        // this behavior calls to the media methods (e.g. `mute()`) may throw if the
        // underlying code is not yet loaded.
        //
        // Test case: A card with a non-live view, but live pre-loaded, attempts to
        // call mute() when the <advanced-camera-card-live> element first renders in
        // the background. These calls fail without waiting for loading here.
        this._importPromises = [];
        this._lazyLoadController.addListener((loaded) => {
            if (!loaded) {
                this._isVideoMediaLoaded = false;
                dispatchMediaUnloadedEvent(this);
            }
        });
    }
    async getMediaPlayerController() {
        await this.updateComplete;
        return (await this._refProvider.value?.getMediaPlayerController()) ?? null;
    }
    /**
     * Determine if a camera image should be shown in lieu of the real stream
     * whilst loading.
     * @returns`true` if an image should be shown.
     */
    _shouldShowImageDuringLoading() {
        return (!this._isVideoMediaLoaded &&
            !!this.camera?.getConfig()?.camera_entity &&
            !!this.hass &&
            !!this.liveConfig?.show_image_during_load &&
            !this._showStreamTroubleshooting &&
            // Do not continue to show image during loading if an error has occurred.
            !this._hasProviderError);
    }
    disconnectedCallback() {
        this._isVideoMediaLoaded = false;
        super.disconnectedCallback();
    }
    _videoMediaShowHandler() {
        this._isVideoMediaLoaded = true;
        this._showStreamTroubleshooting = false;
    }
    _providerErrorHandler() {
        this._hasProviderError = true;
    }
    willUpdate(changedProps) {
        if (changedProps.has('liveConfig') ||
            (!this._lazyLoadController && this.liveConfig)) {
            this._lazyLoadController.setConfiguration(this.liveConfig?.lazy_load, this.liveConfig?.lazy_unload);
        }
        if (changedProps.has('liveConfig')) {
            if (this.liveConfig?.show_image_during_load) {
                this._importPromises.push(import('./image-ceae2fb3.js'));
            }
            if (this.liveConfig?.zoomable) {
                this._importPromises.push(import('./zoomer-2af85980.js'));
            }
        }
        if (changedProps.has('camera')) {
            const provider = getResolvedLiveProvider(this.camera?.getConfig());
            if (provider === 'jsmpeg') {
                this._importPromises.push(import('./jsmpeg-3bc77516.js'));
            }
            else if (provider === 'ha') {
                this._importPromises.push(import('./ha-d2444d62.js'));
            }
            else if (provider === 'webrtc-card') {
                this._importPromises.push(import('./webrtc-card-1c22ad45.js'));
            }
            else if (provider === 'image') {
                this._importPromises.push(import('./image-ceae2fb3.js'));
            }
            else if (provider === 'go2rtc') {
                this._importPromises.push(import('./index-00de96ea.js'));
            }
        }
    }
    async getUpdateComplete() {
        // See 'A note on dynamic imports' above for explanation of why this is
        // necessary.
        const result = await super.getUpdateComplete();
        await Promise.all(this._importPromises);
        this._importPromises = [];
        return result;
    }
    _renderContainer(template) {
        const config = this.camera?.getConfig();
        const intermediateTemplate = x ` <advanced-camera-card-media-dimensions-container
      .dimensionsConfig=${config?.dimensions}
      @advanced-camera-card:media:loaded=${(ev) => {
            if (ev.detail.placeholder) {
                ev.stopPropagation();
            }
            else {
                this._videoMediaShowHandler();
            }
        }}
    >
      ${template}
    </advanced-camera-card-media-dimensions-container>`;
        return x ` ${this.liveConfig?.zoomable
            ? x ` <advanced-camera-card-zoomer
          .defaultSettings=${i([config?.dimensions?.layout], () => config?.dimensions?.layout
                ? {
                    pan: config.dimensions.layout.pan,
                    zoom: config.dimensions.layout.zoom,
                }
                : undefined)}
          .settings=${this.zoomSettings}
          @advanced-camera-card:zoom:zoomed=${async () => (await this.getMediaPlayerController())?.setControls(false)}
          @advanced-camera-card:zoom:unzoomed=${async () => (await this.getMediaPlayerController())?.setControls()}
        >
          ${intermediateTemplate}
        </advanced-camera-card-zoomer>`
            : intermediateTemplate}`;
    }
    render() {
        const cameraConfig = this.camera?.getConfig();
        if (!this._lazyLoadController?.isLoaded() ||
            !this.hass ||
            !this.liveConfig ||
            !this.camera ||
            !cameraConfig) {
            return;
        }
        // Set title and ariaLabel from the provided label property.
        this.title = this.label;
        this.ariaLabel = this.label;
        const provider = getResolvedLiveProvider(this.camera?.getConfig());
        if (provider === 'ha' ||
            provider === 'image' ||
            (cameraConfig?.camera_entity && cameraConfig.always_error_if_entity_unavailable)) {
            if (!cameraConfig?.camera_entity) {
                dispatchLiveErrorEvent(this);
                return renderMessage({
                    message: localize('error.no_live_camera'),
                    type: 'error',
                    icon: 'mdi:camera',
                    context: cameraConfig,
                });
            }
            const stateObj = this.hass.states[cameraConfig.camera_entity];
            if (!stateObj) {
                dispatchLiveErrorEvent(this);
                return renderMessage({
                    message: localize('error.live_camera_not_found'),
                    type: 'error',
                    icon: 'mdi:camera',
                    context: cameraConfig,
                });
            }
            if (stateObj.state === 'unavailable') {
                dispatchLiveErrorEvent(this);
                dispatchMediaUnloadedEvent(this);
                return renderMessage({
                    message: `${localize('error.live_camera_unavailable')}${this.label ? `: ${this.label}` : ''}`,
                    type: 'info',
                    icon: 'mdi:cctv-off',
                    dotdotdot: true,
                });
            }
        }
        const showImageDuringLoading = this._shouldShowImageDuringLoading();
        const showLoadingIcon = !this._isVideoMediaLoaded;
        const classes = {
            hidden: showImageDuringLoading,
        };
        return x `${this._renderContainer(x `
      ${showImageDuringLoading || provider === 'image'
            ? x ` <advanced-camera-card-live-image
            ${n$1(this._refProvider)}
            .hass=${this.hass}
            .cameraConfig=${cameraConfig}
            class=${e$1({
                ...classes,
                // The image provider is providing the temporary loading image,
                // so it should not be hidden.
                hidden: false,
            })}
            @advanced-camera-card:live:error=${() => this._providerErrorHandler()}
            @advanced-camera-card:media:loaded=${(ev) => {
                ev.detail.placeholder = provider !== 'image';
            }}
          >
          </advanced-camera-card-live-image>`
            : x ``}
      ${provider === 'ha'
            ? x ` <advanced-camera-card-live-ha
            ${n$1(this._refProvider)}
            class=${e$1(classes)}
            .hass=${this.hass}
            .cameraConfig=${cameraConfig}
            ?controls=${this.liveConfig.controls.builtin}
            @advanced-camera-card:live:error=${() => this._providerErrorHandler()}
          >
          </advanced-camera-card-live-ha>`
            : provider === 'go2rtc'
                ? x `<advanced-camera-card-live-go2rtc
              ${n$1(this._refProvider)}
              class=${e$1(classes)}
              .hass=${this.hass}
              .camera=${this.camera}
              .cameraEndpoints=${this.cameraEndpoints}
              .microphoneState=${this.microphoneState}
              .microphoneConfig=${this.liveConfig.microphone}
              ?controls=${this.liveConfig.controls.builtin}
              @advanced-camera-card:live:error=${() => this._providerErrorHandler()}
            >
            </advanced-camera-card-live-go2rtc>`
                : provider === 'webrtc-card'
                    ? x `<advanced-camera-card-live-webrtc-card
                ${n$1(this._refProvider)}
                class=${e$1(classes)}
                .hass=${this.hass}
                .cameraConfig=${cameraConfig}
                .cameraEndpoints=${this.cameraEndpoints}
                .cardWideConfig=${this.cardWideConfig}
                ?controls=${this.liveConfig.controls.builtin}
                @advanced-camera-card:live:error=${() => this._providerErrorHandler()}
              >
              </advanced-camera-card-live-webrtc-card>`
                    : provider === 'jsmpeg'
                        ? x ` <advanced-camera-card-live-jsmpeg
                  ${n$1(this._refProvider)}
                  class=${e$1(classes)}
                  .hass=${this.hass}
                  .cameraConfig=${cameraConfig}
                  .cameraEndpoints=${this.cameraEndpoints}
                  .cardWideConfig=${this.cardWideConfig}
                  @advanced-camera-card:live:error=${() => this._providerErrorHandler()}
                >
                </advanced-camera-card-live-jsmpeg>`
                        : x ``}
    `)}
    ${showLoadingIcon
            ? x `<advanced-camera-card-icon
          title=${localize('error.awaiting_live')}
          .icon=${{ icon: 'mdi:progress-helper' }}
          @click=${() => {
                this._showStreamTroubleshooting = !this._showStreamTroubleshooting;
            }}
        ></advanced-camera-card-icon>`
            : ''}
    ${this._showStreamTroubleshooting
            ? renderMessage({
                type: 'error',
                icon: 'mdi:camera-off',
                message: localize('error.stream_not_loading'),
                url: {
                    link: STREAM_TROUBLESHOOTING_URL,
                    title: localize('error.troubleshooting'),
                },
            }, { overlay: true })
            : ''}`;
    }
    static get styles() {
        return r$1(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "camera", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "cameraEndpoints", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "liveConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "label", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "microphoneState", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveProvider.prototype, "zoomSettings", void 0);
__decorate([
    r()
], AdvancedCameraCardLiveProvider.prototype, "_isVideoMediaLoaded", void 0);
__decorate([
    r()
], AdvancedCameraCardLiveProvider.prototype, "_hasProviderError", void 0);
__decorate([
    r()
], AdvancedCameraCardLiveProvider.prototype, "_showStreamTroubleshooting", void 0);
AdvancedCameraCardLiveProvider = __decorate([
    t('advanced-camera-card-live-provider')
], AdvancedCameraCardLiveProvider);

const ADVANCED_CAMERA_CARD_LIVE_PROVIDER = 'advanced-camera-card-live-provider';
let AdvancedCameraCardLiveCarousel = class AdvancedCameraCardLiveCarousel extends s {
    constructor() {
        super(...arguments);
        // Index between camera name and slide number.
        this._cameraToSlide = {};
        this._refPTZControl = e();
        this._refCarousel = e();
        this._refSingle = e();
        this._mediaActionsController = new MediaActionsController();
        this._mediaHeightController = new MediaHeightController(this, '.embla__slide');
        this._mediaHasLoaded = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this._mediaHeightController.setRoot(this.renderRoot);
        // Request update in order to reinitialize the media action controller.
        this.requestUpdate();
    }
    disconnectedCallback() {
        this._mediaActionsController.destroy();
        this._mediaHeightController.destroy();
        super.disconnectedCallback();
    }
    _getTransitionEffect() {
        return this.liveConfig?.transition_effect ?? configDefaults.live.transition_effect;
    }
    _getSelectedCameraIndex() {
        if (this.viewFilterCameraID) {
            // If the carousel is limited to a single cameraID, the first (only)
            // element is always the selected one.
            return 0;
        }
        const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability('live');
        const view = this.viewManagerEpoch?.manager.getView();
        if (!cameraIDs?.size || !view) {
            return 0;
        }
        return Math.max(0, Array.from(cameraIDs).indexOf(view.camera));
    }
    willUpdate(changedProps) {
        if (changedProps.has('microphoneState') || changedProps.has('liveConfig')) {
            this._mediaActionsController.setOptions({
                playerSelector: ADVANCED_CAMERA_CARD_LIVE_PROVIDER,
                ...(this.liveConfig?.auto_play && {
                    autoPlayConditions: this.liveConfig.auto_play,
                }),
                ...(this.liveConfig?.auto_pause && {
                    autoPauseConditions: this.liveConfig.auto_pause,
                }),
                ...(this.liveConfig?.auto_mute && {
                    autoMuteConditions: this.liveConfig.auto_mute,
                }),
                ...(this.liveConfig?.auto_unmute && {
                    autoUnmuteConditions: this.liveConfig.auto_unmute,
                }),
                ...((this.liveConfig?.auto_unmute || this.liveConfig?.auto_mute) && {
                    microphoneState: this.microphoneState,
                    microphoneMuteSeconds: this.liveConfig.microphone.mute_after_microphone_mute_seconds,
                }),
            });
        }
    }
    _getPlugins() {
        return [AutoMediaLoadedInfo()];
    }
    /**
     * Returns the number of slides to lazily load. 0 means all slides are lazy
     * loaded, 1 means that 1 slide on each side of the currently selected slide
     * should lazy load, etc. `null` means lazy loading is disabled and everything
     * should load simultaneously.
     * @returns
     */
    _getLazyLoadCount() {
        // Defaults to fully-lazy loading.
        return this.liveConfig?.lazy_load === false ? null : 0;
    }
    _getSlides() {
        if (!this.cameraManager) {
            return [[], {}];
        }
        const view = this.viewManagerEpoch?.manager.getView();
        const cameraIDs = this.viewFilterCameraID
            ? new Set([this.viewFilterCameraID])
            : this.cameraManager?.getStore().getCameraIDsWithCapability('live');
        const slides = [];
        const cameraToSlide = {};
        for (const cameraID of cameraIDs ?? []) {
            const slide = this._renderLive(this._getSubstreamCameraID(cameraID, view));
            if (slide) {
                cameraToSlide[cameraID] = slides.length;
                slides.push(slide);
            }
        }
        return [slides, cameraToSlide];
    }
    _setViewHandler(ev) {
        const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability('live');
        if (cameraIDs?.size && ev.detail.index !== this._getSelectedCameraIndex()) {
            this._setViewCameraID([...cameraIDs][ev.detail.index]);
        }
    }
    _setViewCameraID(cameraID) {
        if (cameraID) {
            this.viewManagerEpoch?.manager.setViewByParametersWithNewQuery({
                params: {
                    camera: cameraID,
                },
            });
        }
    }
    _renderLive(cameraID) {
        const camera = this.cameraManager?.getStore().getCamera(cameraID);
        if (!this.liveConfig || !this.hass || !this.cameraManager || !camera) {
            return;
        }
        const cameraMetadata = this.cameraManager.getCameraMetadata(cameraID);
        const view = this.viewManagerEpoch?.manager.getView();
        return x `
      <div class="embla__slide">
        <advanced-camera-card-live-provider
          .microphoneState=${view?.camera === cameraID
            ? this.microphoneState
            : undefined}
          .camera=${camera}
          .cameraEndpoints=${i([this.cameraManager, cameraID], () => this.cameraManager?.getCameraEndpoints(cameraID) ?? undefined)}
          .label=${cameraMetadata?.title ?? ''}
          .liveConfig=${this.liveConfig}
          .hass=${this.hass}
          .cardWideConfig=${this.cardWideConfig}
          .zoomSettings=${view?.context?.zoom?.[cameraID]?.requested}
          @advanced-camera-card:zoom:change=${(ev) => handleZoomSettingsObservedEvent(ev, this.viewManagerEpoch?.manager, cameraID)}
        >
        </advanced-camera-card-live-provider>
      </div>
    `;
    }
    _getSubstreamCameraID(cameraID, view) {
        return view?.context?.live?.overrides?.get(cameraID) ?? cameraID;
    }
    _getCameraNeighbors() {
        const cameraIDs = this.cameraManager
            ? [...this.cameraManager?.getStore().getCameraIDsWithCapability('live')]
            : [];
        const view = this.viewManagerEpoch?.manager.getView();
        if (this.viewFilterCameraID || cameraIDs.length <= 1 || !view || !this.hass) {
            return {};
        }
        const cameraID = this.viewFilterCameraID ?? view.camera;
        const currentIndex = cameraIDs.indexOf(cameraID);
        if (currentIndex < 0) {
            return {};
        }
        const prevID = cameraIDs[currentIndex > 0 ? currentIndex - 1 : cameraIDs.length - 1];
        const nextID = cameraIDs[currentIndex + 1 < cameraIDs.length ? currentIndex + 1 : 0];
        return {
            previous: {
                id: prevID,
                metadata: prevID
                    ? this.cameraManager?.getCameraMetadata(this._getSubstreamCameraID(prevID, view))
                    : null,
            },
            next: {
                id: nextID,
                metadata: nextID
                    ? this.cameraManager?.getCameraMetadata(this._getSubstreamCameraID(nextID, view))
                    : null,
            },
        };
    }
    _renderNextPrevious(side, neighbors) {
        const textDirection = getTextDirection(this);
        const neighbor = (textDirection === 'ltr' && side === 'left') ||
            (textDirection === 'rtl' && side === 'right')
            ? neighbors?.previous
            : neighbors?.next;
        return x `<advanced-camera-card-next-previous-control
      slot=${side}
      .hass=${this.hass}
      .side=${side}
      .controlConfig=${this.liveConfig?.controls.next_previous}
      .label=${neighbor?.metadata?.title ?? ''}
      .icon=${neighbor?.metadata?.icon}
      ?disabled=${!neighbor}
      @click=${(ev) => {
            this._setViewCameraID(neighbor?.id);
            stopEventFromActivatingCardWideActions(ev);
        }}
    >
    </advanced-camera-card-next-previous-control>`;
    }
    render() {
        const view = this.viewManagerEpoch?.manager.getView();
        if (!this.liveConfig || !this.hass || !view || !this.cameraManager) {
            return;
        }
        const [slides, cameraToSlide] = this._getSlides();
        this._cameraToSlide = cameraToSlide;
        if (!slides.length) {
            return;
        }
        const hasMultipleCameras = slides.length > 1;
        const neighbors = this._getCameraNeighbors();
        const forcePTZVisibility = !this._mediaHasLoaded ||
            (!!this.viewFilterCameraID && this.viewFilterCameraID !== view.camera) ||
            view.context?.ptzControls?.enabled === false
            ? false
            : view.context?.ptzControls?.enabled;
        const mediaLoadedHandler = () => {
            this._mediaHasLoaded = true;
            this._mediaHeightController.recalculate();
        };
        const mediaUnloadedHandler = () => {
            this._mediaHasLoaded = false;
        };
        if (!hasMultipleCameras) {
            return x `
        <div
          ${n$1(this._refSingle)}
          class="single-live"
          @advanced-camera-card:media:loaded=${mediaLoadedHandler}
          @advanced-camera-card:media:unloaded=${mediaUnloadedHandler}
        >
          ${slides[0]}
        </div>
        <advanced-camera-card-ptz
          .hass=${this.hass}
          .config=${this.liveConfig.controls.ptz}
          .cameraManager=${this.cameraManager}
          .cameraID=${getStreamCameraID(view, this.viewFilterCameraID)}
          .forceVisibility=${forcePTZVisibility}
        >
        </advanced-camera-card-ptz>
      `;
        }
        // Notes on the below:
        // - guard() is used to avoid reseting the carousel unless the
        //   options/plugins actually change.
        return x `
      <advanced-camera-card-carousel
        ${n$1(this._refCarousel)}
        .loop=${hasMultipleCameras}
        .dragEnabled=${hasMultipleCameras && this.liveConfig?.draggable}
        .plugins=${i([this.cameraManager, this.liveConfig], this._getPlugins.bind(this))}
        .selected=${this._getSelectedCameraIndex()}
        .wheelScrolling=${this.liveConfig?.controls.wheel}
        transitionEffect=${this._getTransitionEffect()}
        @advanced-camera-card:carousel:select=${this._setViewHandler.bind(this)}
        @advanced-camera-card:media:loaded=${mediaLoadedHandler}
        @advanced-camera-card:media:unloaded=${mediaUnloadedHandler}
      >
        ${this._renderNextPrevious('left', neighbors)}
        <!-- -->
        ${slides}
        <!-- -->
        ${this._renderNextPrevious('right', neighbors)}
      </advanced-camera-card-carousel>
      <advanced-camera-card-ptz
        .hass=${this.hass}
        .config=${this.liveConfig.controls.ptz}
        .cameraManager=${this.cameraManager}
        .cameraID=${getStreamCameraID(view, this.viewFilterCameraID)}
        .forceVisibility=${forcePTZVisibility}
      >
      </advanced-camera-card-ptz>
    `;
    }
    _setMediaTarget() {
        const view = this.viewManagerEpoch?.manager.getView();
        const selectedCameraIndex = this._getSelectedCameraIndex();
        if (this.viewFilterCameraID) {
            this._mediaActionsController.setTarget(selectedCameraIndex, 
            // Camera in this carousel is only selected if the camera from the
            // view matches the filtered camera.
            view?.camera === this.viewFilterCameraID);
        }
        else {
            // Carousel is not filtered, so the targeted camera is always selected.
            this._mediaActionsController.setTarget(selectedCameraIndex, true);
        }
        this._mediaHeightController.setSelected(selectedCameraIndex);
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const root = this._refCarousel.value ?? this._refSingle.value ?? null;
        const rootChanged = root ? this._mediaActionsController.setRoot(root) : false;
        // If the view has changed, or if the media actions controller has just been
        // initialized, then call the necessary media action.
        // See: https://github.com/dermotduffy/advanced-camera-card/issues/1626
        if (rootChanged || changedProperties.has('viewManagerEpoch')) {
            this._setMediaTarget();
        }
    }
    static get styles() {
        return r$1(css$1);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "liveConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "microphoneState", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveCarousel.prototype, "viewFilterCameraID", void 0);
__decorate([
    r()
], AdvancedCameraCardLiveCarousel.prototype, "_mediaHasLoaded", void 0);
AdvancedCameraCardLiveCarousel = __decorate([
    t('advanced-camera-card-mini-live-carousel')
], AdvancedCameraCardLiveCarousel);

let AdvancedCameraCardLiveGrid = class AdvancedCameraCardLiveGrid extends s {
    _renderCarousel(cameraID) {
        const view = this.viewManagerEpoch?.manager.getView();
        const triggeredCameraID = cameraID ?? view?.camera;
        // Get the camera's grid width factor from its dimensions config.
        const gridWidthFactor = cameraID
            ? this.cameraManager?.getStore().getCameraConfig(cameraID)?.dimensions?.grid
                ?.width_factor
            : undefined;
        return x `
      <advanced-camera-card-mini-live-carousel
        grid-id=${o(cameraID)}
        grid-width-factor=${o(gridWidthFactor)}
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .viewFilterCameraID=${cameraID}
        .liveConfig=${this.liveConfig}
        .cardWideConfig=${this.cardWideConfig}
        .cameraManager=${this.cameraManager}
        .microphoneState=${this.microphoneState}
        ?triggered=${triggeredCameraID &&
            !!this.triggeredCameraIDs?.has(triggeredCameraID)}
      >
      </advanced-camera-card-mini-live-carousel>
    `;
    }
    _gridSelectCamera(cameraID) {
        this.viewManagerEpoch?.manager.setViewByParameters({
            params: {
                camera: cameraID,
            },
        });
    }
    _needsGrid() {
        const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability('live');
        const view = this.viewManagerEpoch?.manager.getView();
        return (!!view?.isGrid() &&
            !!view?.supportsMultipleDisplayModes() &&
            !!cameraIDs &&
            cameraIDs.size > 1);
    }
    willUpdate(changedProps) {
        if (changedProps.has('viewManagerEpoch') && this._needsGrid()) {
            import('./media-grid-8d1540ba.js');
        }
    }
    render() {
        const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability('live');
        if (!cameraIDs?.size || !this._needsGrid()) {
            return this._renderCarousel();
        }
        return x `
      <advanced-camera-card-media-grid
        .selected=${this.viewManagerEpoch?.manager.getView()?.camera}
        .displayConfig=${this.liveConfig?.display}
        @advanced-camera-card:media-grid:selected=${(ev) => this._gridSelectCamera(ev.detail.selected)}
      >
        ${[...cameraIDs].map((cameraID) => this._renderCarousel(cameraID))}
      </advanced-camera-card-media-grid>
    `;
    }
    static get styles() {
        return r$1(css$2);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "liveConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "microphoneState", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLiveGrid.prototype, "triggeredCameraIDs", void 0);
AdvancedCameraCardLiveGrid = __decorate([
    t('advanced-camera-card-mini-live-grid')
], AdvancedCameraCardLiveGrid);

let AdvancedCameraCardLive = class AdvancedCameraCardLive extends s {
    constructor() {
        super(...arguments);
        this._controller = new LiveController(this);
    }
    render() {
        if (!this.hass || !this.cameraManager) {
            return;
        }
        return x `
      <advanced-camera-card-mini-live-grid
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .liveConfig=${this.liveConfig}
        .inBackground=${this._controller.isInBackground()}
        .cardWideConfig=${this.cardWideConfig}
        .cameraManager=${this.cameraManager}
        .microphoneState=${this.microphoneState}
        .triggeredCameraIDs=${this.triggeredCameraIDs}
      >
      </advanced-camera-card-mini-live-grid>
    `;
    }
    static get styles() {
        return r$1(css$3);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "liveConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "microphoneState", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardLive.prototype, "triggeredCameraIDs", void 0);
AdvancedCameraCardLive = __decorate([
    t('advanced-camera-card-mini-live')
], AdvancedCameraCardLive);

export { AdvancedCameraCardLive };
//# sourceMappingURL=index-1c3b9a68.js.map
