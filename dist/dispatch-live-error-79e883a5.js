import { E as Timer, ef as debounce, z as isEqual, dW as dispatchExistingMediaLoadedInfoAsEvent, _ as __decorate, x as r, y as n, t, u as s, U as createFetchThumbnailTask, C as x, X as renderTask, v as r$1, J as e, G as getActionConfigGivenAction, H as dispatchActionExecutionRequest, p as createPTZMultiAction, O as prettifyTitle, l as localize, K as actionHandler, L as hasAction, w as fireAdvancedCameraCardEvent } from './card-edc26888.js';

class MediaActionsController {
    constructor() {
        this._options = null;
        this._viewportIntersecting = null;
        this._microphoneMuteTimer = new Timer();
        this._root = null;
        this._eventListeners = new Map();
        this._children = [];
        this._target = null;
        this._mutationObserver = new MutationObserver(this._mutationHandler.bind(this));
        this._intersectionObserver = new IntersectionObserver(this._intersectionHandler.bind(this));
        this._mediaLoadedHandler = async (index) => {
            if (this._target?.index !== index) {
                return;
            }
            await this._unmuteTargetIfConfigured(this._target.selected ? 'selected' : 'visible');
            await this._playTargetIfConfigured(this._target.selected ? 'selected' : 'visible');
        };
        this._visibilityHandler = async () => {
            await this._changeVisibility(document.visibilityState === 'visible');
        };
        this._changeVisibility = async (visible) => {
            if (visible) {
                await this._unmuteTargetIfConfigured('visible');
                await this._playTargetIfConfigured('visible');
            }
            else {
                await this._pauseAllIfConfigured('hidden');
                await this._muteAllIfConfigured('hidden');
            }
        };
        document.addEventListener('visibilitychange', this._visibilityHandler);
    }
    setOptions(options) {
        if (this._options?.microphoneState !== options.microphoneState) {
            this._microphoneStateChangeHandler(this._options?.microphoneState, options.microphoneState);
        }
        this._options = options;
    }
    hasRoot() {
        return !!this._root;
    }
    destroy() {
        this._viewportIntersecting = null;
        this._microphoneMuteTimer.stop();
        this._root = null;
        this._removeChildHandlers();
        this._children = [];
        this._target = null;
        this._mutationObserver.disconnect();
        this._intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', this._visibilityHandler);
    }
    async setTarget(index, selected) {
        if (this._target?.index === index && this._target?.selected === selected) {
            return;
        }
        // If there's already a selected target, unselect it.
        if (!!this._target?.selected) {
            await this._pauseTargetIfConfigured('unselected');
            await this._muteTargetIfConfigured('unselected');
            this._microphoneMuteTimer.stop();
        }
        this._target = {
            selected,
            index,
        };
        if (selected) {
            await this._unmuteTargetIfConfigured('selected');
            await this._playTargetIfConfigured('selected');
        }
        else {
            await this._unmuteTargetIfConfigured('visible');
            await this._playTargetIfConfigured('visible');
        }
    }
    unsetTarget() {
        this._target = null;
    }
    async _playTargetIfConfigured(condition) {
        if (this._target !== null &&
            this._options?.autoPlayConditions?.includes(condition)) {
            await this._play(this._target.index);
        }
    }
    async _play(index) {
        await (await this._children[index]?.getMediaPlayerController())?.play();
    }
    async _unmuteTargetIfConfigured(condition) {
        if (this._target !== null &&
            this._options?.autoUnmuteConditions?.includes(condition)) {
            await this._unmute(this._target.index);
        }
    }
    async _unmute(index) {
        await (await this._children[index]?.getMediaPlayerController())?.unmute();
    }
    async _pauseAllIfConfigured(condition) {
        if (this._options?.autoPauseConditions?.includes(condition)) {
            for (const index of this._children.keys()) {
                await this._pause(index);
            }
        }
    }
    async _pauseTargetIfConfigured(condition) {
        if (this._target !== null &&
            this._options?.autoPauseConditions?.includes(condition)) {
            await this._pause(this._target.index);
        }
    }
    async _pause(index) {
        await (await this._children[index]?.getMediaPlayerController())?.pause();
    }
    async _muteAllIfConfigured(condition) {
        if (this._options?.autoMuteConditions?.includes(condition)) {
            for (const index of this._children.keys()) {
                await this._mute(index);
            }
        }
    }
    async _muteTargetIfConfigured(condition) {
        if (this._target !== null &&
            this._options?.autoMuteConditions?.includes(condition)) {
            await this._mute(this._target.index);
        }
    }
    async _mute(index) {
        await (await this._children[index]?.getMediaPlayerController())?.mute();
    }
    _mutationHandler(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _mutations, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _observer) {
        this._initializeRoot();
    }
    _removeChildHandlers() {
        for (const [child, callback] of this._eventListeners.entries()) {
            child.removeEventListener('advanced-camera-card:media:loaded', callback);
        }
        this._eventListeners.clear();
    }
    setRoot(root) {
        if (root === this._root) {
            return false;
        }
        this._target = null;
        this._root = root;
        this._initializeRoot();
        this._intersectionObserver.disconnect();
        this._intersectionObserver.observe(this._root);
        this._mutationObserver.disconnect();
        this._mutationObserver.observe(this._root, { childList: true, subtree: true });
        return true;
    }
    _initializeRoot() {
        if (!this._options || !this._root) {
            return;
        }
        this._removeChildHandlers();
        this._children = [
            ...this._root.querySelectorAll(this._options.playerSelector),
        ];
        for (const [index, child] of this._children.entries()) {
            const eventListener = () => this._mediaLoadedHandler(index);
            this._eventListeners.set(child, eventListener);
            child.addEventListener('advanced-camera-card:media:loaded', eventListener);
        }
    }
    async _intersectionHandler(entries) {
        const wasIntersecting = this._viewportIntersecting;
        this._viewportIntersecting = entries.some((entry) => entry.isIntersecting);
        if (wasIntersecting !== null && wasIntersecting !== this._viewportIntersecting) {
            // If the live view is preloaded (i.e. in the background) we may need to
            // take media actions, e.g. muting a live stream that is now running in
            // the background, so we act even if the new state is hidden.
            await this._changeVisibility(this._viewportIntersecting);
        }
    }
    async _microphoneStateChangeHandler(oldState, newState) {
        if (!oldState || !newState) {
            return;
        }
        if (oldState.muted && !newState.muted) {
            await this._unmuteTargetIfConfigured('microphone');
        }
        else if (!oldState.muted &&
            newState.muted &&
            this._options?.autoMuteConditions?.includes('microphone')) {
            this._microphoneMuteTimer.start(this._options.microphoneMuteSeconds ?? 60, async () => {
                await this._muteTargetIfConfigured('microphone');
            });
        }
    }
}

