import { _ as __decorate, y as n, t, u as s, Y as e, C as x, a0 as n$1, e3 as dispatchMediaLoadedEvent, e4 as dispatchMediaVolumeChangeEvent, e5 as dispatchMediaPlayEvent, e6 as dispatchMediaPauseEvent, a8 as o, v as r, x as r$1, V as ViewItemClassifier, Q as QueryClassifier, e7 as resolveMedia, e8 as isHARelativeURL, e9 as canonicalizeHAURL, ea as createProxiedEndpointIfNecessary, eb as homeAssistantSignPath, B as errorToConsole, dZ as handleZoomSettingsObservedEvent, ec as renderProgressIndicator, ed as VideoContentType, a1 as contentsChanged, dV as configDefaults, ee as RemoveContextPropertyViewModifier, I as setOrRemoveAttribute, d_ as getTextDirection, M as stopEventFromActivatingCardWideActions, a4 as renderMessage, l as localize, a2 as css$4 } from './card-edc26888.js';
import './image-player-7aff5234.js';
import { i } from './media-dimensions-container-4933e8e0.js';
import { L as LazyLoadController, M as MediaActionsController, a as MediaHeightController, A as AutoMediaLoadedInfo } from './dispatch-live-error-79e883a5.js';
import { V as VideoMediaPlayerController, h as hideMediaControlsTemporarily, M as MEDIA_LOAD_CONTROLS_HIDE_SECONDS, m as mayHaveAudio } from './audio-53bf6f1a.js';

var css$3 = ":host {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n:host([empty]) {\n  aspect-ratio: 16/9;\n}\n\nadvanced-camera-card-viewer-carousel {\n  flex: 1;\n  min-height: 0;\n}";

var css$2 = ":host {\n  display: block;\n  --video-max-height: none;\n  transition: max-height 0.1s ease-in-out;\n  position: relative;\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  overflow: hidden;\n}\n\n:host(:not([grid-id])) {\n  height: 100%;\n}\n\n:host([unselected]) advanced-camera-card-carousel,\n:host([unselected]) .seek-warning {\n  pointer-events: none;\n}\n\n:host([unseekable]) advanced-camera-card-carousel {\n  filter: brightness(50%);\n}\n\n:host([unseekable]) .seek-warning {\n  display: block;\n}\n\n.seek-warning {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  color: white;\n}\n\n.embla__slide {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex: 0 0 100%;\n}";

