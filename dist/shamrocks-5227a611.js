import { _ as __decorate, y as n, t, u as s, C as x, v as r } from './card-edc26888.js';
import { c } from './repeat-5d9caba5.js';
import { B as BaseEffectComponent } from './base-f68fe971.js';

var css = ":host {\n  position: absolute;\n  left: var(--start-x);\n  top: var(--start-y);\n  font-size: var(--size, 1em);\n  transform-origin: center center;\n  translate: -50% -50%;\n  user-select: none;\n  pointer-events: none;\n  will-change: transform, opacity;\n  animation: shamrock-pulse var(--pulse-duration) ease-in-out infinite;\n  animation-delay: var(--pulse-delay);\n}\n\n@keyframes shamrock-pulse {\n  0% {\n    scale: 0;\n    rotate: -20deg;\n    opacity: 0;\n  }\n  20% {\n    opacity: var(--max-opacity, 1);\n  }\n  50% {\n    scale: 1;\n    rotate: 10deg;\n  }\n  80% {\n    opacity: var(--max-opacity, 1);\n  }\n  100% {\n    scale: 0;\n    rotate: 25deg;\n    opacity: 0;\n  }\n}";

let AdvancedCameraCardShamrock = class AdvancedCameraCardShamrock extends s {
    constructor() {
        super(...arguments);
        this.char = '☘️';
        this.size = '1em';
        this.maxOpacity = 1;
        this.pulseDuration = '3s';
        this.pulseDelay = '0s';
        this.startX = '0%';
        this.startY = '0%';
        this._handleAnimationIteration = (ev) => {
            if (ev.animationName === 'shamrock-pulse') {
                this.startX = `${Math.random() * 100}%`;
                this.startY = `${Math.random() * 100}%`;
            }
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('animationiteration', this._handleAnimationIteration);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('animationiteration', this._handleAnimationIteration);
    }
    render() {
        return x `${this.char}`;
    }
    updated() {
        this.style.setProperty('--size', this.size);
        this.style.setProperty('--max-opacity', `${this.maxOpacity}`);
        this.style.setProperty('--pulse-duration', this.pulseDuration);
        this.style.setProperty('--pulse-delay', this.pulseDelay);
        this.style.setProperty('--start-x', this.startX);
        this.style.setProperty('--start-y', this.startY);
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ type: String })
], AdvancedCameraCardShamrock.prototype, "char", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardShamrock.prototype, "size", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardShamrock.prototype, "maxOpacity", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardShamrock.prototype, "pulseDuration", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardShamrock.prototype, "pulseDelay", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardShamrock.prototype, "startX", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardShamrock.prototype, "startY", void 0);
AdvancedCameraCardShamrock = __decorate([
    t('advanced-camera-card-shamrock')
], AdvancedCameraCardShamrock);

const SHAMROCK_COUNT = 10;
let AdvancedCameraCardEffectShamrocks = class AdvancedCameraCardEffectShamrocks extends BaseEffectComponent {
    constructor() {
        super();
        this._shamrocks = Array.from({ length: SHAMROCK_COUNT }, (_, i) => {
            const duration = Math.random() * 3 + 5;
            const delay = -Math.random() * duration * 0.9;
            return {
                id: i,
                size: `${Math.random() * 12 + 8}em`,
                maxOpacity: Math.random() * 0.3 + 0.5,
                pulseDuration: `${duration}s`,
                pulseDelay: `${delay}s`,
                startX: `${Math.random() * 80 + 10}%`,
                startY: `${Math.random() * 80 + 10}%`,
            };
        });
    }
    render() {
        return x `
      ${c(this._shamrocks, (shamrock) => shamrock.id, (shamrock) => x `
          <advanced-camera-card-shamrock
            .size=${shamrock.size}
            .maxOpacity=${shamrock.maxOpacity}
            .pulseDuration=${shamrock.pulseDuration}
            .pulseDelay=${shamrock.pulseDelay}
            .startX=${shamrock.startX}
            .startY=${shamrock.startY}
          ></advanced-camera-card-shamrock>
        `)}
    `;
    }
};
AdvancedCameraCardEffectShamrocks = __decorate([
    t('advanced-camera-card-effect-shamrocks')
], AdvancedCameraCardEffectShamrocks);

export { AdvancedCameraCardEffectShamrocks };
//# sourceMappingURL=shamrocks-5227a611.js.map
