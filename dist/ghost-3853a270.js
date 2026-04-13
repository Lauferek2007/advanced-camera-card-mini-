import { C as x, v as r, _ as __decorate, t } from './card-edc26888.js';
import { B as BaseEffectComponent } from './base-f68fe971.js';

var css = ":host {\n  position: absolute;\n  inset: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: opacity 1.5s ease-in;\n}\n\n.ghost {\n  font-size: 10em;\n  color: #ffffff;\n  user-select: none;\n  pointer-events: none;\n  opacity: 0.5;\n  filter: drop-shadow(0 0 20px #ffffff) drop-shadow(0 0 40px #e0e0e0) drop-shadow(0 0 60px #c0c0c0);\n  animation: ghost-float 3s ease-in-out infinite;\n}\n\n@keyframes ghost-float {\n  0%, 100% {\n    transform: translateY(0);\n    filter: drop-shadow(0 0 20px #ffffff) drop-shadow(0 0 40px #e0e0e0) drop-shadow(0 0 60px #c0c0c0);\n  }\n  50% {\n    transform: translateY(-10px);\n    filter: drop-shadow(0 0 30px #ffffff) drop-shadow(0 0 60px #e0e0e0) drop-shadow(0 0 90px #c0c0c0);\n  }\n}";

let AdvancedCameraCardEffectGhost = class AdvancedCameraCardEffectGhost extends BaseEffectComponent {
    render() {
        return x `<span class="ghost">👻</span>`;
    }
    static get styles() {
        return r(css);
    }
};
AdvancedCameraCardEffectGhost = __decorate([
    t('advanced-camera-card-effect-ghost')
], AdvancedCameraCardEffectGhost);

export { AdvancedCameraCardEffectGhost };
//# sourceMappingURL=ghost-3853a270.js.map
