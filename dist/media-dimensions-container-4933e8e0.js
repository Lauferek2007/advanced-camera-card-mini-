import { eh as e$1, ei as i$1, ej as w, ek as setOrRemoveStyleProperty, ef as debounce, el as aspectRatioToString, I as setOrRemoveAttribute, _ as __decorate, y as n, t, u as s, Y as e$2, C as x, a0 as n$1, v as r } from './card-edc26888.js';

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e={},i=e$1(class extends i$1{constructor(){super(...arguments),this.ot=e;}render(r,t){return t()}update(t,[s,e]){if(Array.isArray(s)){if(Array.isArray(this.ot)&&this.ot.length===s.length&&s.every(((r,t)=>r===this.ot[t])))return w}else if(this.ot===s)return w;return this.ot=Array.isArray(s)?Array.from(s):s,this.render(s,e)}});

/**
 * Update element style from a media configuration.
 * @param element The element to update the style for.
 * @param mediaLayoutConfig The media config object.
 */
const updateElementStyleFromMediaLayoutConfig = (element, mediaLayoutConfig) => {
    setOrRemoveStyleProperty(element, !!mediaLayoutConfig?.fit, '--advanced-camera-card-media-layout-fit', mediaLayoutConfig?.fit);
    for (const dimension of ['x', 'y']) {
        setOrRemoveStyleProperty(element, !!mediaLayoutConfig?.position?.[dimension], `--advanced-camera-card-media-layout-position-${dimension}`, `${mediaLayoutConfig?.position?.[dimension]}%`);
    }
    for (const dimension of ['top', 'bottom', 'left', 'right']) {
        setOrRemoveStyleProperty(element, !!mediaLayoutConfig?.view_box?.[dimension], `--advanced-camera-card-media-layout-view-box-${dimension}`, `${mediaLayoutConfig?.view_box?.[dimension]}%`);
    }
};

const ROTATED_ATTRIBUTE = 'rotated';
/**
 * Controller for managing media dimensions in a container. This accepts two
 * containers (inner and outer). The inner container is expected to contain the
 * media itself, the outer container is used to change the height that the inner
 * container is allowed to be. This is necessary since when the inner container
 * is rotated, the outer container will already have been sized by browser
 * ignoring the rotation -- so the outer container has its height manually set
 * based on the expected rotation height. The host itself (this element) needs
 * to not have a fixed height, in order for the ResizeObserver to work
 * correctly, necessitating the use of a special outer container.
 */
