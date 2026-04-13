import { eP as rangesOverlap, ep as QueryType, f8 as getMediaDownloadPath, f6 as BROWSE_MEDIA_CACHE_SECONDS } from './card-edc26888.js';
import { G as GenericCameraManagerEngine } from './engine-generic-ef1ad168.js';

/**
 * A utility method to determine if a browse media object matches against a
 * start and end date.
 * @param media The browse media object (with rich metadata).
 * @param start The optional start date.
 * @param end The optional end date.
 * @returns `true` if the media falls within the provided dates.
 */
const isMediaWithinDates = (media, start, end) => {
    // If there's no metadata, nothing matches.
    if (!media._metadata?.startDate || !media._metadata?.endDate) {
        return false;
    }
    if (start && end) {
        // Determine if:
        // - The media starts within the query timeframe.
        // - The media ends within the query timeframe.
        // - The media entirely encompasses the query timeframe.
        return rangesOverlap({
            start: media._metadata.startDate,
            end: media._metadata.endDate,
        }, {
            start: start,
            end: end,
        });
    }
    if (!start && end) {
        return media._metadata.startDate <= end;
    }
    if (start && !end) {
        return media._metadata.startDate >= start;
    }
    // If no date is specified at all, everything matches.
    return true;
};

/**
 * A base class for cameras that read events from HA BrowseMedia interface.
 */
class BrowseMediaCameraManagerEngine extends GenericCameraManagerEngine {
    constructor(entityRegistryManager, stateWatcher, browseMediaManager, resolvedMediaCache, requestCache, eventCallback) {
        super(stateWatcher, eventCallback);
        this._entityRegistryManager = entityRegistryManager;
        this._browseMediaWalker = browseMediaManager;
        this._resolvedMediaCache = resolvedMediaCache;
        this._requestCache = requestCache;
    }
    generateDefaultEventQuery(_store, cameraIDs, query) {
        return [
            {
                type: QueryType.Event,
                cameraIDs: cameraIDs,
                ...query,
            },
        ];
    }
    async getMediaDownloadPath(hass, _cameraConfig, media) {
        return getMediaDownloadPath(hass, media.getContentID(), this._resolvedMediaCache);
    }
    getQueryResultMaxAge(query) {
        if (query.type === QueryType.Event) {
            return BROWSE_MEDIA_CACHE_SECONDS;
        }
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getMediaCapabilities(_media) {
        return {
            canFavorite: false,
            canDownload: true,
        };
    }
}

export { BrowseMediaCameraManagerEngine as B, isMediaWithinDates as i };
//# sourceMappingURL=engine-browse-media-fdc06c3e.js.map
