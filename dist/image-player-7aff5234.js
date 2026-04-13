import { _ as __decorate, t, a4 as renderMessage, B as errorToConsole, C as x, e4 as dispatchMediaVolumeChangeEvent, e5 as dispatchMediaPlayEvent, e6 as dispatchMediaPauseEvent, e3 as dispatchMediaLoadedEvent, v as r, fo as i, fs as screenshotImage, y as n, u as s, Y as e$2, a0 as n$1, a8 as o } from './card-edc26888.js';
import { d as dispatchLiveErrorEvent } from './dispatch-live-error-79e883a5.js';
import { V as VideoMediaPlayerController, h as hideMediaControlsTemporarily, M as MEDIA_LOAD_CONTROLS_HIDE_SECONDS, m as mayHaveAudio } from './audio-53bf6f1a.js';

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$1=(e,t,c)=>(c.configurable=!0,c.enumerable=!0,Reflect.decorate&&"object"!=typeof t&&Object.defineProperty(e,t,c),c);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e(e,r){return (n,s,i)=>{const o=t=>t.renderRoot?.querySelector(e)??null;if(r){const{get:e,set:r}="object"==typeof s?n:i??(()=>{const t=Symbol();return {get(){return this[t]},set(e){this[t]=e;}}})();return e$1(n,s,{get(){let t=e.call(this);return void 0===t&&(t=o(this),(null!==t||this.hasUpdated)&&r.call(this,t)),t}})}return e$1(n,s,{get(){return o(this)}})}}

var css$1 = "img,\nvideo {\n  object-fit: var(--advanced-camera-card-media-layout-fit, contain);\n  object-position: var(--advanced-camera-card-media-layout-position-x, 50%) var(--advanced-camera-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--advanced-camera-card-media-layout-view-box-top, 0%) var(--advanced-camera-card-media-layout-view-box-right, 0%) var(--advanced-camera-card-media-layout-view-box-bottom, 0%) var(--advanced-camera-card-media-layout-view-box-left, 0%));\n}";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
customElements.whenDefined('ha-hls-player').then(() => {
    const HaHlsPlayer = customElements.get('ha-hls-player');
    let AdvancedCameraCardHaHlsPlayer = 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    class AdvancedCameraCardHaHlsPlayer extends HaHlsPlayer {
        constructor() {
            super(...arguments);
            this._mediaPlayerController = new VideoMediaPlayerController(this, () => this._video, () => this.controls);
        }
        async getMediaPlayerController() {
            return this._mediaPlayerController;
        }
        // =====================================================================================
        // Minor modifications from:
        // - https://github.com/home-assistant/frontend/blob/dev/src/components/ha-hls-player.ts
        // =====================================================================================
        render() {
            if (this._error) {
                if (this._errorIsFatal) {
                    dispatchLiveErrorEvent(this);
                    return renderMessage({
                        type: 'error',
                        message: this._error,
                        context: {
                            entity_id: this.entityid,
                        },
                    });
                }
                else {
                    errorToConsole(this._error, console.error);
                }
            }
            return x `
        <video
          id="video"
          .poster=${this.posterUrl}
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          @loadedmetadata=${() => {
                if (this.controls) {
                    hideMediaControlsTemporarily(this._video, MEDIA_LOAD_CONTROLS_HIDE_SECONDS);
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
                    hasAudio: mayHaveAudio(this._video),
                },
                technology: ['hls'],
            });
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
    __decorate([
        e('#video')
    ], AdvancedCameraCardHaHlsPlayer.prototype, "_video", void 0);
    AdvancedCameraCardHaHlsPlayer = __decorate([
        t('advanced-camera-card-ha-hls-player')
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ], AdvancedCameraCardHaHlsPlayer);
});

class ImageMediaPlayerController {
    constructor(host, getImageCallback) {
        this._host = host;
        this._getImageCallback = getImageCallback;
    }
    async play() {
        // Not implemented.
    }
    async pause() {
        // Not implemented.
    }
    async mute() {
        // Not implemented.
    }
    async unmute() {
        // Not implemented.
    }
    isMuted() {
        return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async seek(_seconds) {
        // Not implemented.
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async setControls(_controls) {
        // Not implemented.
    }
    isPaused() {
        // The image could be an MJPEG, so it is always reported unpaused.
        return false;
    }
    async getScreenshotURL() {
        await this._host.updateComplete;
        const image = this._getImageCallback();
        // It might an MJPEG so still need to screenshot it.
        return image ? screenshotImage(image) : null;
    }
    getFullscreenElement() {
        return this._getImageCallback() ?? null;
    }
}

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\nimg {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: var(--advanced-camera-card-media-layout-fit, contain);\n  object-position: var(--advanced-camera-card-media-layout-position-x, 50%) var(--advanced-camera-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--advanced-camera-card-media-layout-view-box-top, 0%) var(--advanced-camera-card-media-layout-view-box-right, 0%) var(--advanced-camera-card-media-layout-view-box-bottom, 0%) var(--advanced-camera-card-media-layout-view-box-left, 0%));\n}";

/**
 * A simple media player to wrap a single static image.
 */
let AdvancedCameraCardImagePlayer = class AdvancedCameraCardImagePlayer extends s {
    constructor() {
        super(...arguments);
        this._refImage = e$2();
        this._mediaPlayerController = new ImageMediaPlayerController(this, () => this._refImage.value ?? null);
    }
    async getMediaPlayerController() {
        return this._mediaPlayerController;
    }
    render() {
        return x `<img
      ${n$1(this._refImage)}
      src="${o(this.url)}"
      @load=${(ev) => {
            dispatchMediaLoadedEvent(this, ev, {
                ...(this._mediaPlayerController && {
                    mediaPlayerController: this._mediaPlayerController,
                }),
                technology: [this.technology ?? 'jpg'],
            });
        }}
    />`;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n()
], AdvancedCameraCardImagePlayer.prototype, "url", void 0);
__decorate([
    n()
], AdvancedCameraCardImagePlayer.prototype, "technology", void 0);
AdvancedCameraCardImagePlayer = __decorate([
    t('advanced-camera-card-image-player')
], AdvancedCameraCardImagePlayer);

export { css$1 as c, e };
//# sourceMappingURL=image-player-7aff5234.js.map
