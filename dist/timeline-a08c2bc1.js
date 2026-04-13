import { _ as __decorate, y as n, t, u as s, Q as QueryClassifier, C as x, v as r, a2 as css } from './card-edc26888.js';
import './card-24c0ec1d.js';
import './timeline-core-41b424f5.js';
import './until-cbe9e5ec.js';
import './startOfHour-ac9bb25d.js';
import './endOfDay-10c9656f.js';
import './date-picker-577d6f71.js';

let AdvancedCameraCardTimeline = class AdvancedCameraCardTimeline extends s {
    _getKeys() {
        const query = this.viewManagerEpoch?.manager.getView()?.query;
        // If there's a query, try to extract camera IDs or folder info from it.
        if (QueryClassifier.isMediaQuery(query)) {
            const cameraIDs = query.getQueryCameraIDs();
            if (cameraIDs && cameraIDs.size) {
                return {
                    type: 'camera',
                    cameraIDs,
                };
            }
        }
        else if (QueryClassifier.isFolderQuery(query)) {
            const folderConfig = query.getQuery()?.folder;
            if (folderConfig) {
                return {
                    type: 'folder',
                    folder: folderConfig,
                };
            }
        }
        // Otherwise fall back to all cameras that support media queries.
        const cameraIDs = this.cameraManager?.getStore().getCameraIDsWithCapability({
            anyCapabilities: ['clips', 'snapshots', 'recordings'],
        });
        const folder = this.foldersManager?.getFolder() ?? null;
        return cameraIDs?.size
            ? {
                type: 'camera',
                cameraIDs,
            }
            : folder
                ? {
                    type: 'folder',
                    folder,
                }
                : undefined;
    }
    render() {
        if (!this.timelineConfig) {
            return x ``;
        }
        return x `
      <advanced-camera-card-timeline-core
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .timelineConfig=${this.timelineConfig}
        .thumbnailConfig=${this.timelineConfig.controls.thumbnails}
        .cameraManager=${this.cameraManager}
        .foldersManager=${this.foldersManager}
        .conditionStateManager=${this.conditionStateManager}
        .viewItemManager=${this.viewItemManager}
        .keys=${this._getKeys()}
        .cardWideConfig=${this.cardWideConfig}
        .itemClickAction=${this.timelineConfig.controls.thumbnails.mode === 'none'
            ? 'play'
            : 'select'}
      >
      </advanced-camera-card-timeline-core>
    `;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "timelineConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "foldersManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "conditionStateManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "viewItemManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardTimeline.prototype, "cardWideConfig", void 0);
AdvancedCameraCardTimeline = __decorate([
    t('advanced-camera-card-timeline')
], AdvancedCameraCardTimeline);

export { AdvancedCameraCardTimeline };
//# sourceMappingURL=timeline-a08c2bc1.js.map
