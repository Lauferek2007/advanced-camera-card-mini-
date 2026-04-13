import { eW as PTZMovementType, f9 as isTriggeredState, fa as Capabilities, fb as CameraNoIDError, l as localize, eZ as Engine, eU as getCameraEntityFromConfig, f as getEntityTitle } from './card-edc26888.js';
import { l as liveProviderSupports2WayAudio } from './live-provider-bb334320.js';

const buildGo2RTCEndpoint = (cameraConfig, pathBuilder, options) => {
    const url = options?.url ?? cameraConfig.go2rtc?.url;
    const stream = options?.stream ?? cameraConfig.go2rtc?.stream;
    if (!url || !stream) {
        return null;
    }
    const endpoint = pathBuilder(url, stream);
    return {
        endpoint,
        // Only sign the endpoint if it's local to HA.
        sign: endpoint.startsWith('/'),
    };
};
const getGo2RTCStreamEndpoint = (cameraConfig, options) => {
    return buildGo2RTCEndpoint(cameraConfig, (url, stream) => `${url}/api/ws?src=${stream}`, options);
};
const getGo2RTCMetadataEndpoint = (cameraConfig, options) => {
    return buildGo2RTCEndpoint(cameraConfig, 
    // Use probe parameters to trigger active stream detection.
    // Without these, go2rtc only returns static config without producer medias.
    (url, stream) => `${url}/api/streams?src=${stream}&video=all&audio=all&microphone`, options);
};

const getConfiguredPTZAction = (cameraConfig, action, options) => {
    if (action === 'preset') {
        return (options?.preset ? cameraConfig.ptz.presets?.[options.preset] : null) ?? null;
    }
    if (options?.phase) {
        return cameraConfig.ptz[`actions_${action}_${options.phase}`] ?? null;
    }
    return cameraConfig.ptz[`actions_${action}`] ?? null;
};
const hasConfiguredPTZAction = (cameraConfig, action, options) => {
    return !!getConfiguredPTZAction(cameraConfig, action, options);
};
const getConfiguredPTZMovementType = (cameraConfig, action) => {
    const continuous = hasConfiguredPTZAction(cameraConfig, action, { phase: 'start' }) &&
        hasConfiguredPTZAction(cameraConfig, action, { phase: 'stop' });
    const relative = hasConfiguredPTZAction(cameraConfig, action);
    return continuous || relative
        ? [
            ...(continuous ? [PTZMovementType.Continuous] : []),
            ...(relative ? [PTZMovementType.Relative] : []),
        ]
        : null;
};
const getPTZCapabilitiesFromCameraConfig = (cameraConfig) => {
    const left = getConfiguredPTZMovementType(cameraConfig, 'left');
    const right = getConfiguredPTZMovementType(cameraConfig, 'right');
    const up = getConfiguredPTZMovementType(cameraConfig, 'up');
    const down = getConfiguredPTZMovementType(cameraConfig, 'down');
    const zoomIn = getConfiguredPTZMovementType(cameraConfig, 'zoom_in');
    const zoomOut = getConfiguredPTZMovementType(cameraConfig, 'zoom_out');
    const presets = cameraConfig.ptz.presets
        ? Object.keys(cameraConfig.ptz.presets)
        : undefined;
    return left?.length ||
        right?.length ||
        up?.length ||
        down?.length ||
        zoomIn?.length ||
        zoomOut?.length ||
        presets?.length
        ? {
            // Only return keys with some capability (to aid with action merging
            // later).
            ...(left ? { left } : {}),
            ...(right ? { right } : {}),
            ...(up ? { up } : {}),
            ...(down ? { down } : {}),
            ...(zoomIn ? { zoomIn } : {}),
            ...(zoomOut ? { zoomOut } : {}),
            ...(presets ? { presets } : {}),
        }
        : null;
};

