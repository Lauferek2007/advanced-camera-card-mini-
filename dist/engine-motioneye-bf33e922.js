import { f1 as BrowseMediaCache, eZ as Engine, er as parse, f2 as isValidDate, en as startOfDay, e$ as allPromises, f3 as getViewMediaFromBrowseMediaArray, f0 as QueryResultsType, eH as add, f4 as MEDIA_CLASS_IMAGE, f5 as MEDIA_CLASS_VIDEO, F as orderBy, es as formatDate, f6 as BROWSE_MEDIA_CACHE_SECONDS } from './card-edc26888.js';
import { B as BrowseMediaCameraManagerEngine, i as isMediaWithinDates } from './engine-browse-media-fdc06c3e.js';
import { C as CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT } from './engine-58847671.js';
import { E as EntityCamera } from './entity-camera-4cea3735.js';
import { g as getPTZCapabilitiesFromCameraConfig } from './engine-generic-ef1ad168.js';
import { e as endOfDay } from './endOfDay-10c9656f.js';
import './live-provider-bb334320.js';

class MotionEyeCamera extends EntityCamera {
    getProxyConfig() {
        return {
            ...super.getProxyConfig(),
            // For motionEye, media is always proxied unless explicitly turned off.
            media: this._config.proxy.media === 'auto' ? true : this._config.proxy.media,
        };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _getUIEndpoint(_context) {
        return this._config.motioneye?.url ? { endpoint: this._config.motioneye.url } : null;
    }
    async _getRawCapabilities(options) {
        const ptz = getPTZCapabilitiesFromCameraConfig(this.getConfig());
        return {
            ...(await super._getRawCapabilities(options)),
            clips: true,
            snapshots: true,
            ...(ptz && { ptz }),
        };
    }
}

class MotionEyeQueryResultsClassifier {
    static isMotionEyeEventQueryResults(results) {
        return (results.engine === Engine.MotionEye && results.type === QueryResultsType.Event);
    }
}
const MOTIONEYE_REPL_SUBSTITUTIONS = {
    '%Y': 'yyyy',
    '%m': 'MM',
    '%d': 'dd',
    '%H': 'HH',
    '%M': 'mm',
    '%S': 'ss',
};
const MOTIONEYE_REPL_REGEXP = new RegExp(/(%Y|%m|%d|%H|%M|%S)/g);
class MotionEyeCameraManagerEngine extends BrowseMediaCameraManagerEngine {
    constructor() {
        super(...arguments);
        this._directoryCache = new BrowseMediaCache();
        this._fileCache = new BrowseMediaCache();
    }
    getEngineType() {
        return Engine.MotionEye;
    }
    async createCamera(hass, cameraConfig) {
        const camera = new MotionEyeCamera(cameraConfig, this, {
            eventCallback: this._eventCallback,
        });
        return await camera.initialize({
            entityRegistryManager: this._entityRegistryManager,
            hass,
            stateWatcher: this._stateWatcher,
        });
    }
    _convertMotionEyeTimeFormatToDateFNS(part) {
        return part.replace(MOTIONEYE_REPL_REGEXP, (_, key) => MOTIONEYE_REPL_SUBSTITUTIONS[key]);
    }
    // Get metadata for a MotionEye media file.
    _motionEyeMetadataGeneratorFile(cameraID, dateFormat, media, parent) {
        let startDate = parent?._metadata?.startDate ?? new Date();
        if (dateFormat) {
            const extensionlessTitle = media.title.replace(/\.[^/.]+$/, '');
            startDate = parse(extensionlessTitle, dateFormat, startDate);
            if (!isValidDate(startDate)) {
                return null;
            }
        }
        return {
            cameraID: cameraID,
            startDate: startDate,
            // MotionEye only has start times, the event is effectively a 'point'
            endDate: startDate,
        };
    }
    // Get metadata for a MotionEye media directory.
    _motionEyeMetadataGeneratorDirectory(cameraID, dateFormat, media, parent) {
        let startDate = parent?._metadata?.startDate ?? new Date();
        if (dateFormat) {
            const parsedDate = parse(media.title, dateFormat, startDate);
            if (!isValidDate(parsedDate)) {
                return null;
            }
            startDate = startOfDay(parsedDate);
        }
        return {
            cameraID: cameraID,
            startDate,
            endDate: parent?._metadata?.endDate ?? endOfDay(startDate),
        };
    }
    // Get media directories that match a given criteria.
    async _getMatchingDirectories(hass, store, cameraID, matchOptions, engineOptions) {
        const camera = store.getCamera(cameraID);
        const cameraConfig = camera?.getConfig();
        if (!(camera instanceof EntityCamera) || !cameraConfig) {
            return null;
        }
        const entity = camera.getEntity();
        const configID = entity?.config_entry_id;
        const deviceID = entity?.device_id;
        if (!configID || !deviceID) {
            return null;
        }
        const generateNextStep = (parts, media) => {
            const next = parts.shift();
            if (!next) {
                return [];
            }
            const dateFormat = next.includes('%')
                ? this._convertMotionEyeTimeFormatToDateFNS(next)
                : null;
            return [
                {
                    targets: media,
                    metadataGenerator: (media, parent) => this._motionEyeMetadataGeneratorDirectory(cameraID, dateFormat, media, parent),
                    matcher: (media) => media.can_expand &&
                        (!!dateFormat || media.title === next) &&
                        isMediaWithinDates(media, matchOptions?.start, matchOptions?.end),
                    advance: (media) => generateNextStep(parts, media),
                },
            ];
        };
        // For motionEye snapshots and clips are mutually exclusive.
        return await this._browseMediaWalker.walk(hass, [
            ...(matchOptions?.hasClip !== false && !matchOptions?.hasSnapshot
                ? generateNextStep(cameraConfig.motioneye.movies.directory_pattern.split('/'), [`media-source://motioneye/${configID}#${deviceID}#movies`])
                : []),
            ...(matchOptions?.hasSnapshot !== false && !matchOptions?.hasClip
                ? generateNextStep(cameraConfig.motioneye.images.directory_pattern.split('/'), [`media-source://motioneye/${configID}#${deviceID}#images`])
                : []),
        ], {
            ...(engineOptions?.useCache !== false && { cache: this._directoryCache }),
        });
    }
    async getEvents(hass, store, query, engineOptions) {
        // MotionEye does not support these query types and they will never match.
        if (query.favorite || query.tags?.size || query.what?.size || query.where?.size) {
            return null;
        }
        const output = new Map();
        const getEventsForCamera = async (cameraID) => {
            const perCameraQuery = { ...query, cameraIDs: new Set([cameraID]) };
            const cachedResult = engineOptions?.useCache ?? true ? this._requestCache.get(perCameraQuery) : null;
            if (cachedResult) {
                output.set(perCameraQuery, cachedResult);
                return;
            }
            const cameraConfig = store.getCameraConfig(cameraID);
            if (!cameraConfig) {
                return;
            }
            const directories = await this._getMatchingDirectories(hass, store, cameraID, perCameraQuery, engineOptions);
            if (!directories || !directories.length) {
                return;
            }
            const moviesDateFormat = this._convertMotionEyeTimeFormatToDateFNS(cameraConfig.motioneye.movies.file_pattern);
            const imagesDateFormat = this._convertMotionEyeTimeFormatToDateFNS(cameraConfig.motioneye.images.file_pattern);
            const limit = perCameraQuery.limit ?? CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT;
            const media = await this._browseMediaWalker.walk(hass, [
                {
                    targets: directories,
                    metadataGenerator: (media, parent) => {
                        if (media.media_class === MEDIA_CLASS_IMAGE ||
                            media.media_class === MEDIA_CLASS_VIDEO) {
                            return this._motionEyeMetadataGeneratorFile(cameraID, media.media_class === MEDIA_CLASS_IMAGE
                                ? imagesDateFormat
                                : moviesDateFormat, media, parent);
                        }
                        return null;
                    },
                    earlyExit: (media) => media.length >= limit,
                    matcher: (media) => !media.can_expand &&
                        isMediaWithinDates(media, perCameraQuery.start, perCameraQuery.end),
                },
            ], {
                ...(engineOptions?.useCache !== false && { cache: this._fileCache }),
            });
            // Sort by most recent then slice at the query limit.
            const sortedMedia = orderBy(media, (media) => media._metadata?.startDate, 'desc').slice(0, perCameraQuery.limit ?? CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT);
            const result = {
                type: QueryResultsType.Event,
                engine: Engine.MotionEye,
                browseMedia: sortedMedia,
            };
            if (engineOptions?.useCache ?? true) {
                this._requestCache.set(perCameraQuery, { ...result, cached: true }, result.expiry);
            }
            output.set(perCameraQuery, result);
        };
        await allPromises(query.cameraIDs, (cameraID) => getEventsForCamera(cameraID));
        return output.size ? output : null;
    }
    generateMediaFromEvents(_hass, _store, _query, results) {
        if (!MotionEyeQueryResultsClassifier.isMotionEyeEventQueryResults(results)) {
            return null;
        }
        return getViewMediaFromBrowseMediaArray(results.browseMedia);
    }
    async getMediaMetadata(hass, store, query, engineOptions) {
        const output = new Map();
        if ((engineOptions?.useCache ?? true) && this._requestCache.has(query)) {
            const cachedResult = (this._requestCache.get(query));
            if (cachedResult) {
                output.set(query, cachedResult);
                return output;
            }
        }
        const days = new Set();
        const getDaysForCamera = async (cameraID) => {
            const directories = await this._getMatchingDirectories(hass, store, cameraID, null, engineOptions);
            for (const dayDirectory of directories ?? []) {
                if (dayDirectory._metadata?.startDate) {
                    days.add(formatDate(dayDirectory._metadata.startDate));
                }
            }
        };
        await allPromises(query.cameraIDs, (cameraID) => getDaysForCamera(cameraID));
        const result = {
            type: QueryResultsType.MediaMetadata,
            engine: Engine.MotionEye,
            metadata: {
                ...(days.size && { days: days }),
            },
            expiry: add(new Date(), { seconds: BROWSE_MEDIA_CACHE_SECONDS }),
            cached: false,
        };
        if (engineOptions?.useCache ?? true) {
            this._requestCache.set(query, { ...result, cached: true }, result.expiry);
        }
        output.set(query, result);
        return output;
    }
    getCameraMetadata(hass, cameraConfig) {
        return {
            ...super.getCameraMetadata(hass, cameraConfig),
            engineIcon: 'motioneye',
        };
    }
}

export { MotionEyeCameraManagerEngine };
//# sourceMappingURL=engine-motioneye-bf33e922.js.map
