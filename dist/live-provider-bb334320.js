import { eb as homeAssistantSignPath, A as AdvancedCameraCardError, l as localize, eR as z, ea as createProxiedEndpointIfNecessary, B as errorToConsole } from './card-edc26888.js';

/**
 * Fetch a JSON response from a signed or unsigned endpoint and validate it
 * against a Zod schema.
 * May throw.
 *
 * @param hass Home Assistant instance.
 * @param endpoint The endpoint to fetch from (string or Endpoint object).
 * @param schema The Zod schema to validate the response against.
 * @returns The parsed data or throws if fetch/validation fails.
 */
const homeAssistantSignAndFetch = async (hass, endpoint, schema, options) => {
    let url = endpoint.endpoint;
    const sign = endpoint.sign;
    // Sign the path if needed
    if (sign) {
        try {
            url = await homeAssistantSignPath(hass, url);
        }
        catch (error) {
            throw new AdvancedCameraCardError(localize('error.failed_sign'), {
                endpoint,
                error,
            });
        }
        if (!url) {
            throw new AdvancedCameraCardError(localize('error.failed_sign'), {
                endpoint,
            });
        }
    }
    let response;
    try {
        response = await fetch(url, {
            ...(options?.timeoutSeconds && {
                signal: AbortSignal.timeout(options.timeoutSeconds * 1000),
            }),
        });
    }
    catch (error) {
        throw new AdvancedCameraCardError(`${localize('error.failed_fetch')}: ${url}`, {
            endpoint,
            error,
        });
    }
    if (!response.ok) {
        throw new AdvancedCameraCardError(localize('error.failed_response'), {
            endpoint,
            response,
        });
    }
    let data;
    try {
        data = await response.json();
    }
    catch (error) {
        throw new AdvancedCameraCardError(localize('error.invalid_response'), {
            endpoint,
            response,
            error,
        });
    }
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
        throw new AdvancedCameraCardError(localize('error.invalid_response'), {
            endpoint,
            data,
            error: parsed.error,
        });
    }
    return parsed.data;
};

const go2RTCProducerSchema = z.object({
    medias: z.array(z.string()).optional(),
});
/**
 * Zod schema for Go2RTC stream information. Schema only covers the minimum
 * required by the card.
 * Response from `/api/streams?src=${stream}&video=all&audio=all&microphone`
 */
const go2RTCStreamInfoSchema = z.object({
    producers: z.array(go2RTCProducerSchema).optional(),
});

// Allow generous amount of time to fetch metadata (timeout matches that used in
// the Frigate frontend for the same call).
// See: https://github.com/dermotduffy/advanced-camera-card/issues/2313
const GO2RTC_METADATA_TIMEOUT_SECONDS = 10;
const getGo2RTCStreamMetadata = async (hass, endpoint) => {
    try {
        return await homeAssistantSignAndFetch(hass, endpoint, go2RTCStreamInfoSchema, {
            timeoutSeconds: GO2RTC_METADATA_TIMEOUT_SECONDS,
        });
    }
    catch (e) {
        errorToConsole(e);
        return null;
    }
};
const streamSupports2WayAudio = (streamInfo) => {
    if (!streamInfo?.producers) {
        return false;
    }
    return streamInfo.producers.some((producer) => producer.medias?.some((media) => media.includes('audio') &&
        (media.includes('sendonly') || media.includes('sendrecv'))) ?? false);
};
/**
 * Fetch go2rtc metadata and determine if the stream supports 2-way audio.
 * Handles proxy transformation if proxy config requires it.
 * Returns false if the endpoint is not available or fetch fails.
 *
 * Note: Caller is responsible for checking if live_provider is 'go2rtc' before calling.
 *
 * @param hass Home Assistant instance.
 * @param go2rtcMetadataEndpoint The go2rtc metadata endpoint.
 * @param proxyConfig The camera's proxy configuration for live streams.
 * @returns True if supports 2-way audio, false otherwise.
 */
const supports2WayAudio = async (hass, go2rtcMetadataEndpoint, proxyConfig) => {
    if (!go2rtcMetadataEndpoint) {
        return false;
    }
    const endpoint = await createProxiedEndpointIfNecessary(hass, go2rtcMetadataEndpoint, proxyConfig, { context: 'live', openLimit: 1 });
    const streamInfo = await getGo2RTCStreamMetadata(hass, endpoint);
    return streamSupports2WayAudio(streamInfo);
};

const getResolvedLiveProvider = (config) => {
    if (config?.live_provider === 'auto') {
        if (config.webrtc_card?.entity || config.webrtc_card?.url) {
            return 'webrtc-card';
        }
        else if (config.go2rtc?.stream || config.go2rtc?.url || config.go2rtc?.host) {
            return 'go2rtc';
        }
        else if (config.camera_entity) {
            return 'ha';
        }
        // Mini defaults avoid automatic JSMPEG selection, since canvas decoding is
        // expensive on weaker devices.
        return 'image';
    }
    return config?.live_provider ?? 'image';
};
const liveProviderSupports2WayAudio = async (hass, config, go2rtcMetadataEndpoint, proxyConfig) => {
    if (config.capabilities?.disable?.includes('2-way-audio')) {
        return false;
    }
    if (config.capabilities?.disable_except &&
        !config.capabilities.disable_except.includes('2-way-audio')) {
        return false;
    }
    if (getResolvedLiveProvider(config) !== 'go2rtc') {
        return false;
    }
    return supports2WayAudio(hass, go2rtcMetadataEndpoint, proxyConfig);
};

export { getResolvedLiveProvider as g, liveProviderSupports2WayAudio as l };
//# sourceMappingURL=live-provider-bb334320.js.map
