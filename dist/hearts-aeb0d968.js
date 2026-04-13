import { _ as __decorate, y as n, t, u as s, C as x, v as r } from './card-edc26888.js';
import { c } from './repeat-5d9caba5.js';
import { B as BaseEffectComponent } from './base-f68fe971.js';

var css = ":host {\n  position: absolute;\n  left: var(--start-x);\n  top: var(--start-y);\n  font-size: var(--size, 1em);\n  color: hsl(var(--hue, 340), var(--saturation, 80%), var(--lightness, 55%));\n  user-select: none;\n  pointer-events: none;\n  will-change: transform;\n  animation: pulse var(--pulse-duration) ease-in-out infinite;\n  animation-delay: var(--pulse-delay);\n}\n\n@keyframes pulse {\n  0% {\n    transform: scale(0);\n    opacity: 0;\n  }\n  15% {\n    opacity: var(--max-opacity, 1);\n  }\n  50% {\n    transform: scale(1.3);\n  }\n  85% {\n    opacity: var(--max-opacity, 1);\n  }\n  100% {\n    transform: scale(0);\n    opacity: 0;\n  }\n}";

let AdvancedCameraCardHeart = class AdvancedCameraCardHeart extends s {
    constructor() {
        super(...arguments);
        this.char = '❤️';
        this.size = '1em';
        this.hue = 340;
        this.saturation = 80;
        this.lightness = 55;
        this.maxOpacity = 1;
        this.pulseDuration = '3s';
        this.pulseDelay = '0s';
        this.startX = '0%';
        this.startY = '0%';
        this._handleAnimationIteration = (ev) => {
            if (ev.animationName === 'pulse') {
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
        this.style.setProperty('--hue', `${this.hue}`);
        this.style.setProperty('--saturation', `${this.saturation}`);
        this.style.setProperty('--lightness', `${this.lightness}`);
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
], AdvancedCameraCardHeart.prototype, "char", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardHeart.prototype, "size", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardHeart.prototype, "hue", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardHeart.prototype, "saturation", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardHeart.prototype, "lightness", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardHeart.prototype, "maxOpacity", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardHeart.prototype, "pulseDuration", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardHeart.prototype, "pulseDelay", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardHeart.prototype, "startX", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardHeart.prototype, "startY", void 0);
AdvancedCameraCardHeart = __decorate([
    t('advanced-camera-card-heart')
], AdvancedCameraCardHeart);

const HEART_CHARS = ['❤️', '💖', '💕', '💗', '💓'];
const HEART_MAX_COUNT = 50;
let AdvancedCameraCardEffectHearts = class AdvancedCameraCardEffectHearts extends BaseEffectComponent {
    constructor() {
        super();
        this._hearts = Array.from({ length: HEART_MAX_COUNT }, (_, i) => {
            const duration = Math.random() * 4 + 4;
            const delay = -Math.random() * duration * 0.8;
            return {
                id: i,
                char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
                size: `${Math.random() * 1.5 + 0.5}em`,
                hue: Math.random() * 40 + 320,
                saturation: Math.random() * 40 + 60,
                lightness: Math.random() * 20 + 45,
                maxOpacity: Math.random() * 0.5 + 0.2,
                pulseDuration: `${duration}s`,
                pulseDelay: `${delay}s`,
                startX: `${Math.random() * 100}%`,
                startY: `${Math.random() * 100}%`,
            };
        });
    }
    render() {
        return x `
      ${c(this._hearts, (heart) => heart.id, (heart) => x `
          <advanced-camera-card-heart
            .char=${heart.char}
            .size=${heart.size}
            .hue=${heart.hue}
            .saturation=${heart.saturation}
            .lightness=${heart.lightness}
            .maxOpacity=${heart.maxOpacity}
            .pulseDuration=${heart.pulseDuration}
            .pulseDelay=${heart.pulseDelay}
            .startX=${heart.startX}
            .startY=${heart.startY}
          ></advanced-camera-card-heart>
        `)}
    `;
    }
};
AdvancedCameraCardEffectHearts = __decorate([
    t('advanced-camera-card-effect-hearts')
], AdvancedCameraCardEffectHearts);

export { AdvancedCameraCardEffectHearts };
//# sourceMappingURL=hearts-aeb0d968.js.map