class MediaHeightController {
    constructor(host, selector) {
        this._root = null;
        this._children = [];
        this._selectedChild = null;
        this._mutationObserver = new MutationObserver(() => this._initializeRoot());
        this._resizeObserver = new ResizeObserver(() => this._debouncedSetHeight());
        this._debouncedSetHeight = debounce(() => this._setHeight(), 
        // Balancing act: Debounce to avoid excessive calls to setHeight, when new
        // media is loading the player may be a much smaller height momentarily.
        300, {
            trailing: true,
            leading: false,
        });
        this._host = host;
        this._selector = selector;
    }
    setRoot(root) {
        if (root === this._root) {
            return;
        }
        this._root = root;
        this._mutationObserver.disconnect();
        this._mutationObserver.observe(this._root, {
            childList: true,
        });
        this._initializeRoot();
    }
    setSelected(selectedIndex) {
        const selectedChild = this._children[selectedIndex];
        if (!selectedChild || selectedChild === this._selectedChild) {
            return;
        }
        this._selectedChild = selectedChild;
        this._resizeObserver.disconnect();
        this._resizeObserver.observe(selectedChild);
        this._debouncedSetHeight();
    }
    // Recalculate the height. This is necessary because ResizeObserver may not
    // fire if the height of the media is constrained by the host's own max-height
    // (e.g. during initial load, everything is 100% height of the host, so the
    // rendered height never changes and thus ResizeObserver never fires). This
    // manual "wakeup" allows the controller to temporarily lift the constraint
    // and peek at the true desired height.
    recalculate() {
        this._debouncedSetHeight();
    }
    destroy() {
        this._mutationObserver.disconnect();
        this._resizeObserver.disconnect();
        this._root = null;
        this._children = [];
        this._selectedChild = null;
    }
    _setHeight() {
        if (!this._selectedChild) {
            return;
        }
        const originalHeight = this._host.style.maxHeight;
        // Remove the height restriction to ensure the full max height. Example of
        // behavior without this: Chrome on Android will not correctly size if the
        // card is in fullscreen mode.
        this._host.style.maxHeight = '';
        // Calculate the true height.
        const selectedHeight = this._selectedChild.getBoundingClientRect().height;
        const hostHeight = this._host.getBoundingClientRect().height;
        // Reset the original height so that browser transition animation can be
        // applied from the current to the target.
        this._host.style.maxHeight = originalHeight;
        // Force the browser to reflow.
        this._selectedChild.getBoundingClientRect();
        if (selectedHeight && !isNaN(selectedHeight) && selectedHeight > 0) {
            // Set the height to the larger of the selected child or the host itself.
            // This ensures that the host (the carousel) expands to fit the media, but
            // does not shrink smaller than itself (which would cause a "flash" or
            // jump).
            // See: https://github.com/dermotduffy/advanced-camera-card/issues/2109
            this._host.style.maxHeight = `${Math.max(selectedHeight, hostHeight)}px`;
        }
    }
    _initializeRoot() {
        const children = [
            ...(this._root?.querySelectorAll(this._selector) ??
                /* istanbul ignore next: this path cannot be reached as root will always
                exist by the time the mutation observer is observing -- @preserve */
                []),
        ];
        if (isEqual(children, this._children)) {
            return;
        }
        this._children = children;
        this._selectedChild = null;
    }
}