var css$1 = ":host {\n  background-color: var(--advanced-camera-card-background);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKGIwYTg0ODY1NDEsIDIwMjItMTItMDEpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJpcmlzLW91dGxpbmUuc3ZnIgogICBpZD0ic3ZnNCIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczgiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHBhZ2Vjb2xvcj0iI2I5M2UzZSIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjYwNzg0MzE0IgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9ImZhbHNlIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMTkuMzc4NTc4IgogICAgIGlua3NjYXBlOmN4PSI4LjI4MjM0MTUiCiAgICAgaW5rc2NhcGU6Y3k9IjEyLjM1OTAwOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTUyNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTA4MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjI3IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnNCIgLz4KICA8ZwogICAgIGlkPSJnMTExOSIKICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjAuMDU7ZmlsbDojZmZmZmZmIj4KICAgIDxjaXJjbGUKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjAuNDk3ODI4MjU7c3Ryb2tlLXdpZHRoOjEuMzk3Mjk7b3BhY2l0eTowLjUiCiAgICAgICBpZD0icGF0aDE3MCIKICAgICAgIGN4PSIxMiIKICAgICAgIGN5PSIxMiIKICAgICAgIGlua3NjYXBlOmxhYmVsPSJCYWNrZ3JvdW5kIgogICAgICAgcj0iMTEuMjUiIC8+CiAgICA8cGF0aAogICAgICAgZD0iTSAxMy43MzAwMDEsMTUgOS44MzAwMDAzLDIxLjc2IEMgMTAuNTMsMjEuOTEgMTEuMjUsMjIgMTIsMjIgYyAyLjQwMDAwMSwwIDQuNiwtMC44NSA2LjMyLC0yLjI1IEwgMTQuNjYwMDAxLDEzLjQgTSAyLjQ2MDAwMDMsMTUgYyAwLjkyLDIuOTIgMy4xNSw1LjI2IDUuOTksNi4zNCBMIDEyLjEyLDE1IG0gLTMuNTc5OTk5NywtMyAtMy45LC02Ljc0OTk5OTYgYyAtMS42NCwxLjc0OTk5OSAtMi42NCw0LjEzOTk5OTMgLTIuNjQsNi43NDk5OTk2IDAsMC42OCAwLjA3LDEuMzUgMC4yLDIgaCA3LjQ5IE0gMjEuOCw5Ljk5OTk5OTcgSCAxNC4zMTAwMDEgTCAxNC42MDAwMDEsMTAuNSAxOS4zNiwxOC43NSBDIDIxLDE2Ljk3IDIyLDE0LjYgMjIsMTIgMjIsMTEuMzEgMjEuOTMsMTAuNjQgMjEuOCw5Ljk5OTk5OTcgbSAtMC4yNiwtMSBDIDIwLjYyLDYuMDcwMDAwNSAxOC4zOSwzLjc0MDAwMDIgMTUuNTUwMDAxLDIuNjYwMDAwMiBMIDExLjg4LDguOTk5OTk5NyBNIDkuNDAwMDAwMywxMC41IDE0LjE3MDAwMSwyLjI0MDAwMDIgYyAtMC43LC0wLjE1IC0xLjQyMDAwMSwtMC4yNCAtMi4xNzAwMDEsLTAuMjQgLTIuMzk5OTk5NywwIC00LjU5OTk5OTcsMC44NCAtNi4zMTk5OTk3LDIuMjUwMDAwMyBsIDMuNjYsNi4zNDk5OTk1IHoiCiAgICAgICBpZD0icGF0aDIiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iSXJpcyIKICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MC41MDIyMTAwMjtmaWxsOiNmZmZmZmY7b3BhY2l0eTowLjc1IiAvPgogIDwvZz4KPC9zdmc+Cg==\");\n  background-size: 10%;\n  background-position: center;\n}\n\n:host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.zoom-wrapper {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\nadvanced-camera-card-progress-indicator {\n  padding: 30px;\n  box-sizing: border-box;\n}";

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: var(--advanced-camera-card-media-layout-fit, contain);\n  object-position: var(--advanced-camera-card-media-layout-position-x, 50%) var(--advanced-camera-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--advanced-camera-card-media-layout-view-box-top, 0%) var(--advanced-camera-card-media-layout-view-box-right, 0%) var(--advanced-camera-card-media-layout-view-box-bottom, 0%) var(--advanced-camera-card-media-layout-view-box-left, 0%));\n}";

let AdvancedCameraCardVideoPlayer = class AdvancedCameraCardVideoPlayer extends s {
    constructor() {
        super(...arguments);
        this.controls = false;
        this._refVideo = e();
        this._mediaPlayerController = new VideoMediaPlayerController(this, () => this._refVideo.value ?? null, () => this.controls);
    }
    async getMediaPlayerController() {
        return this._mediaPlayerController;
    }
    render() {
        return x `
      <video
        ${n$1(this._refVideo)}
        muted
        playsinline
        crossorigin="anonymous"
        ?autoplay=${false}
        ?controls=${this.controls}
        @loadedmetadata=${(ev) => {
            if (ev.target && this.controls) {
                hideMediaControlsTemporarily(ev.target, MEDIA_LOAD_CONTROLS_HIDE_SECONDS);
            }
        }}
        @loadeddata=${(ev) => {
            dispatchMediaLoadedEvent(this, ev, {
                ...(this._mediaPlayerController && {
                    mediaPlayerController: this._mediaPlayerController,
                }),
                capabilities: {
                    supportsPause: true,
                    hasAudio: mayHaveAudio(ev.target),
                },
                technology: ['mp4'],
            });
        }}
        @volumechange=${() => dispatchMediaVolumeChangeEvent(this)}
        @play=${() => dispatchMediaPlayEvent(this)}
        @pause=${() => dispatchMediaPauseEvent(this)}
      >
        <source src="${o(this.url)}" type="video/mp4" />
      </video>
    `;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n()
], AdvancedCameraCardVideoPlayer.prototype, "url", void 0);
__decorate([
    n({ type: Boolean })
], AdvancedCameraCardVideoPlayer.prototype, "controls", void 0);
AdvancedCameraCardVideoPlayer = __decorate([
    t('advanced-camera-card-video-player')
], AdvancedCameraCardVideoPlayer);

