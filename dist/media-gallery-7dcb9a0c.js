import { d$ as THUMBNAIL_WIDTH_DEFAULT, Q as QueryClassifier, B as errorToConsole, e0 as EventMediaQuery, e1 as RecordingMediaQuery, e2 as QueryResults, M as stopEventFromActivatingCardWideActions, _ as __decorate, y as n, t, u as s, C as x, J as e, a4 as renderMessage, l as localize, v as r } from './card-edc26888.js';
import './gallery-core-d1db19fc.js';
import './card-24c0ec1d.js';
import './endOfDay-10c9656f.js';
import './date-picker-577d6f71.js';
import './until-cbe9e5ec.js';

// The minimum width of a thumbnail with details enabled.
const MEDIA_GALLERY_THUMBNAIL_DETAILS_WIDTH_MIN = 300;
class MediaGalleryController {
    constructor(host) {
        this._media = null;
        this._host = host;
    }
    getMedia() {
        return this._media;
    }
    setMediaFromView(newView, oldView) {
        const newResults = newView?.queryResults?.getResults() ?? null;
        if (newResults === null) {
            this._media = null;
            return;
        }
        if (!this._media || oldView?.queryResults?.getResults() !== newResults) {
            // Media gallery places the most recent media at the top (the query
            // results place the most recent media at the end for use in the viewer).
            // This is copied to a new array to avoid reversing the query results in
            // place.
            this._media = [...newResults].reverse();
        }
    }
    setThumbnailSize(size) {
        this._host.style.setProperty('--advanced-camera-card-thumbnail-size', `${size ?? THUMBNAIL_WIDTH_DEFAULT}px`);
    }
    getColumnWidth(thumbnailConfig) {
        return !thumbnailConfig
            ? THUMBNAIL_WIDTH_DEFAULT
            : thumbnailConfig.show_details
                ? MEDIA_GALLERY_THUMBNAIL_DETAILS_WIDTH_MIN
                : thumbnailConfig.size;
    }
    getColumnCountRoundMethod(thumbnailConfig) {
        return thumbnailConfig?.show_details ? 'floor' : 'ceil';
    }
    async extendMediaGallery(cameraManager, viewManagerEpoch, direction, useCache = true) {
        const view = viewManagerEpoch.manager.getView();
        if (!view) {
            return;
        }
        const query = view.query;
        const existingMedia = view.queryResults?.getResults();
        if (!existingMedia || !query || !QueryClassifier.isMediaQuery(query)) {
            return;
        }
        const rawQueries = query.getQuery() ?? null;
        if (!rawQueries) {
            return;
        }
        let extension;
        try {
            extension = await cameraManager.extendMediaQueries(rawQueries, existingMedia, direction, {
                useCache: useCache,
            });
        }
        catch (e) {
            errorToConsole(e);
            return;
        }
        if (extension) {
            const newMediaQueries = QueryClassifier.isEventQuery(query)
                ? new EventMediaQuery(extension.queries)
                : QueryClassifier.isRecordingQuery(query)
                    ? new RecordingMediaQuery(extension.queries)
                    : /* istanbul ignore next: this path cannot be reached -- @preserve */
                        null;
            /* istanbul ignore else: this path cannot be reached, as we explicitly
               check for media queries above -- @preserve */
            if (newMediaQueries) {
                viewManagerEpoch.manager.setViewByParameters({
                    baseView: view,
                    params: {
                        query: newMediaQueries,
                        queryResults: new QueryResults({
                            results: extension.results,
                        }).selectResultIfFound((media) => media === view.queryResults?.getSelectedResult()),
                    },
                });
            }
        }
    }
    itemClickHandler(viewManager, reversedIndex, ev) {
        stopEventFromActivatingCardWideActions(ev);
        const view = viewManager.getView();
        if (!view || !this._media?.length) {
            return;
        }
        viewManager.setViewByParameters({
            params: {
                view: 'media',
                queryResults: view.queryResults?.clone().selectIndex(
                // Media in the gallery is reversed vs the queryResults (see
                // note above).
                this._media.length - reversedIndex - 1),
            },
        });
    }
}

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\nadvanced-camera-card-surround-basic {\n  max-height: 110dvh;\n}\n\nadvanced-camera-card-thumbnail {\n  height: 100%;\n  min-height: var(--advanced-camera-card-thumbnail-size);\n  background-color: var(--secondary-background-color);\n}\n\nadvanced-camera-card-thumbnail:not([details]) {\n  width: 100%;\n}\n\nadvanced-camera-card-thumbnail.selected {\n  border: 4px solid var(--accent-color);\n  border-radius: calc(var(--advanced-camera-card-border-radius-final) + 4px);\n}";

