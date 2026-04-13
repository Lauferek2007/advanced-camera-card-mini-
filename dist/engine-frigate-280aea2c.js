import { em as toDate$1, eQ as baseUniq, eR as z, eS as dayToDate, eT as homeAssistantWSRequest, A as AdvancedCameraCardError, l as localize, eU as getCameraEntityFromConfig, eV as CameraInitializationError, R as format, B as errorToConsole, eW as PTZMovementType, eL as formatDateAndTime, O as prettifyTitle, eX as ViewMediaType, eY as ViewMedia, ed as VideoContentType, z as isEqual, eu as throttle, eZ as Engine, V as ViewItemClassifier, eq as uniqWith, ep as QueryType, e_ as runWhenIdleIfSupported, e$ as allPromises, f0 as QueryResultsType, eH as add, f as getEntityTitle, F as orderBy, es as formatDate } from './card-edc26888.js';
import { C as CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT } from './engine-58847671.js';
import { C as Camera, g as getPTZCapabilitiesFromCameraConfig, a as getGo2RTCMetadataEndpoint, b as getGo2RTCStreamEndpoint, G as GenericCameraManagerEngine } from './engine-generic-ef1ad168.js';
import { s as startOfHour, e as endOfHour } from './startOfHour-ac9bb25d.js';
import './live-provider-bb334320.js';

/**
 * @name fromUnixTime
 * @category Timestamp Helpers
 * @summary Create a date from a Unix timestamp.
 *
 * @description
 * Create a date from a Unix timestamp (in seconds). Decimal values will be discarded.
 *
 * @param unixTime - The given Unix timestamp (in seconds)
 *
 * @returns The date
 *
 * @example
 * // Create the date 29 February 2012 11:45:05:
 * const result = fromUnixTime(1330515905)
 * //=> Wed Feb 29 2012 11:45:05
 */
function fromUnixTime(unixTime) {
  return toDate$1(unixTime * 1000);
}

/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each element
 * is kept. The order of result values is determined by the order they occur
 * in the array.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */
function uniq(array) {
  return (array && array.length) ? baseUniq(array) : [];
}

const dayStringToDate = (arg) => {
    return typeof arg === 'string' ? dayToDate(arg) : arg;
};
const eventSchema = z.object({
    camera: z.string(),
    end_time: z.number().nullable(),
    false_positive: z.boolean().nullable(),
    has_clip: z.boolean(),
    has_snapshot: z.boolean(),
    id: z.string(),
    label: z.string(),
    sub_label: z.string().nullable(),
    start_time: z.number(),
    top_score: z.number().nullable(),
    zones: z.string().array(),
    retain_indefinitely: z.boolean().optional(),
});
const frigateEventsSchema = eventSchema.array();
const recordingSummaryHourSchema = z.object({
    hour: z.preprocess((arg) => Number(arg), z.number().min(0).max(23)),
    duration: z.number().min(0),
    events: z.number().min(0),
});
const recordingSummarySchema = z
    .object({
    day: z.preprocess(dayStringToDate, z.date()),
    events: z.number(),
    hours: recordingSummaryHourSchema.array(),
})
    .array();
const recordingSegmentSchema = z.object({
    start_time: z.number(),
    end_time: z.number(),
    id: z.string(),
});
const recordingSegmentsSchema = recordingSegmentSchema.array();
const retainResultSchema = z.object({
    success: z.boolean(),
    message: z.string(),
});
const eventSummarySchema = z
    .object({
    camera: z.string(),
    // Days in RFC3339 format.
    day: z.string(),
    label: z.string(),
    sub_label: z.string().nullable(),
    zones: z.string().array(),
})
    .array();
const ptzInfoSchema = z.object({
    name: z.string().optional(),
    features: z.string().array().optional(),
    presets: z.string().array().optional(),
});
const frigateEventChangeBeforeAfterSchema = z.object({
    camera: z.string(),
    id: z.string(),
    snapshot: z
        .object({
        frame_time: z.number(),
    })
        .nullable(),
    has_clip: z.boolean(),
    has_snapshot: z.boolean(),
    label: z.string(),
    current_zones: z.string().array(),
});
const frigateEventChangeSchema = z.object({
    before: frigateEventChangeBeforeAfterSchema,
    after: frigateEventChangeBeforeAfterSchema,
    type: z.enum(['new', 'update', 'end']),
});

/**
 * Get the recordings summary. May throw.
 * @param hass The Home Assistant object.
 * @param clientID The Frigate clientID.
 * @param camera_name The Frigate camera name.
 * @returns A RecordingSummary object.
 */
const getRecordingsSummary = async (hass, clientID, camera_name) => {
    return (await homeAssistantWSRequest(hass, recordingSummarySchema, {
        type: 'frigate/recordings/summary',
        instance_id: clientID,
        camera: camera_name,
        // Ask for the summary relative to HA timezone
        // See: https://github.com/dermotduffy/advanced-camera-card/issues/1267
        timezone: hass.config.time_zone,
    }, true));
};
/**
 * Get the recording segments. May throw.
 * @param hass The Home Assistant object.
 * @param params The recording segment query parameters.
 * @returns A RecordingSegments object.
 */
const getRecordingSegments = async (hass, params) => {
    return await homeAssistantWSRequest(hass, recordingSegmentsSchema, {
        type: 'frigate/recordings/get',
        ...params,
    }, true);
};
/**
 * Request that Frigate retain an event. May throw.
 * @param hass The HomeAssistant object.
 * @param clientID The Frigate clientID.
 * @param eventID The event ID to retain.
 * @param retain `true` to retain or `false` to unretain.
 */
async function retainEvent(hass, clientID, eventID, retain) {
    const retainRequest = {
        type: 'frigate/event/retain',
        instance_id: clientID,
        event_id: eventID,
        retain: retain,
    };
    const response = await homeAssistantWSRequest(hass, retainResultSchema, retainRequest, true);
    if (!response.success) {
        throw new AdvancedCameraCardError(localize('error.failed_retain'), {
            request: retainRequest,
            response: response,
        });
    }
}
/**
 * Get events over websocket. May throw.
 * @param hass The Home Assistant object.
 * @param params The events search parameters.
 * @returns An array of 'FrigateEvent's.
 */
const getEvents = async (hass, params) => {
    return await homeAssistantWSRequest(hass, frigateEventsSchema, {
        type: 'frigate/events/get',
        ...params,
    }, true);
};
const getEventSummary = async (hass, clientID) => {
    return await homeAssistantWSRequest(hass, eventSummarySchema, {
        type: 'frigate/events/summary',
        instance_id: clientID,
        // Ask for the summary relative to HA timezone
        // See: https://github.com/dermotduffy/advanced-camera-card/issues/1267
        timezone: hass.config.time_zone,
    }, true);
};
const getPTZInfo = async (hass, clientID, cameraName) => {
    return await homeAssistantWSRequest(hass, ptzInfoSchema, {
        type: 'frigate/ptz/info',
        instance_id: clientID,
        camera: cameraName,
    }, true);
};

