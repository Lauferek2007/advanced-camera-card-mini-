import { _ as __decorate, y as n, t, u as s, C as x, v as r, E as Timer, x as r$1 } from './card-edc26888.js';
import { c } from './repeat-5d9caba5.js';
import { B as BaseEffectComponent } from './base-f68fe971.js';

var css$1 = ":host {\n  position: absolute;\n  left: var(--pos-x, 50%);\n  top: var(--pos-y, 50%);\n  user-select: none;\n  pointer-events: none;\n  opacity: 0;\n  animation: burst-appear 0.01s linear forwards;\n  animation-delay: var(--delay, 0s);\n}\n\n@keyframes burst-appear {\n  to {\n    opacity: 1;\n  }\n}";

var css = ":host {\n  position: absolute;\n  left: 0;\n  top: 0;\n  user-select: none;\n  pointer-events: none;\n  will-change: transform, opacity;\n  animation: explode var(--duration) ease-out forwards;\n  animation-delay: var(--delay);\n  opacity: 0;\n}\n\n.spark {\n  font-size: var(--size, 4px);\n  color: var(--color, #ffcc00);\n  text-shadow: 0 0 4px #fff, 0 0 8px var(--color), 0 0 16px var(--color), 0 0 32px var(--color), 0 0 48px var(--color);\n  filter: brightness(1.3);\n}\n\n@keyframes explode {\n  0% {\n    transform: translate(0, 0) scale(1);\n    opacity: 1;\n  }\n  55% {\n    opacity: 1;\n  }\n  100% {\n    transform: translate(var(--end-x), var(--end-y)) scale(0.3);\n    opacity: 0;\n  }\n}";

let AdvancedCameraCardFireworkParticle = class AdvancedCameraCardFireworkParticle extends s {
    constructor() {
        super(...arguments);
        this.angle = 0;
        this.distance = 100;
        this.color = '#ffcc00';
        this.size = '4px';
        this.duration = '1.5s';
        this.delay = '0s';
        this.gravity = 0;
    }
    render() {
        return x `<span class="spark">✦</span>`;
    }
    updated() {
        const radians = (this.angle * Math.PI) / 180;
        const endX = Math.cos(radians) * this.distance;
        const endY = Math.sin(radians) * this.distance + this.gravity;
        this.style.setProperty('--end-x', `${endX}px`);
        this.style.setProperty('--end-y', `${endY}px`);
        this.style.setProperty('--color', this.color);
        this.style.setProperty('--size', this.size);
        this.style.setProperty('--duration', this.duration);
        this.style.setProperty('--delay', this.delay);
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ type: Number })
], AdvancedCameraCardFireworkParticle.prototype, "angle", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardFireworkParticle.prototype, "distance", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkParticle.prototype, "color", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkParticle.prototype, "size", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkParticle.prototype, "duration", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkParticle.prototype, "delay", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardFireworkParticle.prototype, "gravity", void 0);
AdvancedCameraCardFireworkParticle = __decorate([
    t('advanced-camera-card-firework-particle')
], AdvancedCameraCardFireworkParticle);