function AutoMediaLoadedInfo() {
    let emblaApi;
    let slides = [];
    const mediaLoadedInfo = [];
    function init(emblaApiInstance) {
        emblaApi = emblaApiInstance;
        slides = emblaApi.slideNodes();
        for (const slide of slides) {
            slide.addEventListener('advanced-camera-card:media:loaded', mediaLoadedInfoHandler);
            slide.addEventListener('advanced-camera-card:media:unloaded', mediaUnloadedInfoHandler);
        }
        emblaApi.on('init', slideSelectHandler);
        emblaApi
            .containerNode()
            .addEventListener('advanced-camera-card:carousel:force-select', slideSelectHandler);
    }
    function destroy() {
        for (const slide of slides) {
            slide.removeEventListener('advanced-camera-card:media:loaded', mediaLoadedInfoHandler);
            slide.removeEventListener('advanced-camera-card:media:unloaded', mediaUnloadedInfoHandler);
        }
        emblaApi.off('init', slideSelectHandler);
        emblaApi
            .containerNode()
            .removeEventListener('advanced-camera-card:carousel:force-select', slideSelectHandler);
    }
    function mediaLoadedInfoHandler(ev) {
        const eventPath = ev.composedPath();
        // As an optimization, the most recent slide is the one at the end. That's
        // where most users are spending time, so start the search there.
        for (const [index, slide] of [...slides.entries()].reverse()) {
            if (eventPath.includes(slide)) {
                mediaLoadedInfo[index] = ev.detail;
                if (index !== emblaApi.selectedScrollSnap()) {
                    ev.stopPropagation();
                }
                break;
            }
        }
    }
    function mediaUnloadedInfoHandler(ev) {
        const eventPath = ev.composedPath();
        for (const [index, slide] of slides.entries()) {
            if (eventPath.includes(slide)) {
                delete mediaLoadedInfo[index];
                if (index !== emblaApi.selectedScrollSnap()) {
                    ev.stopPropagation();
                }
                break;
            }
        }
    }
    function slideSelectHandler() {
        const index = emblaApi.selectedScrollSnap();
        const savedMediaLoadedInfo = mediaLoadedInfo[index];
        if (savedMediaLoadedInfo) {
            dispatchExistingMediaLoadedInfoAsEvent(
            // Event is redispatched from source element.
            slides[index], savedMediaLoadedInfo);
        }
    }
    const self = {
        name: 'autoMediaLoadedInfo',
        options: {},
        init,
        destroy,
    };
    return self;
}