const CAMERA_BIRDSEYE = 'birdseye';
const isBirdseye = (cameraConfig) => {
    return cameraConfig.frigate.camera_name === CAMERA_BIRDSEYE;
};
class FrigateCamera extends Camera {
    constructor() {
        super(...arguments);
        this._frigateEventHandler = (ev) => {
            const snapshotChange = (!ev.before.has_snapshot && ev.after.has_snapshot) ||
                ev.before.snapshot?.frame_time !== ev.after.snapshot?.frame_time;
            const clipChange = !ev.before.has_clip && ev.after.has_clip;
            const config = this.getConfig();
            const cameraID = this._config.id;
            if (!cameraID) {
                // This can happen if an event arrives during the time a camera is
                // initializing.
                return;
            }
            if ((config.frigate.zones?.length &&
                !config.frigate.zones.some((zone) => ev.after.current_zones.includes(zone))) ||
                (config.frigate.labels?.length && !config.frigate.labels.includes(ev.after.label))) {
                return;
            }
            const eventsToTriggerOn = config.triggers.events;
            if (!(eventsToTriggerOn.includes('events') ||
                (eventsToTriggerOn.includes('snapshots') && snapshotChange) ||
                (eventsToTriggerOn.includes('clips') && clipChange))) {
                return;
            }
            this._eventCallback?.({
                cameraID,
                id: ev.after.id,
                fidelity: 'high',
                type: ev.type,
                // In cases where there are both clip and snapshot media, ensure to only
                // trigger on the media type that is allowed by the configuration.
                clip: clipChange && eventsToTriggerOn.includes('clips'),
                snapshot: snapshotChange && eventsToTriggerOn.includes('snapshots'),
            });
        };
    }
    async initialize(options) {
        await this._initializeConfig(options.hass, options.entityRegistryManager);
        await super.initialize(options);
        if (this._capabilities?.has('trigger')) {
            await this._subscribeToEvents(options.hass, options.frigateEventWatcher);
        }
        return this;
    }
    async executePTZAction(executor, action, options) {
        if (await super.executePTZAction(executor, action, options)) {
            return true;
        }
        const cameraEntity = this.getConfig().camera_entity;
        if ((action === 'preset' && !options?.preset) || !cameraEntity) {
            return false;
        }
        // Awkward translation between card action and service parameters:
        // https://github.com/blakeblackshear/frigate-hass-integration/blob/dev/custom_components/frigate/services.yaml
        await executor.executeActions({
            actions: {
                action: 'perform-action',
                perform_action: 'frigate.ptz',
                data: {
                    action: options?.phase === 'stop'
                        ? 'stop'
                        : action === 'zoom_in' || action === 'zoom_out'
                            ? 'zoom'
                            : action === 'preset'
                                ? 'preset'
                                : 'move',
                    ...(options?.phase !== 'stop' && {
                        argument: action === 'zoom_in'
                            ? 'in'
                            : action === 'zoom_out'
                                ? 'out'
                                : action === 'preset'
                                    ? options?.preset
                                    : action,
                    }),
                },
                target: { entity_id: cameraEntity },
            },
        });
        return true;
    }
    async _initializeConfig(hass, entityRegistryManager) {
        const config = this.getConfig();
        const hasCameraName = !!config.frigate?.camera_name;
        const hasAutoTriggers = config.triggers.motion || config.triggers.occupancy;
        let entity = null;
        const cameraEntity = getCameraEntityFromConfig(config);
        // Entity information is required if the Frigate camera name is missing, or
        // if the entity requires automatic resolution of motion/occupancy sensors.
        if (cameraEntity && (!hasCameraName || hasAutoTriggers)) {
            entity = await entityRegistryManager.getEntity(hass, cameraEntity);
            if (!entity) {
                throw new CameraInitializationError(localize('error.no_camera_entity'), config);
            }
        }
        if (entity && !hasCameraName) {
            const resolvedName = this._getFrigateCameraNameFromEntity(entity);
            if (resolvedName) {
                this._config.frigate.camera_name = resolvedName;
            }
        }
        if (hasAutoTriggers) {
            // Try to find the correct entities for the motion & occupancy sensors.
            // We know they are binary_sensors, and that they'll have the same
            // config entry ID as the camera. Searching via unique_id ensures this
            // search still works if the user renames the entity_id.
            const binarySensorEntities = await entityRegistryManager.getMatchingEntities(hass, (ent) => ent.config_entry_id === entity?.config_entry_id &&
                !ent.disabled_by &&
                ent.entity_id.startsWith('binary_sensor.'));
            if (config.triggers.motion) {
                const motionEntity = this._getMotionSensor(config, [
                    ...binarySensorEntities.values(),
                ]);
                if (motionEntity) {
                    config.triggers.entities.push(motionEntity);
                }
            }
            if (config.triggers.occupancy) {
                const occupancyEntities = this._getOccupancySensor(config, [
                    ...binarySensorEntities.values(),
                ]);
                if (occupancyEntities) {
                    config.triggers.entities.push(...occupancyEntities);
                }
            }
            // De-duplicate triggering entities.
            config.triggers.entities = uniq(config.triggers.entities);
        }
    }
    async _getRawCapabilities(options) {
        const base = await super._getRawCapabilities(options);
        const config = this.getConfig();
        const frigatePTZ = await this._getPTZCapabilities(options.hass, config);
        const configPTZ = getPTZCapabilitiesFromCameraConfig(config);
        const combinedPTZ = configPTZ || frigatePTZ ? { ...frigatePTZ, ...configPTZ } : null;
        const birdseye = isBirdseye(config);
        return {
            ...base,
            'favorite-events': !birdseye,
            seek: !birdseye,
            clips: !birdseye,
            snapshots: !birdseye,
            recordings: !birdseye,
            ...(combinedPTZ && { ptz: combinedPTZ }),
        };
    }
    _getFrigateCameraNameFromEntity(entity) {
        if (entity.platform === 'frigate' &&
            entity.unique_id &&
            typeof entity.unique_id === 'string') {
            const match = entity.unique_id.match(/:camera:(?<camera>[^:]+)$/);
            if (match && match.groups) {
                return match.groups['camera'];
            }
        }
        return null;
    }
    getEndpoints(context) {
        const base = super.getEndpoints(context);
        const jsmpeg = this._getJSMPEGEndpoint();
        if (!base && !jsmpeg) {
            return null;
        }
        return {
            ...base,
            ...(jsmpeg && { jsmpeg }),
        };
    }
    _getGo2RTCMetadataEndpoint() {
        const stream = this._config.go2rtc?.stream ?? this._config.frigate.camera_name;
        const url = this._config.go2rtc?.url ??
            `/api/frigate/${this._config.frigate.client_id}/go2rtc`;
        return getGo2RTCMetadataEndpoint(this._config, { url, stream });
    }
    _getGo2RTCStreamEndpoint() {
        const stream = this._config.go2rtc?.stream ?? this._config.frigate.camera_name;
        const url = this._config.go2rtc?.url ??
            // go2rtc is exposed by the Frigate integration under the 'mse' path.
            `/api/frigate/${this._config.frigate.client_id}/mse`;
        return getGo2RTCStreamEndpoint(this._config, {
            url,
            stream,
        });
    }
    _getJSMPEGEndpoint() {
        if (!this._config.frigate.camera_name) {
            return null;
        }
        return {
            endpoint: `/api/frigate/${this._config.frigate.client_id}` +
                `/jsmpeg/${this._config.frigate.camera_name}`,
            sign: true,
        };
    }
    _getUIEndpoint(context) {
        if (!this._config.frigate.url) {
            return null;
        }
        if (!this._config.frigate.camera_name) {
            return { endpoint: this._config.frigate.url };
        }
        const cameraURL = `${this._config.frigate.url}/#${this._config.frigate.camera_name}`;
        if (context?.view === 'live') {
            return { endpoint: cameraURL };
        }
        const eventsURL = `${this._config.frigate.url}/events?camera=${this._config.frigate.camera_name}`;
        const recordingsURL = `${this._config.frigate.url}/recording/${this._config.frigate.camera_name}`;
        // If media is available, use it for a more precise URL.
        switch (context?.media?.getMediaType()) {
            case 'clip':
            case 'snapshot':
                return { endpoint: eventsURL };
            case 'recording':
                const startTime = context.media.getStartTime();
                return {
                    endpoint: recordingsURL + (startTime ? '/' + format(startTime, 'yyyy-MM-dd/HH') : ''),
                };
        }
        // Fall back to using the view.
        switch (context?.view) {
            case 'clip':
            case 'clips':
            case 'snapshots':
            case 'snapshot':
                return { endpoint: eventsURL };
            case 'recording':
            case 'recordings':
                return { endpoint: recordingsURL };
        }
        return { endpoint: cameraURL };
    }
    async _getPTZCapabilities(hass, cameraConfig) {
        if (!cameraConfig.frigate.camera_name || isBirdseye(cameraConfig)) {
            return null;
        }
        let ptzInfo = null;
        try {
            ptzInfo = await getPTZInfo(hass, cameraConfig.frigate.client_id, cameraConfig.frigate.camera_name);
        }
        catch (e) {
            errorToConsole(e);
            return null;
        }
        // Note: The Frigate integration only supports continuous PTZ movements
        // (regardless of the actual underlying camera capability).
        const panTilt = [
            ...(ptzInfo.features?.includes('pt') ? [PTZMovementType.Continuous] : []),
        ];
        const zoom = [
            ...(ptzInfo.features?.includes('zoom') ? [PTZMovementType.Continuous] : []),
        ];
        const presets = ptzInfo.presets;
        if (panTilt.length || zoom.length || presets?.length) {
            return {
                ...(panTilt.length && {
                    left: panTilt,
                    right: panTilt,
                    up: panTilt,
                    down: panTilt,
                }),
                ...(zoom.length && { zoomIn: zoom, zoomOut: zoom }),
                ...(presets?.length && { presets: presets }),
            };
        }
        return null;
    }
    /**
     * Get the motion sensor entity for a given camera.
     * @param cache The EntityCache of entity registry information.
     * @param cameraConfig The camera config in question.
     * @returns The entity id of the motion sensor or null.
     */
    _getMotionSensor(cameraConfig, entities) {
        if (cameraConfig.frigate.camera_name) {
            return (entities.find((entity) => typeof entity.unique_id === 'string' &&
                !!entity.unique_id?.match(new RegExp(`:motion_sensor:${cameraConfig.frigate.camera_name}`)))?.entity_id ?? null);
        }
        return null;
    }
    /**
     * Get the occupancy sensor entity for a given camera.
     * @param cache The EntityCache of entity registry information.
     * @param cameraConfig The camera config in question.
     * @returns The entity id of the occupancy sensor or null.
     */
    _getOccupancySensor(cameraConfig, entities) {
        const entityIDs = [];
        const addEntityIDIfFound = (cameraOrZone, label) => {
            const entityID = entities.find((entity) => typeof entity.unique_id === 'string' &&
                !!entity.unique_id?.match(new RegExp(`:occupancy_sensor:${cameraOrZone}_${label}`)))?.entity_id ?? null;
            if (entityID) {
                entityIDs.push(entityID);
            }
        };
        if (cameraConfig.frigate.camera_name) {
            // If zone(s) are specified, the master occupancy sensor for the overall
            // camera is not used by default (but could be manually added by the
            // user).
            const camerasAndZones = cameraConfig.frigate.zones?.length
                ? cameraConfig.frigate.zones
                : [cameraConfig.frigate.camera_name];
            const labels = cameraConfig.frigate.labels?.length
                ? cameraConfig.frigate.labels
                : ['all'];
            for (const cameraOrZone of camerasAndZones) {
                for (const label of labels) {
                    addEntityIDIfFound(cameraOrZone, label);
                }
            }
            if (entityIDs.length) {
                return entityIDs;
            }
        }
        return null;
    }
    async _subscribeToEvents(hass, frigateEventWatcher) {
        const config = this.getConfig();
        if (!config.triggers.events.length || !config.frigate.camera_name) {
            return;
        }
        /* istanbul ignore next -- exercising the matcher is not possible when the
        test uses an event watcher -- @preserve */
        const request = {
            instanceID: config.frigate.client_id,
            callback: (event) => this._frigateEventHandler(event),
            matcher: (event) => event.after.camera === config.frigate.camera_name,
        };
        await frigateEventWatcher.subscribe(hass, request);
        this._onDestroy(() => frigateEventWatcher.unsubscribe(request));
    }
}

