import { _ as __decorate, y as n, u as s, eC as forceReflow, v as r } from './card-edc26888.js';

var css = ":host {\n  position: absolute;\n  inset: 0;\n  opacity: 1;\n  transition: opacity 1.5s ease-in;\n}";

class BaseEffectComponent extends s {
    constructor() {
        super(...arguments);
        this.fadeIn = true;
    }
    firstUpdated() {
        if (this.fadeIn) {
            this._startFadeIn();
        }
    }
    updated(changedProps) {
        // Skip if this is the initial property setting (handled by firstUpdated).
        if (changedProps.get('fadeIn') !== undefined) {
            if (!this.fadeIn) {
                this._setOpacity(1);
            }
            else {
                this._startFadeIn();
            }
        }
    }
    startFadeOut() {
        return new Promise((resolve) => {
            const handler = (ev) => {
                if (ev.propertyName === 'opacity') {
                    this.removeEventListener('transitionend', handler);
                    resolve();
                }
            };
            this.addEventListener('transitionend', handler);
            this._setOpacity(0);
        });
    }
    _startFadeIn() {
        this._setOpacity(0);
        forceReflow(this);
        this._setOpacity(1);
    }
    _setOpacity(opacity) {
        this.style.opacity = `${opacity}`;
    }
    static get styles() {
        return r(css);
    }
}
__decorate([
    n({ type: Boolean })
], BaseEffectComponent.prototype, "fadeIn", void 0);

export { BaseEffectComponent as B };
//# sourceMappingURL=base-f68fe971.js.map
