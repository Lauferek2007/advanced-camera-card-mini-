import { F as orderBy, l as localize, eW as PTZMovementType, f7 as createSelectOptionAction, eV as CameraInitializationError, f1 as BrowseMediaCache, eZ as Engine, f5 as MEDIA_CLASS_VIDEO, er as parse, f2 as isValidDate, eH as add, en as startOfDay, e$ as allPromises, f3 as getViewMediaFromBrowseMediaArray, f0 as QueryResultsType, es as formatDate, f6 as BROWSE_MEDIA_CACHE_SECONDS } from './card-edc26888.js';
import { B as BrowseMediaCameraManagerEngine, i as isMediaWithinDates } from './engine-browse-media-fdc06c3e.js';
import { C as CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT } from './engine-58847671.js';
import { E as EntityCamera } from './entity-camera-4cea3735.js';
import { g as getPTZCapabilitiesFromCameraConfig } from './engine-generic-ef1ad168.js';
import { e as endOfDay } from './endOfDay-10c9656f.js';
import './live-provider-bb334320.js';

// Unlike sorting of view items (see card-controller/view/sort.ts), for browse
// media we often need to sort by most recent first to apply an item count
// cutoff from the most recent (this differs from how items may be sorted prior
// to presentation).
//
// See: https://github.com/dermotduffy/advanced-camera-card/issues/2078
const sortMostRecentFirst = (media) => {
    return orderBy(media, (media) => media._metadata?.startDate, 'desc');
};