class FrigateEventWatcher {
    constructor() {
        this._requests = [];
        this._unsubscribeCallback = {};
    }
    async subscribe(hass, request) {
        const shouldSubscribe = !this._hasSubscribers(request.instanceID);
        this._requests.push(request);
        if (shouldSubscribe) {
            this._unsubscribeCallback[request.instanceID] =
                await hass.connection.subscribeMessage((data) => this._receiveHandler(request.instanceID, data), { type: 'frigate/events/subscribe', instance_id: request.instanceID });
        }
    }
    async unsubscribe(request) {
        this._requests = this._requests.filter((existingRequest) => existingRequest !== request);
        if (!this._hasSubscribers(request.instanceID)) {
            const callback = this._unsubscribeCallback[request.instanceID];
            delete this._unsubscribeCallback[request.instanceID];
            // Callback may be undefined if unsubscribe is called while subscribe is
            // still awaiting the Home Assistant connection.
            await callback?.();
        }
    }
    _hasSubscribers(instanceID) {
        return !!this._requests.filter((request) => request.instanceID === instanceID)
            .length;
    }
    _receiveHandler(instanceID, data) {
        let json;
        try {
            json = JSON.parse(data);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (e) {
            console.warn('Received non-JSON payload as Frigate event', data);
            return;
        }
        const parsedEvent = frigateEventChangeSchema.safeParse(json);
        if (!parsedEvent.success) {
            console.warn('Received malformed Frigate event from Home Assistant', data);
            return;
        }
        for (const request of this._requests) {
            if (request.instanceID === instanceID &&
                (!request.matcher || request.matcher(parsedEvent.data))) {
                request.callback(parsedEvent.data);
            }
        }
    }
}

/**
 * Returns the [year, month, day, hour, minute, seconds] tokens of the provided
 * `date` as it will be rendered in the `timeZone`.
 */
function tzTokenizeDate(date, timeZone) {
    const dtf = getDateTimeFormat(timeZone);
    return 'formatToParts' in dtf ? partsOffset(dtf, date) : hackyOffset(dtf, date);
}
const typeToPos = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5,
};
function partsOffset(dtf, date) {
    try {
        const formatted = dtf.formatToParts(date);
        const filled = [];
        for (let i = 0; i < formatted.length; i++) {
            const pos = typeToPos[formatted[i].type];
            if (pos !== undefined) {
                filled[pos] = parseInt(formatted[i].value, 10);
            }
        }
        return filled;
    }
    catch (error) {
        if (error instanceof RangeError) {
            return [NaN];
        }
        throw error;
    }
}
function hackyOffset(dtf, date) {
    const formatted = dtf.format(date);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
    // const [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed
    // return [fYear, fMonth, fDay, fHour, fMinute, fSecond]
    return [
        parseInt(parsed[3], 10),
        parseInt(parsed[1], 10),
        parseInt(parsed[2], 10),
        parseInt(parsed[4], 10),
        parseInt(parsed[5], 10),
        parseInt(parsed[6], 10),
    ];
}
// Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
// to get deterministic local date/time output according to the `en-US` locale which
// can be used to extract local time parts as necessary.
const dtfCache = {};
function getDateTimeFormat(timeZone) {
    if (!dtfCache[timeZone]) {
        // New browsers use `hourCycle`, IE and Chrome <73 does not support it and uses `hour12`
        const testDateFormatted = new Intl.DateTimeFormat('en-US', {
            hourCycle: 'h23',
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date('2014-06-25T04:00:00.123Z'));
        const hourCycleSupported = testDateFormatted === '06/25/2014, 00:00:00' ||
            testDateFormatted === '‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00';
        dtfCache[timeZone] = hourCycleSupported
            ? new Intl.DateTimeFormat('en-US', {
                hourCycle: 'h23',
                timeZone: timeZone,
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
            : new Intl.DateTimeFormat('en-US', {
                hour12: false,
                timeZone: timeZone,
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
    }
    return dtfCache[timeZone];
}

/**
 * Use instead of `new Date(Date.UTC(...))` to support years below 100 which doesn't work
 * otherwise due to the nature of the
 * [`Date` constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#interpretation_of_two-digit_years.
 *
 * For `Date.UTC(...)`, use `newDateUTC(...).getTime()`.
 */
function newDateUTC(fullYear, month, day, hour, minute, second, millisecond) {
    const utcDate = new Date(0);
    utcDate.setUTCFullYear(fullYear, month, day);
    utcDate.setUTCHours(hour, minute, second, millisecond);
    return utcDate;
}

const MILLISECONDS_IN_HOUR$1 = 3600000;
const MILLISECONDS_IN_MINUTE$1 = 60000;
const patterns$1 = {
    timezone: /([Z+-].*)$/,
    timezoneZ: /^(Z)$/,
    timezoneHH: /^([+-]\d{2})$/,
    timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/,
};
// Parse constious time zone offset formats to an offset in milliseconds
function tzParseTimezone(timezoneString, date, isUtcDate) {
    // Empty string
    if (!timezoneString) {
        return 0;
    }
    // Z
    let token = patterns$1.timezoneZ.exec(timezoneString);
    if (token) {
        return 0;
    }
    let hours;
    let absoluteOffset;
    // ±hh
    token = patterns$1.timezoneHH.exec(timezoneString);
    if (token) {
        hours = parseInt(token[1], 10);
        if (!validateTimezone(hours)) {
            return NaN;
        }
        return -(hours * MILLISECONDS_IN_HOUR$1);
    }
    // ±hh:mm or ±hhmm
    token = patterns$1.timezoneHHMM.exec(timezoneString);
    if (token) {
        hours = parseInt(token[2], 10);
        const minutes = parseInt(token[3], 10);
        if (!validateTimezone(hours, minutes)) {
            return NaN;
        }
        absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR$1 + minutes * MILLISECONDS_IN_MINUTE$1;
        return token[1] === '+' ? -absoluteOffset : absoluteOffset;
    }
    // IANA time zone
    if (isValidTimezoneIANAString(timezoneString)) {
        date = new Date(date || Date.now());
        const utcDate = isUtcDate ? date : toUtcDate(date);
        const offset = calcOffset(utcDate, timezoneString);
        const fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString);
        return -fixedOffset;
    }
    return NaN;
}
function toUtcDate(date) {
    return newDateUTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
}
function calcOffset(date, timezoneString) {
    const tokens = tzTokenizeDate(date, timezoneString);
    // ms dropped because it's not provided by tzTokenizeDate
    const asUTC = newDateUTC(tokens[0], tokens[1] - 1, tokens[2], tokens[3] % 24, tokens[4], tokens[5], 0).getTime();
    let asTS = date.getTime();
    const over = asTS % 1000;
    asTS -= over >= 0 ? over : 1000 + over;
    return asUTC - asTS;
}
function fixOffset(date, offset, timezoneString) {
    const localTS = date.getTime();
    // Our UTC time is just a guess because our offset is just a guess
    let utcGuess = localTS - offset;
    // Test whether the zone matches the offset for this ts
    const o2 = calcOffset(new Date(utcGuess), timezoneString);
    // If so, offset didn't change, and we're done
    if (offset === o2) {
        return offset;
    }
    // If not, change the ts by the difference in the offset
    utcGuess -= o2 - offset;
    // If that gives us the local time we want, we're done
    const o3 = calcOffset(new Date(utcGuess), timezoneString);
    if (o2 === o3) {
        return o2;
    }
    // If it's different, we're in a hole time. The offset has changed, but we don't adjust the time
    return Math.max(o2, o3);
}
function validateTimezone(hours, minutes) {
    return -23 <= hours && hours <= 23 && (minutes == null || (0 <= minutes && minutes <= 59));
}
const validIANATimezoneCache = {};
function isValidTimezoneIANAString(timeZoneString) {
    if (validIANATimezoneCache[timeZoneString])
        return true;
    try {
        new Intl.DateTimeFormat(undefined, { timeZone: timeZoneString });
        validIANATimezoneCache[timeZoneString] = true;
        return true;
    }
    catch (error) {
        return false;
    }
}

/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return +date - +utcDate;
}

/** Regex to identify the presence of a time zone specifier in a date string */
const tzPattern = /(Z|[+-]\d{2}(?::?\d{2})?| UTC| [a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?)$/;

const MILLISECONDS_IN_HOUR = 3600000;
const MILLISECONDS_IN_MINUTE = 60000;
const DEFAULT_ADDITIONAL_DIGITS = 2;
const patterns = {
    dateTimePattern: /^([0-9W+-]+)(T| )(.*)/,
    datePattern: /^([0-9W+-]+)(.*)/,
    plainTime: /:/,
    // year tokens
    YY: /^(\d{2})$/,
    YYY: [
        /^([+-]\d{2})$/, // 0 additional digits
        /^([+-]\d{3})$/, // 1 additional digit
        /^([+-]\d{4})$/, // 2 additional digits
    ],
    YYYY: /^(\d{4})/,
    YYYYY: [
        /^([+-]\d{4})/, // 0 additional digits
        /^([+-]\d{5})/, // 1 additional digit
        /^([+-]\d{6})/, // 2 additional digits
    ],
    // date tokens
    MM: /^-(\d{2})$/,
    DDD: /^-?(\d{3})$/,
    MMDD: /^-?(\d{2})-?(\d{2})$/,
    Www: /^-?W(\d{2})$/,
    WwwD: /^-?W(\d{2})-?(\d{1})$/,
    HH: /^(\d{2}([.,]\d*)?)$/,
    HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
    HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
    // time zone tokens (to identify the presence of a tz)
    timeZone: tzPattern,
};
/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 * If the function cannot parse the string or the values are invalid, it returns Invalid Date.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
 *
 * @param argument the value to convert
 * @param options the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @param {string} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
 *
 * @returns the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * const result = toDate('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * const result = toDate('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function toDate(argument, options = {}) {
    if (arguments.length < 1) {
        throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
    }
    if (argument === null) {
        return new Date(NaN);
    }
    const additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
    if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
        throw new RangeError('additionalDigits must be 0, 1 or 2');
    }
    // Clone the date
    if (argument instanceof Date ||
        (typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]')) {
        // Prevent the date to lose the milliseconds when passed to new Date() in IE10
        return new Date(argument.getTime());
    }
    else if (typeof argument === 'number' ||
        Object.prototype.toString.call(argument) === '[object Number]') {
        return new Date(argument);
    }
    else if (!(Object.prototype.toString.call(argument) === '[object String]')) {
        return new Date(NaN);
    }
    const dateStrings = splitDateString(argument);
    const { year, restDateString } = parseYear(dateStrings.date, additionalDigits);
    const date = parseDate(restDateString, year);
    if (date === null || isNaN(date.getTime())) {
        return new Date(NaN);
    }
    if (date) {
        const timestamp = date.getTime();
        let time = 0;
        let offset;
        if (dateStrings.time) {
            time = parseTime(dateStrings.time);
            if (time === null || isNaN(time)) {
                return new Date(NaN);
            }
        }
        if (dateStrings.timeZone || options.timeZone) {
            offset = tzParseTimezone(dateStrings.timeZone || options.timeZone, new Date(timestamp + time));
            if (isNaN(offset)) {
                return new Date(NaN);
            }
        }
        else {
            // get offset accurate to hour in time zones that change offset
            offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time));
            offset = getTimezoneOffsetInMilliseconds(new Date(timestamp + time + offset));
        }
        return new Date(timestamp + time + offset);
    }
    else {
        return new Date(NaN);
    }
}
function splitDateString(dateString) {
    const dateStrings = {};
    let parts = patterns.dateTimePattern.exec(dateString);
    let timeString;
    if (!parts) {
        parts = patterns.datePattern.exec(dateString);
        if (parts) {
            dateStrings.date = parts[1];
            timeString = parts[2];
        }
        else {
            dateStrings.date = null;
            timeString = dateString;
        }
    }
    else {
        dateStrings.date = parts[1];
        timeString = parts[3];
    }
    if (timeString) {
        const token = patterns.timeZone.exec(timeString);
        if (token) {
            dateStrings.time = timeString.replace(token[1], '');
            dateStrings.timeZone = token[1].trim();
        }
        else {
            dateStrings.time = timeString;
        }
    }
    return dateStrings;
}
function parseYear(dateString, additionalDigits) {
    if (dateString) {
        const patternYYY = patterns.YYY[additionalDigits];
        const patternYYYYY = patterns.YYYYY[additionalDigits];
        // YYYY or ±YYYYY
        let token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
        if (token) {
            const yearString = token[1];
            return {
                year: parseInt(yearString, 10),
                restDateString: dateString.slice(yearString.length),
            };
        }
        // YY or ±YYY
        token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
        if (token) {
            const centuryString = token[1];
            return {
                year: parseInt(centuryString, 10) * 100,
                restDateString: dateString.slice(centuryString.length),
            };
        }
    }
    // Invalid ISO-formatted year
    return {
        year: null,
    };
}
function parseDate(dateString, year) {
    // Invalid ISO-formatted year
    if (year === null) {
        return null;
    }
    let date;
    let month;
    let week;
    // YYYY
    if (!dateString || !dateString.length) {
        date = new Date(0);
        date.setUTCFullYear(year);
        return date;
    }
    // YYYY-MM
    let token = patterns.MM.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        if (!validateDate(year, month)) {
            return new Date(NaN);
        }
        date.setUTCFullYear(year, month);
        return date;
    }
    // YYYY-DDD or YYYYDDD
    token = patterns.DDD.exec(dateString);
    if (token) {
        date = new Date(0);
        const dayOfYear = parseInt(token[1], 10);
        if (!validateDayOfYearDate(year, dayOfYear)) {
            return new Date(NaN);
        }
        date.setUTCFullYear(year, 0, dayOfYear);
        return date;
    }
    // yyyy-MM-dd or YYYYMMDD
    token = patterns.MMDD.exec(dateString);
    if (token) {
        date = new Date(0);
        month = parseInt(token[1], 10) - 1;
        const day = parseInt(token[2], 10);
        if (!validateDate(year, month, day)) {
            return new Date(NaN);
        }
        date.setUTCFullYear(year, month, day);
        return date;
    }
    // YYYY-Www or YYYYWww
    token = patterns.Www.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        if (!validateWeekDate(week)) {
            return new Date(NaN);
        }
        return dayOfISOWeekYear(year, week);
    }
    // YYYY-Www-D or YYYYWwwD
    token = patterns.WwwD.exec(dateString);
    if (token) {
        week = parseInt(token[1], 10) - 1;
        const dayOfWeek = parseInt(token[2], 10) - 1;
        if (!validateWeekDate(week, dayOfWeek)) {
            return new Date(NaN);
        }
        return dayOfISOWeekYear(year, week, dayOfWeek);
    }
    // Invalid ISO-formatted date
    return null;
}
function parseTime(timeString) {
    let hours;
    let minutes;
    // hh
    let token = patterns.HH.exec(timeString);
    if (token) {
        hours = parseFloat(token[1].replace(',', '.'));
        if (!validateTime(hours)) {
            return NaN;
        }
        return (hours % 24) * MILLISECONDS_IN_HOUR;
    }
    // hh:mm or hhmm
    token = patterns.HHMM.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseFloat(token[2].replace(',', '.'));
        if (!validateTime(hours, minutes)) {
            return NaN;
        }
        return (hours % 24) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
    }
    // hh:mm:ss or hhmmss
    token = patterns.HHMMSS.exec(timeString);
    if (token) {
        hours = parseInt(token[1], 10);
        minutes = parseInt(token[2], 10);
        const seconds = parseFloat(token[3].replace(',', '.'));
        if (!validateTime(hours, minutes, seconds)) {
            return NaN;
        }
        return (hours % 24) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
    }
    // Invalid ISO-formatted time
    return null;
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
    week = week || 0;
    day = day || 0;
    const date = new Date(0);
    date.setUTCFullYear(isoWeekYear, 0, 4);
    const fourthOfJanuaryDay = date.getUTCDay() || 7;
    const diff = week * 7 + day + 1 - fourthOfJanuaryDay;
    date.setUTCDate(date.getUTCDate() + diff);
    return date;
}
// Validation functions
const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
    return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}