const BASE_PARTICLE_COUNT = 36;
const FIREWORK_COLORS = [
    '#ff2222', // Bright Red
    '#ffdd00', // Bright Gold
    '#22ff22', // Bright Green
    '#22aaff', // Bright Blue
    '#ff22ff', // Bright Magenta
    '#ffffff', // White
    '#ffaa00', // Bright Orange
    '#22ffff', // Bright Cyan
    '#ff66aa', // Pink
    '#aaaaff', // Lavender
];
let AdvancedCameraCardFireworkBurst = class AdvancedCameraCardFireworkBurst extends s {
    constructor() {
        super(...arguments);
        this.posX = '50%';
        this.posY = '50%';
        this.delay = '0s';
        this.scale = 1.0;
        this.burstType = 'standard';
        this._particles = [];
        this._color = '';
        this._initialized = false;
    }
    _initializeParticles() {
        if (this._initialized) {
            return;
        }
        this._initialized = true;
        this._color = FIREWORK_COLORS[Math.floor(Math.random() * FIREWORK_COLORS.length)];
        switch (this.burstType) {
            case 'ring':
                this._initializeRingParticles();
                break;
            case 'palm':
                this._initializePalmParticles();
                break;
            default:
                this._initializeStandardParticles();
        }
    }
    _initializeStandardParticles() {
        const particleCount = Math.round(BASE_PARTICLE_COUNT * this.scale);
        this._particles = Array.from({ length: particleCount }, (_, i) => {
            const baseAngle = (360 / particleCount) * i;
            const angleVariation = (Math.random() - 0.5) * 20;
            return {
                id: i,
                angle: baseAngle + angleVariation,
                distance: (Math.random() * 80 + 100) * this.scale,
                color: this._color,
                size: `${(Math.random() * 12 + 18) * this.scale}px`,
                duration: `${Math.random() * 0.5 + 1.8}s`,
                delay: `${Math.random() * 0.08}s`,
                gravity: 0,
            };
        });
    }
    _initializeRingParticles() {
        const particleCount = Math.round(BASE_PARTICLE_COUNT * this.scale * 1.5);
        const ringDistance = (120 + Math.random() * 40) * this.scale;
        this._particles = Array.from({ length: particleCount }, (_, i) => {
            const baseAngle = (360 / particleCount) * i;
            return {
                id: i,
                angle: baseAngle,
                distance: ringDistance + (Math.random() - 0.5) * 10,
                color: this._color,
                size: `${(Math.random() * 8 + 14) * this.scale}px`,
                duration: `${Math.random() * 0.3 + 1.5}s`,
                delay: `${Math.random() * 0.02}s`,
                gravity: 0,
            };
        });
    }
    _initializePalmParticles() {
        const particleCount = Math.round(18 * this.scale);
        this._particles = Array.from({ length: particleCount }, (_, i) => {
            const baseAngle = (360 / particleCount) * i;
            const angleVariation = (Math.random() - 0.5) * 15;
            return {
                id: i,
                angle: baseAngle + angleVariation,
                distance: (Math.random() * 60 + 140) * this.scale,
                color: this._color,
                size: `${(Math.random() * 10 + 20) * this.scale}px`,
                duration: `${Math.random() * 0.8 + 2.2}s`,
                delay: `${Math.random() * 0.05}s`,
                gravity: 80 + Math.random() * 60,
            };
        });
    }
    render() {
        this._initializeParticles();
        return x `
      ${c(this._particles, (p) => p.id, (p) => x `
          <advanced-camera-card-firework-particle
            .angle=${p.angle}
            .distance=${p.distance}
            .color=${p.color}
            .size=${p.size}
            .duration=${p.duration}
            .delay=${p.delay}
            .gravity=${p.gravity}
          ></advanced-camera-card-firework-particle>
        `)}
    `;
    }
    updated() {
        this.style.setProperty('--pos-x', this.posX);
        this.style.setProperty('--pos-y', this.posY);
        this.style.setProperty('--delay', this.delay);
    }
    static get styles() {
        return r(css$1);
    }
};
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkBurst.prototype, "posX", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkBurst.prototype, "posY", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkBurst.prototype, "delay", void 0);
__decorate([
    n({ type: Number })
], AdvancedCameraCardFireworkBurst.prototype, "scale", void 0);
__decorate([
    n({ type: String })
], AdvancedCameraCardFireworkBurst.prototype, "burstType", void 0);
AdvancedCameraCardFireworkBurst = __decorate([
    t('advanced-camera-card-firework-burst')
], AdvancedCameraCardFireworkBurst);

const INITIAL_BURST_COUNT = 3;
const MIN_BURST_COUNT = 2;
const MAX_BURST_COUNT = 5;
const BURST_CYCLE_SECONDS = 2.0;
const MAX_BURST_DELAY_SECONDS = 1.2;
let AdvancedCameraCardEffectFireworks = class AdvancedCameraCardEffectFireworks extends BaseEffectComponent {
    constructor() {
        super(...arguments);
        this._bursts = [];
        this._burstIdCounter = 0;
        this._timer = new Timer();
    }
    connectedCallback() {
        super.connectedCallback();
        this._startFireworks();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._stopFireworks();
    }
    _startFireworks() {
        this._createBursts(INITIAL_BURST_COUNT);
        this._timer.startRepeated(BURST_CYCLE_SECONDS, () => {
            const count = Math.floor(Math.random() * (MAX_BURST_COUNT - MIN_BURST_COUNT + 1)) +
                MIN_BURST_COUNT;
            this._createBursts(count);
        });
    }
    _stopFireworks() {
        this._timer.stop();
    }
    _createBursts(count) {
        const newBursts = [];
        for (let i = 0; i < count; i++) {
            newBursts.push(this._createBurstConfig());
        }
        this._bursts = newBursts;
    }
    _createBurstConfig() {
        // 20% chance of a big burst (scale 1.5-2.0), otherwise normal (scale 0.8-1.2)
        const isBig = Math.random() < 0.2;
        const scale = isBig ? Math.random() * 0.5 + 1.5 : Math.random() * 0.4 + 0.8;
        // Burst type distribution: 60% standard, 25% ring, 15% palm
        const typeRoll = Math.random();
        let burstType;
        if (typeRoll < 0.6) {
            burstType = 'standard';
        }
        else if (typeRoll < 0.85) {
            burstType = 'ring';
        }
        else {
            burstType = 'palm';
        }
        return {
            id: this._burstIdCounter++,
            posX: `${Math.random() * 80 + 10}%`,
            posY: `${Math.random() * 60 + 20}%`,
            delay: `${Math.random() * MAX_BURST_DELAY_SECONDS}s`,
            scale,
            burstType,
        };
    }
    render() {
        return x `
      ${c(this._bursts, (burst) => burst.id, (burst) => x `
          <advanced-camera-card-firework-burst
            .posX=${burst.posX}
            .posY=${burst.posY}
            .delay=${burst.delay}
            .scale=${burst.scale}
            .burstType=${burst.burstType}
          ></advanced-camera-card-firework-burst>
        `)}
    `;
    }
};
__decorate([
    r$1()
], AdvancedCameraCardEffectFireworks.prototype, "_bursts", void 0);
AdvancedCameraCardEffectFireworks = __decorate([
    t('advanced-camera-card-effect-fireworks')
], AdvancedCameraCardEffectFireworks);

export { AdvancedCameraCardEffectFireworks };
//# sourceMappingURL=fireworks-af20a27c.js.map