var css$1 = "ha-icon-button {\n  color: var(--advanced-camera-card-button-color);\n  background-color: var(--advanced-camera-card-button-background);\n  border-radius: var(--advanced-camera-card-button-border-radius);\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n}\n\n:host {\n  --advanced-camera-card-next-prev-size: 48px;\n  --advanced-camera-card-next-prev-size-hover: calc(\n    var(--advanced-camera-card-next-prev-size) * 2\n  );\n  --advanced-camera-card-left-position: 45px;\n  --advanced-camera-card-right-position: 45px;\n  --ha-icon-button-size: var(--advanced-camera-card-next-prev-size);\n  --mdc-icon-size: calc(var(--ha-icon-button-size) / 2);\n}\n\n.controls {\n  position: absolute;\n  z-index: 1;\n  overflow: hidden;\n}\n\n.controls.left {\n  left: var(--advanced-camera-card-left-position);\n}\n\n.controls.right {\n  right: var(--advanced-camera-card-right-position);\n}\n\n.controls.icons {\n  top: calc(50% - var(--advanced-camera-card-next-prev-size) / 2);\n}\n\n.controls.thumbnails {\n  border-radius: 50%;\n  height: var(--advanced-camera-card-next-prev-size);\n  top: calc(50% - var(--advanced-camera-card-next-prev-size) / 2);\n  box-shadow: var(--advanced-camera-card-box-shadow-override, 0px 0px 20px 5px black);\n  transition: all 0.2s ease-out;\n  opacity: 0.8;\n  aspect-ratio: 1/1;\n}\n\n.controls.thumbnails:hover {\n  opacity: 1 !important;\n  height: var(--advanced-camera-card-next-prev-size-hover);\n  top: calc(50% - var(--advanced-camera-card-next-prev-size-hover) / 2);\n}\n\n.controls.left.thumbnails:hover {\n  left: calc(var(--advanced-camera-card-left-position) - (var(--advanced-camera-card-next-prev-size-hover) - var(--advanced-camera-card-next-prev-size)) / 2);\n}\n\n.controls.right.thumbnails:hover {\n  right: calc(var(--advanced-camera-card-right-position) - (var(--advanced-camera-card-next-prev-size-hover) - var(--advanced-camera-card-next-prev-size)) / 2);\n}";