function validateDate(year, month, date) {
    if (month < 0 || month > 11) {
        return false;
    }
    if (date != null) {
        if (date < 1) {
            return false;
        }
        const isLeapYear = isLeapYearIndex(year);
        if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
            return false;
        }
        if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
            return false;
        }
    }
    return true;
}
function validateDayOfYearDate(year, dayOfYear) {
    if (dayOfYear < 1) {
        return false;
    }
    const isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && dayOfYear > 366) {
        return false;
    }
    if (!isLeapYear && dayOfYear > 365) {
        return false;
    }
    return true;
}
function validateWeekDate(week, day) {
    if (week < 0 || week > 52) {
        return false;
    }
    if (day != null && (day < 0 || day > 6)) {
        return false;
    }
    return true;
}
function validateTime(hours, minutes, seconds) {
    if (hours < 0 || hours >= 25) {
        return false;
    }
    if (minutes != null && (minutes < 0 || minutes >= 60)) {
        return false;
    }
    if (seconds != null && (seconds < 0 || seconds >= 60)) {
        return false;
    }
    return true;
}

/**
 * @name toZonedTime
 * @category Time Zone Helpers
 * @summary Get a date/time representing local time in a given time zone from the UTC date
 *
 * @description
 * Returns a date instance with values representing the local time in the time zone
 * specified of the UTC time from the date provided. In other words, when the new date
 * is formatted it will show the equivalent hours in the target time zone regardless
 * of the current system time zone.
 *
 * @param date the date with the relevant UTC time
 * @param timeZone the time zone to get local time for, can be an offset or IANA time zone
 * @param options the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 *
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // In June 10am UTC is 6am in New York (-04:00)
 * const result = toZonedTime('2014-06-25T10:00:00.000Z', 'America/New_York')
 * //=> Jun 25 2014 06:00:00
 */