const MEDIA_GALLERY_FILTER_MENU_ICONS = {
    closed: 'mdi:filter-cog-outline',
    open: 'mdi:filter-cog',
};
let AdvancedCameraCardMediaGallery = class AdvancedCameraCardMediaGallery extends s {
    constructor() {
        super(...arguments);
        this._controller = new MediaGalleryController(this);
    }
    willUpdate(changedProps) {
        if (changedProps.has('viewManagerEpoch')) {
            this._controller.setMediaFromView(this.viewManagerEpoch?.manager.getView(), this.viewManagerEpoch?.oldView);
        }
        if (changedProps.has('galleryConfig')) {
            this._controller.setThumbnailSize(this.galleryConfig?.controls.thumbnails.size);
        }
    }
    _renderThumbnails() {
        const selected = this.viewManagerEpoch?.manager
            .getView()
            ?.queryResults?.getSelectedResult();
        return x `
      ${this._controller.getMedia()?.map((media, index) => x `<advanced-camera-card-thumbnail
            class=${e({
            selected: media === selected,
        })}
            .hass=${this.hass}
            .cameraManager=${this.cameraManager}
            .viewItemManager=${this.viewItemManager}
            .item=${media}
            .viewManagerEpoch=${this.viewManagerEpoch}
            ?selected=${media === selected}
            ?details=${!!this.galleryConfig?.controls.thumbnails.show_details}
            ?show_favorite_control=${!!this.galleryConfig?.controls.thumbnails
            .show_favorite_control}
            ?show_timeline_control=${!!this.galleryConfig?.controls.thumbnails
            .show_timeline_control}
            ?show_download_control=${!!this.galleryConfig?.controls.thumbnails
            .show_download_control}
            @click=${(ev) => {
            const manager = this.viewManagerEpoch?.manager;
            if (manager) {
                this._controller.itemClickHandler(manager, index, ev);
            }
        }}
          >
          </advanced-camera-card-thumbnail>`)}
    `;
    }
    render() {
        const mediaIsLoading = !!this.viewManagerEpoch?.manager.getView()?.context?.loading?.query;
        return x `
      <advanced-camera-card-surround-basic
        .drawerIcons=${{
            ...(this.galleryConfig &&
                this.galleryConfig.controls.filter.mode !== 'none' && {
                [this.galleryConfig.controls.filter.mode]: MEDIA_GALLERY_FILTER_MENU_ICONS,
            }),
        }}
      >
        ${this.galleryConfig && this.galleryConfig.controls.filter.mode !== 'none'
            ? x ` <advanced-camera-card-media-filter
              .hass=${this.hass}
              .cameraManager=${this.cameraManager}
              .viewManagerEpoch=${this.viewManagerEpoch}
              .cardWideConfig=${this.cardWideConfig}
              slot=${this.galleryConfig.controls.filter.mode}
            >
            </advanced-camera-card-media-filter>`
            : ''}
        ${!this._controller.getMedia()?.length
            ? renderMessage({
                type: 'info',
                message: mediaIsLoading
                    ? localize('error.awaiting_media')
                    : localize('common.no_media'),
                icon: 'mdi:multimedia',
                dotdotdot: mediaIsLoading,
            })
            : x `<advanced-camera-card-gallery-core
              .hass=${this.hass}
              .columnWidth=${this._controller.getColumnWidth(this.galleryConfig?.controls.thumbnails)}
              .columnCountRoundMethod=${this._controller.getColumnCountRoundMethod(this.galleryConfig?.controls.thumbnails)}
              .cardWideConfig=${this.cardWideConfig}
              .extendUp=${true}
              .extendDown=${true}
              @advanced-camera-card:gallery:extend:up=${(ev) => this._extendGallery(ev, 'later', 
            // Avoid use of cache since the user is explicitly looking for
            // the freshest possible data.
            false)}
              @advanced-camera-card:gallery:extend:down=${(ev) => this._extendGallery(ev, 'earlier')}
            >
              ${this._renderThumbnails()}
            </advanced-camera-card-gallery-core>`}
      </advanced-camera-card-surround-basic>
    `;
    }
    async _extendGallery(ev, direction, useCache = true) {
        if (!this.cameraManager || !this.viewManagerEpoch) {
            return;
        }
        await this._controller.extendMediaGallery(this.cameraManager, this.viewManagerEpoch, direction, useCache);
        ev.detail.resolve();
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaGallery.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaGallery.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaGallery.prototype, "galleryConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaGallery.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaGallery.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaGallery.prototype, "cardWideConfig", void 0);
AdvancedCameraCardMediaGallery = __decorate([
    t('advanced-camera-card-media-gallery')
], AdvancedCameraCardMediaGallery);

export { AdvancedCameraCardMediaGallery };
//# sourceMappingURL=media-gallery-7dcb9a0c.js.map