class Camera {
    constructor(config, engine, options) {
        this._destroyCallbacks = [];
        this._stateChangeHandler = (difference) => {
            this._eventCallback?.({
                cameraID: this.getID(),
                id: difference.entityID,
                type: isTriggeredState(difference.newState.state) ? 'new' : 'end',
            });
        };
        this._config = config;
        this._engine = engine;
        this._eventCallback = options?.eventCallback;
        this._capabilities = options?.capabilities;
    }
    async initialize(options) {
        await this._initialize(options);
        this._capabilities =
            options.capabilityOptions?.capabilities ??
                this._capabilities ??
                (await this._buildCapabilities(options));
        this._subscribeBasedOnCapabilities(options.stateWatcher);
        this._onDestroy(() => options.stateWatcher.unsubscribe(this._stateChangeHandler));
        return this;
    }
    /**
     * Subclass initialization hook. Override for async initialization work.
     */
    async _initialize(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options) { }
    async _buildCapabilities(options) {
        const rawCapabilities = await this._getRawCapabilities(options);
        const config = this.getConfig();
        const has2WayAudio = await liveProviderSupports2WayAudio(options.hass, config, this._getGo2RTCMetadataEndpoint(), this.getProxyConfig());
        return new Capabilities({ ...rawCapabilities, '2-way-audio': has2WayAudio }, {
            disable: config.capabilities?.disable,
            disableExcept: config.capabilities?.disable_except,
        });
    }
    /**
     * Get raw capabilities for this camera. Subclasses should override
     * and call super._getRawCapabilities() to extend defaults.
     */
    async _getRawCapabilities(options) {
        return {
            live: true,
            menu: true,
            substream: true,
            trigger: true,
            'remote-control-entity': true,
            ...options.capabilityOptions?.raw,
        };
    }
    async destroy() {
        this._destroyCallbacks.forEach((callback) => callback());
    }
    getConfig() {
        return this._config;
    }
    setID(cameraID) {
        this._config.id = cameraID;
    }
    getID() {
        if (this._config.id) {
            return this._config.id;
        }
        throw new CameraNoIDError(localize('error.no_camera_id'));
    }
    getEngine() {
        return this._engine;
    }
    getCapabilities() {
        return this._capabilities ?? null;
    }
    /**
     * Get camera endpoints. Subclasses should override to add engine-specific endpoints.
     * @param _context Optional context for dynamic endpoints (e.g., UI URLs based on current view).
     */
    getEndpoints(context) {
        const ui = this._getUIEndpoint(context);
        const go2rtc = this._getGo2RTCStreamEndpoint();
        const webrtcCard = this._getWebRTCCardEndpoint();
        return ui || go2rtc || webrtcCard
            ? {
                ...(ui && { ui }),
                ...(go2rtc && { go2rtc }),
                ...(webrtcCard && { webrtcCard }),
            }
            : null;
    }
    /**
     * Get the go2rtc metadata endpoint for capability detection.
     * Subclasses should override if they have custom go2rtc URL or stream resolution.
     */
    _getGo2RTCMetadataEndpoint() {
        return getGo2RTCMetadataEndpoint(this._config);
    }
    _getGo2RTCStreamEndpoint() {
        return getGo2RTCStreamEndpoint(this._config);
    }
    _getWebRTCCardEndpoint() {
        return this._config.camera_entity ? { endpoint: this._config.camera_entity } : null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _getUIEndpoint(_context) {
        return null;
    }
    getProxyConfig() {
        return {
            live: this._config.proxy.live === 'auto'
                ? // Live is proxied if the live provider is go2rtc and if a go2rtc
                    // URL is manually set.
                    this._config.live_provider === 'go2rtc' && !!this._config.go2rtc?.url
                : this._config.proxy.live,
            media: this._config.proxy.media === 'auto' ? false : this._config.proxy.media,
            dynamic: this._config.proxy.dynamic,
            ssl_verification: this._config.proxy.ssl_verification !== false,
            ssl_ciphers: this._config.proxy.ssl_ciphers === 'auto'
                ? 'default'
                : this._config.proxy.ssl_ciphers,
        };
    }
    async executePTZAction(executor, action, options) {
        const configuredAction = getConfiguredPTZAction(this.getConfig(), action, options);
        if (configuredAction) {
            await executor.executeActions({ actions: configuredAction });
            return true;
        }
        return false;
    }
    _onDestroy(callback) {
        this._destroyCallbacks.push(callback);
    }
    _subscribeBasedOnCapabilities(stateWatcher) {
        if (this._capabilities?.has('trigger')) {
            stateWatcher.unsubscribe(this._stateChangeHandler);
            stateWatcher.subscribe(this._stateChangeHandler, this._config.triggers.entities);
        }
    }
}

/* eslint-disable @typescript-eslint/no-unused-vars */
class GenericCameraManagerEngine {
    constructor(stateWatcher, eventCallback) {
        this._stateWatcher = stateWatcher;
        this._eventCallback = eventCallback;
    }
    getEngineType() {
        return Engine.Generic;
    }
    async createCamera(hass, cameraConfig) {
        return await new Camera(cameraConfig, this, {
            eventCallback: this._eventCallback,
        }).initialize({
            hass,
            stateWatcher: this._stateWatcher,
            capabilityOptions: {
                raw: {
                    ptz: getPTZCapabilitiesFromCameraConfig(cameraConfig) ?? undefined,
                },
                disable: cameraConfig.capabilities?.disable,
                disableExcept: cameraConfig.capabilities?.disable_except,
            },
        });
    }
    generateDefaultEventQuery(_store, _cameraIDs, _query) {
        return null;
    }
    generateDefaultRecordingQuery(_store, _cameraIDs, _query) {
        return null;
    }
    generateDefaultRecordingSegmentsQuery(_store, _cameraIDs, _query) {
        return null;
    }
    async getEvents(_hass, _store, _query, _engineOptions) {
        return null;
    }
    async getRecordings(_hass, _store, _query, _engineOptions) {
        return null;
    }
    async getRecordingSegments(_hass, _store, _query, _engineOptions) {
        return null;
    }
    generateMediaFromEvents(_hass, _store, _query, _results) {
        return null;
    }
    generateMediaFromRecordings(_hass, _store, _query, _results) {
        return null;
    }
    async getMediaDownloadPath(_hass, _cameraConfig, _media) {
        return null;
    }
    async favoriteMedia(_hass, _cameraConfig, _media, _favorite) {
        return;
    }
    getQueryResultMaxAge(_query) {
        return null;
    }
    async getMediaSeekTime(_hass, _store, _media, _target, _engineOptions) {
        return null;
    }
    async getMediaMetadata(_hass, _store, _query, _engineOptions) {
        return null;
    }
    getCameraMetadata(hass, cameraConfig) {
        const cameraEntity = getCameraEntityFromConfig(cameraConfig);
        return {
            title: cameraConfig.title ??
                getEntityTitle(hass, cameraConfig.camera_entity) ??
                getEntityTitle(hass, cameraConfig.webrtc_card?.entity) ??
                cameraConfig.id ??
                '',
            icon: {
                entity: cameraEntity ?? undefined,
                icon: cameraConfig.icon,
                fallback: 'mdi:video',
            },
        };
    }
    getMediaCapabilities(_media) {
        return null;
    }
}

var engineGeneric = /*#__PURE__*/Object.freeze({
    __proto__: null,
    GenericCameraManagerEngine: GenericCameraManagerEngine
});

export { Camera as C, GenericCameraManagerEngine as G, getGo2RTCMetadataEndpoint as a, getGo2RTCStreamEndpoint as b, engineGeneric as e, getPTZCapabilitiesFromCameraConfig as g };
//# sourceMappingURL=engine-generic-ef1ad168.js.map
