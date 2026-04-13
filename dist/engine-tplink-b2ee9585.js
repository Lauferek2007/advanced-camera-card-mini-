import { g as getPTZCapabilitiesFromCameraConfig, G as GenericCameraManagerEngine } from './engine-generic-ef1ad168.js';
import { eW as PTZMovementType, eZ as Engine } from './card-edc26888.js';
import { E as EntityCamera } from './entity-camera-4cea3735.js';
import './live-provider-bb334320.js';

class TPLinkCamera extends EntityCamera {
    constructor() {
        super(...arguments);
        this._ptzEntities = null;
    }
    async _initialize(options) {
        this._ptzEntities = await this._getPTZEntities(options.hass, options.entityRegistryManager);
    }
    async _getRawCapabilities(options) {
        const configPTZ = getPTZCapabilitiesFromCameraConfig(this.getConfig());
        const tplinkPTZ = this._ptzEntities
            ? this._entitiesToCapabilities(this._ptzEntities)
            : null;
        const combinedPTZ = configPTZ || tplinkPTZ ? { ...tplinkPTZ, ...configPTZ } : null;
        return {
            ...(await super._getRawCapabilities(options)),
            ...(combinedPTZ && { ptz: combinedPTZ }),
        };
    }
    async _getPTZEntities(hass, entityRegistry) {
        if (!this._entity?.device_id) {
            return null;
        }
        // Find all button entities on the same device
        const buttonEntities = await entityRegistry.getMatchingEntities(hass, (ent) => ent.device_id === this._entity?.device_id &&
            ent.entity_id.startsWith('button.') &&
            !ent.disabled_by);
        // TPLink uses pan_right, pan_left, tilt_up, tilt_down button entity suffixes
        const entitySuffixToAction = {
            pan_left: 'left',
            pan_right: 'right',
            tilt_up: 'up',
            tilt_down: 'down',
        };
        const ptzEntities = {};
        for (const buttonEntity of buttonEntities) {
            for (const [suffix, action] of Object.entries(entitySuffixToAction)) {
                if (buttonEntity.entity_id.endsWith(`_${suffix}`)) {
                    ptzEntities[action] = buttonEntity.entity_id;
                }
            }
        }
        return Object.keys(ptzEntities).length ? ptzEntities : null;
    }
    _entitiesToCapabilities(ptzEntities) {
        const tplinkPTZCapabilities = {};
        // TPLink buttons perform relative movements (no stop button needed)
        for (const key of Object.keys(ptzEntities)) {
            tplinkPTZCapabilities[key] = [PTZMovementType.Relative];
        }
        return tplinkPTZCapabilities;
    }
    async executePTZAction(executor, action, options) {
        if (await super.executePTZAction(executor, action, options)) {
            return true;
        }
        if (!this._ptzEntities) {
            return false;
        }
        // TPLink doesn't support presets
        if (action === 'preset') {
            return false;
        }
        // TPLink doesn't have zoom capabilities
        if (action === 'zoom_in' || action === 'zoom_out') {
            return false;
        }
        // TPLink doesn't have a stop button - the camera stops when the button
        // press action completes. We return true to indicate the stop was "handled"
        // (even though no action is actually taken).
        if (options?.phase === 'stop') {
            return true;
        }
        const entityID = this._ptzEntities[action];
        if (!entityID) {
            return false;
        }
        await executor.executeActions({
            actions: [
                {
                    action: 'perform-action',
                    perform_action: 'button.press',
                    target: { entity_id: entityID },
                },
            ],
        });
        return true;
    }
}

class TPLinkCameraManagerEngine extends GenericCameraManagerEngine {
    constructor(entityRegistryManager, stateWatcher, eventCallback) {
        super(stateWatcher, eventCallback);
        this._entityRegistryManager = entityRegistryManager;
    }
    getEngineType() {
        return Engine.TPLink;
    }
    async createCamera(hass, cameraConfig) {
        const camera = new TPLinkCamera(cameraConfig, this, {
            eventCallback: this._eventCallback,
        });
        return await camera.initialize({
            entityRegistryManager: this._entityRegistryManager,
            hass,
            stateWatcher: this._stateWatcher,
        });
    }
    getCameraMetadata(hass, cameraConfig) {
        return {
            ...super.getCameraMetadata(hass, cameraConfig),
            engineIcon: 'tplink',
        };
    }
}

export { TPLinkCameraManagerEngine };
//# sourceMappingURL=engine-tplink-b2ee9585.js.map
