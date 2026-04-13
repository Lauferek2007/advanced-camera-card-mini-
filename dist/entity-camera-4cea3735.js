import { eU as getCameraEntityFromConfig, eV as CameraInitializationError, l as localize } from './card-edc26888.js';
import { C as Camera } from './engine-generic-ef1ad168.js';

class EntityCamera extends Camera {
    constructor() {
        super(...arguments);
        this._entity = null;
    }
    async initialize(options) {
        const config = this.getConfig();
        const cameraEntityID = getCameraEntityFromConfig(config);
        const entity = cameraEntityID
            ? await options.entityRegistryManager.getEntity(options.hass, cameraEntityID)
            : null;
        if (!entity || !cameraEntityID) {
            throw new CameraInitializationError(localize('error.no_camera_entity'), config);
        }
        this._entity = entity;
        return await super.initialize(options);
    }
    getEntity() {
        return this._entity;
    }
}

export { EntityCamera as E };
//# sourceMappingURL=entity-camera-4cea3735.js.map