let AdvancedCameraCardNextPreviousControl = class AdvancedCameraCardNextPreviousControl extends s {
    constructor() {
        super(...arguments);
        this.disabled = false;
        // Label that is used for ARIA support and as tooltip.
        this.label = '';
        this._embedThumbnailTask = createFetchThumbnailTask(this, () => this.hass, () => this.thumbnail);
    }
    set controlConfig(controlConfig) {
        if (controlConfig?.size) {
            this.style.setProperty('--advanced-camera-card-next-prev-size', `${controlConfig.size}px`);
        }
        this._controlConfig = controlConfig;
    }
    render() {
        if (this.disabled || !this._controlConfig || this._controlConfig.style == 'none') {
            return x ``;
        }
        const shouldRenderIcon = !this.thumbnail || ['chevrons', 'icons'].includes(this._controlConfig.style);
        const classesBase = {
            controls: true,
            left: this.side === 'left',
            right: this.side === 'right',
        };
        const renderIcon = () => {
            const icon = this.icon && this._controlConfig?.style !== 'chevrons'
                ? this.icon
                : this.side === 'left'
                    ? { icon: 'mdi:chevron-left' }
                    : { icon: 'mdi:chevron-right' };
            const classes = {
                ...classesBase,
                icons: true,
            };
            return x ` <ha-icon-button class="${e(classes)}" .label=${this.label}>
        <advanced-camera-card-icon
          .hass=${this.hass}
          .icon=${icon}
        ></advanced-camera-card-icon>
      </ha-icon-button>`;
        };
        if (shouldRenderIcon) {
            return renderIcon();
        }
        const classes = {
            ...classesBase,
            thumbnails: true,
        };
        return renderTask(this._embedThumbnailTask, (embeddedThumbnail) => embeddedThumbnail
            ? x `<img
              src="${embeddedThumbnail}"
              class="${e(classes)}"
              title="${this.label}"
              aria-label="${this.label}"
            />`
            : x ``, {
            inProgressFunc: () => x `<div class=${e(classes)}></div>`,
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            errorFunc: (_ev) => renderIcon(),
        });
    }
    static get styles() {
        return r$1(css$1);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardNextPreviousControl.prototype, "side", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardNextPreviousControl.prototype, "hass", void 0);
__decorate([
    r()
], AdvancedCameraCardNextPreviousControl.prototype, "_controlConfig", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardNextPreviousControl.prototype, "thumbnail", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardNextPreviousControl.prototype, "icon", void 0);
__decorate([
    n({ attribute: true, type: Boolean })
], AdvancedCameraCardNextPreviousControl.prototype, "disabled", void 0);
__decorate([
    n()
], AdvancedCameraCardNextPreviousControl.prototype, "label", void 0);
AdvancedCameraCardNextPreviousControl = __decorate([
    t('advanced-camera-card-next-previous-control')
], AdvancedCameraCardNextPreviousControl);

class PTZController {
    constructor(host) {
        this._config = null;
        this._hass = null;
        this._cameraManager = null;
        this._cameraID = null;
        this._host = host;
    }
    setConfig(config) {
        this._config = config ?? null;
        this._host.setAttribute('data-orientation', config?.orientation ?? 'horizontal');
        this._host.setAttribute('data-position', config?.position ?? 'bottom-right');
        this._host.setAttribute('style', Object.entries(config?.style ?? {})
            .map(([k, v]) => `${k}:${v}`)
            .join(';'));
    }
    getConfig() {
        return this._config;
    }
    setCamera(cameraManager, cameraID) {
        this._cameraManager = cameraManager ?? null;
        this._cameraID = cameraID ?? null;
    }
    setForceVisibility(forceVisibility) {
        this._forceVisibility = forceVisibility;
    }
    handleAction(ev, buttonConfig) {
        const config = buttonConfig ?? ev.detail.item ?? null;
        // Nothing else has the configuration for this action, so don't let it
        // propagate further.
        ev.stopPropagation();
        const interaction = ev.detail.action;
        const action = getActionConfigGivenAction(interaction, config);
        if (action) {
            dispatchActionExecutionRequest(this._host, {
                actions: action,
                ...(config && { config: config }),
            });
        }
    }
    shouldDisplay() {
        return this._forceVisibility !== undefined
            ? this._forceVisibility
            : this._config?.mode === 'auto'
                ? !!this._cameraID &&
                    !!this._cameraManager
                        ?.getCameraCapabilities(this._cameraID)
                        ?.hasPTZCapability()
                : this._config?.mode === 'on';
    }
    getPTZActions() {
        const cameraCapabilities = this._cameraID
            ? this._cameraManager?.getCameraCapabilities(this._cameraID)
            : null;
        const hasRealPTZCapability = cameraCapabilities && cameraCapabilities.hasPTZCapability();
        const ptzCapabilities = cameraCapabilities?.getPTZCapabilities();
        const getContinuousActions = (options) => ({
            start_tap_action: createPTZMultiAction({
                ptzAction: options?.ptzAction,
                ptzPhase: 'start',
                ptzPreset: options?.preset,
            }),
            end_tap_action: createPTZMultiAction({
                ptzAction: options?.ptzAction,
                ptzPhase: 'stop',
                ptzPreset: options?.preset,
            }),
        });
        const getDiscreteAction = (options) => ({
            tap_action: createPTZMultiAction({
                ptzAction: options?.ptzAction,
                ptzPreset: options?.preset,
            }),
        });
        const actions = {};
        if (!hasRealPTZCapability || ptzCapabilities?.up) {
            actions.up = getContinuousActions({
                ptzAction: 'up',
            });
        }
        if (!hasRealPTZCapability || ptzCapabilities?.down) {
            actions.down = getContinuousActions({
                ptzAction: 'down',
            });
        }
        if (!hasRealPTZCapability || ptzCapabilities?.left) {
            actions.left = getContinuousActions({
                ptzAction: 'left',
            });
        }
        if (!hasRealPTZCapability || ptzCapabilities?.right) {
            actions.right = getContinuousActions({
                ptzAction: 'right',
            });
        }
        if (!hasRealPTZCapability || ptzCapabilities?.zoomIn) {
            actions.zoom_in = getContinuousActions({
                ptzAction: 'zoom_in',
            });
        }
        if (!hasRealPTZCapability || ptzCapabilities?.zoomOut) {
            actions.zoom_out = getContinuousActions({
                ptzAction: 'zoom_out',
            });
        }
        if (!hasRealPTZCapability || ptzCapabilities?.presets?.length) {
            actions.home = getDiscreteAction();
        }
        for (const preset of ptzCapabilities?.presets ?? []) {
            actions.presets ??= [];
            actions.presets.push({
                preset: preset,
                actions: getDiscreteAction({
                    preset: preset,
                    ptzAction: 'preset',
                }),
            });
        }
        return actions;
    }
}

var css = ":host {\n  position: absolute;\n  width: fit-content;\n  height: fit-content;\n  --advanced-camera-card-ptz-icon-size: 24px;\n}\n\n:host([data-position$=-left]) {\n  left: 5%;\n}\n\n:host([data-position$=-right]) {\n  right: 5%;\n}\n\n:host([data-position^=top-]) {\n  top: 5%;\n}\n\n:host([data-position^=bottom-]) {\n  bottom: 5%;\n}\n\n/*****************\n * Main Containers\n *****************/\n.ptz {\n  display: flex;\n  gap: 10px;\n}\n\n:host([data-orientation=vertical]) .ptz {\n  flex-direction: column;\n}\n\n:host([data-orientation=horizontal]) .ptz {\n  flex-direction: row;\n}\n\n:host([data-orientation=vertical]) .ptz div {\n  width: calc(var(--advanced-camera-card-ptz-icon-size) * 3);\n}\n\n:host([data-orientation=horizontal]) .ptz div {\n  height: calc(var(--advanced-camera-card-ptz-icon-size) * 3);\n}\n\n.ptz-move,\n.ptz-zoom,\n.ptz-presets {\n  position: relative;\n  transition: color 0.3s ease-in-out, background-color 0.3s ease-in-out;\n  color: var(--advanced-camera-card-ptz-color-inactive);\n  background-color: var(--advanced-camera-card-ptz-background-inactive);\n}\n.ptz-move:hover,\n.ptz-zoom:hover,\n.ptz-presets:hover {\n  color: var(--advanced-camera-card-ptz-color-active);\n  background-color: var(--advanced-camera-card-ptz-background-active);\n}\n\n.ptz-move {\n  height: calc(var(--advanced-camera-card-ptz-icon-size) * 3);\n  width: calc(var(--advanced-camera-card-ptz-icon-size) * 3);\n  border-radius: 50%;\n}\n\n:host([data-orientation=horizontal]) .ptz .ptz-zoom,\n:host([data-orientation=horizontal]) .ptz .ptz-presets {\n  width: calc(var(--advanced-camera-card-ptz-icon-size) * 1.5);\n}\n\n:host([data-orientation=vertical]) .ptz .ptz-zoom,\n:host([data-orientation=vertical]) .ptz .ptz-presets {\n  height: calc(var(--advanced-camera-card-ptz-icon-size) * 1.5);\n}\n\n.ptz-zoom,\n.ptz-presets {\n  border-radius: var(--advanced-camera-card-border-radius-final);\n}\n\n/***********\n * PTZ Icons\n ***********/\n.ptz-move advanced-camera-card-icon {\n  position: absolute;\n  --mdc-icon-size: var(--advanced-camera-card-ptz-icon-size);\n}\n\nadvanced-camera-card-icon:not(.disabled),\nadvanced-camera-card-submenu:not(.disabled) {\n  cursor: pointer;\n}\n\n.disabled {\n  color: var(--disabled-text-color);\n}\n\n.up {\n  top: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.down {\n  bottom: 5px;\n  left: 50%;\n  transform: translateX(-50%);\n}\n\n.left {\n  left: 5px;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.right {\n  right: 5px;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n.ptz-presets,\n.ptz-zoom {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n}\n\n:host([data-orientation=vertical]) .ptz-presets,\n:host([data-orientation=vertical]) .ptz-zoom {\n  flex-direction: row;\n}\n\n:host([data-orientation=horizontal]) .ptz-presets,\n:host([data-orientation=horizontal]) .ptz-zoom {\n  flex-direction: column;\n}";

let AdvancedCameraCardPTZ = class AdvancedCameraCardPTZ extends s {
    constructor() {
        super(...arguments);
        this._controller = new PTZController(this);
        this._actions = null;
    }
    willUpdate(changedProps) {
        if (changedProps.has('config')) {
            this._controller.setConfig(this.config);
        }
        if (changedProps.has('cameraManager') || changedProps.has('cameraID')) {
            this._controller.setCamera(this.cameraManager, this.cameraID);
        }
        if (changedProps.has('forceVisibility')) {
            this._controller.setForceVisibility(this.forceVisibility);
        }
        if (changedProps.has('cameraID') || changedProps.has('cameraManager')) {
            this._actions = this._controller.getPTZActions();
        }
    }
    render() {
        if (!this._controller.shouldDisplay()) {
            return;
        }
        const renderIcon = (name, icon, options) => {
            const classes = {
                [name]: true,
                disabled: !options?.actions && !options?.renderWithoutAction,
            };
            return options?.actions || options?.renderWithoutAction
                ? x `<advanced-camera-card-icon
            class=${e(classes)}
            .icon=${{ icon: icon }}
            .title=${localize(`elements.ptz.${name}`)}
            .actionHandler=${options.actions
                    ? actionHandler({
                        hasHold: hasAction(options.actions?.hold_action),
                        hasDoubleClick: hasAction(options.actions?.double_tap_action),
                    })
                    : undefined}
            @action=${(ev) => options.actions && this._controller.handleAction(ev, options.actions)}
          ></advanced-camera-card-icon>`
                : x ``;
        };
        const presetSubmenuItems = this._actions?.presets?.length
            ? this._actions.presets.map((preset) => ({
                title: prettifyTitle(preset.preset),
                icon: 'mdi:cctv',
                ...preset.actions,
                hold_action: {
                    action: 'perform-action',
                    perform_action: 'camera.preset_recall',
                },
            }))
            : null;
        const config = this._controller.getConfig();
        return x ` <div class="ptz">
      ${!config?.hide_pan_tilt &&
            (this._actions?.left ||
                this._actions?.right ||
                this._actions?.up ||
                this._actions?.down)
            ? x `<div class="ptz-move">
            ${renderIcon('right', 'mdi:arrow-right', { actions: this._actions?.right })}
            ${renderIcon('left', 'mdi:arrow-left', { actions: this._actions?.left })}
            ${renderIcon('up', 'mdi:arrow-up', { actions: this._actions?.up })}
            ${renderIcon('down', 'mdi:arrow-down', { actions: this._actions?.down })}
          </div>`
            : ''}
      ${!config?.hide_zoom && (this._actions?.zoom_in || this._actions?.zoom_out)
            ? x ` <div class="ptz-zoom">
            ${renderIcon('zoom_in', 'mdi:plus', { actions: this._actions.zoom_in })}
            ${renderIcon('zoom_out', 'mdi:minus', { actions: this._actions.zoom_out })}
          </div>`
            : x ``}
      ${!config?.hide_home && (this._actions?.home || presetSubmenuItems?.length)
            ? x `<div class="ptz-presets">
            ${renderIcon('home', 'mdi:home', { actions: this._actions?.home })}
            ${presetSubmenuItems?.length
                ? x `<advanced-camera-card-submenu
                  class="presets"
                  .hass=${this.hass}
                  .items=${presetSubmenuItems}
                  @action=${(ev) => this._controller.handleAction(ev)}
                >
                  ${renderIcon('presets', config?.orientation === 'vertical'
                    ? 'mdi:dots-vertical'
                    : 'mdi:dots-horizontal', {
                    renderWithoutAction: true,
                })}
                </advanced-camera-card-submenu>`
                : ''}
          </div>`
            : ''}
    </div>`;
    }
    static get styles() {
        return r$1(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardPTZ.prototype, "config", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardPTZ.prototype, "cameraManager", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardPTZ.prototype, "cameraID", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardPTZ.prototype, "forceVisibility", void 0);
AdvancedCameraCardPTZ = __decorate([
    t('advanced-camera-card-ptz')
], AdvancedCameraCardPTZ);

class LazyLoadController {
    constructor(host) {
        this._documentVisible = true;
        this._intersects = false;
        this._loaded = false;
        this._unloadConditions = null;
        this._intersectionObserver = new IntersectionObserver(this._intersectionHandler.bind(this));
        this._listeners = [];
        this._visibilityHandler = () => {
            this._documentVisible = document.visibilityState === 'visible';
            this._lazyLoadOrUnloadIfNecessary();
        };
        this._host = host;
        this._host.addController(this);
    }
    setConfiguration(lazyLoad, lazyUnloadConditions) {
        if (!lazyLoad && !this._loaded) {
            this._setLoaded(true);
        }
        this._unloadConditions = lazyUnloadConditions ?? null;
    }
    destroy() {
        this._removeEventHandlers();
        this._listeners = [];
    }
    isLoaded() {
        return this._loaded;
    }
    addListener(listener) {
        this._listeners.push(listener);
    }
    removeListener(listener) {
        this._listeners = this._listeners.filter((l) => l !== listener);
    }
    removeController() {
        this._host.removeController(this);
    }
    hostConnected() {
        this._addEventHandlers();
    }
    hostDisconnected() {
        this._removeEventHandlers();
        this._setLoaded(false);
    }
    _addEventHandlers() {
        document.addEventListener('visibilitychange', this._visibilityHandler);
        this._intersectionObserver.observe(this._host);
    }
    _removeEventHandlers() {
        document.removeEventListener('visibilitychange', this._visibilityHandler);
        this._intersectionObserver.disconnect();
    }
    _lazyLoadOrUnloadIfNecessary() {
        const shouldBeLoaded = !this._loaded && this._documentVisible && this._intersects;
        const shouldBeUnloaded = this._loaded &&
            ((this._unloadConditions?.includes('hidden') && !this._documentVisible) ||
                (this._unloadConditions?.includes('unselected') && !this._intersects));
        if (shouldBeLoaded) {
            this._setLoaded(true);
        }
        else if (shouldBeUnloaded) {
            this._setLoaded(false);
        }
    }
    _setLoaded(loaded) {
        this._loaded = loaded;
        this._notifyListeners();
        this._host.requestUpdate();
    }
    _notifyListeners() {
        this._listeners.forEach((listener) => listener(this._loaded));
    }
    _intersectionHandler(entries) {
        this._intersects = entries.some((entry) => entry.isIntersecting);
        this._lazyLoadOrUnloadIfNecessary();
    }
}

function dispatchLiveErrorEvent(element) {
    fireAdvancedCameraCardEvent(element, 'live:error');
}

export { AutoMediaLoadedInfo as A, LazyLoadController as L, MediaActionsController as M, MediaHeightController as a, dispatchLiveErrorEvent as d };
//# sourceMappingURL=dispatch-live-error-79e883a5.js.map