function toZonedTime(date, timeZone, options) {
    date = toDate(date, options);
    const offsetMilliseconds = tzParseTimezone(timeZone, date, true);
    const d = new Date(date.getTime() - offsetMilliseconds);
    const resultDate = new Date(0);
    resultDate.setFullYear(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    resultDate.setHours(d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
    return resultDate;
}

/**
 * Given an event generate a title.
 * @param event
 */
const getEventTitle = (event) => {
    const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const durationSeconds = Math.round(event.end_time
        ? event.end_time - event.start_time
        : Date.now() / 1000 - event.start_time);
    const score = event.top_score !== null ? ` ${Math.round(event.top_score * 100)}%` : '';
    return `${formatDateAndTime(toZonedTime(event.start_time * 1000, localTimezone))} [${durationSeconds}s, ${prettifyTitle(event.label)}${score}]`;
};
const getRecordingTitle = (cameraTitle, recording) => {
    return `${cameraTitle} ${formatDateAndTime(recording.startTime)}`;
};
/**
 * Get a thumbnail URL for an event.
 * @param clientId The Frigate client id.
 * @param event The event.
 * @returns A string URL.
 */
const getEventThumbnailURL = (clientId, event) => {
    return `/api/frigate/${clientId}/thumbnail/${event.id}`;
};
/**
 * Get a media content ID for an event.
 * @param clientId The Frigate client id.
 * @param cameraName The Frigate camera name.
 * @param event The Frigate event.
 * @param mediaType The media type required.
 * @returns A string media content id.
 */
const getEventMediaContentID = (clientId, cameraName, event, mediaType) => {
    return `media-source://frigate/${clientId}/event/${mediaType}/${cameraName}/${event.id}`;
};
/**
 * Generate a recording identifier.
 * @param clientId The Frigate client id.
 * @param cameraName The Frigate camera name.
 * @param recording The Frigate recording.
 * @returns A recording identifier.
 */
const getRecordingMediaContentID = (clientId, cameraName, recording) => {
    return [
        'media-source://frigate',
        clientId,
        'recordings',
        cameraName,
        `${recording.startTime.getFullYear()}-${String(recording.startTime.getMonth() + 1).padStart(2, '0')}-${String(String(recording.startTime.getDate()).padStart(2, '0'))}`,
        String(recording.startTime.getHours()).padStart(2, '0'),
    ].join('/');
};
/**
 * Get a recording ID for internal de-duping.
 */
const getRecordingID = (cameraConfig, recording) => {
    // ID name is derived from the real camera name (not CameraID) since the
    // recordings for the same camera across multiple zones will be the same and
    // can be dedup'd from this id.
    return `${cameraConfig.frigate?.client_id ?? ''}/${cameraConfig.frigate.camera_name ?? ''}/${recording.startTime.getTime()}/${recording.endTime.getTime()}`;
};

class FrigateEventViewMedia extends ViewMedia {
    constructor(mediaType, cameraID, event, contentID, thumbnail, 
    // See 'A note on Frigate sub_labels' in engine-frigate.ts for more
    // details about why sub-labels are treated specially. By taking in
    // subLabels as an array here, we can keep a single place that splits
    // sublabels (`_splitSubLabels` in engine-frigate.ts).
    subLabels) {
        super(mediaType, { cameraID });
        this._event = event;
        this._contentID = contentID;
        this._thumbnail = thumbnail;
        this._subLabels = subLabels ?? null;
    }
    getStartTime() {
        return fromUnixTime(this._event.start_time);
    }
    getEndTime() {
        return this._event.end_time ? fromUnixTime(this._event.end_time) : null;
    }
    inProgress() {
        // In Frigate, events/recordings always have end times unless they are in
        // progress.
        return !this.getEndTime();
    }
    getVideoContentType() {
        return VideoContentType.HLS;
    }
    getID() {
        return this._event.id;
    }
    getContentID() {
        return this._contentID;
    }
    getTitle() {
        return getEventTitle(this._event);
    }
    getThumbnail() {
        return this._thumbnail;
    }
    isFavorite() {
        return this._event.retain_indefinitely ?? null;
    }
    setFavorite(favorite) {
        this._event.retain_indefinitely = favorite;
    }
    getWhat() {
        return [this._event.label];
    }
    getWhere() {
        const zones = this._event.zones;
        return zones.length ? zones : null;
    }
    getScore() {
        return this._event.top_score;
    }
    getTags() {
        return this._subLabels;
    }
    isGroupableWith(that) {
        return (this.getMediaType() === that.getMediaType() &&
            isEqual(this.getWhere(), that.getWhere()) &&
            isEqual(this.getWhat(), that.getWhat()));
    }
}
class FrigateRecordingViewMedia extends ViewMedia {
    constructor(mediaType, cameraID, recording, id, contentID, title) {
        super(mediaType, { cameraID });
        this._recording = recording;
        this._id = id;
        this._contentID = contentID;
        this._title = title;
    }
    getID() {
        return this._id;
    }
    getStartTime() {
        return this._recording.startTime;
    }
    getEndTime() {
        return this._recording.endTime;
    }
    inProgress() {
        // In Frigate, events/recordings always have end times unless they are in
        // progress.
        return !this.getEndTime();
    }
    getVideoContentType() {
        return VideoContentType.HLS;
    }
    getContentID() {
        return this._contentID;
    }
    getTitle() {
        return this._title;
    }
    getEventCount() {
        return this._recording.events;
    }
}
class FrigateViewMediaFactory {
    static createEventViewMedia(mediaType, cameraID, cameraConfig, event, subLabels) {
        if ((mediaType === 'clip' && !event.has_clip) ||
            (mediaType === 'snapshot' && !event.has_snapshot) ||
            !cameraConfig.frigate.client_id ||
            !cameraConfig.frigate.camera_name) {
            return null;
        }
        return new FrigateEventViewMedia(mediaType, cameraID, event, getEventMediaContentID(cameraConfig.frigate.client_id, cameraConfig.frigate.camera_name, event, mediaType === 'clip' ? 'clips' : 'snapshots'), getEventThumbnailURL(cameraConfig.frigate.client_id, event), subLabels);
    }
    static createRecordingViewMedia(cameraID, recording, cameraConfig, cameraTitle) {
        if (!cameraConfig.frigate.client_id || !cameraConfig.frigate.camera_name) {
            return null;
        }
        return new FrigateRecordingViewMedia(ViewMediaType.Recording, cameraID, recording, getRecordingID(cameraConfig, recording), getRecordingMediaContentID(cameraConfig.frigate.client_id, cameraConfig.frigate.camera_name, recording), getRecordingTitle(cameraTitle, recording));
    }
}

class FrigateViewMediaClassifier {
    static isFrigateMedia(media) {
        return this.isFrigateEvent(media) || this.isFrigateRecording(media);
    }
    static isFrigateEvent(media) {
        return media instanceof FrigateEventViewMedia;
    }
    static isFrigateRecording(media) {
        return media instanceof FrigateRecordingViewMedia;
    }
}

const EVENT_REQUEST_CACHE_MAX_AGE_SECONDS = 60;
const RECORDING_SUMMARY_REQUEST_CACHE_MAX_AGE_SECONDS = 60;
const MEDIA_METADATA_REQUEST_CACHE_AGE_SECONDS = 60;
class FrigateQueryResultsClassifier {
    static isFrigateEventQueryResults(results) {
        return results.engine === Engine.Frigate && results.type === QueryResultsType.Event;
    }
    static isFrigateRecordingQueryResults(results) {
        return (results.engine === Engine.Frigate && results.type === QueryResultsType.Recording);
    }
    static isFrigateRecordingSegmentsResults(results) {
        return (results.engine === Engine.Frigate &&
            results.type === QueryResultsType.RecordingSegments);
    }
}
class FrigateCameraManagerEngine extends GenericCameraManagerEngine {
    constructor(entityRegistryManager, stateWatcher, recordingSegmentsCache, requestCache, eventCallback) {
        super(stateWatcher, eventCallback);
        // Garbage collect segments at most once an hour.
        this._throttledSegmentGarbageCollector = throttle(this._garbageCollectSegments.bind(this), 60 * 60 * 1000, { leading: false, trailing: true });
        this._entityRegistryManager = entityRegistryManager;
        this._frigateEventWatcher = new FrigateEventWatcher();
        this._recordingSegmentsCache = recordingSegmentsCache;
        this._requestCache = requestCache;
    }
    getEngineType() {
        return Engine.Frigate;
    }
    async createCamera(hass, cameraConfig) {
        const camera = new FrigateCamera(cameraConfig, this, {
            eventCallback: this._eventCallback,
        });
        return await camera.initialize({
            hass,
            entityRegistryManager: this._entityRegistryManager,
            stateWatcher: this._stateWatcher,
            frigateEventWatcher: this._frigateEventWatcher,
        });
    }
    async getMediaDownloadPath(_hass, cameraConfig, media) {
        if (FrigateViewMediaClassifier.isFrigateEvent(media)) {
            return {
                endpoint: `/api/frigate/${cameraConfig.frigate.client_id}` +
                    `/notifications/${media.getID()}/` +
                    `${ViewItemClassifier.isClip(media) ? 'clip.mp4' : 'snapshot.jpg'}` +
                    `?download=true`,
                sign: true,
            };
        }
        else if (FrigateViewMediaClassifier.isFrigateRecording(media)) {
            return {
                endpoint: `/api/frigate/${cameraConfig.frigate.client_id}` +
                    `/recording/${cameraConfig.frigate.camera_name}` +
                    `/start/${Math.floor(media.getStartTime().getTime() / 1000)}` +
                    `/end/${Math.floor(media.getEndTime().getTime() / 1000)}` +
                    `?download=true`,
                sign: true,
            };
        }
        return null;
    }
    generateDefaultEventQuery(store, cameraIDs, query) {
        const relevantCameraConfigs = [...store.getCameraConfigs(cameraIDs)];
        // If all cameras specify exactly the same zones or labels (incl. none), we
        // can use a single batch query which will be better performance wise,
        // otherwise we must fan out to multiple queries in order to precisely match
        // the user's intent.
        const uniqueZoneArrays = uniqWith(relevantCameraConfigs.map((config) => config?.frigate.zones), isEqual);
        const uniqueLabelArrays = uniqWith(relevantCameraConfigs.map((config) => config?.frigate.labels), isEqual);
        if (uniqueZoneArrays.length === 1 && uniqueLabelArrays.length === 1) {
            return [
                {
                    type: QueryType.Event,
                    cameraIDs: cameraIDs,
                    ...(uniqueLabelArrays[0] && { what: new Set(uniqueLabelArrays[0]) }),
                    ...(uniqueZoneArrays[0] && { where: new Set(uniqueZoneArrays[0]) }),
                    ...query,
                },
            ];
        }
        const output = [];
        for (const cameraID of cameraIDs) {
            const cameraConfig = store.getCameraConfig(cameraID);
            if (cameraConfig) {
                output.push({
                    type: QueryType.Event,
                    cameraIDs: new Set([cameraID]),
                    ...(cameraConfig.frigate.labels && {
                        what: new Set(cameraConfig.frigate.labels),
                    }),
                    ...(cameraConfig.frigate.zones && {
                        where: new Set(cameraConfig.frigate.zones),
                    }),
                    ...query,
                });
            }
        }
        return output.length ? output : null;
    }
    generateDefaultRecordingQuery(_store, cameraIDs, query) {
        return [
            {
                type: QueryType.Recording,
                cameraIDs: cameraIDs,
                ...query,
            },
        ];
    }
    generateDefaultRecordingSegmentsQuery(_store, cameraIDs, query) {
        if (!query.start || !query.end) {
            return null;
        }
        return [
            {
                type: QueryType.RecordingSegments,
                cameraIDs: cameraIDs,
                start: query.start,
                end: query.end,
                ...query,
            },
        ];
    }
    async favoriteMedia(hass, cameraConfig, media, favorite) {
        if (!FrigateViewMediaClassifier.isFrigateEvent(media)) {
            return;
        }
        await retainEvent(hass, cameraConfig.frigate.client_id, media.getID(), favorite);
        media.setFavorite(favorite);
    }
    _buildInstanceToCameraIDMapFromQuery(store, cameraIDs) {
        const output = new Map();
        for (const cameraID of cameraIDs) {
            const cameraConfig = this._getQueryableCameraConfig(store, cameraID);
            const clientID = cameraConfig?.frigate.client_id;
            if (clientID) {
                if (!output.has(clientID)) {
                    output.set(clientID, new Set());
                }
                output.get(clientID)?.add(cameraID);
            }
        }
        return output;
    }
    _getFrigateCameraNamesForCameraIDs(store, cameraIDs) {
        const output = new Set();
        for (const cameraID of cameraIDs) {
            const cameraConfig = this._getQueryableCameraConfig(store, cameraID);
            if (cameraConfig?.frigate.camera_name) {
                output.add(cameraConfig.frigate.camera_name);
            }
        }
        return output;
    }
    async getEvents(hass, store, query, engineOptions) {
        const output = new Map();
        const processInstanceQuery = async (instanceID, cameraIDs) => {
            if (!cameraIDs || !cameraIDs.size) {
                return;
            }
            const instanceQuery = { ...query, cameraIDs: cameraIDs };
            const cachedResult = engineOptions?.useCache ?? true ? this._requestCache.get(instanceQuery) : null;
            if (cachedResult) {
                output.set(query, cachedResult);
                return;
            }
            const nativeQuery = {
                instance_id: instanceID,
                cameras: Array.from(this._getFrigateCameraNamesForCameraIDs(store, cameraIDs)),
                ...(query.what && { labels: Array.from(query.what) }),
                ...(query.where && { zones: Array.from(query.where) }),
                ...(query.tags && { sub_labels: Array.from(query.tags) }),
                ...(query.end && { before: Math.floor(query.end.getTime() / 1000) }),
                ...(query.start && { after: Math.floor(query.start.getTime() / 1000) }),
                ...(query.limit && { limit: query.limit }),
                ...(query.hasClip && { has_clip: query.hasClip }),
                ...(query.hasSnapshot && { has_snapshot: query.hasSnapshot }),
                ...(query.favorite && { favorites: query.favorite }),
                limit: query?.limit ?? CAMERA_MANAGER_ENGINE_EVENT_LIMIT_DEFAULT,
            };
            const result = {
                type: QueryResultsType.Event,
                engine: Engine.Frigate,
                instanceID: instanceID,
                events: await getEvents(hass, nativeQuery),
                expiry: add(new Date(), { seconds: EVENT_REQUEST_CACHE_MAX_AGE_SECONDS }),
                cached: false,
            };
            if (engineOptions?.useCache ?? true) {
                this._requestCache.set(query, { ...result, cached: true }, result.expiry);
            }
            output.set(instanceQuery, result);
        };
        // Frigate allows multiple cameras to be searched for events in a single
        // query. Break them down into groups of cameras per Frigate instance, then
        // query once per instance for all cameras in that instance.
        const instances = this._buildInstanceToCameraIDMapFromQuery(store, query.cameraIDs);
        await Promise.all(Array.from(instances.keys()).map((instanceID) => processInstanceQuery(instanceID, instances.get(instanceID))));
        return output.size ? output : null;
    }
    async getRecordings(hass, store, query, engineOptions) {
        const output = new Map();
        const processQuery = async (baseQuery, cameraID) => {
            const query = { ...baseQuery, cameraIDs: new Set([cameraID]) };
            const cachedResult = engineOptions?.useCache ?? true ? this._requestCache.get(query) : null;
            if (cachedResult) {
                output.set(query, cachedResult);
                return;
            }
            const cameraConfig = this._getQueryableCameraConfig(store, cameraID);
            if (!cameraConfig || !cameraConfig.frigate.camera_name) {
                return;
            }
            const recordingSummary = await getRecordingsSummary(hass, cameraConfig.frigate.client_id, cameraConfig.frigate.camera_name);
            let recordings = [];
            for (const dayData of recordingSummary ?? []) {
                for (const hourData of dayData.hours) {
                    const hour = add(dayData.day, { hours: hourData.hour });
                    const startHour = startOfHour(hour);
                    const endHour = endOfHour(hour);
                    if ((!query.start || startHour >= query.start) &&
                        (!query.end || endHour <= query.end)) {
                        recordings.push({
                            cameraID: cameraID,
                            startTime: startHour,
                            endTime: endHour,
                            events: hourData.events,
                        });
                    }
                }
            }
            if (query.limit !== undefined) {
                // Frigate does not natively support a way to limit recording searches so
                // this simulates it.
                recordings = orderBy(recordings, (recording) => recording.startTime, 'desc').slice(0, query.limit);
            }
            const result = {
                type: QueryResultsType.Recording,
                engine: Engine.Frigate,
                instanceID: cameraConfig.frigate.client_id,
                recordings: recordings,
                expiry: add(new Date(), {
                    seconds: RECORDING_SUMMARY_REQUEST_CACHE_MAX_AGE_SECONDS,
                }),
                cached: false,
            };
            if (engineOptions?.useCache ?? true) {
                this._requestCache.set(query, { ...result, cached: true }, result.expiry);
            }
            output.set(query, result);
        };
        // Frigate recordings can only be queried for a single camera, so fan out
        // the inbound query into multiple outbound queries.
        await Promise.all(Array.from(query.cameraIDs).map((cameraID) => processQuery(query, cameraID)));
        return output.size ? output : null;
    }
    async getRecordingSegments(hass, store, query, engineOptions) {
        const output = new Map();
        const processQuery = async (baseQuery, cameraID) => {
            const query = { ...baseQuery, cameraIDs: new Set([cameraID]) };
            const cameraConfig = this._getQueryableCameraConfig(store, cameraID);
            if (!cameraConfig || !cameraConfig.frigate.camera_name) {
                return;
            }
            const range = { start: query.start, end: query.end };
            // A note on Frigate Recording Segments:
            // - There is an internal cache at the engine level for segments to allow
            //   caching "within an existing query" (e.g. if we already cached hour
            //   1-8, we will avoid a fetch if we request hours 2-3 even though the
            //   query is different -- the segments won't be). This is since the
            //   volume of data in segment transfers can be high, and the segments can
            //   be used in high frequency situations (e.g. video seeking).
            const cachedSegments = engineOptions?.useCache ?? true
                ? this._recordingSegmentsCache.get(cameraID, range)
                : null;
            if (cachedSegments) {
                output.set(query, {
                    type: QueryResultsType.RecordingSegments,
                    engine: Engine.Frigate,
                    instanceID: cameraConfig.frigate.client_id,
                    segments: cachedSegments,
                    cached: true,
                });
                return;
            }
            const request = {
                instance_id: cameraConfig.frigate.client_id,
                camera: cameraConfig.frigate.camera_name,
                after: Math.floor(query.start.getTime() / 1000),
                before: Math.floor(query.end.getTime() / 1000),
            };
            const segments = await getRecordingSegments(hass, request);
            if (engineOptions?.useCache ?? true) {
                this._recordingSegmentsCache.add(cameraID, range, segments);
            }
            output.set(query, {
                type: QueryResultsType.RecordingSegments,
                engine: Engine.Frigate,
                instanceID: cameraConfig.frigate.client_id,
                segments: segments,
                cached: false,
            });
        };
        // Frigate recording segments can only be queried for a single camera, so
        // fan out the inbound query into multiple outbound queries.
        await Promise.all(Array.from(query.cameraIDs).map((cameraID) => processQuery(query, cameraID)));
        runWhenIdleIfSupported(() => this._throttledSegmentGarbageCollector(hass, store));
        return output.size ? output : null;
    }
    _getCameraIDMatch(store, query, instanceID, cameraName) {
        // If the query is only for a single cameraID, all results are assumed to
        // belong to it for performance reasons. Otherwise, we need to map the
        // instanceID and camera name for the known cameras, and get the precise
        // cameraID that matches the expected instance ID / camera name.
        if (query.cameraIDs.size === 1) {
            return [...query.cameraIDs][0];
        }
        for (const [cameraID, cameraConfig] of store.getCameraConfigEntries()) {
            if (cameraConfig.frigate.client_id === instanceID &&
                cameraConfig.frigate.camera_name === cameraName) {
                return cameraID;
            }
        }
        return null;
    }
    generateMediaFromEvents(_hass, store, query, results) {
        if (!FrigateQueryResultsClassifier.isFrigateEventQueryResults(results)) {
            return null;
        }
        const output = [];
        for (const event of results.events) {
            const cameraID = this._getCameraIDMatch(store, query, results.instanceID, event.camera);
            if (!cameraID) {
                continue;
            }
            const cameraConfig = this._getQueryableCameraConfig(store, cameraID);
            if (!cameraConfig) {
                continue;
            }
            let mediaType = null;
            if (!query.hasClip &&
                !query.hasSnapshot &&
                (event.has_clip || event.has_snapshot)) {
                mediaType = event.has_clip ? ViewMediaType.Clip : ViewMediaType.Snapshot;
            }
            else if (query.hasSnapshot && event.has_snapshot) {
                mediaType = ViewMediaType.Snapshot;
            }
            else if (query.hasClip && event.has_clip) {
                mediaType = ViewMediaType.Clip;
            }
            if (!mediaType) {
                continue;
            }
            const media = FrigateViewMediaFactory.createEventViewMedia(mediaType, cameraID, cameraConfig, event, event.sub_label ? this._splitSubLabels(event.sub_label) : undefined);
            if (media) {
                output.push(media);
            }
        }
        return output;
    }
    generateMediaFromRecordings(hass, store, _query, results) {
        if (!FrigateQueryResultsClassifier.isFrigateRecordingQueryResults(results)) {
            return null;
        }
        const output = [];
        for (const recording of results.recordings) {
            const cameraConfig = this._getQueryableCameraConfig(store, recording.cameraID);
            if (!cameraConfig) {
                continue;
            }
            const media = FrigateViewMediaFactory.createRecordingViewMedia(recording.cameraID, recording, cameraConfig, this.getCameraMetadata(hass, cameraConfig).title);
            if (media) {
                output.push(media);
            }
        }
        return output;
    }
    getQueryResultMaxAge(query) {
        if (query.type === QueryType.Event) {
            return EVENT_REQUEST_CACHE_MAX_AGE_SECONDS;
        }
        else if (query.type === QueryType.Recording) {
            return RECORDING_SUMMARY_REQUEST_CACHE_MAX_AGE_SECONDS;
        }
        return null;
    }
    async getMediaSeekTime(hass, store, media, target, engineOptions) {
        const start = media.getStartTime();
        const end = media.getEndTime();
        const cameraID = media.getCameraID();
        if (!start || !end || target < start || target > end || !cameraID) {
            return null;
        }
        const query = {
            cameraIDs: new Set([cameraID]),
            start: start,
            end: end,
            type: QueryType.RecordingSegments,
        };
        const results = await this.getRecordingSegments(hass, store, query, engineOptions);
        if (results) {
            return this._getSeekTimeInSegments(start, target, 
            // There will only be a single result since Frigate recording segments
            // searches are per camera which is specified singularly above.
            Array.from(results.values())[0].segments);
        }
        return null;
    }
    _getQueryableCameraConfig(store, cameraID) {
        const cameraConfig = store.getCameraConfig(cameraID);
        if (!cameraConfig || isBirdseye(cameraConfig)) {
            return null;
        }
        return cameraConfig;
    }
    _splitSubLabels(input) {
        // A note on Frigate sub_labels: As of Frigate v0.12 sub_labels is a string
        // (not an array) per event, but may contain comma-separated values (e.g.
        // double-take (https://github.com/jakowenko/double-take) identifying two
        // people in the same photo). When we search for multiple sub_labels, the
        // integration will comma-join them together, then the Frigate backend will
        // do the magic to match exactly or against a comma-separated part.
        return input.split(',').map((s) => s.trim());
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
        const what = new Set();
        const where = new Set();
        const days = new Set();
        const tags = new Set();
        const instances = this._buildInstanceToCameraIDMapFromQuery(store, query.cameraIDs);
        const processEventSummary = async (instanceID, cameraIDs) => {
            const cameraNames = this._getFrigateCameraNamesForCameraIDs(store, cameraIDs);
            for (const entry of await getEventSummary(hass, instanceID)) {
                if (!cameraNames.has(entry.camera)) {
                    // If this entry applies to a camera that *is* in this Frigate
                    // instance, but is *not* a configured camera in the card, skip it.
                    continue;
                }
                if (entry.label) {
                    what.add(entry.label);
                }
                if (entry.zones.length) {
                    entry.zones.forEach(where.add, where);
                }
                if (entry.day) {
                    days.add(entry.day);
                }
                if (entry.sub_label) {
                    this._splitSubLabels(entry.sub_label).forEach(tags.add, tags);
                }
            }
        };
        const processRecordings = async (cameraIDs) => {
            const recordings = await this.getRecordings(hass, store, {
                type: QueryType.Recording,
                cameraIDs: cameraIDs,
            }, engineOptions);
            if (!recordings) {
                return;
            }
            for (const result of recordings.values()) {
                if (!FrigateQueryResultsClassifier.isFrigateRecordingQueryResults(result)) {
                    continue;
                }
                for (const recording of result.recordings) {
                    // Frigate recordings are always 1 hour long, i.e. never span a day.
                    days.add(formatDate(recording.startTime));
                }
            }
        };
        await allPromises([...instances.entries()], ([instanceID, cameraIDs]) => (async () => {
            await Promise.all([
                processEventSummary(instanceID, cameraIDs),
                processRecordings(cameraIDs),
            ]);
        })());
        const result = {
            type: QueryResultsType.MediaMetadata,
            engine: Engine.Frigate,
            metadata: {
                ...(what.size && { what: what }),
                ...(where.size && { where: where }),
                ...(days.size && { days: days }),
                ...(tags.size && { tags: tags }),
            },
            expiry: add(new Date(), { seconds: MEDIA_METADATA_REQUEST_CACHE_AGE_SECONDS }),
            cached: false,
        };
        if (engineOptions?.useCache ?? true) {
            this._requestCache.set(query, { ...result, cached: true }, result.expiry);
        }
        output.set(query, result);
        return output;
    }
    /**
     * Garbage collect recording segments that no longer feature in the recordings
     * returned by the Frigate backend.
     */
    async _garbageCollectSegments(hass, store) {
        const cameraIDs = this._recordingSegmentsCache.getCameraIDs();
        const recordingQuery = {
            cameraIDs: new Set(cameraIDs),
            type: QueryType.Recording,
        };
        // Performance: _recordingSegments is potentially very large (e.g. 10K - 1M
        // items) and each item must be examined, so care required here to stick to
        // nothing worse than O(n) performance.
        const getHourID = (cameraID, startTime) => {
            return `${cameraID}/${startTime.getDate()}/${startTime.getHours()}`;
        };
        const results = await this.getRecordings(hass, store, recordingQuery);
        if (!results) {
            return;
        }
        for (const [query, result] of results) {
            if (!FrigateQueryResultsClassifier.isFrigateRecordingQueryResults(result)) {
                continue;
            }
            const goodHours = new Set();
            for (const recording of result.recordings) {
                goodHours.add(getHourID(recording.cameraID, recording.startTime));
            }
            // Frigate recordings are always executed individually, so there'll only
            // be a single results.
            const cameraID = Array.from(query.cameraIDs)[0];
            this._recordingSegmentsCache.expireMatches(cameraID, (segment) => {
                const hourID = getHourID(cameraID, fromUnixTime(segment.start_time));
                // ~O(1) lookup time for a JS set.
                return !goodHours.has(hourID);
            });
        }
    }
    /**
     * Get the number of seconds to seek into a video stream consisting of the
     * provided segments to reach the target time provided.
     * @param startTime The earliest allowable time to seek from.
     * @param targetTime Target time.
     * @param segments An array of segments dataset items. Must be sorted from oldest to youngest.
     * @returns
     */
    _getSeekTimeInSegments(startTime, targetTime, segments) {
        if (!segments.length) {
            return null;
        }
        let seekMilliseconds = 0;
        // Inspired by: https://github.com/blakeblackshear/frigate/blob/release-0.11.0/web/src/routes/Recording.jsx#L27
        for (const segment of segments) {
            const segmentStart = fromUnixTime(segment.start_time);
            if (segmentStart > targetTime) {
                break;
            }
            const segmentEnd = fromUnixTime(segment.end_time);
            const start = segmentStart < startTime ? startTime : segmentStart;
            const end = segmentEnd > targetTime ? targetTime : segmentEnd;
            seekMilliseconds += end.getTime() - start.getTime();
        }
        return seekMilliseconds / 1000;
    }
    getMediaCapabilities(media) {
        return {
            canFavorite: ViewItemClassifier.isEvent(media),
            canDownload: true,
        };
    }
    getCameraMetadata(hass, cameraConfig) {
        return {
            ...super.getCameraMetadata(hass, cameraConfig),
            title: cameraConfig.title ??
                getEntityTitle(hass, cameraConfig.camera_entity) ??
                getEntityTitle(hass, cameraConfig.webrtc_card?.entity) ??
                prettifyTitle(cameraConfig.frigate?.camera_name) ??
                cameraConfig.id ??
                '',
            engineIcon: 'frigate',
        };
    }
}

export { FrigateCameraManagerEngine };
//# sourceMappingURL=engine-frigate-280aea2c.js.map
