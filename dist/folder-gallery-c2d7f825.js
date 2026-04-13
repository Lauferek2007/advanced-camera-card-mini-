import { d$ as THUMBNAIL_WIDTH_DEFAULT, M as stopEventFromActivatingCardWideActions, V as ViewItemClassifier, Q as QueryClassifier, _ as __decorate, y as n, t, u as s, C as x, J as e, a4 as renderMessage, l as localize, v as r } from './card-edc26888.js';
import { g as getUpFolderMediaItem, u as upFolderClickHandler } from './card-24c0ec1d.js';
import './gallery-core-d1db19fc.js';
import './until-cbe9e5ec.js';
import './endOfDay-10c9656f.js';
import './date-picker-577d6f71.js';

// The minimum width of a (folder) thumbnail with details enabled. This is
// shorter than for regular camera media as this will consist of just a name.
const FOLDER_GALLERY_THUMBNAIL_DETAILS_WIDTH_MIN = 200;
class FolderGalleryController {
    constructor(host) {
        this._host = host;
    }
    setThumbnailSize(size) {
        this._host.style.setProperty('--advanced-camera-card-thumbnail-size', `${size ?? THUMBNAIL_WIDTH_DEFAULT}px`);
    }
    getColumnWidth(thumbnailConfig) {
        return !thumbnailConfig
            ? THUMBNAIL_WIDTH_DEFAULT
            : thumbnailConfig.show_details
                ? FOLDER_GALLERY_THUMBNAIL_DETAILS_WIDTH_MIN
                : thumbnailConfig.size;
    }
    getColumnCountRoundMethod(thumbnailConfig) {
        return thumbnailConfig?.show_details ? 'floor' : 'ceil';
    }
    itemClickHandler(viewManager, item, ev, foldersManager) {
        stopEventFromActivatingCardWideActions(ev);
        const view = viewManager.getView();
        if (!view) {
            return;
        }
        if (ViewItemClassifier.isMedia(item)) {
            viewManager.setViewByParameters({
                params: {
                    view: 'media',
                    queryResults: view.queryResults
                        ?.clone()
                        .selectResultIfFound((result) => result === item),
                },
            });
        }
        else if (ViewItemClassifier.isFolder(item) &&
            QueryClassifier.isFolderQuery(view.query)) {
            const rawQuery = view.query.getQuery();
            if (!rawQuery || !foldersManager) {
                return;
            }
            const newQuery = foldersManager.generateChildFolderQuery(rawQuery, item);
            if (!newQuery) {
                return;
            }
            viewManager.setViewByParametersWithExistingQuery({
                params: {
                    query: view.query.clone().setQuery(newQuery),
                },
            });
        }
    }
}

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\nadvanced-camera-card-surround-basic {\n  max-height: 110dvh;\n}\n\nadvanced-camera-card-thumbnail {\n  height: 100%;\n  min-height: var(--advanced-camera-card-thumbnail-size);\n  background-color: var(--secondary-background-color);\n}\n\nadvanced-camera-card-thumbnail:not([details]) {\n  width: 100%;\n}\n\nadvanced-camera-card-thumbnail.selected {\n  border: 4px solid var(--accent-color);\n  border-radius: calc(var(--advanced-camera-card-border-radius-final) + 4px);\n}";

let AdvancedCameraCardFolderGallery = class AdvancedCameraCardFolderGallery extends s {
    constructor() {
        super(...arguments);
        this._controller = new FolderGalleryController(this);
    }
    willUpdate(changedProps) {
        if (changedProps.has('galleryConfig')) {
            this._controller.setThumbnailSize(this.galleryConfig?.controls.thumbnails.size);
        }
    }
    _renderThumbnail(item, selected, clickCallback) {
        return x `<advanced-camera-card-thumbnail
      class=${e({
            selected,
        })}
      .hass=${this.hass}
      .item=${item}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .viewItemManager=${this.viewItemManager}
      ?selected=${selected}
      ?details=${!!this.galleryConfig?.controls.thumbnails.show_details}
      ?show_favorite_control=${!!this.galleryConfig?.controls.thumbnails
            .show_favorite_control}
      ?show_timeline_control=${!!this.galleryConfig?.controls.thumbnails
            .show_timeline_control}
      ?show_download_control=${!!this.galleryConfig?.controls.thumbnails
            .show_download_control}
      @click=${(ev) => clickCallback(item, ev)}
    >
    </advanced-camera-card-thumbnail>`;
    }
    _renderThumbnails() {
        const selected = this.viewManagerEpoch?.manager
            .getView()
            ?.queryResults?.getSelectedResult();
        return x `
      ${this.viewManagerEpoch?.manager
            .getView()
            ?.queryResults?.getResults()
            ?.map((item) => this._renderThumbnail(item, item === selected, (item, ev) => {
            const manager = this.viewManagerEpoch?.manager;
            if (manager) {
                this._controller.itemClickHandler(manager, item, ev, this.foldersManager);
            }
        }))}
    `;
    }
    render() {
        const folderIsLoading = !!this.viewManagerEpoch?.manager.getView()?.context?.loading?.query;
        const upThumbnail = getUpFolderMediaItem(this.viewManagerEpoch?.manager.getView());
        return x `
      <advanced-camera-card-surround-basic>
        ${!this.viewManagerEpoch?.manager.getView()?.queryResults?.hasResults() &&
            (folderIsLoading || !upThumbnail)
            ? renderMessage({
                type: 'info',
                message: folderIsLoading
                    ? localize('error.awaiting_folder')
                    : localize('common.no_folder'),
                icon: 'mdi:folder-play',
                dotdotdot: folderIsLoading,
            })
            : x `<advanced-camera-card-gallery-core
              .hass=${this.hass}
              .columnWidth=${this._controller.getColumnWidth(this.galleryConfig?.controls.thumbnails)}
              .columnCountRoundMethod=${this._controller.getColumnCountRoundMethod(this.galleryConfig?.controls.thumbnails)}
            >
              ${upThumbnail
                ? this._renderThumbnail(upThumbnail, false, (item, ev) => upFolderClickHandler(item, ev, this.viewManagerEpoch))
                : ''}
              ${this._renderThumbnails()}
            </advanced-camera-card-gallery-core>`}
      </advanced-camera-card-surround-basic>
    `;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardFolderGallery.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardFolderGallery.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardFolderGallery.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardFolderGallery.prototype, "galleryConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardFolderGallery.prototype, "foldersManager", void 0);
AdvancedCameraCardFolderGallery = __decorate([
    t('advanced-camera-card-folder-gallery')
], AdvancedCameraCardFolderGallery);

export { AdvancedCameraCardFolderGallery };
//# sourceMappingURL=folder-gallery-c2d7f825.js.map
