import { _ as __decorate, y as n, t, u as s, Y as e, C as x, dZ as handleZoomSettingsObservedEvent, a0 as n$1, v as r, eg as IMAGE_VIEW_ZOOM_TARGET_SENTINEL } from './card-edc26888.js';
import { i } from './media-dimensions-container-4933e8e0.js';
import { r as resolveImageMode } from './image-updating-player-7f25031b.js';
import './zoomer-2af85980.js';

var css = ":host {\n  background-color: var(--advanced-camera-card-background);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url(\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4yLjIgKGIwYTg0ODY1NDEsIDIwMjItMTItMDEpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJpcmlzLW91dGxpbmUuc3ZnIgogICBpZD0ic3ZnNCIKICAgdmVyc2lvbj0iMS4xIgogICB2aWV3Qm94PSIwIDAgMjQgMjQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGRlZnMKICAgICBpZD0iZGVmczgiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc2IgogICAgIHBhZ2Vjb2xvcj0iI2I5M2UzZSIKICAgICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgICBib3JkZXJvcGFjaXR5PSIwLjI1IgogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjYwNzg0MzE0IgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9ImZhbHNlIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIKICAgICBzaG93Z3JpZD0iZmFsc2UiCiAgICAgaW5rc2NhcGU6em9vbT0iMTkuMzc4NTc4IgogICAgIGlua3NjYXBlOmN4PSI4LjI4MjM0MTUiCiAgICAgaW5rc2NhcGU6Y3k9IjEyLjM1OTAwOCIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjM4NDAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTUyNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMTA4MCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMjI3IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ic3ZnNCIgLz4KICA8ZwogICAgIGlkPSJnMTExOSIKICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjAuMDU7ZmlsbDojZmZmZmZmIj4KICAgIDxjaXJjbGUKICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjAuNDk3ODI4MjU7c3Ryb2tlLXdpZHRoOjEuMzk3Mjk7b3BhY2l0eTowLjUiCiAgICAgICBpZD0icGF0aDE3MCIKICAgICAgIGN4PSIxMiIKICAgICAgIGN5PSIxMiIKICAgICAgIGlua3NjYXBlOmxhYmVsPSJCYWNrZ3JvdW5kIgogICAgICAgcj0iMTEuMjUiIC8+CiAgICA8cGF0aAogICAgICAgZD0iTSAxMy43MzAwMDEsMTUgOS44MzAwMDAzLDIxLjc2IEMgMTAuNTMsMjEuOTEgMTEuMjUsMjIgMTIsMjIgYyAyLjQwMDAwMSwwIDQuNiwtMC44NSA2LjMyLC0yLjI1IEwgMTQuNjYwMDAxLDEzLjQgTSAyLjQ2MDAwMDMsMTUgYyAwLjkyLDIuOTIgMy4xNSw1LjI2IDUuOTksNi4zNCBMIDEyLjEyLDE1IG0gLTMuNTc5OTk5NywtMyAtMy45LC02Ljc0OTk5OTYgYyAtMS42NCwxLjc0OTk5OSAtMi42NCw0LjEzOTk5OTMgLTIuNjQsNi43NDk5OTk2IDAsMC42OCAwLjA3LDEuMzUgMC4yLDIgaCA3LjQ5IE0gMjEuOCw5Ljk5OTk5OTcgSCAxNC4zMTAwMDEgTCAxNC42MDAwMDEsMTAuNSAxOS4zNiwxOC43NSBDIDIxLDE2Ljk3IDIyLDE0LjYgMjIsMTIgMjIsMTEuMzEgMjEuOTMsMTAuNjQgMjEuOCw5Ljk5OTk5OTcgbSAtMC4yNiwtMSBDIDIwLjYyLDYuMDcwMDAwNSAxOC4zOSwzLjc0MDAwMDIgMTUuNTUwMDAxLDIuNjYwMDAwMiBMIDExLjg4LDguOTk5OTk5NyBNIDkuNDAwMDAwMywxMC41IDE0LjE3MDAwMSwyLjI0MDAwMDIgYyAtMC43LC0wLjE1IC0xLjQyMDAwMSwtMC4yNCAtMi4xNzAwMDEsLTAuMjQgLTIuMzk5OTk5NywwIC00LjU5OTk5OTcsMC44NCAtNi4zMTk5OTk3LDIuMjUwMDAwMyBsIDMuNjYsNi4zNDk5OTk1IHoiCiAgICAgICBpZD0icGF0aDIiCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iSXJpcyIKICAgICAgIHN0eWxlPSJmaWxsLW9wYWNpdHk6MC41MDIyMTAwMjtmaWxsOiNmZmZmZmY7b3BhY2l0eTowLjc1IiAvPgogIDwvZz4KPC9zdmc+Cg==\");\n  background-size: 10%;\n  background-position: center;\n}\n\n:host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.zoom-wrapper {\n  display: block;\n  width: 100%;\n  height: 100%;\n}";

let AdvancedCameraCardImage = class AdvancedCameraCardImage extends s {
    constructor() {
        super(...arguments);
        this._refImage = e();
    }
    async getMediaPlayerController() {
        await this.updateComplete;
        return (await this._refImage.value?.getMediaPlayerController()) ?? null;
    }
    _renderContainer(template) {
        const zoomTarget = IMAGE_VIEW_ZOOM_TARGET_SENTINEL;
        const view = this.viewManagerEpoch?.manager.getView();
        const mode = resolveImageMode({
            imageConfig: this.imageConfig,
            cameraConfig: this.cameraConfig,
        });
        const intermediateTemplate = x ` <advanced-camera-card-media-dimensions-container
      .dimensionsConfig=${mode === 'camera' ? this.cameraConfig?.dimensions : undefined}
    >
      ${template}
    </advanced-camera-card-media-dimensions-container>`;
        return x ` ${this.imageConfig?.zoomable
            ? x `<advanced-camera-card-zoomer
          .defaultSettings=${i([this.imageConfig, this.cameraConfig?.dimensions?.layout], () => mode === 'camera' && this.cameraConfig?.dimensions?.layout
                ? {
                    pan: this.cameraConfig.dimensions.layout.pan,
                    zoom: this.cameraConfig.dimensions.layout.zoom,
                }
                : undefined)}
          .settings=${view?.context?.zoom?.[zoomTarget]?.requested}
          @advanced-camera-card:zoom:change=${(ev) => handleZoomSettingsObservedEvent(ev, this.viewManagerEpoch?.manager, zoomTarget)}
        >
          ${intermediateTemplate}
        </advanced-camera-card-zoomer>`
            : intermediateTemplate}`;
    }
    render() {
        if (!this.hass || !this.cameraConfig) {
            return;
        }
        return this._renderContainer(x `
      <advanced-camera-card-image-updating-player
        ${n$1(this._refImage)}
        .hass=${this.hass}
        .view=${this.viewManagerEpoch?.manager.getView()}
        .imageConfig=${this.imageConfig}
        .cameraConfig=${this.cameraConfig}
      >
      </advanced-camera-card-image-updating-player>
    `);
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardImage.prototype, "hass", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardImage.prototype, "viewManagerEpoch", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardImage.prototype, "cameraConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardImage.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardImage.prototype, "imageConfig", void 0);
AdvancedCameraCardImage = __decorate([
    t('advanced-camera-card-image')
], AdvancedCameraCardImage);

export { AdvancedCameraCardImage };
//# sourceMappingURL=image-18db5912.js.map
