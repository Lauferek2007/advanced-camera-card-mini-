import { u as s, Y as e, C as x, a0 as n, v as r, _ as __decorate, y as n$1, t, a2 as css } from './card-edc26888.js';
import './image-updating-player-7f25031b.js';

let AdvancedCameraCardLiveImage = class AdvancedCameraCardLiveImage extends s {
    constructor() {
        super(...arguments);
        this._refImage = e();
    }
    async getMediaPlayerController() {
        await this.updateComplete;
        return (await this._refImage.value?.getMediaPlayerController()) ?? null;
    }
    render() {
        if (!this.hass || !this.cameraConfig) {
            return;
        }
        return x `
      <advanced-camera-card-image-updating-player
        ${n(this._refImage)}
        .hass=${this.hass}
        .imageConfig=${this.cameraConfig.image}
        .cameraConfig=${this.cameraConfig}
      >
      </advanced-camera-card-image-updating-player>
    `;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardLiveImage.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardLiveImage.prototype, "cameraConfig", void 0);
AdvancedCameraCardLiveImage = __decorate([
    t('advanced-camera-card-live-image')
], AdvancedCameraCardLiveImage);

export { AdvancedCameraCardLiveImage };
//# sourceMappingURL=image-ceae2fb3.js.map