class MediaDimensionsContainerController {
    constructor(host) {
        this._dimensionsConfig = null;
        this._innerContainer = null;
        this._outerContainer = null;
        this.resize = debounce(this._resize.bind(this), 100, { trailing: true });
        this._resizeObserver = new ResizeObserver(this.resize);
        this._mediaDimensions = null;
        this._mediaLoadedHandler = (ev) => {
            // Only resize if the media dimensions have changed (otherwise the loading
            // image whilst waiting for the stream, will trigger aresize every second).
            if (this._mediaDimensions?.width === ev.detail.width &&
                this._mediaDimensions.height === ev.detail.height) {
                return;
            }
            this._mediaDimensions = {
                width: ev.detail.width,
                height: ev.detail.height,
            };
            this.resize();
        };
        // ==============
        // Resize helpers
        // ==============
        this._setMaxSize = (element) => this._setSize(element, {
            width: '100%',
            height: '100%',
        });
        this._setIntrinsicSize = (element) => this._setSize(element, {
            width: 'max-content',
            height: 'max-content',
        });
        this._setWidthBoundIntrinsicSize = (element) => this._setSize(element, {
            width: '100%',
            height: 'auto',
        });
        this._setHeightBoundIntrinsicSize = (element) => this._setSize(element, {
            width: 'auto',
            height: '100%',
        });
        this._setInvisible = (element) => {
            element.style.visibility = 'hidden';
        };
        this._setVisible = (element) => {
            element.style.visibility = '';
        };
        this._host = host;
        this._host.addController(this);
    }
    hostConnected() {
        this._resizeObserver.observe(this._host);
        this._addInnerContainerListeners();
    }
    hostDisconnected() {
        this._resizeObserver.disconnect();
        this._removeInnerContainerListeners();
    }
    _removeInnerContainerListeners() {
        if (!this._innerContainer) {
            return;
        }
        this._innerContainer.removeEventListener('slotchange', this.resize);
        this._innerContainer.removeEventListener('advanced-camera-card:media:loaded', this._mediaLoadedHandler);
    }
    _addInnerContainerListeners() {
        if (!this._host.isConnected || !this._innerContainer) {
            return;
        }
        this._innerContainer.addEventListener('slotchange', this.resize);
        this._innerContainer.addEventListener('advanced-camera-card:media:loaded', this._mediaLoadedHandler);
    }
    setConfig(dimensionsConfig) {
        if (dimensionsConfig === this._dimensionsConfig) {
            return;
        }
        this._dimensionsConfig = dimensionsConfig ?? null;
        this._setInnerContainerProperties();
    }
    setContainers(innerContainer, outerContainer) {
        if ((innerContainer ?? null) === this._innerContainer &&
            (outerContainer ?? null) === this._outerContainer) {
            return;
        }
        this._removeInnerContainerListeners();
        this._innerContainer = innerContainer ?? null;
        this._outerContainer = outerContainer ?? null;
        this._addInnerContainerListeners();
        this._setInnerContainerProperties();
        this._resize();
    }
    _hasFixedAspectRatio() {
        return this._dimensionsConfig?.aspect_ratio?.length === 2;
    }
    _requiresRotation() {
        return !!this._dimensionsConfig?.rotation;
    }
    _requiresContainerRotation() {
        // The actual container only needs to rotate if the rotation parameter is 90
        // or 270.
        return (this._dimensionsConfig?.rotation === 90 || this._dimensionsConfig?.rotation === 270);
    }
    _setInnerContainerProperties() {
        if (!this._innerContainer) {
            return;
        }
        setOrRemoveStyleProperty(this._innerContainer, this._requiresRotation(), '--advanced-camera-card-media-rotation', `${this._dimensionsConfig?.rotation}deg`);
        this._innerContainer.style.aspectRatio = aspectRatioToString({
            ratio: this._dimensionsConfig?.aspect_ratio,
        });
        updateElementStyleFromMediaLayoutConfig(this._innerContainer, this._dimensionsConfig?.layout);
    }
    _setSize(element, options) {
        const toCSS = (value) => typeof value === 'number' ? `${value}px` : value;
        if (options.width !== undefined) {
            element.style.width = toCSS(options.width);
        }
        element.style.height = toCSS(options.height);
    }
    _setRotation(element, rotate) {
        setOrRemoveAttribute(element, rotate, ROTATED_ATTRIBUTE);
    }
    _resize() {
        if (this._requiresRotation()) {
            this._resizeAndRotate();
        }
        else if (this._hasFixedAspectRatio()) {
            this._resizeWithFixedAspectRatio();
        }
        else {
            this._resizeDefault();
        }
    }
    _resizeDefault() {
        if (!this._innerContainer || !this._outerContainer) {
            return;
        }
        this._setMaxSize(this._innerContainer);
        this._setMaxSize(this._outerContainer);
        this._setRotation(this._host, false);
        this._setVisible(this._innerContainer);
    }
    _resizeWithFixedAspectRatio() {
        if (!this._innerContainer || !this._outerContainer) {
            return;
        }
        this._setInvisible(this._innerContainer);
        this._setWidthBoundIntrinsicSize(this._innerContainer);
        this._setMaxSize(this._outerContainer);
        this._setRotation(this._host, false);
        const hostSize = this._host.getBoundingClientRect();
        const innerContainerSize = this._innerContainer.getBoundingClientRect();
        if (this._resizeDefaultIfInvalidSizes([hostSize, innerContainerSize])) {
            return;
        }
        // If the container is larger than the host, the host was not able to expand
        // enough to cover the size (e.g. fullscreen, panel or height constrained in
        // configuration). In this case, just limit the container to the host height
        // at the same aspect ratio.
        if (innerContainerSize.height > hostSize.height) {
            this._setHeightBoundIntrinsicSize(this._innerContainer);
        }
        this._setVisible(this._innerContainer);
    }
    _hasValidSize(size) {
        return size.width > 0 && size.height > 0;
    }
    _resizeDefaultIfInvalidSizes(sizes) {
        if (sizes.some((size) => !this._hasValidSize(size))) {
            this._resizeDefault();
            return true;
        }
        return false;
    }
    _resizeAndRotate() {
        if (!this._innerContainer || !this._outerContainer) {
            return;
        }
        if (!this._requiresContainerRotation()) {
            this._resizeDefault();
            this._setRotation(this._host, true);
            return;
        }
        this._setInvisible(this._innerContainer);
        // Render the media entirely unhindered to get the native aspect ratio.
        this._setIntrinsicSize(this._innerContainer);
        this._setMaxSize(this._outerContainer);
        this._setRotation(this._host, false);
        let hostSize = this._host.getBoundingClientRect();
        let innerContainerSize = this._innerContainer.getBoundingClientRect();
        if (this._resizeDefaultIfInvalidSizes([hostSize, innerContainerSize])) {
            return;
        }
        const aspectRatio = innerContainerSize.width / innerContainerSize.height;
        this._setRotation(this._host, true);
        // Set the inner container to the correct rotated sizes (ignoring any
        // constraint of host size).
        this._setSize(this._innerContainer, {
            width: hostSize.width * aspectRatio,
            height: hostSize.width,
        });
        this._setSize(this._outerContainer, {
            height: hostSize.width * aspectRatio,
        });
        // Refresh the sizes post rotation & initial sizing.
        innerContainerSize = this._innerContainer.getBoundingClientRect();
        hostSize = this._host.getBoundingClientRect();
        if (this._resizeDefaultIfInvalidSizes([hostSize, innerContainerSize])) {
            return;
        }
        // As in `_resizeWithFixedAspectRatio` resize the media if the host was not
        // able to expand to cover the size.
        if (innerContainerSize.height > hostSize.height) {
            this._setSize(this._innerContainer, {
                width: hostSize.height,
                height: hostSize.height / aspectRatio,
            });
            this._setSize(this._outerContainer, {
                height: hostSize.height,
            });
        }
        this._setVisible(this._innerContainer);
    }
}

