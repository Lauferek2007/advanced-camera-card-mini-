import { _ as __decorate, y as n, t, u as s, C as x, v as r } from './card-edc26888.js';
import { c } from './repeat-5d9caba5.js';
import { B as BaseEffectComponent } from './base-f68fe971.js';

var css = ":host {\n  position: absolute;\n  left: var(--start-x);\n  color: white;\n  user-select: none;\n  pointer-events: none;\n  will-change: transform;\n  animation: fall var(--fall-duration) linear infinite;\n  animation-delay: var(--fall-delay);\n}\n\n@keyframes fall {\n  0% {\n    top: -2em;\n    transform: translateX(0);\n    opacity: var(--max-opacity, 1);\n  }\n  25% {\n    top: 25%;\n    transform: translateX(calc(var(--end-x) - var(--start-x) + 8px));\n  }\n  50% {\n    top: 50%;\n    transform: translateX(calc(var(--end-x) - var(--start-x) - 10px));\n  }\n  75% {\n    top: 75%;\n    transform: translateX(calc(var(--end-x) - var(--start-x) + 20px));\n  }\n  90% {\n    opacity: var(--max-opacity, 1);\n  }\n  100% {\n    top: 100%;\n    transform: translateX(calc(var(--end-x) - var(--start-x)));\n    opacity: 0;\n  }\n}";

let AdvancedCameraCardSnowflake = class AdvancedCameraCardSnowflake extends s {
    constructor() {
        super(...arguments);
        this.char = '❄';
        this.size = '1em';
        this.maxOpacity = 1;
        this.fallDuration = '10s';
        this.fallDelay = '0s';
        this.startX = '0%';
        this.endX = '0%';
    }
    render() {
        return x `${this.char}`;
    }
    updated() {
        this.style.setProperty('--max-opacity', `${this.maxOpacity}`);
        this.style.setProperty('--fall-duration', this.fallDuration);
        this.style.setProperty('--fall-delay', this.fallDelay);
        this.style.setProperty('--start-x', this.startX);
        this.style.setProperty('--end-x', this.endX);
        this.style.fontSize = this.size;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ type: String })
], AdvancedCameraCardSnowflake.prototype, "char", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardSnowflake.prototype, "size", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardSnowflake.prototype, "maxOpacity", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardSnowflake.prototype, "fallDuration", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardSnowflake.prototype, "fallDelay", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardSnowflake.prototype, "startX", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardSnowflake.prototype, "endX", void 0);
AdvancedCameraCardSnowflake = __decorate([
    t('advanced-camera-card-snowflake')
], AdvancedCameraCardSnowflake);

const SNOWFLAKE_CHARS = ['❄', '❅', '❆'];
const MAX_SNOWFLAKES = 50;
let AdvancedCameraCardEffectSnow = class AdvancedCameraCardEffectSnow extends BaseEffectComponent {
    constructor() {
        super();
        this._snowflakes = Array.from({ length: MAX_SNOWFLAKES }, (_, i) => {
            const duration = Math.random() * 10 + 10;
            const delay = -Math.random() * duration * 0.8;
            return {
                id: i,
                char: SNOWFLAKE_CHARS[Math.floor(Math.random() * SNOWFLAKE_CHARS.length)],
                size: `${Math.random() * 1.5 + 0.5}em`,
                maxOpacity: Math.random() * 0.5 + 0.5,
                fallDuration: `${duration}s`,
                fallDelay: `${delay}s`,
                startX: `${Math.random() * 100}%`,
                endX: `${Math.random() * 100}%`,
            };
        });
    }
    render() {
        return x `
      ${c(this._snowflakes, (snowflake) => snowflake.id, (snowflake) => x `
          <advanced-camera-card-snowflake
            .char=${snowflake.char}
            .size=${snowflake.size}
            .maxOpacity=${snowflake.maxOpacity}
            .fallDuration=${snowflake.fallDuration}
            .fallDelay=${snowflake.fallDelay}
            .startX=${snowflake.startX}
            .endX=${snowflake.endX}
          ></advanced-camera-card-snowflake>
        `)}
    `;
    }
};
AdvancedCameraCardEffectSnow = __decorate([
    t('advanced-camera-card-effect-snow')
], AdvancedCameraCardEffectSnow);

export { AdvancedCameraCardEffectSnow };
//# sourceMappingURL=snow-2bc00a77.js.map