let AdvancedCameraCardViewerProvider = class AdvancedCameraCardViewerProvider extends s {
    constructor() {
        super();
        this._refProvider = e();
        this._refContainer = e();
        this._lazyLoadController = new LazyLoadController(this);
        this._url = null;
        this._lazyLoadController.addListener((loaded) => loaded && this._setURL());
    }
    async getMediaPlayerController() {
        await this.updateComplete;
        return (await this._refProvider.value?.getMediaPlayerController()) ?? null;
    }
    async _switchToRelatedClipView() {
        const view = this.viewManagerEpoch?.manager.getView();
        if (!this.hass ||
            !view ||
            !this.cameraManager ||
            !this.media ||
            // If this specific media item has no clip, then do nothing (even if all
            // the other media items do).
            !ViewItemClassifier.isEvent(this.media) ||
            !QueryClassifier.isEventQuery(view.query)) {
            return;
        }
        // Convert the query to a clips equivalent.
        const clipQuery = view.query.clone();
        clipQuery.convertToClipsQueries();
        const queries = clipQuery.getQuery();
        if (!queries) {
            return;
        }
        await this.viewManagerEpoch?.manager.setViewByParametersWithExistingQuery({
            params: {
                view: 'media',
                query: clipQuery,
            },
            queryExecutorOptions: {
                selectResult: {
                    id: this.media.getID() ?? undefined,
                },
                rejectResults: (results) => !results.hasSelectedResult(),
            },
        });
    }
    async _setURL() {
        const mediaContentID = this.media?.getContentID();
        if (!this.media ||
            !mediaContentID ||
            !this.hass ||
            !this._lazyLoadController?.isLoaded()) {
            return;
        }
        let resolvedMedia = this.resolvedMediaCache?.get(mediaContentID) ?? null;
        if (!resolvedMedia) {
            resolvedMedia = await resolveMedia(this.hass, mediaContentID, this.resolvedMediaCache);
        }
        if (!resolvedMedia) {
            return;
        }
        const unsignedURL = resolvedMedia.url;
        if (isHARelativeURL(unsignedURL)) {
            // No need to proxy or sign local resolved URLs.
            this._url = canonicalizeHAURL(this.hass, unsignedURL);
            return;
        }
        const cameraID = this.media.getCameraID();
        const camera = cameraID ? this.cameraManager?.getStore().getCamera(cameraID) : null;
        const proxyConfig = camera?.getProxyConfig();
        if (!proxyConfig) {
            this._url = unsignedURL;
            return;
        }
        try {
            // Create endpoint from unsigned URL - it doesn't need signing initially
            const unsignedEndpoint = { endpoint: unsignedURL, sign: false };
            const proxiedEndpoint = await createProxiedEndpointIfNecessary(this.hass, unsignedEndpoint, proxyConfig, {
                context: 'media',
                // The link may need to be opened multiple times.
                openLimit: 0,
            });
            if (proxiedEndpoint.sign) {
                this._url = await homeAssistantSignPath(this.hass, proxiedEndpoint.endpoint);
            }
            else {
                this._url = proxiedEndpoint.endpoint;
            }
        }
        catch (e) {
            errorToConsole(e);
        }
    }
    willUpdate(changedProps) {
        if (changedProps.has('viewerConfig') ||
            (!this._lazyLoadController && this.viewerConfig)) {
            this._lazyLoadController.setConfiguration(this.viewerConfig?.lazy_load);
        }
        if (changedProps.has('media') ||
            changedProps.has('viewerConfig') ||
            changedProps.has('resolvedMediaCache') ||
            changedProps.has('hass')) {
            this._setURL();
        }
        if (changedProps.has('viewerConfig') && this.viewerConfig?.zoomable) {
            import('./zoomer-2af85980.js');
        }
    }
    _getRelevantCameraConfig() {
        const cameraID = this.media?.getCameraID();
        return cameraID
            ? this.cameraManager?.getStore().getCameraConfig(cameraID) ?? null
            : null;
    }
    _renderContainer(template) {
        if (!this.media) {
            return template;
        }
        const cameraID = this.media.getCameraID();
        const mediaID = this.media.getID() ?? undefined;
        const cameraConfig = cameraID
            ? this.cameraManager?.getStore().getCameraConfig(cameraID) ?? null
            : null;
        const view = this.viewManagerEpoch?.manager.getView();
        const intermediateTemplate = x ` <advanced-camera-card-media-dimensions-container
      .dimensionsConfig=${this._getRelevantCameraConfig()?.dimensions}
    >
      ${template}
    </advanced-camera-card-media-dimensions-container>`;
        return x `
      ${this.viewerConfig?.zoomable
            ? x `<advanced-camera-card-zoomer
            .defaultSettings=${i([cameraConfig?.dimensions?.layout], () => cameraConfig?.dimensions?.layout
                ? {
                    pan: cameraConfig.dimensions.layout.pan,
                    zoom: cameraConfig.dimensions.layout.zoom,
                }
                : undefined)}
            .settings=${mediaID ? view?.context?.zoom?.[mediaID]?.requested : undefined}
            @advanced-camera-card:zoom:zoomed=${async () => (await this.getMediaPlayerController())?.setControls(false)}
            @advanced-camera-card:zoom:unzoomed=${async () => (await this.getMediaPlayerController())?.setControls()}
            @advanced-camera-card:zoom:change=${(ev) => handleZoomSettingsObservedEvent(ev, this.viewManagerEpoch?.manager, mediaID)}
          >
            ${intermediateTemplate}
          </advanced-camera-card-zoomer>`
            : intermediateTemplate}
    `;
    }
    render() {
        if (!this._lazyLoadController?.isLoaded() ||
            !this.media ||
            !this.hass ||
            !this.viewerConfig) {
            return;
        }
        if (!this._url) {
            return renderProgressIndicator({
                cardWideConfig: this.cardWideConfig,
            });
        }
        // Note: crossorigin="anonymous" is required on <video> below in order to
        // allow screenshot of motionEye videos which currently go cross-origin.
        return this._renderContainer(x `
      ${ViewItemClassifier.isVideo(this.media)
            ? this.media.getVideoContentType() === VideoContentType.HLS
                ? x `<advanced-camera-card-ha-hls-player
              ${n$1(this._refProvider)}
              allow-exoplayer
              aria-label="${this.media.getTitle() ?? ''}"
              ?autoplay=${false}
              controls
              muted
              playsinline
              title="${this.media.getTitle() ?? ''}"
              url=${this._url}
              .hass=${this.hass}
              ?controls=${this.viewerConfig.controls.builtin}
            >
            </advanced-camera-card-ha-hls-player>`
                : x `
              <advanced-camera-card-video-player
                ${n$1(this._refProvider)}
                url=${this._url}
                aria-label="${this.media.getTitle() ?? ''}"
                title="${this.media.getTitle() ?? ''}"
                ?controls=${this.viewerConfig.controls.builtin}
              >
              </advanced-camera-card-video-player>
            `
            : x `<advanced-camera-card-image-player
            ${n$1(this._refProvider)}
            url="${this._url}"
            aria-label="${this.media.getTitle() ?? ''}"
            title="${this.media.getTitle() ?? ''}"
            @click=${() => {
                if (this.viewerConfig?.snapshot_click_plays_clip) {
                    this._switchToRelatedClipView();
                }
            }}
          ></advanced-camera-card-image-player>`}
    `);
    }
    static get styles() {
        return r(css$1);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "media", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "viewerConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "resolvedMediaCache", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerProvider.prototype, "cardWideConfig", void 0);
__decorate([
    r$1()
], AdvancedCameraCardViewerProvider.prototype, "_url", void 0);
AdvancedCameraCardViewerProvider = __decorate([
    t('advanced-camera-card-viewer-provider')
], AdvancedCameraCardViewerProvider);

const ADVANCED_CAMERA_CARD_VIEWER_PROVIDER = 'advanced-camera-card-viewer-provider';
let AdvancedCameraCardViewerCarousel = class AdvancedCameraCardViewerCarousel extends s {
    constructor() {
        super(...arguments);
        this.showControls = true;
        this._selected = null;
        this._media = null;
        this._mediaActionsController = new MediaActionsController();
        this._mediaHeightController = new MediaHeightController(this, '.embla__slide');
        this._loadedMediaPlayerController = null;
        this._refCarousel = e();
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
    /**
     * Get the transition effect to use.
     * @returns An TransitionEffect object.
     */
    _getTransitionEffect() {
        return (this.viewerConfig?.transition_effect ??
            configDefaults.media_viewer.transition_effect);
    }
    /**
     * Get the Embla plugins to use.
     * @returns A list of EmblaOptionsTypes.
     */
    _getPlugins() {
        return [AutoMediaLoadedInfo()];
    }
    /**
     * Get the previous and next true media items from the current view.
     * @returns A BrowseMediaNeighbors with indices and objects of true media
     * neighbors.
     */
    _getMediaNeighbors() {
        const mediaCount = this._media?.length ?? 0;
        if (!this._media || this._selected === null) {
            return null;
        }
        const prevIndex = this._selected > 0 ? this._selected - 1 : null;
        const nextIndex = this._selected + 1 < mediaCount ? this._selected + 1 : null;
        return {
            ...(prevIndex !== null && {
                previous: {
                    index: prevIndex,
                    media: this._media[prevIndex],
                },
            }),
            ...(nextIndex !== null && {
                next: {
                    index: nextIndex,
                    media: this._media[nextIndex],
                },
            }),
        };
    }
    _setViewSelectedIndex(index) {
        const view = this.viewManagerEpoch?.manager.getView();
        if (!this._media || !view) {
            return;
        }
        if (this._selected === index) {
            // The slide may already be selected on load, so don't dispatch a new view
            // unless necessary (i.e. the new index is different from the current
            // index).
            return;
        }
        const newResults = view?.queryResults
            ?.clone()
            .selectResultIfFound((item) => item === this._media?.[index], {
            main: true,
            cameraID: this.viewFilterCameraID,
        });
        if (!newResults) {
            return;
        }
        const selectedItem = newResults.getSelectedResult(this.viewFilterCameraID);
        const cameraID = ViewItemClassifier.isMedia(selectedItem)
            ? selectedItem.getCameraID()
            : null;
        this.viewManagerEpoch?.manager.setViewByParameters({
            params: {
                queryResults: newResults,
                // Always change the camera to the owner of the selected media.
                ...(cameraID && { camera: cameraID }),
            },
            modifiers: [new RemoveContextPropertyViewModifier('mediaViewer', 'seek')],
        });
    }
    /**
     * Get slides to include in the render.
     * @returns The slides to include in the render.
     */
    _getSlides() {
        if (!this._media) {
            return [];
        }
        const slides = [];
        for (let i = 0; i < this._media.length; ++i) {
            const media = this._media[i];
            if (media) {
                const slide = this._renderMediaItem(media);
                if (slide) {
                    slides[i] = slide;
                }
            }
        }
        return slides;
    }
    willUpdate(changedProps) {
        if (changedProps.has('viewerConfig')) {
            this._mediaActionsController.setOptions({
                playerSelector: ADVANCED_CAMERA_CARD_VIEWER_PROVIDER,
                ...(this.viewerConfig?.auto_play && {
                    autoPlayConditions: this.viewerConfig.auto_play,
                }),
                ...(this.viewerConfig?.auto_pause && {
                    autoPauseConditions: this.viewerConfig.auto_pause,
                }),
                ...(this.viewerConfig?.auto_mute && {
                    autoMuteConditions: this.viewerConfig.auto_mute,
                }),
                ...(this.viewerConfig?.auto_unmute && {
                    autoUnmuteConditions: this.viewerConfig.auto_unmute,
                }),
            });
        }
        if (changedProps.has('viewManagerEpoch')) {
            const newView = this.viewManagerEpoch?.manager.getView();
            if (!newView?.context?.mediaViewer?.seek) {
                setOrRemoveAttribute(this, false, 'unseekable');
            }
            const oldView = this.viewManagerEpoch?.oldView;
            const oldItems = oldView?.queryResults?.getResults(this.viewFilterCameraID) ?? null;
            const newItems = newView?.queryResults?.getResults(this.viewFilterCameraID) ?? null;
            let resetMedia = false;
            if (!this._media || oldItems !== newItems) {
                this._media =
                    newItems?.filter((item) => ViewItemClassifier.isMedia(item)) ?? null;
                resetMedia = true;
            }
            const oldSelectedItem = oldView?.queryResults?.getSelectedResult(this.viewFilterCameraID);
            const newSelectedItem = newView?.queryResults?.getSelectedResult(this.viewFilterCameraID);
            // _selected is an index, it needs to be updated if either the selected
            // item or the media changes.
            if (oldSelectedItem !== newSelectedItem || resetMedia) {
                const newSelected = this._media?.findIndex((item) => item === newSelectedItem) ?? null;
                // If there's no selected item, just choose the last (most recent one) to
                // avoid rendering a blank. This could happen if the selected item was a
                // folder.
                this._selected =
                    newSelected ??
                        (this._media && this._media.length ? this._media.length - 1 : null);
            }
        }
    }
    _renderNextPrevious(side, neighbors) {
        const scroll = (direction) => {
            if (!neighbors || !this._media) {
                return;
            }
            const newIndex = (direction === 'previous' ? neighbors.previous?.index : neighbors.next?.index) ??
                null;
            if (newIndex !== null) {
                this._setViewSelectedIndex(newIndex);
            }
        };
        const textDirection = getTextDirection(this);
        const scrollDirection = (textDirection === 'ltr' && side === 'left') ||
            (textDirection === 'rtl' && side === 'right')
            ? 'previous'
            : 'next';
        return x ` <advanced-camera-card-next-previous-control
      slot=${side}
      .hass=${this.hass}
      .side=${side}
      .controlConfig=${this.viewerConfig?.controls.next_previous}
      .thumbnail=${neighbors?.[scrollDirection]?.media.getThumbnail() ?? undefined}
      .label=${neighbors?.[scrollDirection]?.media.getTitle() ?? ''}
      ?disabled=${!neighbors?.[scrollDirection]}
      @click=${(ev) => {
            scroll(scrollDirection);
            stopEventFromActivatingCardWideActions(ev);
        }}
    ></advanced-camera-card-next-previous-control>`;
    }
    render() {
        const mediaCount = this._media?.length ?? 0;
        if (!this._media || !mediaCount) {
            return renderMessage({
                message: localize('common.no_media'),
                type: 'info',
                icon: 'mdi:multimedia',
                ...(this.viewFilterCameraID && {
                    context: {
                        camera_id: this.viewFilterCameraID,
                    },
                }),
            });
        }
        if (!this.hass || !this.cameraManager || this._selected === null) {
            return;
        }
        const neighbors = this._getMediaNeighbors();
        const view = this.viewManagerEpoch?.manager.getView();
        return x `
      <advanced-camera-card-carousel
        ${n$1(this._refCarousel)}
        .dragEnabled=${this.viewerConfig?.draggable ?? true}
        .plugins=${i([this.viewerConfig, this._media], this._getPlugins.bind(this))}
        .selected=${this._selected}
        .wheelScrolling=${this.viewerConfig?.controls.wheel}
        transitionEffect=${this._getTransitionEffect()}
        @advanced-camera-card:carousel:select=${(ev) => {
            this._setViewSelectedIndex(ev.detail.index);
        }}
        @advanced-camera-card:media:loaded=${(ev) => {
            this._loadedMediaPlayerController = ev.detail.mediaPlayerController ?? null;
            this._mediaHeightController.recalculate();
            this._seekHandler();
        }}
        @advanced-camera-card:media:unloaded=${() => {
            this._loadedMediaPlayerController = null;
        }}
      >
        ${this.showControls ? this._renderNextPrevious('left', neighbors) : ''}
        ${i([this._media, view], () => this._getSlides())}
        ${this.showControls ? this._renderNextPrevious('right', neighbors) : ''}
      </advanced-camera-card-carousel>
      ${view
            ? x ` <advanced-camera-card-ptz
            .hass=${this.hass}
            .config=${this.viewerConfig?.controls.ptz}
            .forceVisibility=${view?.context?.ptzControls?.enabled}
          >
          </advanced-camera-card-ptz>`
            : ''}
      <div class="seek-warning">
        <advanced-camera-card-icon
          title="${localize('media_viewer.unseekable')}"
          .icon=${{ icon: 'mdi:clock-remove' }}
        >
        </advanced-camera-card-icon>
      </div>
    `;
    }
    updated(changedProperties) {
        super.updated(changedProperties);
        const rootChanged = this._refCarousel.value
            ? this._mediaActionsController.setRoot(this._refCarousel.value)
            : false;
        // If the view has changed, or if the media actions controller has just been
        // initialized, then call the necessary media action.
        // See: https://github.com/dermotduffy/advanced-camera-card/issues/1626
        if (rootChanged || changedProperties.has('viewManagerEpoch')) {
            this._setMediaTarget();
        }
        if (changedProperties.has('viewManagerEpoch')) {
            // Seek into the video if the seek time has changed (this is also called
            // on media load, since the media may or may not have been loaded at
            // this point).
            if (this.viewManagerEpoch?.manager.getView()?.context?.mediaViewer !==
                this.viewManagerEpoch?.oldView?.context?.mediaViewer) {
                this._seekHandler();
            }
        }
    }
    _setMediaTarget() {
        if (!this._media?.length || this._selected === null) {
            this._mediaActionsController.unsetTarget();
        }
        else {
            this._mediaActionsController.setTarget(this._selected, 
            // Camera in this carousel is only selected if the camera from the view
            // matches the filtered camera.
            this.viewFilterCameraID
                ? this.viewManagerEpoch?.manager.getView()?.camera === this.viewFilterCameraID
                : true);
            this._mediaHeightController.setSelected(this._selected);
        }
    }
    /**
     * Fire a media show event when a slide is selected.
     */
    async _seekHandler() {
        const view = this.viewManagerEpoch?.manager.getView();
        const seek = view?.context?.mediaViewer?.seek;
        if (!this.hass ||
            !seek ||
            !this._media ||
            !this._loadedMediaPlayerController ||
            this._selected === null) {
            return;
        }
        const selectedMedia = this._media[this._selected];
        if (!selectedMedia) {
            return;
        }
        const seekTimeInMedia = selectedMedia.includesTime(seek);
        setOrRemoveAttribute(this, !seekTimeInMedia, 'unseekable');
        if (!seekTimeInMedia && !this._loadedMediaPlayerController.isPaused()) {
            this._loadedMediaPlayerController.pause();
        }
        else if (seekTimeInMedia && this._loadedMediaPlayerController.isPaused()) {
            this._loadedMediaPlayerController.play();
        }
        const seekTime = (await this.cameraManager?.getMediaSeekTime(selectedMedia, seek)) ?? null;
        if (seekTime !== null) {
            this._loadedMediaPlayerController.seek(seekTime);
        }
    }
    _renderMediaItem(media) {
        const view = this.viewManagerEpoch?.manager.getView();
        if (!this.hass || !view || !this.viewerConfig) {
            return null;
        }
        return x ` <div class="embla__slide">
      <advanced-camera-card-viewer-provider
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .media=${media}
        .viewerConfig=${this.viewerConfig}
        .resolvedMediaCache=${this.resolvedMediaCache}
        .cameraManager=${this.cameraManager}
        .cardWideConfig=${this.cardWideConfig}
      ></advanced-camera-card-viewer-provider>
    </div>`;
    }
    static get styles() {
        return r(css$2);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "viewFilterCameraID", void 0);
__decorate([
    n({ attribute: false, hasChanged: contentsChanged })
], AdvancedCameraCardViewerCarousel.prototype, "viewerConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "resolvedMediaCache", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerCarousel.prototype, "showControls", void 0);
__decorate([
    r$1()
], AdvancedCameraCardViewerCarousel.prototype, "_selected", void 0);
AdvancedCameraCardViewerCarousel = __decorate([
    t('advanced-camera-card-viewer-carousel')
], AdvancedCameraCardViewerCarousel);

let AdvancedCameraCardViewerGrid = class AdvancedCameraCardViewerGrid extends s {
    _renderCarousel(filterCamera) {
        const selectedCameraID = this.viewManagerEpoch?.manager.getView()?.camera;
        // Get the camera's grid width factor from its dimensions config.
        const gridWidthFactor = filterCamera
            ? this.cameraManager?.getStore().getCameraConfig(filterCamera)?.dimensions?.grid
                ?.width_factor
            : undefined;
        return x `
      <advanced-camera-card-viewer-carousel
        grid-id=${o(filterCamera)}
        grid-width-factor=${o(gridWidthFactor)}
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .viewFilterCameraID=${filterCamera}
        .viewerConfig=${this.viewerConfig}
        .resolvedMediaCache=${this.resolvedMediaCache}
        .cameraManager=${this.cameraManager}
        .cardWideConfig=${this.cardWideConfig}
        .showControls=${!filterCamera || selectedCameraID === filterCamera}
      >
      </advanced-camera-card-viewer-carousel>
    `;
    }
    willUpdate(changedProps) {
        if (changedProps.has('viewManagerEpoch') && this._needsGrid()) {
            import('./media-grid-8d1540ba.js');
        }
    }
    _needsGrid() {
        const view = this.viewManagerEpoch?.manager.getView();
        const cameraIDs = view?.queryResults?.getCameraIDs();
        return (!!view?.isGrid() &&
            !!view?.supportsMultipleDisplayModes() &&
            (cameraIDs?.size ?? 0) > 1);
    }
    _gridSelectCamera(cameraID) {
        const view = this.viewManagerEpoch?.manager.getView();
        this.viewManagerEpoch?.manager.setViewByParameters({
            params: {
                camera: cameraID,
                queryResults: view?.queryResults
                    ?.clone()
                    .promoteCameraSelectionToMainSelection(cameraID),
            },
        });
    }
    render() {
        const view = this.viewManagerEpoch?.manager.getView();
        const cameraIDs = view?.queryResults?.getCameraIDs();
        if (!cameraIDs || !this._needsGrid()) {
            return this._renderCarousel();
        }
        return x `
      <advanced-camera-card-media-grid
        .selected=${view?.camera}
        .displayConfig=${this.viewerConfig?.display}
        @advanced-camera-card:media-grid:selected=${(ev) => this._gridSelectCamera(ev.detail.selected)}
      >
        ${[...cameraIDs].map((cameraID) => this._renderCarousel(cameraID))}
      </advanced-camera-card-media-grid>
    `;
    }
    static get styles() {
        return r(css$4);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerGrid.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerGrid.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerGrid.prototype, "viewerConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerGrid.prototype, "resolvedMediaCache", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerGrid.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewerGrid.prototype, "cameraManager", void 0);
AdvancedCameraCardViewerGrid = __decorate([
    t('advanced-camera-card-viewer-grid')
], AdvancedCameraCardViewerGrid);

let AdvancedCameraCardViewer = class AdvancedCameraCardViewer extends s {
    constructor() {
        super(...arguments);
        this.isEmpty = false;
    }
    willUpdate(changedProperties) {
        if (changedProperties.has('viewManagerEpoch')) {
            const view = this.viewManagerEpoch?.manager.getView();
            this.isEmpty = !view?.queryResults
                ?.getResults()
                ?.filter((result) => ViewItemClassifier.isMedia(result)).length;
        }
    }
    render() {
        if (!this.hass ||
            !this.viewManagerEpoch ||
            !this.viewerConfig ||
            !this.cameraManager ||
            !this.cardWideConfig) {
            return;
        }
        if (this.isEmpty) {
            // Directly render an error message (instead of dispatching it upwards)
            // to preserve the mini-timeline if the user pans into an area with no
            // media.
            const loadingMedia = !!this.viewManagerEpoch.manager.getView()?.context?.loading?.query;
            return renderMessage({
                type: 'info',
                message: loadingMedia
                    ? localize('error.awaiting_media')
                    : localize('common.no_media'),
                icon: 'mdi:multimedia',
                dotdotdot: loadingMedia,
            });
        }
        return x ` <advanced-camera-card-viewer-grid
      .hass=${this.hass}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .viewerConfig=${this.viewerConfig}
      .resolvedMediaCache=${this.resolvedMediaCache}
      .cameraManager=${this.cameraManager}
      .cardWideConfig=${this.cardWideConfig}
    >
    </advanced-camera-card-viewer-grid>`;
    }
    static get styles() {
        return r(css$3);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewer.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewer.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewer.prototype, "viewerConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewer.prototype, "resolvedMediaCache", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewer.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardViewer.prototype, "cardWideConfig", void 0);
__decorate([
    n({ attribute: 'empty', reflect: true, type: Boolean })
], AdvancedCameraCardViewer.prototype, "isEmpty", void 0);
AdvancedCameraCardViewer = __decorate([
    t('advanced-camera-card-viewer')
], AdvancedCameraCardViewer);

export { AdvancedCameraCardViewer };
//# sourceMappingURL=index-6a2dab01.js.map