var css = ":host,\n.outer {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  justify-content: center;\n  align-items: center;\n}\n\n.inner {\n  display: block;\n  flex-shrink: 0;\n}\n\n:host([rotated]) .inner {\n  transform: rotate(var(--advanced-camera-card-media-rotation, 0deg));\n}";

let AdvancedCameraCardMediaDimensionsContainer = class AdvancedCameraCardMediaDimensionsContainer extends s {
    constructor() {
        super(...arguments);
        this._controller = new MediaDimensionsContainerController(this);
        this._refInnerContainer = e$2();
        this._refOuterContainer = e$2();
    }
    willUpdate(changedProps) {
        if (changedProps.has('dimensionsConfig')) {
            this._controller.setConfig(this.dimensionsConfig);
        }
    }
    render() {
        return x `
      <div class="outer" ${n$1(this._refOuterContainer)}>
        <div class="inner" ${n$1(this._refInnerContainer)}>
          <slot></slot>
        </div>
      </div>
    `;
    }
    static get styles() {
        return r(css);
    }
    updated() {
        this._controller.setContainers(this._refInnerContainer.value, this._refOuterContainer.value);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardMediaDimensionsContainer.prototype, "dimensionsConfig", void 0);
AdvancedCameraCardMediaDimensionsContainer = __decorate([
    t('advanced-camera-card-media-dimensions-container')
], AdvancedCameraCardMediaDimensionsContainer);

export { i };
//# sourceMappingURL=media-dimensions-container-4933e8e0.js.map