// Reolink channels are zero indexed.
const REOLINK_DEFAULT_CHANNEL = 0;
class ReolinkInitializationError extends CameraInitializationError {
}
class ReolinkCamera extends EntityCamera {
    constructor() {
        super(...arguments);
        // The HostID identifying the camera or NVR.
        this._reolinkHostID = null;
        // For NVRs, the Camera UID.
        this._reolinkCameraUID = null;
        // The channel number as used by the Reolink integration.
        this._reolinkChannel = null;
        // Entities used for PTZ control.
        this._ptzEntities = null;
    }
    /**
     * Reolink cameras require additional options not present in the base class
     * initialization options, so this ~empty method is used to expand the type
     * expectations. Without this, callers cannot specify objects (e.g. the device
     * registry) without TypeScript errors.
     */
    async initialize(options) {
        return super.initialize(options);
    }
    async _getChannelFromConfigurationURL(hass, deviceRegistryManager) {
        const deviceID = this._entity?.device_id;
        if (!deviceID) {
            return null;
        }
        const device = await deviceRegistryManager.getDevice(hass, deviceID);
        if (!device?.configuration_url) {
            return null;
        }
        try {
            const url = new URL(device.configuration_url);
            const channel = Number(url.searchParams.get('ch'));
            return isNaN(channel) ? null : channel;
        }
        catch {
            // Ignore invalid URLs.
            return null;
        }
    }
    async _initializeChannel(hass, deviceRegistryManager) {
        const uniqueID = this._entity?.unique_id;
        // Reolink camera unique IDs are dual-mode, they may be in either of these
        // forms:
        //  - Directly connected cameras: [HostID]_[Channel #]_[...]
        //    (e.g. `95270002FS8D4RUP_0_sub`)
        //  - NVR/Hub connected cameras: [HostID]_[Camera UID]_[...]
        //    (e.g. `9527000HXU4V1VHZ_9527000I7E5F1GYU_sub`)
        //
        // The channel number is always numeric and assumed to be <1000, see similar
        // comparisons in the integration itself:
        // https://github.com/home-assistant/core/blob/dev/homeassistant/components/reolink/media_source.py#L174
        //
        // In the latter form, the channel number cannot be inferred from the entity
        // and must only be taken from the user config instead.
        const match = uniqueID
            ? String(uniqueID).match(/^(?<hostid>[^_]+)_(?<channel_or_uid>[^_]+)_/)
            : null;
        const hostid = match?.groups?.hostid ?? null;
        const channelOrUID = match?.groups?.channel_or_uid ?? null;
        if (hostid === null || channelOrUID === null) {
            throw new ReolinkInitializationError(localize('error.camera_initialization_reolink'), this.getConfig());
        }
        const channelCandidate = Number(channelOrUID);
        const isValidChannel = !isNaN(channelCandidate) && channelCandidate <= 999;
        const channel = 
        // Channel from the unique ID itself (for directly connected cameras).
        (isValidChannel ? channelCandidate : null) ??
            // Channel from the configuration URL (for NVRs where the entity unique
            // id is based on the UID).
            (await this._getChannelFromConfigurationURL(hass, deviceRegistryManager)) ??
            // Fallback.
            REOLINK_DEFAULT_CHANNEL;
        const reolinkCameraUID = !isValidChannel ? channelOrUID : null;
        this._reolinkChannel = channel;
        this._reolinkHostID = hostid;
        this._reolinkCameraUID = reolinkCameraUID;
    }
    async _initialize(options) {
        await this._initializeChannel(options.hass, options.deviceRegistryManager);
        this._ptzEntities = await this._getPTZEntities(options.hass, options.entityRegistryManager);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _getUIEndpoint(_context) {
        return this._config.reolink?.url ? { endpoint: this._config.reolink.url } : null;
    }
    async _getRawCapabilities(options) {
        const configPTZ = getPTZCapabilitiesFromCameraConfig(this.getConfig());
        const reolinkPTZ = this._ptzEntities
            ? this._entitiesToCapabilities(options.hass, this._ptzEntities)
            : null;
        const combinedPTZ = configPTZ || reolinkPTZ ? { ...reolinkPTZ, ...configPTZ } : null;
        return {
            ...(await super._getRawCapabilities(options)),
            clips: true,
            ...(combinedPTZ && { ptz: combinedPTZ }),
        };
    }
    _entitiesToCapabilities(hass, ptzEntities) {
        const reolinkPTZCapabilities = {};
        for (const key of Object.keys(ptzEntities)) {
            switch (key) {
                case 'left':
                case 'right':
                case 'up':
                case 'down':
                    reolinkPTZCapabilities[key] = [PTZMovementType.Continuous];
                    break;
                case 'zoom_in':
                    reolinkPTZCapabilities.zoomIn = [PTZMovementType.Continuous];
                    break;
                case 'zoom_out':
                    reolinkPTZCapabilities.zoomOut = [PTZMovementType.Continuous];
                    break;
            }
        }
        const ptzPresetsEntityState = ptzEntities?.presets
            ? hass.states[ptzEntities.presets]
            : null;
        if (Array.isArray(ptzPresetsEntityState?.attributes.options)) {
            reolinkPTZCapabilities.presets = ptzPresetsEntityState.attributes.options;
        }
        /* istanbul ignore next: this path cannot be reached as ptzEntities will
        always have contents when this function is called  -- @preserve */
        return Object.keys(reolinkPTZCapabilities).length ? reolinkPTZCapabilities : null;
    }
    async _getPTZEntities(hass, entityRegistry) {
        /* istanbul ignore next: this path cannot be reached as an exception is
           thrown in initialize() if this value is not found -- @preserve */
        if (!this._reolinkHostID) {
            return null;
        }
        const uniqueIDPrefix = this._getPTZEntityUniqueIDPrefix();
        const allRelevantEntities = await entityRegistry.getMatchingEntities(hass, (ent) => ent.config_entry_id === this._entity?.config_entry_id &&
            !!ent.unique_id &&
            String(ent.unique_id).startsWith(uniqueIDPrefix) &&
            !ent.disabled_by);
        const buttonEntities = allRelevantEntities.filter((ent) => ent.entity_id.startsWith('button.'));
        const ptzPresetEntities = allRelevantEntities.filter((ent) => ent.unique_id === `${uniqueIDPrefix}ptz_preset` &&
            ent.entity_id.startsWith('select.'));
        const uniqueSuffixes = [
            'stop',
            'left',
            'right',
            'up',
            'down',
            'zoom_in',
            'zoom_out',
        ];
        const ptzEntities = {};
        for (const buttonEntity of buttonEntities) {
            for (const uniqueIDSuffix of uniqueSuffixes) {
                if (buttonEntity.unique_id &&
                    String(buttonEntity.unique_id).endsWith(uniqueIDSuffix)) {
                    ptzEntities[uniqueIDSuffix] = buttonEntity.entity_id;
                }
            }
        }
        if (ptzPresetEntities.length === 1) {
            ptzEntities.presets = ptzPresetEntities[0].entity_id;
        }
        return Object.keys(ptzEntities).length ? ptzEntities : null;
    }
    getChannel() {
        return this._reolinkChannel;
    }
    _getPTZEntityUniqueIDPrefix() {
        return `${this._reolinkHostID}_${this._reolinkCameraUID ?? this._reolinkChannel}_`;
    }
    getProxyConfig() {
        return {
            ...super.getProxyConfig(),
            // For reolink, media is always proxied unless explicitly turned off.
            media: this._config.proxy.media === 'auto' ? true : this._config.proxy.media,
            // Reolink does not verify SSL certificates since they may be self-signed.
            ssl_verification: this._config.proxy.ssl_verification === 'auto'
                ? false
                : this._config.proxy.ssl_verification,
            // Through experimentation 'intermediate' is the "highest
            // lowest-common-denominator" Reolink devices appear to support.
            ssl_ciphers: this._config.proxy.ssl_ciphers === 'auto'
                ? 'intermediate'
                : this._config.proxy.ssl_ciphers,
        };
    }
    async executePTZAction(executor, action, options) {
        if (await super.executePTZAction(executor, action, options)) {
            return true;
        }
        if (!this._ptzEntities) {
            return false;
        }
        if (action === 'preset') {
            const entityID = this._ptzEntities.presets;
            const preset = options?.preset;
            if (!preset || !entityID) {
                return false;
            }
            await executor.executeActions({
                actions: [createSelectOptionAction('select', entityID, preset)],
            });
            return true;
        }
        const entityID = options?.phase === 'start'
            ? this._ptzEntities[action]
            : options?.phase === 'stop'
                ? this._ptzEntities.stop
                : null;
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

class ReolinkQueryResultsClassifier {
    static isReolinkEventQueryResults(results) {
        return results.engine === Engine.Reolink && results.type === QueryResultsType.Event;
    }
}
class ReolinkCameraManagerEngine extends BrowseMediaCameraManagerEngine {
    constructor(entityRegistryManager, deviceRegistryManager, stateWatcher, browseMediaManager, resolvedMediaCache, requestCache, eventCallback) {
        super(entityRegistryManager, stateWatcher, browseMediaManager, resolvedMediaCache, requestCache, eventCallback);
        this._camerasCache = new BrowseMediaCache();
        this._cache = new BrowseMediaCache();
        this._deviceRegistryManager = deviceRegistryManager;
    }
    getEngineType() {
        return Engine.Reolink;
    }
    _reolinkFileMetadataGenerator(cameraID, media, parent) {
        /* istanbul ignore next: This situation cannot happen as the directory would
        be rejected by _reolinkDirectoryMetadataGenerator if there was no start date
        -- @preserve */
        if (!parent?._metadata?.startDate || media.media_class !== MEDIA_CLASS_VIDEO) {
            return null;
        }
        // Titles may be of the form:
        //  - "21:47:03 0:00:44"
        //  - "21:47:03 0:00:44 Person" (https://github.com/dermotduffy/advanced-camera-card/issues/1870)
        //  - "21:47:03 0:00:44 Vehicle Person" (https://github.com/dermotduffy/advanced-camera-card/issues/1870)
        const parts = media.title.split(/ +/);
        const startDate = parse(parts[0], 'HH:mm:ss', parent._metadata.startDate);
        if (!isValidDate(startDate)) {
            return null;
        }
        const durationMatch = parts.length > 1
            ? parts[1].match(/(?<hours>\d+):(?<minutes>\d+):(?<seconds>\d+)/)
            : null;
        const duration = durationMatch?.groups
            ? {
                hours: Number(durationMatch.groups.hours),
                minutes: Number(durationMatch.groups.minutes),
                seconds: Number(durationMatch.groups.seconds),
            }
            : null;
        const what = parts.length > 2
            ? parts
                .splice(2)
                .map((l) => l.toLowerCase())
                .sort()
            : null;
        return {
            cameraID: cameraID,
            startDate: startDate,
            endDate: duration ? add(startDate, duration) : startDate,
            ...(what && { what: what }),
        };
    }
    _reolinkDirectoryMetadataGenerator(cameraID, media) {
        // Title of the form: "2024/9/29"
        const parsedDate = parse(media.title, 'yyyy/M/d', new Date());
        return isValidDate(parsedDate)
            ? {
                cameraID: cameraID,
                startDate: startOfDay(parsedDate),
                endDate: endOfDay(parsedDate),
            }
            : null;
    }
    _reolinkCameraMetadataGenerator(media) {
        // Example: "media-source://reolink/CAM|01J8XHYTNH77WE3C654K03KX1F|0"
        const result = media.media_content_id.match(/^media-source:\/\/reolink\/CAM\|(?<configEntryID>.+)\|(?<channel>\d+)$/);
        return result?.groups
            ? {
                configEntryID: result.groups.configEntryID,
                channel: Number(result.groups.channel),
            }
            : null;
    }
    async createCamera(hass, cameraConfig) {
        const camera = new ReolinkCamera(cameraConfig, this, {
            eventCallback: this._eventCallback,
        });
        return await camera.initialize({
            entityRegistryManager: this._entityRegistryManager,
            deviceRegistryManager: this._deviceRegistryManager,
            hass,
            stateWatcher: this._stateWatcher,
        });
    }
    async _getMatchingDirectories(hass, camera, matchOptions, engineOptions) {
        const cameraConfig = camera.getConfig();
        const entity = camera.getEntity();
        const configID = entity?.config_entry_id;
        if (camera.getChannel() === null || !configID) {
            return null;
        }
        // First fetch all the Reolink cameras that show up under the media root,
        // that match the expected camera. Some Reolink cameras will not show up
        // here causing errors.
        // https://github.com/dermotduffy/advanced-camera-card/issues/1723
        const camerasWithMedia = await this._browseMediaWalker.walk(hass, [
            {
                targets: [`media-source://reolink`],
                metadataGenerator: (media, 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _parent) => this._reolinkCameraMetadataGenerator(media),
                matcher: (media) => media._metadata?.channel === camera.getChannel() &&
                    media._metadata?.configEntryID === configID,
            },
        ], {
            ...(engineOptions?.useCache !== false && { cache: this._camerasCache }),
        });
        if (!camerasWithMedia?.length) {
            return null;
        }
        return await this._browseMediaWalker.walk(hass, [
            {
                targets: [
                    `media-source://reolink/RES|${configID}|${camera.getChannel()}|` +
                        `${cameraConfig.reolink?.media_resolution === 'low' ? 'sub' : 'main'}`,
                ],
                metadataGenerator: (media, 
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                _parent) => this._reolinkDirectoryMetadataGenerator(camera.getID(), media),
                matcher: (media) => media.can_expand &&
                    isMediaWithinDates(media, matchOptions?.start, matchOptions?.end),
                sorter: (media) => sortMostRecentFirst(media),
            },
        ], {
            ...(engineOptions?.useCache !== false && { cache: this._cache }),
        });
    }
    async getEvents(hass, store, query, engineOptions) {
        // Reolink does not support these query types and they will never match.
        if (query.favorite ||
            query.tags?.size ||
            query.what?.size ||
            query.where?.size ||
            query.hasSnapshot) {
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
            const camera = store.getCamera(cameraID);
            const directories = camera && camera instanceof ReolinkCamera
                ? await this._getMatchingDirectories(hass, camera, perCameraQuery, engineOptions)
                : null;
            const limit = perCameraQuery.limit ?? CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT;
            let media = [];
            if (directories?.length) {
                media = await this._browseMediaWalker.walk(hass, [
                    {
                        targets: directories,
                        concurrency: 1,
                        metadataGenerator: (media, parent) => this._reolinkFileMetadataGenerator(cameraID, media, parent),
                        earlyExit: (media) => media.length >= limit,
                        matcher: (media) => !media.can_expand &&
                            isMediaWithinDates(media, perCameraQuery.start, perCameraQuery.end),
                        sorter: (media) => sortMostRecentFirst(media),
                    },
                ], {
                    ...(engineOptions?.useCache !== false && { cache: this._cache }),
                });
            }
            // Sort by most recent then slice at the query limit.
            const sortedMedia = orderBy(media, (media) => media._metadata?.startDate, 'desc').slice(0, limit);
            const result = {
                type: QueryResultsType.Event,
                engine: Engine.Reolink,
                browseMedia: sortedMedia,
            };
            if (engineOptions?.useCache ?? true) {
                this._requestCache.set(perCameraQuery, { ...result, cached: true }, result.expiry);
            }
            output.set(perCameraQuery, result);
        };
        await allPromises(query.cameraIDs, (cameraID) => getEventsForCamera(cameraID));
        return output;
    }
    generateMediaFromEvents(_hass, _store, _query, results) {
        if (!ReolinkQueryResultsClassifier.isReolinkEventQueryResults(results)) {
            return null;
        }
        return getViewMediaFromBrowseMediaArray(results.browseMedia);
    }
    async getMediaMetadata(hass, store, query, engineOptions) {
        const output = new Map();
        const cachedResult = engineOptions?.useCache ?? true ? this._requestCache.get(query) : null;
        if (cachedResult) {
            output.set(query, cachedResult);
            return output;
        }
        const days = new Set();
        const getDaysForCamera = async (cameraID) => {
            const camera = store.getCamera(cameraID);
            if (!camera || !(camera instanceof ReolinkCamera)) {
                return;
            }
            const directories = await this._getMatchingDirectories(hass, camera, null, engineOptions);
            for (const dayDirectory of directories ?? []) {
                /* istanbul ignore next: This situation cannot happen as the directory
                will not match without metadata -- @preserve */
                if (dayDirectory._metadata?.startDate) {
                    days.add(formatDate(dayDirectory._metadata.startDate));
                }
            }
        };
        await allPromises(query.cameraIDs, (cameraID) => getDaysForCamera(cameraID));
        const result = {
            type: QueryResultsType.MediaMetadata,
            engine: Engine.Reolink,
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
            engineIcon: 'reolink',
        };
    }
}

export { ReolinkCameraManagerEngine, ReolinkQueryResultsClassifier };
//# sourceMappingURL=engine-reolink-2ea31d63.js.map
