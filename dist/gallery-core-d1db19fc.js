import { em as toDate, en as startOfDay, eo as S, l as localize, e0 as EventMediaQuery, ep as QueryType, e1 as RecordingMediaQuery, Q as QueryClassifier, eq as uniqWith, z as isEqual, B as errorToConsole, O as prettifyTitle, er as parse, F as orderBy, R as format, es as formatDate, et as sub, _ as __decorate, y as n$1, a1 as contentsChanged, Y as e$2, w as fireAdvancedCameraCardEvent, C as x, a0 as n$2, v as r$1, u as s, t as t$1, J as e$3, eu as throttle, ev as sleep, x as r$2, d$ as THUMBNAIL_WIDTH_DEFAULT, ec as renderProgressIndicator } from './card-edc26888.js';
import { e as endOfDay } from './endOfDay-10c9656f.js';
import { A as AdvancedCameraCardDatePicker } from './date-picker-577d6f71.js';

/**
 * @name endOfMonth
 * @category Month Helpers
 * @summary Return the end of a month for the given date.
 *
 * @description
 * Return the end of a month for the given date.
 * The result will be in the local timezone.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @param date - The original date
 *
 * @returns The end of a month
 *
 * @example
 * // The end of a month for 2 September 2014 11:55:00:
 * const result = endOfMonth(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 30 2014 23:59:59.999
 */
function endOfMonth(date) {
  const _date = toDate(date);
  const month = _date.getMonth();
  _date.setFullYear(_date.getFullYear(), month + 1, 0);
  _date.setHours(23, 59, 59, 999);
  return _date;
}

/**
 * @name endOfToday
 * @category Day Helpers
 * @summary Return the end of today.
 * @pure false
 *
 * @description
 * Return the end of today.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @returns The end of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfToday()
 * //=> Mon Oct 6 2014 23:59:59.999
 */
function endOfToday() {
  return endOfDay(Date.now());
}

/**
 * @name endOfYesterday
 * @category Day Helpers
 * @summary Return the end of yesterday.
 * @pure false
 *
 * @description
 * Return the end of yesterday.
 *
 * @typeParam DateType - The `Date` type, the function operates on. Gets inferred from passed arguments. Allows to use extensions like [`UTCDate`](https://github.com/date-fns/utc).
 *
 * @returns The end of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = endOfYesterday()
 * //=> Sun Oct 5 2014 23:59:59.999
 */
function endOfYesterday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}

/**
 * @name startOfToday
 * @category Day Helpers
 * @summary Return the start of today.
 * @pure false
 *
 * @description
 * Return the start of today.
 *
 * @returns The start of today
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfToday()
 * //=> Mon Oct 6 2014 00:00:00
 */
function startOfToday() {
  return startOfDay(Date.now());
}

/**
 * @name startOfYesterday
 * @category Day Helpers
 * @summary Return the start of yesterday.
 * @pure false
 *
 * @description
 * Return the start of yesterday.
 *
 * @returns The start of yesterday
 *
 * @example
 * // If today is 6 October 2014:
 * const result = startOfYesterday()
 * //=> Sun Oct 5 2014 00:00:00
 */
function startOfYesterday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();

  const date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e$1(e){return class extends e{createRenderRoot(){const e=this.constructor,{registry:s,elementDefinitions:n,shadowRootOptions:o}=e;n&&!s&&(e.registry=new CustomElementRegistry,Object.entries(n).forEach((([t,s])=>e.registry.define(t,s))));const i=this.renderOptions.creationScope=this.attachShadow({...o,customElements:e.registry});return S(i,this.constructor.elementStyles),i}}}

var MediaFilterCoreFavoriteSelection;
(function (MediaFilterCoreFavoriteSelection) {
    MediaFilterCoreFavoriteSelection["Favorite"] = "favorite";
    MediaFilterCoreFavoriteSelection["NotFavorite"] = "not-favorite";
})(MediaFilterCoreFavoriteSelection || (MediaFilterCoreFavoriteSelection = {}));
var MediaFilterCoreWhen;
(function (MediaFilterCoreWhen) {
    MediaFilterCoreWhen["Today"] = "today";
    MediaFilterCoreWhen["Yesterday"] = "yesterday";
    MediaFilterCoreWhen["PastWeek"] = "past-week";
    MediaFilterCoreWhen["PastMonth"] = "past-month";
    MediaFilterCoreWhen["Custom"] = "custom";
})(MediaFilterCoreWhen || (MediaFilterCoreWhen = {}));
var MediaFilterMediaType;
(function (MediaFilterMediaType) {
    MediaFilterMediaType["Clips"] = "clips";
    MediaFilterMediaType["Snapshots"] = "snapshots";
    MediaFilterMediaType["Recordings"] = "recordings";
})(MediaFilterMediaType || (MediaFilterMediaType = {}));
class MediaFilterController {
    constructor(host) {
        this._cameraOptions = [];
        this._whenOptions = [];
        this._metaDataWhenOptions = [];
        this._whatOptions = [];
        this._whereOptions = [];
        this._tagsOptions = [];
        this._defaults = null;
        this._viewManager = null;
        this._host = host;
        this._favoriteOptions = [
            {
                value: MediaFilterCoreFavoriteSelection.Favorite,
                label: localize('media_filter.favorite'),
            },
            {
                value: MediaFilterCoreFavoriteSelection.NotFavorite,
                label: localize('media_filter.not_favorite'),
            },
        ];
        this._mediaTypeOptions = [
            {
                value: MediaFilterMediaType.Clips,
                label: localize('media_filter.media_types.clips'),
            },
            {
                value: MediaFilterMediaType.Snapshots,
                label: localize('media_filter.media_types.snapshots'),
            },
            {
                value: MediaFilterMediaType.Recordings,
                label: localize('media_filter.media_types.recordings'),
            },
        ];
        this._staticWhenOptions = [
            {
                value: MediaFilterCoreWhen.Today,
                label: localize('media_filter.whens.today'),
            },
            {
                value: MediaFilterCoreWhen.Yesterday,
                label: localize('media_filter.whens.yesterday'),
            },
            {
                value: MediaFilterCoreWhen.PastWeek,
                label: localize('media_filter.whens.past_week'),
            },
            {
                value: MediaFilterCoreWhen.PastMonth,
                label: localize('media_filter.whens.past_month'),
            },
            {
                value: MediaFilterCoreWhen.Custom,
                label: localize('media_filter.whens.custom'),
            },
        ];
        this._computeWhenOptions();
    }
    getMediaTypeOptions() {
        return this._mediaTypeOptions;
    }
    getCameraOptions() {
        return this._cameraOptions;
    }
    getWhenOptions() {
        return this._whenOptions;
    }
    getWhatOptions() {
        return this._whatOptions;
    }
    getWhereOptions() {
        return this._whereOptions;
    }
    getTagsOptions() {
        return this._tagsOptions;
    }
    getFavoriteOptions() {
        return this._favoriteOptions;
    }
    getDefaults() {
        return this._defaults;
    }
    setViewManager(viewManager) {
        this._viewManager = viewManager;
    }
    async valueChangeHandler(cameraManager, cardWideConfig, values, 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ev) {
        const getArrayValueAsSet = (val) => {
            // The reported value may be '' if the field is clearable (i.e. the user
            // can click 'x').
            if (val && Array.isArray(val) && val.length && !val.includes('')) {
                return new Set([...val]);
            }
            return null;
        };
        const cameraIDs = getArrayValueAsSet(values.camera) ?? this._getAllCameraIDs(cameraManager);
        if (!cameraIDs.size || !values.mediaType) {
            return;
        }
        const when = this._getWhen(values.when);
        const favorite = values.favorite
            ? values.favorite === MediaFilterCoreFavoriteSelection.Favorite
            : null;
        // A note on views:
        // - In the below, if the user selects a camera to view media for, the main
        //   view camera is also set to that value (e.g. a user browsing the
        //   gallery, chooses a different camera in the media filter, then
        //   subsequently chooses the live button -- they would expect the live view
        //   for that filtered camera not the prior camera).
        // - Similarly, if the user chooses clips or snapshots, set the actual view
        //   to 'clips' or 'snapshots' in order to ensure the right icon is shown as
        //   selected in the menu.
        const limit = cardWideConfig.performance?.features.media_chunk_size;
        if (values.mediaType === MediaFilterMediaType.Clips ||
            values.mediaType === MediaFilterMediaType.Snapshots) {
            const where = getArrayValueAsSet(values.where);
            const what = getArrayValueAsSet(values.what);
            const tags = getArrayValueAsSet(values.tags);
            const queries = new EventMediaQuery([
                {
                    type: QueryType.Event,
                    cameraIDs: cameraIDs,
                    ...(tags && { tags: tags }),
                    ...(what && { what: what }),
                    ...(where && { where: where }),
                    ...(favorite !== null && { favorite: favorite }),
                    ...(when && {
                        ...(when.start && { start: when.start }),
                        ...(when.end && { end: when.end }),
                    }),
                    ...(limit && { limit: limit }),
                    ...(values.mediaType === MediaFilterMediaType.Clips && { hasClip: true }),
                    ...(values.mediaType === MediaFilterMediaType.Snapshots && {
                        hasSnapshot: true,
                    }),
                },
            ]);
            this._viewManager?.setViewByParametersWithExistingQuery({
                params: {
                    query: queries,
                    // See 'A note on views' above for these two arguments
                    ...(cameraIDs.size === 1 && { camera: [...cameraIDs][0] }),
                    view: values.mediaType === MediaFilterMediaType.Clips ? 'clips' : 'snapshots',
                },
            });
        }
        else {
            const queries = new RecordingMediaQuery([
                {
                    type: QueryType.Recording,
                    cameraIDs: cameraIDs,
                    ...(limit && { limit: limit }),
                    ...(when && {
                        ...(when.start && { start: when.start }),
                        ...(when.end && { end: when.end }),
                    }),
                    ...(favorite !== null && { favorite: favorite }),
                },
            ]);
            this._viewManager?.setViewByParametersWithExistingQuery({
                params: {
                    query: queries,
                    // See 'A note on views' above for these two arguments
                    ...(cameraIDs.size === 1 && { camera: [...cameraIDs][0] }),
                    view: 'recordings',
                },
            });
        }
        // Need to ensure we update the element as the date-picker selections may
        // have changed, and we need to un/set the selected class.
        this._host.requestUpdate();
    }
    _getAllCameraIDs(cameraManager) {
        return cameraManager.getStore().getCameraIDsWithCapability({
            anyCapabilities: ['clips', 'snapshots', 'recordings'],
        });
    }
    computeInitialDefaultsFromView(cameraManager) {
        const view = this._viewManager?.getView();
        const query = view?.query;
        const allCameraIDs = this._getAllCameraIDs(cameraManager);
        if (!view || !QueryClassifier.isMediaQuery(query) || !allCameraIDs.size) {
            return;
        }
        const queries = query.getQuery();
        if (!queries) {
            return;
        }
        let mediaType;
        let cameraIDs;
        let what;
        let where;
        let favorite;
        let tags;
        const cameraIDSets = uniqWith(queries.map((query) => query.cameraIDs), isEqual);
        // Special note: If all visible cameras are selected, this is the same as no
        // selector at all.
        if (cameraIDSets.length === 1 && !isEqual(queries[0].cameraIDs, allCameraIDs)) {
            cameraIDs = [...queries[0].cameraIDs];
        }
        const favoriteValues = uniqWith(queries.map((query) => query.favorite), isEqual);
        if (favoriteValues.length === 1 && queries[0].favorite !== undefined) {
            favorite = queries[0].favorite
                ? MediaFilterCoreFavoriteSelection.Favorite
                : MediaFilterCoreFavoriteSelection.NotFavorite;
        }
        /* istanbul ignore else: the else path cannot be reached -- @preserve */
        if (QueryClassifier.isEventQuery(view.query)) {
            const queries = view.query.getQuery();
            /* istanbul ignore if: the if path cannot be reached -- @preserve */
            if (!queries) {
                return;
            }
            const hasClips = uniqWith(queries.map((query) => query.hasClip), isEqual);
            const hasSnapshots = uniqWith(queries.map((query) => query.hasSnapshot), isEqual);
            if (hasClips.length === 1 && hasSnapshots.length === 1) {
                mediaType = !!hasClips[0]
                    ? MediaFilterMediaType.Clips
                    : !!hasSnapshots[0]
                        ? MediaFilterMediaType.Snapshots
                        : undefined;
            }
            const whatSets = uniqWith(queries.map((query) => query.what), isEqual);
            if (whatSets.length === 1 && queries[0].what?.size) {
                what = [...queries[0].what];
            }
            const whereSets = uniqWith(queries.map((query) => query.where), isEqual);
            if (whereSets.length === 1 && queries[0].where?.size) {
                where = [...queries[0].where];
            }
            const tagsSets = uniqWith(queries.map((query) => query.tags), isEqual);
            if (tagsSets.length === 1 && queries[0].tags?.size) {
                tags = [...queries[0].tags];
            }
        }
        else if (QueryClassifier.isRecordingQuery(view.query)) {
            mediaType = MediaFilterMediaType.Recordings;
        }
        this._defaults = {
            ...(mediaType && { mediaType: mediaType }),
            ...(cameraIDs && { cameraIDs: cameraIDs }),
            ...(what && { what: what }),
            ...(where && { where: where }),
            ...(favorite !== undefined && { favorite: favorite }),
            ...(tags && { tags: tags }),
        };
    }
    computeCameraOptions(cameraManager) {
        this._cameraOptions = [...this._getAllCameraIDs(cameraManager)].map((cameraID) => ({
            value: cameraID,
            label: cameraManager.getCameraMetadata(cameraID)?.title ?? cameraID,
        }));
    }
    async computeMetadataOptions(cameraManager) {
        let metadata = null;
        try {
            metadata = await cameraManager.getMediaMetadata();
        }
        catch (e) {
            errorToConsole(e);
        }
        if (!metadata) {
            return;
        }
        if (metadata.what) {
            this._whatOptions = [...metadata.what]
                .sort()
                .map((what) => ({ value: what, label: prettifyTitle(what) }));
        }
        if (metadata.where) {
            this._whereOptions = [...metadata.where]
                .sort()
                .map((where) => ({ value: where, label: prettifyTitle(where) }));
        }
        if (metadata.tags) {
            this._tagsOptions = [...metadata.tags]
                .sort()
                .map((tag) => ({ value: tag, label: prettifyTitle(tag) }));
        }
        if (metadata.days) {
            const yearMonths = new Set();
            [...metadata.days].forEach((day) => {
                // An efficient conversion: "2023-01-26" -> "2023-01"
                yearMonths.add(day.substring(0, 7));
            });
            const monthStarts = [];
            yearMonths.forEach((yearMonth) => {
                monthStarts.push(parse(yearMonth, 'yyyy-MM', new Date()));
            });
            this._metaDataWhenOptions = orderBy(monthStarts, (date) => date.getTime(), 'desc').map((monthStart) => ({
                label: format(monthStart, 'MMMM yyyy'),
                value: this._dateRangeToString({
                    start: monthStart,
                    end: endOfMonth(monthStart),
                }),
            }));
            this._computeWhenOptions();
        }
        this._host.requestUpdate();
    }
    getControlsToShow(cameraManager) {
        const view = this._viewManager?.getView();
        const events = QueryClassifier.isEventQuery(view?.query);
        const recordings = QueryClassifier.isRecordingQuery(view?.query);
        const managerCapabilities = cameraManager.getAggregateCameraCapabilities();
        return {
            events: events,
            recordings: recordings,
            favorites: events
                ? managerCapabilities?.has('favorite-events')
                : recordings
                    ? managerCapabilities?.has('favorite-recordings')
                    : false,
        };
    }
    _computeWhenOptions() {
        this._whenOptions = [...this._staticWhenOptions, ...this._metaDataWhenOptions];
    }
    _dateRangeToString(when) {
        return `${formatDate(when.start)},${formatDate(when.end)}`;
    }
    _stringToDateRange(input) {
        const dates = input.split(',');
        return {
            start: parse(dates[0], 'yyyy-MM-dd', new Date()),
            end: endOfDay(parse(dates[1], 'yyyy-MM-dd', new Date())),
        };
    }
    _getWhen(values) {
        if (values.from || values.to) {
            return {
                ...(values.from && { start: values.from }),
                ...(values.to && { end: values.to }),
            };
        }
        if (!values.selected || Array.isArray(values.selected)) {
            return null;
        }
        const now = new Date();
        switch (values.selected) {
            case MediaFilterCoreWhen.Custom:
                return null;
            case MediaFilterCoreWhen.Today:
                return { start: startOfToday(), end: endOfToday() };
            case MediaFilterCoreWhen.Yesterday:
                return { start: startOfYesterday(), end: endOfYesterday() };
            case MediaFilterCoreWhen.PastWeek:
                return { start: startOfDay(sub(now, { days: 7 })), end: endOfDay(now) };
            case MediaFilterCoreWhen.PastMonth:
                return { start: startOfDay(sub(now, { months: 1 })), end: endOfDay(now) };
            default:
                return this._stringToDateRange(values.selected);
        }
    }
}

var css$2 = ":host {\n  display: flex;\n  flex-direction: column;\n  overflow: auto;\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  height: 100%;\n  width: 300px;\n  margin: 5px;\n}\n\n/* Hide scrollbar for Chrome, Safari and Opera */\n:host::-webkit-scrollbar {\n  display: none;\n}\n\nadvanced-camera-card-select {\n  padding: 5px;\n}\n\ndiv.when {\n  display: inline-flex;\n  align-items: flex-end;\n}\n\ndiv.when advanced-camera-card-select {\n  flex: 1;\n}\n\ndiv.when advanced-camera-card-date-picker {\n  padding-bottom: 5px;\n  transition: width 0.5s ease-in-out;\n}\n\ndiv.when advanced-camera-card-date-picker {\n  color: var(--secondary-color);\n}\n\ndiv.when advanced-camera-card-date-picker.selected {\n  color: var(--primary-color);\n}\n\ndiv.when advanced-camera-card-date-picker.hidden {\n  width: 0px;\n}";

var css$1 = ":root, :host {\n  --gr-color-primary: #1079b2;\n  --gr-color-primary-rgb: 16, 121, 178;\n  --gr-color-primary-contrast: #ffffff;\n  --gr-color-primary-contrast-rgb: 255, 255, 255;\n  --gr-color-primary-shade: #0d6696;\n  --gr-color-primary-tint: #1499e1;\n  --gr-color-secondary: #051f2c;\n  --gr-color-secondary-rgb: 5, 31, 44;\n  --gr-color-secondary-contrast: #ffffff;\n  --gr-color-secondary-contrast-rgb: 255, 255, 255;\n  --gr-color-secondary-shade: #000000;\n  --gr-color-secondary-tint: #0a415c;\n  --gr-color-tertiary: #0c4a6e;\n  --gr-color-tertiary-rgb: 12, 74, 110;\n  --gr-color-tertiary-contrast: #ffffff;\n  --gr-color-tertiary-contrast-rgb: 255, 255, 255;\n  --gr-color-tertiary-shade: #083249;\n  --gr-color-tertiary-tint: #106393;\n  --gr-color-success: #0fbe78;\n  --gr-color-success-rgb: 15, 190, 120;\n  --gr-color-success-contrast: #000000;\n  --gr-color-success-contrast-rgb: 0, 0, 0;\n  --gr-color-success-shade: #057f4e;\n  --gr-color-success-tint: #12e28f;\n  --gr-color-warning: #fbbc4e;\n  --gr-color-warning-rgb: 251, 188, 78;\n  --gr-color-warning-contrast: #051f2c;\n  --gr-color-warning-contrast-rgb: 5, 31, 44;\n  --gr-color-warning-shade: #9e6400;\n  --gr-color-warning-tint: #fdd187;\n  --gr-color-danger: #e60017;\n  --gr-color-danger-rgb: 230, 0, 23;\n  --gr-color-danger-contrast: #ffffff;\n  --gr-color-danger-contrast-rgb: 255, 255, 255;\n  --gr-color-danger-shade: #cc0014;\n  --gr-color-danger-tint: #ff1f35;\n  --gr-color-light: #f4f5f8;\n  --gr-color-light-rgb: 244, 245, 248;\n  --gr-color-light-contrast: #051f2c;\n  --gr-color-light-contrast-rgb: 5, 31, 44;\n  --gr-color-light-shade: #d7d8da;\n  --gr-color-light-tint: #f9fafb;\n  --gr-color-medium: #5e6c78;\n  --gr-color-medium-rgb: 94, 108, 120;\n  --gr-color-medium-contrast: #ffffff;\n  --gr-color-medium-contrast-rgb: 255, 255, 255;\n  --gr-color-medium-shade: #48535b;\n  --gr-color-medium-tint: #81909c;\n  --gr-color-dark: #02131b;\n  --gr-color-dark-rgb: 2, 19, 27;\n  --gr-color-dark-contrast: #ffffff;\n  --gr-color-dark-contrast-rgb: 255, 255, 255;\n  --gr-color-dark-shade: #000000;\n  --gr-color-dark-tint: #222428;\n  --gr-color-white: #ffffff;\n  --gr-color-black: #000000;\n  --gr-border-radius-small: 0.125rem;\n  --gr-border-radius-medium: 0.25rem;\n  --gr-border-radius-large: 0.5rem;\n  --gr-border-radius-x-large: 1rem;\n  --gr-border-width-small: 0.063rem;\n  --gr-border-width-medium: 0.125rem;\n  --gr-border-width-large: 0.188rem;\n  --gr-shadow-x-small: 0 1px 0 #0d131e0d;\n  --gr-shadow-small: 0 1px 2px #0d131e1a;\n  --gr-shadow-medium: 0 2px 4px #0d131e1a;\n  --gr-shadow-large: 0 2px 8px #0d131e1a;\n  --gr-shadow-x-large: 0 4px 16px #0d131e1a;\n  --gr-spacing-xxx-small: 0.125rem;\n  --gr-spacing-xx-small: 0.25rem;\n  --gr-spacing-x-small: 0.5rem;\n  --gr-spacing-small: 0.75rem;\n  --gr-spacing-medium: 1rem;\n  --gr-spacing-large: 1.25rem;\n  --gr-spacing-x-large: 1.75rem;\n  --gr-spacing-xx-large: 2.25rem;\n  --gr-spacing-xxx-large: 3rem;\n  --gr-spacing-xxxx-large: 4.5rem;\n  --gr-font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial,\n    sans-serif;\n  --gr-letter-spacing-dense: -0.015em;\n  --gr-letter-spacing-normal: normal;\n  --gr-letter-spacing-loose: 0.075em;\n  --gr-line-height-dense: 1.4;\n  --gr-line-height-normal: 1.8;\n  --gr-line-height-loose: 2.2;\n  --gr-font-size-xx-small: 0.625rem;\n  --gr-font-size-x-small: 0.75rem;\n  --gr-font-size-small: 0.875rem;\n  --gr-font-size-medium: 1rem;\n  --gr-font-size-large: 1.25rem;\n  --gr-font-size-x-large: 1.5rem;\n  --gr-font-size-xx-large: 2.25rem;\n  --gr-font-size-xxx-large: 3rem;\n  --gr-font-size-xxxx-large: 4.5rem;\n  --gr-font-weight-thin: 100;\n  --gr-font-weight-extra-light: 200;\n  --gr-font-weight-light: 300;\n  --gr-font-weight-normal: 400;\n  --gr-font-weight-medium: 500;\n  --gr-font-weight-semi-bold: 600;\n  --gr-font-weight-bold: 700;\n  --gr-font-weight-extra-bold: 800;\n  --gr-font-weight-black: 900;\n  --gr-form-element-font-size-x-small: var(--gr-font-size-x-small);\n  --gr-form-element-font-size-small: var(--gr-font-size-small);\n  --gr-form-element-font-size-medium: var(--gr-font-size-medium);\n  --gr-form-element-font-size-large: var(--gr-font-size-large);\n  --gr-form-element-height-small: 2.188rem;\n  --gr-form-element-height-medium: 3.125rem;\n  --gr-form-element-height-large: 4.063rem;\n  --gr-form-element-border-radius-small: var(--gr-border-radius-medium);\n  --gr-form-element-border-radius-medium: var(--gr-border-radius-medium);\n  --gr-form-element-border-radius-large: var(--gr-border-radius-medium);\n  --gr-focus-ring-width: 2px;\n  --gr-form-element-label-font-size-small: var(--gr-font-size-small);\n  --gr-form-element-label-font-size-medium: var(--gr-font-size-medium);\n  --gr-form-element-label-font-size-large: var(--gr-font-size-large);\n  --gr-form-element-label-color: inherit;\n  --gr-form-element-help-text-font-size-small: var(--gr-font-size-x-small);\n  --gr-form-element-help-text-font-size-medium: var(--gr-font-size-small);\n  --gr-form-element-help-text-font-size-large: var(--gr-font-size-medium);\n  --gr-form-element-help-text-color: var(--gr-color-medium);\n  --gr-form-element-invalid-text-font-size-small: var(--gr-font-size-x-small);\n  --gr-form-element-invalid-text-font-size-medium: var(--gr-font-size-small);\n  --gr-form-element-invalid-text-font-size-large: var(--gr-font-size-medium);\n  --gr-form-element-invalid-text-color: var(--gr-color-danger);\n  --gr-toggle-size: 1rem;\n  --gr-panel-border-color: var(--gr-color-light-shade);\n  --gr-z-index-dropdown: 900;\n}\n\n";

const BUILD = {
    allRenderFn: false,
    cmpDidLoad: true,
    cmpDidUnload: false,
    cmpDidUpdate: true,
    cmpDidRender: true,
    cmpWillLoad: true,
    cmpWillUpdate: true,
    cmpWillRender: true,
    connectedCallback: true,
    disconnectedCallback: true,
    element: true,
    event: true,
    hasRenderFn: true,
    lifecycle: true,
    hostListener: true,
    hostListenerTargetWindow: true,
    hostListenerTargetDocument: true,
    hostListenerTargetBody: true,
    hostListenerTargetParent: false,
    hostListenerTarget: true,
    member: true,
    method: true,
    mode: true,
    observeAttribute: true,
    prop: true,
    propMutable: true,
    reflect: true,
    scoped: true,
    shadowDom: true,
    slot: true,
    cssAnnotations: true,
    state: true,
    style: true,
    svg: true,
    updatable: true,
    vdomAttribute: true,
    vdomXlink: true,
    vdomClass: true,
    vdomFunctional: true,
    vdomKey: true,
    vdomListener: true,
    vdomRef: true,
    vdomPropOrAttr: true,
    vdomRender: true,
    vdomStyle: true,
    vdomText: true,
    watchCallback: true,
    taskQueue: true,
    hotModuleReplacement: false,
    isDebug: false,
    isDev: false,
    isTesting: false,
    hydrateServerSide: false,
    hydrateClientSide: false,
    lifecycleDOMEvents: false,
    lazyLoad: false,
    profile: false,
    slotRelocation: true,
    appendChildSlotFix: false,
    cloneNodeFix: false,
    hydratedAttribute: false,
    hydratedClass: true,
    safari10: false,
    scriptDataOpts: false,
    scopedSlotTextContentFix: false,
    shadowDomShim: false,
    slotChildNodesFix: false,
    invisiblePrehydration: true,
    propBoolean: true,
    propNumber: true,
    propString: true,
    cssVarShim: false,
    constructableCSS: true,
    cmpShouldUpdate: true,
    devTools: false,
    dynamicImportShim: false,
    shadowDelegatesFocus: true,
    initializeNextTick: false,
    asyncLoading: false,
    asyncQueue: false,
    transformTagName: false,
    attachStyles: true,
};

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/snabbdom/snabbdom/blob/master/LICENSE
 *
 * Modified for Stencil's renderer and slot projection
 */
let scopeId;
let contentRef;
let hostTagName;
let useNativeShadowDom = false;
let checkSlotFallbackVisibility = false;
let checkSlotRelocate = false;
let isSvgMode = false;
let renderingRef = null;
let queuePending = false;
const createTime = (fnName, tagName = '') => {
    {
        return () => {
            return;
        };
    }
};
const XLINK_NS = 'http://www.w3.org/1999/xlink';
/**
 * Default style mode id
 */
/**
 * Reusable empty obj/array
 * Don't add values to these!!
 */
const EMPTY_OBJ = {};
/**
 * Namespaces
 */
const SVG_NS = 'http://www.w3.org/2000/svg';
const HTML_NS = 'http://www.w3.org/1999/xhtml';
const isDef = (v) => v != null;
const isComplexType = (o) => {
    // https://jsperf.com/typeof-fn-object/5
    o = typeof o;
    return o === 'object' || o === 'function';
};
/**
 * Helper method for querying a `meta` tag that contains a nonce value
 * out of a DOM's head.
 *
 * @param doc The DOM containing the `head` to query against
 * @returns The content of the meta tag representing the nonce value, or `undefined` if no tag
 * exists or the tag has no content.
 */
function queryNonceMetaTagContent(doc) {
    var _a, _b, _c;
    return (_c = (_b = (_a = doc.head) === null || _a === void 0 ? void 0 : _a.querySelector('meta[name="csp-nonce"]')) === null || _b === void 0 ? void 0 : _b.getAttribute('content')) !== null && _c !== void 0 ? _c : undefined;
}
/**
 * Production h() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, child?: d.ChildType): d.VNode;
// export function h(nodeName: string | d.FunctionalComponent, vnodeData: d.PropsType, ...children: d.ChildType[]): d.VNode;
const h = (nodeName, vnodeData, ...children) => {
    let child = null;
    let key = null;
    let slotName = null;
    let simple = false;
    let lastSimple = false;
    const vNodeChildren = [];
    const walk = (c) => {
        for (let i = 0; i < c.length; i++) {
            child = c[i];
            if (Array.isArray(child)) {
                walk(child);
            }
            else if (child != null && typeof child !== 'boolean') {
                if ((simple = typeof nodeName !== 'function' && !isComplexType(child))) {
                    child = String(child);
                }
                if (simple && lastSimple) {
                    // If the previous child was simple (string), we merge both
                    vNodeChildren[vNodeChildren.length - 1].$text$ += child;
                }
                else {
                    // Append a new vNode, if it's text, we create a text vNode
                    vNodeChildren.push(simple ? newVNode(null, child) : child);
                }
                lastSimple = simple;
            }
        }
    };
    walk(children);
    if (vnodeData) {
        // normalize class / classname attributes
        if (vnodeData.key) {
            key = vnodeData.key;
        }
        if (vnodeData.name) {
            slotName = vnodeData.name;
        }
        {
            const classData = vnodeData.className || vnodeData.class;
            if (classData) {
                vnodeData.class =
                    typeof classData !== 'object'
                        ? classData
                        : Object.keys(classData)
                            .filter((k) => classData[k])
                            .join(' ');
            }
        }
    }
    if (typeof nodeName === 'function') {
        // nodeName is a functional component
        return nodeName(vnodeData === null ? {} : vnodeData, vNodeChildren, vdomFnUtils);
    }
    const vnode = newVNode(nodeName, null);
    vnode.$attrs$ = vnodeData;
    if (vNodeChildren.length > 0) {
        vnode.$children$ = vNodeChildren;
    }
    {
        vnode.$key$ = key;
    }
    {
        vnode.$name$ = slotName;
    }
    return vnode;
};
/**
 * A utility function for creating a virtual DOM node from a tag and some
 * possible text content.
 *
 * @param tag the tag for this element
 * @param text possible text content for the node
 * @returns a newly-minted virtual DOM node
 */
const newVNode = (tag, text) => {
    const vnode = {
        $flags$: 0,
        $tag$: tag,
        $text$: text,
        $elm$: null,
        $children$: null,
    };
    {
        vnode.$attrs$ = null;
    }
    {
        vnode.$key$ = null;
    }
    {
        vnode.$name$ = null;
    }
    return vnode;
};
const Host = {};
/**
 * Check whether a given node is a Host node or not
 *
 * @param node the virtual DOM node to check
 * @returns whether it's a Host node or not
 */
const isHost = (node) => node && node.$tag$ === Host;
/**
 * Implementation of {@link d.FunctionalUtilities} for Stencil's VDom.
 *
 * Note that these functions convert from {@link d.VNode} to
 * {@link d.ChildNode} to give functional component developers a friendly
 * interface.
 */
const vdomFnUtils = {
    forEach: (children, cb) => children.map(convertToPublic).forEach(cb),
    map: (children, cb) => children.map(convertToPublic).map(cb).map(convertToPrivate),
};
/**
 * Convert a {@link d.VNode} to a {@link d.ChildNode} in order to present a
 * friendlier public interface (hence, 'convertToPublic').
 *
 * @param node the virtual DOM node to convert
 * @returns a converted child node
 */
const convertToPublic = (node) => ({
    vattrs: node.$attrs$,
    vchildren: node.$children$,
    vkey: node.$key$,
    vname: node.$name$,
    vtag: node.$tag$,
    vtext: node.$text$,
});
/**
 * Convert a {@link d.ChildNode} back to an equivalent {@link d.VNode} in
 * order to use the resulting object in the virtual DOM. The initial object was
 * likely created as part of presenting a public API, so converting it back
 * involved making it 'private' again (hence, `convertToPrivate`).
 *
 * @param node the child node to convert
 * @returns a converted virtual DOM node
 */
const convertToPrivate = (node) => {
    if (typeof node.vtag === 'function') {
        const vnodeData = Object.assign({}, node.vattrs);
        if (node.vkey) {
            vnodeData.key = node.vkey;
        }
        if (node.vname) {
            vnodeData.name = node.vname;
        }
        return h(node.vtag, vnodeData, ...(node.vchildren || []));
    }
    const vnode = newVNode(node.vtag, node.vtext);
    vnode.$attrs$ = node.vattrs;
    vnode.$children$ = node.vchildren;
    vnode.$key$ = node.vkey;
    vnode.$name$ = node.vname;
    return vnode;
};
// Private
const computeMode = (elm) => modeResolutionChain.map((h) => h(elm)).find((m) => !!m);
/**
 * Parse a new property value for a given property type.
 *
 * While the prop value can reasonably be expected to be of `any` type as far as TypeScript's type checker is concerned,
 * it is not safe to assume that the string returned by evaluating `typeof propValue` matches:
 *   1. `any`, the type given to `propValue` in the function signature
 *   2. the type stored from `propType`.
 *
 * This function provides the capability to parse/coerce a property's value to potentially any other JavaScript type.
 *
 * Property values represented in TSX preserve their type information. In the example below, the number 0 is passed to
 * a component. This `propValue` will preserve its type information (`typeof propValue === 'number'`). Note that is
 * based on the type of the value being passed in, not the type declared of the class member decorated with `@Prop`.
 * ```tsx
 * <my-cmp prop-val={0}></my-cmp>
 * ```
 *
 * HTML prop values on the other hand, will always a string
 *
 * @param propValue the new value to coerce to some type
 * @param propType the type of the prop, expressed as a binary number
 * @returns the parsed/coerced value
 */
const parsePropertyValue = (propValue, propType) => {
    // ensure this value is of the correct prop type
    if (propValue != null && !isComplexType(propValue)) {
        if (propType & 4 /* MEMBER_FLAGS.Boolean */) {
            // per the HTML spec, any string value means it is a boolean true value
            // but we'll cheat here and say that the string "false" is the boolean false
            return propValue === 'false' ? false : propValue === '' || !!propValue;
        }
        if (propType & 2 /* MEMBER_FLAGS.Number */) {
            // force it to be a number
            return parseFloat(propValue);
        }
        if (propType & 1 /* MEMBER_FLAGS.String */) {
            // could have been passed as a number or boolean
            // but we still want it as a string
            return String(propValue);
        }
        // redundant return here for better minification
        return propValue;
    }
    // not sure exactly what type we want
    // so no need to change to a different type
    return propValue;
};
const getElement = (ref) => (ref);
const createEvent = (ref, name, flags) => {
    const elm = getElement(ref);
    return {
        emit: (detail) => {
            return emitEvent(elm, name, {
                bubbles: !!(flags & 4 /* EVENT_FLAGS.Bubbles */),
                composed: !!(flags & 2 /* EVENT_FLAGS.Composed */),
                cancelable: !!(flags & 1 /* EVENT_FLAGS.Cancellable */),
                detail,
            });
        },
    };
};
/**
 * Helper function to create & dispatch a custom Event on a provided target
 * @param elm the target of the Event
 * @param name the name to give the custom Event
 * @param opts options for configuring a custom Event
 * @returns the custom Event
 */
const emitEvent = (elm, name, opts) => {
    const ev = plt.ce(name, opts);
    elm.dispatchEvent(ev);
    return ev;
};
const rootAppliedStyles = /*@__PURE__*/ new WeakMap();
const registerStyle = (scopeId, cssText, allowCS) => {
    let style = styles.get(scopeId);
    if (supportsConstructableStylesheets && allowCS) {
        style = (style || new CSSStyleSheet());
        if (typeof style === 'string') {
            style = cssText;
        }
        else {
            style.replaceSync(cssText);
        }
    }
    else {
        style = cssText;
    }
    styles.set(scopeId, style);
};
const addStyle = (styleContainerNode, cmpMeta, mode, hostElm) => {
    var _a;
    let scopeId = getScopeId(cmpMeta, mode);
    const style = styles.get(scopeId);
    // if an element is NOT connected then getRootNode() will return the wrong root node
    // so the fallback is to always use the document for the root node in those cases
    styleContainerNode = styleContainerNode.nodeType === 11 /* NODE_TYPE.DocumentFragment */ ? styleContainerNode : doc;
    if (style) {
        if (typeof style === 'string') {
            styleContainerNode = styleContainerNode.head || styleContainerNode;
            let appliedStyles = rootAppliedStyles.get(styleContainerNode);
            let styleElm;
            if (!appliedStyles) {
                rootAppliedStyles.set(styleContainerNode, (appliedStyles = new Set()));
            }
            if (!appliedStyles.has(scopeId)) {
                {
                    {
                        styleElm = doc.createElement('style');
                        styleElm.innerHTML = style;
                    }
                    // Apply CSP nonce to the style tag if it exists
                    const nonce = (_a = plt.$nonce$) !== null && _a !== void 0 ? _a : queryNonceMetaTagContent(doc);
                    if (nonce != null) {
                        styleElm.setAttribute('nonce', nonce);
                    }
                    styleContainerNode.insertBefore(styleElm, styleContainerNode.querySelector('link'));
                }
                if (appliedStyles) {
                    appliedStyles.add(scopeId);
                }
            }
        }
        else if (!styleContainerNode.adoptedStyleSheets.includes(style)) {
            styleContainerNode.adoptedStyleSheets = [...styleContainerNode.adoptedStyleSheets, style];
        }
    }
    return scopeId;
};
const attachStyles = (hostRef) => {
    const cmpMeta = hostRef.$cmpMeta$;
    const elm = hostRef.$hostElement$;
    const flags = cmpMeta.$flags$;
    const endAttachStyles = createTime('attachStyles', cmpMeta.$tagName$);
    const scopeId = addStyle(elm.shadowRoot ? elm.shadowRoot : elm.getRootNode(), cmpMeta, hostRef.$modeName$);
    if (flags & 10 /* CMP_FLAGS.needsScopedEncapsulation */) {
        // only required when we're NOT using native shadow dom (slot)
        // or this browser doesn't support native shadow dom
        // and this host element was NOT created with SSR
        // let's pick out the inner content for slot projection
        // create a node to represent where the original
        // content was first placed, which is useful later on
        // DOM WRITE!!
        elm['s-sc'] = scopeId;
        elm.classList.add(scopeId + '-h');
        if (flags & 2 /* CMP_FLAGS.scopedCssEncapsulation */) {
            elm.classList.add(scopeId + '-s');
        }
    }
    endAttachStyles();
};
const getScopeId = (cmp, mode) => 'sc-' + (mode && cmp.$flags$ & 32 /* CMP_FLAGS.hasMode */ ? cmp.$tagName$ + '-' + mode : cmp.$tagName$);
/**
 * Production setAccessor() function based on Preact by
 * Jason Miller (@developit)
 * Licensed under the MIT License
 * https://github.com/developit/preact/blob/master/LICENSE
 *
 * Modified for Stencil's compiler and vdom
 */
const setAccessor = (elm, memberName, oldValue, newValue, isSvg, flags) => {
    if (oldValue !== newValue) {
        let isProp = isMemberInElement(elm, memberName);
        let ln = memberName.toLowerCase();
        if (memberName === 'class') {
            const classList = elm.classList;
            const oldClasses = parseClassList(oldValue);
            const newClasses = parseClassList(newValue);
            classList.remove(...oldClasses.filter((c) => c && !newClasses.includes(c)));
            classList.add(...newClasses.filter((c) => c && !oldClasses.includes(c)));
        }
        else if (memberName === 'style') {
            // update style attribute, css properties and values
            {
                for (const prop in oldValue) {
                    if (!newValue || newValue[prop] == null) {
                        if (prop.includes('-')) {
                            elm.style.removeProperty(prop);
                        }
                        else {
                            elm.style[prop] = '';
                        }
                    }
                }
            }
            for (const prop in newValue) {
                if (!oldValue || newValue[prop] !== oldValue[prop]) {
                    if (prop.includes('-')) {
                        elm.style.setProperty(prop, newValue[prop]);
                    }
                    else {
                        elm.style[prop] = newValue[prop];
                    }
                }
            }
        }
        else if (memberName === 'key')
            ;
        else if (memberName === 'ref') {
            // minifier will clean this up
            if (newValue) {
                newValue(elm);
            }
        }
        else if ((!elm.__lookupSetter__(memberName)) &&
            memberName[0] === 'o' &&
            memberName[1] === 'n') {
            // Event Handlers
            // so if the member name starts with "on" and the 3rd characters is
            // a capital letter, and it's not already a member on the element,
            // then we're assuming it's an event listener
            if (memberName[2] === '-') {
                // on- prefixed events
                // allows to be explicit about the dom event to listen without any magic
                // under the hood:
                // <my-cmp on-click> // listens for "click"
                // <my-cmp on-Click> // listens for "Click"
                // <my-cmp on-ionChange> // listens for "ionChange"
                // <my-cmp on-EVENTS> // listens for "EVENTS"
                memberName = memberName.slice(3);
            }
            else if (isMemberInElement(win, ln)) {
                // standard event
                // the JSX attribute could have been "onMouseOver" and the
                // member name "onmouseover" is on the window's prototype
                // so let's add the listener "mouseover", which is all lowercased
                memberName = ln.slice(2);
            }
            else {
                // custom event
                // the JSX attribute could have been "onMyCustomEvent"
                // so let's trim off the "on" prefix and lowercase the first character
                // and add the listener "myCustomEvent"
                // except for the first character, we keep the event name case
                memberName = ln[2] + memberName.slice(3);
            }
            if (oldValue) {
                plt.rel(elm, memberName, oldValue, false);
            }
            if (newValue) {
                plt.ael(elm, memberName, newValue, false);
            }
        }
        else {
            // Set property if it exists and it's not a SVG
            const isComplex = isComplexType(newValue);
            if ((isProp || (isComplex && newValue !== null)) && !isSvg) {
                try {
                    if (!elm.tagName.includes('-')) {
                        const n = newValue == null ? '' : newValue;
                        // Workaround for Safari, moving the <input> caret when re-assigning the same valued
                        if (memberName === 'list') {
                            isProp = false;
                        }
                        else if (oldValue == null || elm[memberName] != n) {
                            elm[memberName] = n;
                        }
                    }
                    else {
                        elm[memberName] = newValue;
                    }
                }
                catch (e) { }
            }
            /**
             * Need to manually update attribute if:
             * - memberName is not an attribute
             * - if we are rendering the host element in order to reflect attribute
             * - if it's a SVG, since properties might not work in <svg>
             * - if the newValue is null/undefined or 'false'.
             */
            let xlink = false;
            {
                if (ln !== (ln = ln.replace(/^xlink\:?/, ''))) {
                    memberName = ln;
                    xlink = true;
                }
            }
            if (newValue == null || newValue === false) {
                if (newValue !== false || elm.getAttribute(memberName) === '') {
                    if (xlink) {
                        elm.removeAttributeNS(XLINK_NS, memberName);
                    }
                    else {
                        elm.removeAttribute(memberName);
                    }
                }
            }
            else if ((!isProp || flags & 4 /* VNODE_FLAGS.isHost */ || isSvg) && !isComplex) {
                newValue = newValue === true ? '' : newValue;
                if (xlink) {
                    elm.setAttributeNS(XLINK_NS, memberName, newValue);
                }
                else {
                    elm.setAttribute(memberName, newValue);
                }
            }
        }
    }
};
const parseClassListRegex = /\s/;
const parseClassList = (value) => (!value ? [] : value.split(parseClassListRegex));
const updateElement = (oldVnode, newVnode, isSvgMode, memberName) => {
    // if the element passed in is a shadow root, which is a document fragment
    // then we want to be adding attrs/props to the shadow root's "host" element
    // if it's not a shadow root, then we add attrs/props to the same element
    const elm = newVnode.$elm$.nodeType === 11 /* NODE_TYPE.DocumentFragment */ && newVnode.$elm$.host
        ? newVnode.$elm$.host
        : newVnode.$elm$;
    const oldVnodeAttrs = (oldVnode && oldVnode.$attrs$) || EMPTY_OBJ;
    const newVnodeAttrs = newVnode.$attrs$ || EMPTY_OBJ;
    {
        // remove attributes no longer present on the vnode by setting them to undefined
        for (memberName in oldVnodeAttrs) {
            if (!(memberName in newVnodeAttrs)) {
                setAccessor(elm, memberName, oldVnodeAttrs[memberName], undefined, isSvgMode, newVnode.$flags$);
            }
        }
    }
    // add new & update changed attributes
    for (memberName in newVnodeAttrs) {
        setAccessor(elm, memberName, oldVnodeAttrs[memberName], newVnodeAttrs[memberName], isSvgMode, newVnode.$flags$);
    }
};
/**
 * Create a DOM Node corresponding to one of the children of a given VNode.
 *
 * @param oldParentVNode the parent VNode from the previous render
 * @param newParentVNode the parent VNode from the current render
 * @param childIndex the index of the VNode, in the _new_ parent node's
 * children, for which we will create a new DOM node
 * @param parentElm the parent DOM node which our new node will be a child of
 * @returns the newly created node
 */
const createElm = (oldParentVNode, newParentVNode, childIndex, parentElm) => {
    // tslint:disable-next-line: prefer-const
    const newVNode = newParentVNode.$children$[childIndex];
    let i = 0;
    let elm;
    let childNode;
    let oldVNode;
    if (!useNativeShadowDom) {
        // remember for later we need to check to relocate nodes
        checkSlotRelocate = true;
        if (newVNode.$tag$ === 'slot') {
            if (scopeId) {
                // scoped css needs to add its scoped id to the parent element
                parentElm.classList.add(scopeId + '-s');
            }
            newVNode.$flags$ |= newVNode.$children$
                ? // slot element has fallback content
                    2 /* VNODE_FLAGS.isSlotFallback */
                : // slot element does not have fallback content
                    1 /* VNODE_FLAGS.isSlotReference */;
        }
    }
    if (newVNode.$text$ !== null) {
        // create text node
        elm = newVNode.$elm$ = doc.createTextNode(newVNode.$text$);
    }
    else if (newVNode.$flags$ & 1 /* VNODE_FLAGS.isSlotReference */) {
        // create a slot reference node
        elm = newVNode.$elm$ =
            doc.createTextNode('');
    }
    else {
        if (!isSvgMode) {
            isSvgMode = newVNode.$tag$ === 'svg';
        }
        // create element
        elm = newVNode.$elm$ = (doc.createElementNS(isSvgMode ? SVG_NS : HTML_NS, newVNode.$flags$ & 2 /* VNODE_FLAGS.isSlotFallback */
                ? 'slot-fb'
                : newVNode.$tag$)
            );
        if (isSvgMode && newVNode.$tag$ === 'foreignObject') {
            isSvgMode = false;
        }
        // add css classes, attrs, props, listeners, etc.
        {
            updateElement(null, newVNode, isSvgMode);
        }
        if (isDef(scopeId) && elm['s-si'] !== scopeId) {
            // if there is a scopeId and this is the initial render
            // then let's add the scopeId as a css class
            elm.classList.add((elm['s-si'] = scopeId));
        }
        if (newVNode.$children$) {
            for (i = 0; i < newVNode.$children$.length; ++i) {
                // create the node
                childNode = createElm(oldParentVNode, newVNode, i, elm);
                // return node could have been null
                if (childNode) {
                    // append our new node
                    elm.appendChild(childNode);
                }
            }
        }
        {
            if (newVNode.$tag$ === 'svg') {
                // Only reset the SVG context when we're exiting <svg> element
                isSvgMode = false;
            }
            else if (elm.tagName === 'foreignObject') {
                // Reenter SVG context when we're exiting <foreignObject> element
                isSvgMode = true;
            }
        }
    }
    {
        elm['s-hn'] = hostTagName;
        if (newVNode.$flags$ & (2 /* VNODE_FLAGS.isSlotFallback */ | 1 /* VNODE_FLAGS.isSlotReference */)) {
            // remember the content reference comment
            elm['s-sr'] = true;
            // remember the content reference comment
            elm['s-cr'] = contentRef;
            // remember the slot name, or empty string for default slot
            elm['s-sn'] = newVNode.$name$ || '';
            // check if we've got an old vnode for this slot
            oldVNode = oldParentVNode && oldParentVNode.$children$ && oldParentVNode.$children$[childIndex];
            if (oldVNode && oldVNode.$tag$ === newVNode.$tag$ && oldParentVNode.$elm$) {
                // we've got an old slot vnode and the wrapper is being replaced
                // so let's move the old slot content back to it's original location
                putBackInOriginalLocation(oldParentVNode.$elm$, false);
            }
        }
    }
    return elm;
};
const putBackInOriginalLocation = (parentElm, recursive) => {
    plt.$flags$ |= 1 /* PLATFORM_FLAGS.isTmpDisconnected */;
    const oldSlotChildNodes = parentElm.childNodes;
    for (let i = oldSlotChildNodes.length - 1; i >= 0; i--) {
        const childNode = oldSlotChildNodes[i];
        if (childNode['s-hn'] !== hostTagName && childNode['s-ol']) {
            // // this child node in the old element is from another component
            // // remove this node from the old slot's parent
            // childNode.remove();
            // and relocate it back to it's original location
            parentReferenceNode(childNode).insertBefore(childNode, referenceNode(childNode));
            // remove the old original location comment entirely
            // later on the patch function will know what to do
            // and move this to the correct spot in need be
            childNode['s-ol'].remove();
            childNode['s-ol'] = undefined;
            checkSlotRelocate = true;
        }
        if (recursive) {
            putBackInOriginalLocation(childNode, recursive);
        }
    }
    plt.$flags$ &= ~1 /* PLATFORM_FLAGS.isTmpDisconnected */;
};
/**
 * Create DOM nodes corresponding to a list of {@link d.Vnode} objects and
 * add them to the DOM in the appropriate place.
 *
 * @param parentElm the DOM node which should be used as a parent for the new
 * DOM nodes
 * @param before a child of the `parentElm` which the new children should be
 * inserted before (optional)
 * @param parentVNode the parent virtual DOM node
 * @param vnodes the new child virtual DOM nodes to produce DOM nodes for
 * @param startIdx the index in the child virtual DOM nodes at which to start
 * creating DOM nodes (inclusive)
 * @param endIdx the index in the child virtual DOM nodes at which to stop
 * creating DOM nodes (inclusive)
 */
const addVnodes = (parentElm, before, parentVNode, vnodes, startIdx, endIdx) => {
    let containerElm = ((parentElm['s-cr'] && parentElm['s-cr'].parentNode) || parentElm);
    let childNode;
    if (containerElm.shadowRoot && containerElm.tagName === hostTagName) {
        containerElm = containerElm.shadowRoot;
    }
    for (; startIdx <= endIdx; ++startIdx) {
        if (vnodes[startIdx]) {
            childNode = createElm(null, parentVNode, startIdx, parentElm);
            if (childNode) {
                vnodes[startIdx].$elm$ = childNode;
                containerElm.insertBefore(childNode, referenceNode(before) );
            }
        }
    }
};
/**
 * Remove the DOM elements corresponding to a list of {@link d.VNode} objects.
 * This can be used to, for instance, clean up after a list of children which
 * should no longer be shown.
 *
 * This function also handles some of Stencil's slot relocation logic.
 *
 * @param vnodes a list of virtual DOM nodes to remove
 * @param startIdx the index at which to start removing nodes (inclusive)
 * @param endIdx the index at which to stop removing nodes (inclusive)
 * @param vnode a VNode
 * @param elm an element
 */
const removeVnodes = (vnodes, startIdx, endIdx, vnode, elm) => {
    for (; startIdx <= endIdx; ++startIdx) {
        if ((vnode = vnodes[startIdx])) {
            elm = vnode.$elm$;
            callNodeRefs(vnode);
            {
                // we're removing this element
                // so it's possible we need to show slot fallback content now
                checkSlotFallbackVisibility = true;
                if (elm['s-ol']) {
                    // remove the original location comment
                    elm['s-ol'].remove();
                }
                else {
                    // it's possible that child nodes of the node
                    // that's being removed are slot nodes
                    putBackInOriginalLocation(elm, true);
                }
            }
            // remove the vnode's element from the dom
            elm.remove();
        }
    }
};
/**
 * Reconcile the children of a new VNode with the children of an old VNode by
 * traversing the two collections of children, identifying nodes that are
 * conserved or changed, calling out to `patch` to make any necessary
 * updates to the DOM, and rearranging DOM nodes as needed.
 *
 * The algorithm for reconciling children works by analyzing two 'windows' onto
 * the two arrays of children (`oldCh` and `newCh`). We keep track of the
 * 'windows' by storing start and end indices and references to the
 * corresponding array entries. Initially the two 'windows' are basically equal
 * to the entire array, but we progressively narrow the windows until there are
 * no children left to update by doing the following:
 *
 * 1. Skip any `null` entries at the beginning or end of the two arrays, so
 *    that if we have an initial array like the following we'll end up dealing
 *    only with a window bounded by the highlighted elements:
 *
 *    [null, null, VNode1 , ... , VNode2, null, null]
 *                 ^^^^^^         ^^^^^^
 *
 * 2. Check to see if the elements at the head and tail positions are equal
 *    across the windows. This will basically detect elements which haven't
 *    been added, removed, or changed position, i.e. if you had the following
 *    VNode elements (represented as HTML):
 *
 *    oldVNode: `<div><p><span>HEY</span></p></div>`
 *    newVNode: `<div><p><span>THERE</span></p></div>`
 *
 *    Then when comparing the children of the `<div>` tag we check the equality
 *    of the VNodes corresponding to the `<p>` tags and, since they are the
 *    same tag in the same position, we'd be able to avoid completely
 *    re-rendering the subtree under them with a new DOM element and would just
 *    call out to `patch` to handle reconciling their children and so on.
 *
 * 3. Check, for both windows, to see if the element at the beginning of the
 *    window corresponds to the element at the end of the other window. This is
 *    a heuristic which will let us identify _some_ situations in which
 *    elements have changed position, for instance it _should_ detect that the
 *    children nodes themselves have not changed but merely moved in the
 *    following example:
 *
 *    oldVNode: `<div><element-one /><element-two /></div>`
 *    newVNode: `<div><element-two /><element-one /></div>`
 *
 *    If we find cases like this then we also need to move the concrete DOM
 *    elements corresponding to the moved children to write the re-order to the
 *    DOM.
 *
 * 4. Finally, if VNodes have the `key` attribute set on them we check for any
 *    nodes in the old children which have the same key as the first element in
 *    our window on the new children. If we find such a node we handle calling
 *    out to `patch`, moving relevant DOM nodes, and so on, in accordance with
 *    what we find.
 *
 * Finally, once we've narrowed our 'windows' to the point that either of them
 * collapse (i.e. they have length 0) we then handle any remaining VNode
 * insertion or deletion that needs to happen to get a DOM state that correctly
 * reflects the new child VNodes. If, for instance, after our window on the old
 * children has collapsed we still have more nodes on the new children that
 * we haven't dealt with yet then we need to add them, or if the new children
 * collapse but we still have unhandled _old_ children then we need to make
 * sure the corresponding DOM nodes are removed.
 *
 * @param parentElm the node into which the parent VNode is rendered
 * @param oldCh the old children of the parent node
 * @param newVNode the new VNode which will replace the parent
 * @param newCh the new children of the parent node
 */
const updateChildren = (parentElm, oldCh, newVNode, newCh) => {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let idxInOld = 0;
    let i = 0;
    let oldEndIdx = oldCh.length - 1;
    let oldStartVnode = oldCh[0];
    let oldEndVnode = oldCh[oldEndIdx];
    let newEndIdx = newCh.length - 1;
    let newStartVnode = newCh[0];
    let newEndVnode = newCh[newEndIdx];
    let node;
    let elmToMove;
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (oldStartVnode == null) {
            // VNode might have been moved left
            oldStartVnode = oldCh[++oldStartIdx];
        }
        else if (oldEndVnode == null) {
            oldEndVnode = oldCh[--oldEndIdx];
        }
        else if (newStartVnode == null) {
            newStartVnode = newCh[++newStartIdx];
        }
        else if (newEndVnode == null) {
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newStartVnode)) {
            // if the start nodes are the same then we should patch the new VNode
            // onto the old one, and increment our `newStartIdx` and `oldStartIdx`
            // indices to reflect that. We don't need to move any DOM Nodes around
            // since things are matched up in order.
            patch(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else if (isSameVnode(oldEndVnode, newEndVnode)) {
            // likewise, if the end nodes are the same we patch new onto old and
            // decrement our end indices, and also likewise in this case we don't
            // need to move any DOM Nodes.
            patch(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldStartVnode, newEndVnode)) {
            // case: "Vnode moved right"
            //
            // We've found that the last node in our window on the new children is
            // the same VNode as the _first_ node in our window on the old children
            // we're dealing with now. Visually, this is the layout of these two
            // nodes:
            //
            // newCh: [..., newStartVnode , ... , newEndVnode , ...]
            //                                    ^^^^^^^^^^^
            // oldCh: [..., oldStartVnode , ... , oldEndVnode , ...]
            //              ^^^^^^^^^^^^^
            //
            // In this situation we need to patch `newEndVnode` onto `oldStartVnode`
            // and move the DOM element for `oldStartVnode`.
            if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldStartVnode.$elm$.parentNode, false);
            }
            patch(oldStartVnode, newEndVnode);
            // We need to move the element for `oldStartVnode` into a position which
            // will be appropriate for `newEndVnode`. For this we can use
            // `.insertBefore` and `oldEndVnode.$elm$.nextSibling`. If there is a
            // sibling for `oldEndVnode.$elm$` then we want to move the DOM node for
            // `oldStartVnode` between `oldEndVnode` and it's sibling, like so:
            //
            // <old-start-node />
            // <some-intervening-node />
            // <old-end-node />
            // <!-- ->              <-- `oldStartVnode.$elm$` should be inserted here
            // <next-sibling />
            //
            // If instead `oldEndVnode.$elm$` has no sibling then we just want to put
            // the node for `oldStartVnode` at the end of the children of
            // `parentElm`. Luckily, `Node.nextSibling` will return `null` if there
            // aren't any siblings, and passing `null` to `Node.insertBefore` will
            // append it to the children of the parent element.
            parentElm.insertBefore(oldStartVnode.$elm$, oldEndVnode.$elm$.nextSibling);
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        }
        else if (isSameVnode(oldEndVnode, newStartVnode)) {
            // case: "Vnode moved left"
            //
            // We've found that the first node in our window on the new children is
            // the same VNode as the _last_ node in our window on the old children.
            // Visually, this is the layout of these two nodes:
            //
            // newCh: [..., newStartVnode , ... , newEndVnode , ...]
            //              ^^^^^^^^^^^^^
            // oldCh: [..., oldStartVnode , ... , oldEndVnode , ...]
            //                                    ^^^^^^^^^^^
            //
            // In this situation we need to patch `newStartVnode` onto `oldEndVnode`
            // (which will handle updating any changed attributes, reconciling their
            // children etc) but we also need to move the DOM node to which
            // `oldEndVnode` corresponds.
            if ((oldStartVnode.$tag$ === 'slot' || newEndVnode.$tag$ === 'slot')) {
                putBackInOriginalLocation(oldEndVnode.$elm$.parentNode, false);
            }
            patch(oldEndVnode, newStartVnode);
            // We've already checked above if `oldStartVnode` and `newStartVnode` are
            // the same node, so since we're here we know that they are not. Thus we
            // can move the element for `oldEndVnode` _before_ the element for
            // `oldStartVnode`, leaving `oldStartVnode` to be reconciled in the
            // future.
            parentElm.insertBefore(oldEndVnode.$elm$, oldStartVnode.$elm$);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
        else {
            // Here we do some checks to match up old and new nodes based on the
            // `$key$` attribute, which is set by putting a `key="my-key"` attribute
            // in the JSX for a DOM element in the implementation of a Stencil
            // component.
            //
            // First we check to see if there are any nodes in the array of old
            // children which have the same key as the first node in the new
            // children.
            idxInOld = -1;
            {
                for (i = oldStartIdx; i <= oldEndIdx; ++i) {
                    if (oldCh[i] && oldCh[i].$key$ !== null && oldCh[i].$key$ === newStartVnode.$key$) {
                        idxInOld = i;
                        break;
                    }
                }
            }
            if (idxInOld >= 0) {
                // We found a node in the old children which matches up with the first
                // node in the new children! So let's deal with that
                elmToMove = oldCh[idxInOld];
                if (elmToMove.$tag$ !== newStartVnode.$tag$) {
                    // the tag doesn't match so we'll need a new DOM element
                    node = createElm(oldCh && oldCh[newStartIdx], newVNode, idxInOld, parentElm);
                }
                else {
                    patch(elmToMove, newStartVnode);
                    // invalidate the matching old node so that we won't try to update it
                    // again later on
                    oldCh[idxInOld] = undefined;
                    node = elmToMove.$elm$;
                }
                newStartVnode = newCh[++newStartIdx];
            }
            else {
                // We either didn't find an element in the old children that matches
                // the key of the first new child OR the build is not using `key`
                // attributes at all. In either case we need to create a new element
                // for the new node.
                node = createElm(oldCh && oldCh[newStartIdx], newVNode, newStartIdx, parentElm);
                newStartVnode = newCh[++newStartIdx];
            }
            if (node) {
                // if we created a new node then handle inserting it to the DOM
                {
                    parentReferenceNode(oldStartVnode.$elm$).insertBefore(node, referenceNode(oldStartVnode.$elm$));
                }
            }
        }
    }
    if (oldStartIdx > oldEndIdx) {
        // we have some more new nodes to add which don't match up with old nodes
        addVnodes(parentElm, newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].$elm$, newVNode, newCh, newStartIdx, newEndIdx);
    }
    else if (newStartIdx > newEndIdx) {
        // there are nodes in the `oldCh` array which no longer correspond to nodes
        // in the new array, so lets remove them (which entails cleaning up the
        // relevant DOM nodes)
        removeVnodes(oldCh, oldStartIdx, oldEndIdx);
    }
};
/**
 * Compare two VNodes to determine if they are the same
 *
 * **NB**: This function is an equality _heuristic_ based on the available
 * information set on the two VNodes and can be misleading under certain
 * circumstances. In particular, if the two nodes do not have `key` attrs
 * (available under `$key$` on VNodes) then the function falls back on merely
 * checking that they have the same tag.
 *
 * So, in other words, if `key` attrs are not set on VNodes which may be
 * changing order within a `children` array or something along those lines then
 * we could obtain a false negative and then have to do needless re-rendering
 * (i.e. we'd say two VNodes aren't equal when in fact they should be).
 *
 * @param leftVNode the first VNode to check
 * @param rightVNode the second VNode to check
 * @returns whether they're equal or not
 */
const isSameVnode = (leftVNode, rightVNode) => {
    // compare if two vnode to see if they're "technically" the same
    // need to have the same element tag, and same key to be the same
    if (leftVNode.$tag$ === rightVNode.$tag$) {
        if (leftVNode.$tag$ === 'slot') {
            return leftVNode.$name$ === rightVNode.$name$;
        }
        // this will be set if components in the build have `key` attrs set on them
        {
            return leftVNode.$key$ === rightVNode.$key$;
        }
    }
    return false;
};
const referenceNode = (node) => {
    // this node was relocated to a new location in the dom
    // because of some other component's slot
    // but we still have an html comment in place of where
    // it's original location was according to it's original vdom
    return (node && node['s-ol']) || node;
};
const parentReferenceNode = (node) => (node['s-ol'] ? node['s-ol'] : node).parentNode;
/**
 * Handle reconciling an outdated VNode with a new one which corresponds to
 * it. This function handles flushing updates to the DOM and reconciling the
 * children of the two nodes (if any).
 *
 * @param oldVNode an old VNode whose DOM element and children we want to update
 * @param newVNode a new VNode representing an updated version of the old one
 */
const patch = (oldVNode, newVNode) => {
    const elm = (newVNode.$elm$ = oldVNode.$elm$);
    const oldChildren = oldVNode.$children$;
    const newChildren = newVNode.$children$;
    const tag = newVNode.$tag$;
    const text = newVNode.$text$;
    let defaultHolder;
    if (text === null) {
        {
            // test if we're rendering an svg element, or still rendering nodes inside of one
            // only add this to the when the compiler sees we're using an svg somewhere
            isSvgMode = tag === 'svg' ? true : tag === 'foreignObject' ? false : isSvgMode;
        }
        {
            if (tag === 'slot')
                ;
            else {
                // either this is the first render of an element OR it's an update
                // AND we already know it's possible it could have changed
                // this updates the element's css classes, attrs, props, listeners, etc.
                updateElement(oldVNode, newVNode, isSvgMode);
            }
        }
        if (oldChildren !== null && newChildren !== null) {
            // looks like there's child vnodes for both the old and new vnodes
            // so we need to call `updateChildren` to reconcile them
            updateChildren(elm, oldChildren, newVNode, newChildren);
        }
        else if (newChildren !== null) {
            // no old child vnodes, but there are new child vnodes to add
            if (oldVNode.$text$ !== null) {
                // the old vnode was text, so be sure to clear it out
                elm.textContent = '';
            }
            // add the new vnode children
            addVnodes(elm, null, newVNode, newChildren, 0, newChildren.length - 1);
        }
        else if (oldChildren !== null) {
            // no new child vnodes, but there are old child vnodes to remove
            removeVnodes(oldChildren, 0, oldChildren.length - 1);
        }
        if (isSvgMode && tag === 'svg') {
            isSvgMode = false;
        }
    }
    else if ((defaultHolder = elm['s-cr'])) {
        // this element has slotted content
        defaultHolder.parentNode.textContent = text;
    }
    else if (oldVNode.$text$ !== text) {
        // update the text content for the text only vnode
        // and also only if the text is different than before
        elm.data = text;
    }
};
const updateFallbackSlotVisibility = (elm) => {
    // tslint:disable-next-line: prefer-const
    const childNodes = elm.childNodes;
    let childNode;
    let i;
    let ilen;
    let j;
    let slotNameAttr;
    let nodeType;
    for (i = 0, ilen = childNodes.length; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode.nodeType === 1 /* NODE_TYPE.ElementNode */) {
            if (childNode['s-sr']) {
                // this is a slot fallback node
                // get the slot name for this slot reference node
                slotNameAttr = childNode['s-sn'];
                // by default always show a fallback slot node
                // then hide it if there are other slots in the light dom
                childNode.hidden = false;
                for (j = 0; j < ilen; j++) {
                    nodeType = childNodes[j].nodeType;
                    if (childNodes[j]['s-hn'] !== childNode['s-hn'] || slotNameAttr !== '') {
                        // this sibling node is from a different component OR is a named fallback slot node
                        if (nodeType === 1 /* NODE_TYPE.ElementNode */ && slotNameAttr === childNodes[j].getAttribute('slot')) {
                            childNode.hidden = true;
                            break;
                        }
                    }
                    else {
                        // this is a default fallback slot node
                        // any element or text node (with content)
                        // should hide the default fallback slot node
                        if (nodeType === 1 /* NODE_TYPE.ElementNode */ ||
                            (nodeType === 3 /* NODE_TYPE.TextNode */ && childNodes[j].textContent.trim() !== '')) {
                            childNode.hidden = true;
                            break;
                        }
                    }
                }
            }
            // keep drilling down
            updateFallbackSlotVisibility(childNode);
        }
    }
};
const relocateNodes = [];
const relocateSlotContent = (elm) => {
    // tslint:disable-next-line: prefer-const
    let childNode;
    let node;
    let hostContentNodes;
    let slotNameAttr;
    let relocateNodeData;
    let j;
    let i = 0;
    const childNodes = elm.childNodes;
    const ilen = childNodes.length;
    for (; i < ilen; i++) {
        childNode = childNodes[i];
        if (childNode['s-sr'] && (node = childNode['s-cr']) && node.parentNode) {
            // first got the content reference comment node
            // then we got it's parent, which is where all the host content is in now
            hostContentNodes = node.parentNode.childNodes;
            slotNameAttr = childNode['s-sn'];
            for (j = hostContentNodes.length - 1; j >= 0; j--) {
                node = hostContentNodes[j];
                if (!node['s-cn'] && !node['s-nr'] && node['s-hn'] !== childNode['s-hn']) {
                    // let's do some relocating to its new home
                    // but never relocate a content reference node
                    // that is suppose to always represent the original content location
                    if (isNodeLocatedInSlot(node, slotNameAttr)) {
                        // it's possible we've already decided to relocate this node
                        relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                        // made some changes to slots
                        // let's make sure we also double check
                        // fallbacks are correctly hidden or shown
                        checkSlotFallbackVisibility = true;
                        node['s-sn'] = node['s-sn'] || slotNameAttr;
                        if (relocateNodeData) {
                            // previously we never found a slot home for this node
                            // but turns out we did, so let's remember it now
                            relocateNodeData.$slotRefNode$ = childNode;
                        }
                        else {
                            // add to our list of nodes to relocate
                            relocateNodes.push({
                                $slotRefNode$: childNode,
                                $nodeToRelocate$: node,
                            });
                        }
                        if (node['s-sr']) {
                            relocateNodes.map((relocateNode) => {
                                if (isNodeLocatedInSlot(relocateNode.$nodeToRelocate$, node['s-sn'])) {
                                    relocateNodeData = relocateNodes.find((r) => r.$nodeToRelocate$ === node);
                                    if (relocateNodeData && !relocateNode.$slotRefNode$) {
                                        relocateNode.$slotRefNode$ = relocateNodeData.$slotRefNode$;
                                    }
                                }
                            });
                        }
                    }
                    else if (!relocateNodes.some((r) => r.$nodeToRelocate$ === node)) {
                        // so far this element does not have a slot home, not setting slotRefNode on purpose
                        // if we never find a home for this element then we'll need to hide it
                        relocateNodes.push({
                            $nodeToRelocate$: node,
                        });
                    }
                }
            }
        }
        if (childNode.nodeType === 1 /* NODE_TYPE.ElementNode */) {
            relocateSlotContent(childNode);
        }
    }
};
const isNodeLocatedInSlot = (nodeToRelocate, slotNameAttr) => {
    if (nodeToRelocate.nodeType === 1 /* NODE_TYPE.ElementNode */) {
        if (nodeToRelocate.getAttribute('slot') === null && slotNameAttr === '') {
            return true;
        }
        if (nodeToRelocate.getAttribute('slot') === slotNameAttr) {
            return true;
        }
        return false;
    }
    if (nodeToRelocate['s-sn'] === slotNameAttr) {
        return true;
    }
    return slotNameAttr === '';
};
const callNodeRefs = (vNode) => {
    {
        vNode.$attrs$ && vNode.$attrs$.ref && vNode.$attrs$.ref(null);
        vNode.$children$ && vNode.$children$.map(callNodeRefs);
    }
};
/**
 * The main entry point for Stencil's virtual DOM-based rendering engine
 *
 * Given a {@link d.HostRef} container and some virtual DOM nodes, this
 * function will handle creating a virtual DOM tree with a single root, patching
 * the current virtual DOM tree onto an old one (if any), dealing with slot
 * relocation, and reflecting attributes.
 *
 * @param hostRef data needed to root and render the virtual DOM tree, such as
 * the DOM node into which it should be rendered.
 * @param renderFnResults the virtual DOM nodes to be rendered
 */
const renderVdom = (hostRef, renderFnResults) => {
    const hostElm = hostRef.$hostElement$;
    const cmpMeta = hostRef.$cmpMeta$;
    const oldVNode = hostRef.$vnode$ || newVNode(null, null);
    const rootVnode = isHost(renderFnResults) ? renderFnResults : h(null, null, renderFnResults);
    hostTagName = hostElm.tagName;
    if (cmpMeta.$attrsToReflect$) {
        rootVnode.$attrs$ = rootVnode.$attrs$ || {};
        cmpMeta.$attrsToReflect$.map(([propName, attribute]) => (rootVnode.$attrs$[attribute] = hostElm[propName]));
    }
    rootVnode.$tag$ = null;
    rootVnode.$flags$ |= 4 /* VNODE_FLAGS.isHost */;
    hostRef.$vnode$ = rootVnode;
    rootVnode.$elm$ = oldVNode.$elm$ = (hostElm.shadowRoot || hostElm );
    {
        scopeId = hostElm['s-sc'];
    }
    {
        contentRef = hostElm['s-cr'];
        useNativeShadowDom = (cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */) !== 0;
        // always reset
        checkSlotFallbackVisibility = false;
    }
    // synchronous patch
    patch(oldVNode, rootVnode);
    {
        // while we're moving nodes around existing nodes, temporarily disable
        // the disconnectCallback from working
        plt.$flags$ |= 1 /* PLATFORM_FLAGS.isTmpDisconnected */;
        if (checkSlotRelocate) {
            relocateSlotContent(rootVnode.$elm$);
            let relocateData;
            let nodeToRelocate;
            let orgLocationNode;
            let parentNodeRef;
            let insertBeforeNode;
            let refNode;
            let i = 0;
            for (; i < relocateNodes.length; i++) {
                relocateData = relocateNodes[i];
                nodeToRelocate = relocateData.$nodeToRelocate$;
                if (!nodeToRelocate['s-ol']) {
                    // add a reference node marking this node's original location
                    // keep a reference to this node for later lookups
                    orgLocationNode =
                        doc.createTextNode('');
                    orgLocationNode['s-nr'] = nodeToRelocate;
                    nodeToRelocate.parentNode.insertBefore((nodeToRelocate['s-ol'] = orgLocationNode), nodeToRelocate);
                }
            }
            for (i = 0; i < relocateNodes.length; i++) {
                relocateData = relocateNodes[i];
                nodeToRelocate = relocateData.$nodeToRelocate$;
                if (relocateData.$slotRefNode$) {
                    // by default we're just going to insert it directly
                    // after the slot reference node
                    parentNodeRef = relocateData.$slotRefNode$.parentNode;
                    insertBeforeNode = relocateData.$slotRefNode$.nextSibling;
                    orgLocationNode = nodeToRelocate['s-ol'];
                    while ((orgLocationNode = orgLocationNode.previousSibling)) {
                        refNode = orgLocationNode['s-nr'];
                        if (refNode && refNode['s-sn'] === nodeToRelocate['s-sn'] && parentNodeRef === refNode.parentNode) {
                            refNode = refNode.nextSibling;
                            if (!refNode || !refNode['s-nr']) {
                                insertBeforeNode = refNode;
                                break;
                            }
                        }
                    }
                    if ((!insertBeforeNode && parentNodeRef !== nodeToRelocate.parentNode) ||
                        nodeToRelocate.nextSibling !== insertBeforeNode) {
                        // we've checked that it's worth while to relocate
                        // since that the node to relocate
                        // has a different next sibling or parent relocated
                        if (nodeToRelocate !== insertBeforeNode) {
                            if (!nodeToRelocate['s-hn'] && nodeToRelocate['s-ol']) {
                                // probably a component in the index.html that doesn't have it's hostname set
                                nodeToRelocate['s-hn'] = nodeToRelocate['s-ol'].parentNode.nodeName;
                            }
                            // add it back to the dom but in its new home
                            parentNodeRef.insertBefore(nodeToRelocate, insertBeforeNode);
                        }
                    }
                }
                else {
                    // this node doesn't have a slot home to go to, so let's hide it
                    if (nodeToRelocate.nodeType === 1 /* NODE_TYPE.ElementNode */) {
                        nodeToRelocate.hidden = true;
                    }
                }
            }
        }
        if (checkSlotFallbackVisibility) {
            updateFallbackSlotVisibility(rootVnode.$elm$);
        }
        // done moving nodes around
        // allow the disconnect callback to work again
        plt.$flags$ &= ~1 /* PLATFORM_FLAGS.isTmpDisconnected */;
        // always reset
        relocateNodes.length = 0;
    }
};
const attachToAncestor = (hostRef, ancestorComponent) => {
};
const scheduleUpdate = (hostRef, isInitialLoad) => {
    {
        hostRef.$flags$ |= 16 /* HOST_FLAGS.isQueuedForUpdate */;
    }
    attachToAncestor(hostRef, hostRef.$ancestorComponent$);
    // there is no ancestor component or the ancestor component
    // has already fired off its lifecycle update then
    // fire off the initial update
    const dispatch = () => dispatchHooks(hostRef, isInitialLoad);
    return writeTask(dispatch) ;
};
const dispatchHooks = (hostRef, isInitialLoad) => {
    const elm = hostRef.$hostElement$;
    const endSchedule = createTime('scheduleUpdate', hostRef.$cmpMeta$.$tagName$);
    const instance = elm;
    let promise;
    if (isInitialLoad) {
        {
            promise = safeCall(instance, 'componentWillLoad');
        }
    }
    else {
        {
            promise = safeCall(instance, 'componentWillUpdate');
        }
    }
    {
        promise = then(promise, () => safeCall(instance, 'componentWillRender'));
    }
    endSchedule();
    return then(promise, () => updateComponent(hostRef, instance, isInitialLoad));
};
const updateComponent = async (hostRef, instance, isInitialLoad) => {
    // updateComponent
    const elm = hostRef.$hostElement$;
    const endUpdate = createTime('update', hostRef.$cmpMeta$.$tagName$);
    elm['s-rc'];
    if (isInitialLoad) {
        // DOM WRITE!
        attachStyles(hostRef);
    }
    const endRender = createTime('render', hostRef.$cmpMeta$.$tagName$);
    {
        callRender(hostRef, instance, elm);
    }
    endRender();
    endUpdate();
    {
        postUpdateComponent(hostRef);
    }
};
const callRender = (hostRef, instance, elm) => {
    // in order for bundlers to correctly treeshake the BUILD object
    // we need to ensure BUILD is not deoptimized within a try/catch
    // https://rollupjs.org/guide/en/#treeshake tryCatchDeoptimization
    const allRenderFn = false;
    const lazyLoad = false;
    const taskQueue = true ;
    const updatable = true ;
    try {
        renderingRef = instance;
        instance = allRenderFn ? instance.render() : instance.render && instance.render();
        if (updatable && taskQueue) {
            hostRef.$flags$ &= ~16 /* HOST_FLAGS.isQueuedForUpdate */;
        }
        if (updatable || lazyLoad) {
            hostRef.$flags$ |= 2 /* HOST_FLAGS.hasRendered */;
        }
        if (BUILD.hasRenderFn || BUILD.reflect) {
            if (BUILD.vdomRender || BUILD.reflect) {
                // looks like we've got child nodes to render into this host element
                // or we need to update the css class/attrs on the host element
                // DOM WRITE!
                if (BUILD.hydrateServerSide) ;
                else {
                    renderVdom(hostRef, instance);
                }
            }
        }
    }
    catch (e) {
        consoleError(e, hostRef.$hostElement$);
    }
    renderingRef = null;
    return null;
};
const postUpdateComponent = (hostRef) => {
    const tagName = hostRef.$cmpMeta$.$tagName$;
    const elm = hostRef.$hostElement$;
    const endPostUpdate = createTime('postUpdate', tagName);
    const instance = elm;
    hostRef.$ancestorComponent$;
    {
        safeCall(instance, 'componentDidRender');
    }
    if (!(hostRef.$flags$ & 64 /* HOST_FLAGS.hasLoadedComponent */)) {
        hostRef.$flags$ |= 64 /* HOST_FLAGS.hasLoadedComponent */;
        {
            safeCall(instance, 'componentDidLoad');
        }
        endPostUpdate();
    }
    else {
        {
            safeCall(instance, 'componentDidUpdate');
        }
        endPostUpdate();
    }
    // ( •_•)
    // ( •_•)>⌐■-■
    // (⌐■_■)
};
const safeCall = (instance, method, arg) => {
    if (instance && instance[method]) {
        try {
            return instance[method](arg);
        }
        catch (e) {
            consoleError(e);
        }
    }
    return undefined;
};
const then = (promise, thenFn) => {
    return promise && promise.then ? promise.then(thenFn) : thenFn();
};
const getValue = (ref, propName) => getHostRef(ref).$instanceValues$.get(propName);
const setValue = (ref, propName, newVal, cmpMeta) => {
    // check our new property value against our internal value
    const hostRef = getHostRef(ref);
    const elm = ref;
    const oldVal = hostRef.$instanceValues$.get(propName);
    const flags = hostRef.$flags$;
    const instance = elm;
    newVal = parsePropertyValue(newVal, cmpMeta.$members$[propName][0]);
    // explicitly check for NaN on both sides, as `NaN === NaN` is always false
    const areBothNaN = Number.isNaN(oldVal) && Number.isNaN(newVal);
    const didValueChange = newVal !== oldVal && !areBothNaN;
    if (didValueChange) {
        // gadzooks! the property's value has changed!!
        // set our new value!
        hostRef.$instanceValues$.set(propName, newVal);
        {
            // get an array of method names of watch functions to call
            if (cmpMeta.$watchers$ && flags & 128 /* HOST_FLAGS.isWatchReady */) {
                const watchMethods = cmpMeta.$watchers$[propName];
                if (watchMethods) {
                    // this instance is watching for when this property changed
                    watchMethods.map((watchMethodName) => {
                        try {
                            // fire off each of the watch methods that are watching this property
                            instance[watchMethodName](newVal, oldVal, propName);
                        }
                        catch (e) {
                            consoleError(e, elm);
                        }
                    });
                }
            }
            if ((flags & (2 /* HOST_FLAGS.hasRendered */ | 16 /* HOST_FLAGS.isQueuedForUpdate */)) === 2 /* HOST_FLAGS.hasRendered */) {
                if (instance.componentShouldUpdate) {
                    if (instance.componentShouldUpdate(newVal, oldVal, propName) === false) {
                        return;
                    }
                }
                // looks like this value actually changed, so we've got work to do!
                // but only if we've already rendered, otherwise just chill out
                // queue that we need to do an update, but don't worry about queuing
                // up millions cuz this function ensures it only runs once
                scheduleUpdate(hostRef, false);
            }
        }
    }
};
/**
 * Attach a series of runtime constructs to a compiled Stencil component
 * constructor, including getters and setters for the `@Prop` and `@State`
 * decorators, callbacks for when attributes change, and so on.
 *
 * @param Cstr the constructor for a component that we need to process
 * @param cmpMeta metadata collected previously about the component
 * @param flags a number used to store a series of bit flags
 * @returns a reference to the same constructor passed in (but now mutated)
 */
const proxyComponent = (Cstr, cmpMeta, flags) => {
    if (cmpMeta.$members$) {
        if (Cstr.watchers) {
            cmpMeta.$watchers$ = Cstr.watchers;
        }
        // It's better to have a const than two Object.entries()
        const members = Object.entries(cmpMeta.$members$);
        const prototype = Cstr.prototype;
        members.map(([memberName, [memberFlags]]) => {
            if ((memberFlags & 31 /* MEMBER_FLAGS.Prop */ ||
                    (memberFlags & 32 /* MEMBER_FLAGS.State */))) {
                // proxyComponent - prop
                Object.defineProperty(prototype, memberName, {
                    get() {
                        // proxyComponent, get value
                        return getValue(this, memberName);
                    },
                    set(newValue) {
                        // proxyComponent, set value
                        setValue(this, memberName, newValue, cmpMeta);
                    },
                    configurable: true,
                    enumerable: true,
                });
            }
        });
        {
            const attrNameToPropName = new Map();
            prototype.attributeChangedCallback = function (attrName, _oldValue, newValue) {
                plt.jmp(() => {
                    const propName = attrNameToPropName.get(attrName);
                    //  In a web component lifecycle the attributeChangedCallback runs prior to connectedCallback
                    //  in the case where an attribute was set inline.
                    //  ```html
                    //    <my-component some-attribute="some-value"></my-component>
                    //  ```
                    //
                    //  There is an edge case where a developer sets the attribute inline on a custom element and then
                    //  programmatically changes it before it has been upgraded as shown below:
                    //
                    //  ```html
                    //    <!-- this component has _not_ been upgraded yet -->
                    //    <my-component id="test" some-attribute="some-value"></my-component>
                    //    <script>
                    //      // grab non-upgraded component
                    //      el = document.querySelector("#test");
                    //      el.someAttribute = "another-value";
                    //      // upgrade component
                    //      customElements.define('my-component', MyComponent);
                    //    </script>
                    //  ```
                    //  In this case if we do not unshadow here and use the value of the shadowing property, attributeChangedCallback
                    //  will be called with `newValue = "some-value"` and will set the shadowed property (this.someAttribute = "another-value")
                    //  to the value that was set inline i.e. "some-value" from above example. When
                    //  the connectedCallback attempts to unshadow it will use "some-value" as the initial value rather than "another-value"
                    //
                    //  The case where the attribute was NOT set inline but was not set programmatically shall be handled/unshadowed
                    //  by connectedCallback as this attributeChangedCallback will not fire.
                    //
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
                    //
                    //  TODO(STENCIL-16) we should think about whether or not we actually want to be reflecting the attributes to
                    //  properties here given that this goes against best practices outlined here
                    //  https://developers.google.com/web/fundamentals/web-components/best-practices#avoid-reentrancy
                    if (this.hasOwnProperty(propName)) {
                        newValue = this[propName];
                        delete this[propName];
                    }
                    else if (prototype.hasOwnProperty(propName) &&
                        typeof this[propName] === 'number' &&
                        this[propName] == newValue) {
                        // if the propName exists on the prototype of `Cstr`, this update may be a result of Stencil using native
                        // APIs to reflect props as attributes. Calls to `setAttribute(someElement, propName)` will result in
                        // `propName` to be converted to a `DOMString`, which may not be what we want for other primitive props.
                        return;
                    }
                    this[propName] = newValue === null && typeof this[propName] === 'boolean' ? false : newValue;
                });
            };
            // create an array of attributes to observe
            // and also create a map of html attribute name to js property name
            Cstr.observedAttributes = members
                .filter(([_, m]) => m[0] & 15 /* MEMBER_FLAGS.HasAttribute */) // filter to only keep props that should match attributes
                .map(([propName, m]) => {
                const attrName = m[1] || propName;
                attrNameToPropName.set(attrName, propName);
                if (m[0] & 512 /* MEMBER_FLAGS.ReflectAttr */) {
                    cmpMeta.$attrsToReflect$.push([propName, attrName]);
                }
                return attrName;
            });
        }
    }
    return Cstr;
};
const initializeComponent = async (elm, hostRef, cmpMeta, hmrVersionId, Cstr) => {
    // initializeComponent
    if ((hostRef.$flags$ & 32 /* HOST_FLAGS.hasInitializedComponent */) === 0) {
        {
            // sync constructor component
            Cstr = elm.constructor;
            hostRef.$flags$ |= 32 /* HOST_FLAGS.hasInitializedComponent */;
            // wait for the CustomElementRegistry to mark the component as ready before setting `isWatchReady`. Otherwise,
            // watchers may fire prematurely if `customElements.get()`/`customElements.whenDefined()` resolves _before_
            // Stencil has completed instantiating the component.
            customElements.whenDefined(cmpMeta.$tagName$).then(() => (hostRef.$flags$ |= 128 /* HOST_FLAGS.isWatchReady */));
        }
        if (Cstr.style) {
            // this component has styles but we haven't registered them yet
            let style = Cstr.style;
            if (typeof style !== 'string') {
                style = style[(hostRef.$modeName$ = computeMode(elm))];
            }
            const scopeId = getScopeId(cmpMeta, hostRef.$modeName$);
            if (!styles.has(scopeId)) {
                const endRegisterStyles = createTime('registerStyles', cmpMeta.$tagName$);
                registerStyle(scopeId, style, !!(cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */));
                endRegisterStyles();
            }
        }
    }
    // we've successfully created a lazy instance
    hostRef.$ancestorComponent$;
    const schedule = () => scheduleUpdate(hostRef, true);
    {
        schedule();
    }
};
const fireConnectedCallback = (instance) => {
};
const connectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        const cmpMeta = hostRef.$cmpMeta$;
        const endConnected = createTime('connectedCallback', cmpMeta.$tagName$);
        if (!(hostRef.$flags$ & 1 /* HOST_FLAGS.hasConnected */)) {
            // first time this component has connected
            hostRef.$flags$ |= 1 /* HOST_FLAGS.hasConnected */;
            {
                // initUpdate
                // if the slot polyfill is required we'll need to put some nodes
                // in here to act as original content anchors as we move nodes around
                // host element has been connected to the DOM
                if ((cmpMeta.$flags$ & (4 /* CMP_FLAGS.hasSlotRelocation */ | 8 /* CMP_FLAGS.needsShadowDomShim */))) {
                    setContentReference(elm);
                }
            }
            // Lazy properties
            // https://developers.google.com/web/fundamentals/web-components/best-practices#lazy-properties
            if (cmpMeta.$members$) {
                Object.entries(cmpMeta.$members$).map(([memberName, [memberFlags]]) => {
                    if (memberFlags & 31 /* MEMBER_FLAGS.Prop */ && elm.hasOwnProperty(memberName)) {
                        const value = elm[memberName];
                        delete elm[memberName];
                        elm[memberName] = value;
                    }
                });
            }
            {
                initializeComponent(elm, hostRef, cmpMeta);
            }
        }
        else {
            // not the first time this has connected
            // reattach any event listeners to the host
            // since they would have been removed when disconnected
            addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
            // fire off connectedCallback() on component instance
            fireConnectedCallback(hostRef.$lazyInstance$);
        }
        endConnected();
    }
};
const setContentReference = (elm) => {
    // only required when we're NOT using native shadow dom (slot)
    // or this browser doesn't support native shadow dom
    // and this host element was NOT created with SSR
    // let's pick out the inner content for slot projection
    // create a node to represent where the original
    // content was first placed, which is useful later on
    const contentRefElm = (elm['s-cr'] = doc.createComment(''));
    contentRefElm['s-cn'] = true;
    elm.insertBefore(contentRefElm, elm.firstChild);
};
const disconnectedCallback = (elm) => {
    if ((plt.$flags$ & 1 /* PLATFORM_FLAGS.isTmpDisconnected */) === 0) {
        const hostRef = getHostRef(elm);
        {
            if (hostRef.$rmListeners$) {
                hostRef.$rmListeners$.map((rmListener) => rmListener());
                hostRef.$rmListeners$ = undefined;
            }
        }
    }
};
const proxyCustomElement = (Cstr, compactMeta) => {
    const cmpMeta = {
        $flags$: compactMeta[0],
        $tagName$: compactMeta[1],
    };
    {
        cmpMeta.$members$ = compactMeta[2];
    }
    {
        cmpMeta.$listeners$ = compactMeta[3];
    }
    {
        cmpMeta.$watchers$ = Cstr.$watchers$;
    }
    {
        cmpMeta.$attrsToReflect$ = [];
    }
    if (!supportsShadow && cmpMeta.$flags$ & 1 /* CMP_FLAGS.shadowDomEncapsulation */) {
        cmpMeta.$flags$ |= 8 /* CMP_FLAGS.needsShadowDomShim */;
    }
    const originalConnectedCallback = Cstr.prototype.connectedCallback;
    const originalDisconnectedCallback = Cstr.prototype.disconnectedCallback;
    Object.assign(Cstr.prototype, {
        __registerHost() {
            registerHost(this, cmpMeta);
        },
        connectedCallback() {
            connectedCallback(this);
            if (originalConnectedCallback) {
                originalConnectedCallback.call(this);
            }
        },
        disconnectedCallback() {
            disconnectedCallback(this);
            if (originalDisconnectedCallback) {
                originalDisconnectedCallback.call(this);
            }
        },
        __attachShadow() {
            if (supportsShadow) {
                {
                    this.attachShadow({
                        mode: 'open',
                        delegatesFocus: !!(cmpMeta.$flags$ & 16 /* CMP_FLAGS.shadowDelegatesFocus */),
                    });
                }
            }
            else {
                this.shadowRoot = this;
            }
        },
    });
    Cstr.is = cmpMeta.$tagName$;
    return proxyComponent(Cstr, cmpMeta);
};
const addHostEventListeners = (elm, hostRef, listeners, attachParentListeners) => {
    if (listeners) {
        listeners.map(([flags, name, method]) => {
            const target = getHostListenerTarget(elm, flags) ;
            const handler = hostListenerProxy(hostRef, method);
            const opts = hostListenerOpts(flags);
            plt.ael(target, name, handler, opts);
            (hostRef.$rmListeners$ = hostRef.$rmListeners$ || []).push(() => plt.rel(target, name, handler, opts));
        });
    }
};
const hostListenerProxy = (hostRef, methodName) => (ev) => {
    try {
        if (BUILD.lazyLoad) ;
        else {
            hostRef.$hostElement$[methodName](ev);
        }
    }
    catch (e) {
        consoleError(e);
    }
};
const getHostListenerTarget = (elm, flags) => {
    if (flags & 4 /* LISTENER_FLAGS.TargetDocument */)
        return doc;
    if (flags & 8 /* LISTENER_FLAGS.TargetWindow */)
        return win;
    if (flags & 16 /* LISTENER_FLAGS.TargetBody */)
        return doc.body;
    return elm;
};
// prettier-ignore
const hostListenerOpts = (flags) => supportsListenerOptions
    ? ({
        passive: (flags & 1 /* LISTENER_FLAGS.Passive */) !== 0,
        capture: (flags & 2 /* LISTENER_FLAGS.Capture */) !== 0,
    })
    : (flags & 2 /* LISTENER_FLAGS.Capture */) !== 0;
const hostRefs = /*@__PURE__*/ new WeakMap();
const getHostRef = (ref) => hostRefs.get(ref);
const registerHost = (elm, cmpMeta) => {
    const hostRef = {
        $flags$: 0,
        $hostElement$: elm,
        $cmpMeta$: cmpMeta,
        $instanceValues$: new Map(),
    };
    addHostEventListeners(elm, hostRef, cmpMeta.$listeners$);
    return hostRefs.set(elm, hostRef);
};
const isMemberInElement = (elm, memberName) => memberName in elm;
const consoleError = (e, el) => (0, console.error)(e, el);
const styles = /*@__PURE__*/ new Map();
const modeResolutionChain = [];
const win = typeof window !== 'undefined' ? window : {};
const doc = win.document || { head: {} };
const H = (win.HTMLElement || class {
});
const plt = {
    $flags$: 0,
    $resourcesUrl$: '',
    jmp: (h) => h(),
    raf: (h) => requestAnimationFrame(h),
    ael: (el, eventName, listener, opts) => el.addEventListener(eventName, listener, opts),
    rel: (el, eventName, listener, opts) => el.removeEventListener(eventName, listener, opts),
    ce: (eventName, opts) => new CustomEvent(eventName, opts),
};
const supportsShadow = true;
const supportsListenerOptions = /*@__PURE__*/ (() => {
    let supportsListenerOptions = false;
    try {
        doc.addEventListener('e', null, Object.defineProperty({}, 'passive', {
            get() {
                supportsListenerOptions = true;
            },
        }));
    }
    catch (e) { }
    return supportsListenerOptions;
})();
const promiseResolve = (v) => Promise.resolve(v);
const supportsConstructableStylesheets = /*@__PURE__*/ (() => {
        try {
            new CSSStyleSheet();
            return typeof new CSSStyleSheet().replaceSync === 'function';
        }
        catch (e) { }
        return false;
    })()
    ;
const queueDomReads = [];
const queueDomWrites = [];
const queueTask = (queue, write) => (cb) => {
    queue.push(cb);
    if (!queuePending) {
        queuePending = true;
        if (write && plt.$flags$ & 4 /* PLATFORM_FLAGS.queueSync */) {
            nextTick(flush);
        }
        else {
            plt.raf(flush);
        }
    }
};
const consume = (queue) => {
    for (let i = 0; i < queue.length; i++) {
        try {
            queue[i](performance.now());
        }
        catch (e) {
            consoleError(e);
        }
    }
    queue.length = 0;
};
const flush = () => {
    // always force a bunch of medium callbacks to run, but still have
    // a throttle on how many can run in a certain time
    // DOM READS!!!
    consume(queueDomReads);
    // DOM WRITES!!!
    {
        consume(queueDomWrites);
        if ((queuePending = queueDomReads.length > 0)) {
            // still more to do yet, but we've run out of time
            // let's let this thing cool off and try again in the next tick
            plt.raf(flush);
        }
    }
};
const nextTick = /*@__PURE__*/ (cb) => promiseResolve().then(cb);
const writeTask = /*@__PURE__*/ queueTask(queueDomWrites, true);

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const FormControl = (props, children) => {
  const hasLabel = props.label ? true : props.hasLabelSlot;
  const hasHelpText = props.helpText ? true : props.hasHelpTextSlot;
  const hasInvalidText = props.invalidText ? true : props.hasInvalidTextSlot;
  const showHelpText = props.invalid ? false : true;
  const showInvalidText = props.invalid ? true : false;
  return (h("div", { class: {
      'form-control': true,
      [`form-control-${props.size}`]: true,
      'form-control-has-label': hasLabel,
      'form-control-has-help-text': hasHelpText,
      'form-control-has-invalid-text': hasInvalidText,
    } },
    h("label", { id: props.labelId, class: "form-control-label", htmlFor: props.inputId, "aria-hidden": hasLabel ? 'false' : 'true', onClick: props.onLabelClick },
      h("slot", { name: "label" }, props.label),
      props.requiredIndicator && (h("div", { class: "asterisk" },
        h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 1200 1200" },
          h("path", { fill: "currentColor", d: "M489.838 29.354v443.603L68.032 335.894 0 545.285l421.829 137.086-260.743 358.876 178.219 129.398L600.048 811.84l260.673 358.806 178.146-129.398-260.766-358.783L1200 545.379l-68.032-209.403-421.899 137.07V29.443H489.84l-.002-.089z" }))))),
    h("div", { class: "form-control-input" }, children),
    showHelpText && (h("div", { id: props.helpTextId, class: "form-control-help-text", "aria-hidden": hasHelpText ? 'false' : 'true' },
      h("slot", { name: "help-text" }, props.helpText))),
    showInvalidText && (h("div", { id: props.invalidTextId, class: "form-control-invalid-text", "aria-hidden": hasInvalidText ? 'false' : 'true' },
      h("div", { class: "icon" },
        h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" },
          h("title", null, "Alert Circle"),
          h("path", { d: "M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm0,319.91a20,20,0,1,1,20-20A20,20,0,0,1,256,367.91Zm21.72-201.15-5.74,122a16,16,0,0,1-32,0l-5.74-121.94v-.05a21.74,21.74,0,1,1,43.44,0Z", fill: "currentColor" }))),
      h("div", { class: "text" },
        h("slot", { name: "invalid-text" }, props.invalidText))))));
};

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
/**
 * Given a slot, this function iterates over all of its assigned text nodes and returns the concatenated text as a
 * string. This is useful because we can't use slot.textContent as an alternative.
*/
function getTextContent(slot) {
  const nodes = slot ? slot.assignedNodes({ flatten: true }) : [];
  let text = '';
  [...nodes].map(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });
  return text;
}
//
// Determines whether an element has a slot. If name is specified, the function will look for a corresponding named
// slot, otherwise it will look for a "default" slot (e.g. a non-empty text node or an element with no slot attribute).
//
function hasSlot(el, name) {
  // Look for a named slot
  if (name) {
    return el.querySelector(`[slot="${name}"]`) !== null;
  }
  // Look for a default slot
  return [...el.childNodes].some(node => {
    if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== '') {
      return true;
    }
    if (node.nodeType === node.ELEMENT_NODE) {
      const el = node;
      if (!el.hasAttribute('slot')) {
        return true;
      }
    }
    return false;
  });
}

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
/**
 * Elements inside of web components sometimes need to inherit global attributes
 * set on the host. For example, the inner button in `gr-button` should inherit
 * the `aria-label` attribute that developers set directly on `gr-button`. This
 * helper function should be called in componentWillLoad and assigned to a variable
 * that is later used in the render function.
 *
 * This does not need to be reactive as changing attributes on the host element
 * does not trigger a re-render.
 */
const inheritAttributes = (el, attributes = []) => {
  const attributeObject = {};
  attributes.forEach(attr => {
    if (el.hasAttribute(attr)) {
      const value = el.getAttribute(attr);
      if (value !== null) {
        attributeObject[attr] = el.getAttribute(attr);
      }
      el.removeAttribute(attr);
    }
  });
  return attributeObject;
};
/**
 * This method is used to add a hidden input to a host element that contains
 * a Shadow DOM. It does not add the input inside of the Shadow root which
 * allows it to be picked up inside of forms. It should contain the same
 * values as the host element.
 *
 * @param container The element where the input will be added
 * @param name The name of the input
 * @param value The value of the input
 * @param disabled If true, the input is disabled
 */
const renderHiddenInput = (container, name, value, disabled) => {
  let input = container.querySelector('input.aux-input');
  if (!input) {
    input = container.ownerDocument.createElement('input');
    input.type = 'hidden';
    input.classList.add('aux-input');
    container.appendChild(input);
  }
  input.disabled = disabled;
  input.name = name;
  input.value = value || '';
};

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const spinnerCss = ":host{--track-color:var(--gr-color-light-shade);--indicator-color:var(--gr-color-primary);--stroke-width:2px;display:inline-flex;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.spinner{display:inline-block;width:1em;height:1em;border-radius:50%;border:solid var(--stroke-width) var(--track-color);border-top-color:var(--indicator-color);border-right-color:var(--indicator-color);animation:1s linear infinite spin}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";

const Spinner = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
  }
  render() {
    return h("span", { class: "spinner", "aria-busy": "true", "aria-live": "polite" });
  }
  static get style() { return spinnerCss; }
}, [1, "gr-spinner"]);
function defineCustomElement$5() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-spinner":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Spinner);
      }
      break;
  } });
}
defineCustomElement$5();

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const buttonCss = ".gr-scroll-lock{overflow:hidden !important}:host{display:inline-block;width:auto;font-family:var(--gr-font-family);font-weight:var(--gr-font-weight-medium);font-size:var(--gr-form-element-font-size-medium);font-kerning:none;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;pointer-events:auto;--height:var(--gr-form-element-height-medium);--border-radius:var(--gr-form-element-border-radius-medium);--border-width:1px;--border-style:solid;--background:transparent;--background-hover:transparent;--background-focus:transparent;--color:var(--gr-color-dark-tint);--color-hover:var(--gr-color-dark-tint);--color-focus:var(--gr-color-dark-tint);--border-color:var(--gr-color-light-shade);--border-color-hover:var(--gr-color-medium);--border-color-focus:var(--gr-color-primary);--padding-top:0;--padding-start:var(--gr-spacing-medium);--padding-end:var(--gr-spacing-medium);--padding-bottom:0;--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);--shadow:none;--transition:background-color 150ms linear, opacity 150ms linear, border 150ms linear, color 150ms linear}:host(.button-disabled){pointer-events:none;opacity:0.5}:host(.button-primary){--border-color:var(--gr-color-primary);--background:var(--gr-color-primary);--color:var(--gr-color-primary-contrast);--border-color-hover:var(--gr-color-primary-shade);--background-hover:var(--gr-color-primary-shade);--color-hover:var(--gr-color-primary-contrast);--border-color-focus:var(--gr-color-primary);--background-focus:var(--gr-color-primary-shade);--color-focus:var(--gr-color-primary-contrast);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33)}:host(.button-secondary){--border-color:var(--gr-color-light-shade);--background:transparent;--color:var(--gr-color-primary);--border-color-hover:var(--gr-color-primary);--background-hover:transparent;--color-hover:var(--gr-color-primary);--border-color-focus:var(--gr-color-primary);--background-focus:transparent;--color-focus:var(--gr-color-primary);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33)}:host(.button-danger){--border-color:var(--gr-color-danger);--background:transparent;--color:var(--gr-color-danger);--border-color-hover:var(--gr-color-danger);--background-hover:var(--gr-color-danger);--color-hover:var(--gr-color-danger-contrast);--border-color-focus:var(--gr-color-danger);--background-focus:var(--gr-color-danger);--color-focus:var(--gr-color-danger-contrast);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-danger-rgb), 0.33)}:host(.button-plain){--border-color:transparent;--background:transparent;--color:var(--gr-color-primary);--border-color-hover:transparent;--background-hover:transparent;--color-hover:var(--gr-color-primary-shade);--border-color-focus:transparent;--background-focus:transparent;--color-focus:var(--gr-color-primary-shade);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33)}:host(.button-small){--padding-start:var(--gr-spacing-small);--padding-end:var(--gr-spacing-small);--border-radius:var(--gr-form-element-border-radius-small);--height:var(--gr-form-element-height-small);font-size:var(--gr-form-element-font-size-small)}:host(.button-large){--padding-start:var(--gr-spacing-large);--padding-end:var(--gr-spacing-large);--border-radius:var(--gr-form-element-border-radius-large);--height:var(--gr-form-element-height-large);font-size:var(--gr-form-element-font-size-large)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:content}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:content;border-radius:0;border-right-width:0;border-left-width:0}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-indent:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;display:block;position:relative;padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);width:100%;height:var(--height);transition:var(--transition);border-radius:var(--border-radius);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);color:var(--color);box-shadow:var(--shadow);line-height:1;cursor:pointer;z-index:0;text-decoration:none;box-sizing:border-box}.button-native::-moz-focus-inner{border:0}.button-native:focus{outline:none;box-shadow:var(--focus-ring);border-color:var(--border-color-focus);background-color:var(--background-focus);color:var(--color-focus)}.button-native *,.button-native *:before,.button-native *:after{box-sizing:inherit}.button-inner{display:flex;position:relative;flex-flow:row nowrap;flex-shrink:0;align-items:center;justify-content:center;width:100%;height:100%;z-index:1}:host(.button-circle) .button-native{padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;border-radius:50%;width:var(--height)}@media (any-hover: hover){.button-native:hover{color:var(--color-hover);background:var(--background-hover);border-color:var(--border-color-hover)}}:host(.button-caret) .caret{display:flex;align-items:center;margin-left:0.3em}:host(.button-caret) .caret svg{width:1em;height:1em}:host(.button-pill) .button-native{border-radius:var(--height)}::slotted(*){pointer-events:none}::slotted([slot=start]){margin-top:0;margin-left:-0.3em;margin-right:0.3em;margin-bottom:0}::slotted([slot=end]){margin-top:0;margin-left:0.3em;margin-right:-0.2em;margin-bottom:0}::slotted([slot=icon-only]){font-size:1.4em;pointer-events:none}:host(.button-loading){position:relative;pointer-events:none}:host(.button-loading) .caret{visibility:hidden}:host(.button-loading) slot[name=start],:host(.button-loading) slot[name=end],:host(.button-loading) slot[name=icon-only],:host(.button-loading) slot:not([name]){visibility:hidden}:host(.button-loading) gr-spinner{--indicator-color:currentColor;position:absolute;height:1em;width:1em;top:calc(50% - 0.5em);left:calc(50% - 0.5em)}@media not all and (min-resolution: 0.001dpcm){@supports (-webkit-appearance: none) and (stroke-color: transparent){:host([type=button]),:host([type=reset]),:host([type=submit]){-webkit-appearance:none !important}}}";

const Button = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.grFocus = createEvent(this, "gr-focus", 7);
    this.grBlur = createEvent(this, "gr-blur", 7);
    this.inheritedAttributes = {};
    this.handleClick = (ev) => {
      if (this.type !== 'button') {
        // this button wants to specifically submit/reset a form
        // climb up the dom to see if we're in a <form>
        // and if so, then use JS to submit/reset it
        const form = this.el.closest('form');
        if (form) {
          ev.preventDefault();
          const fakeButton = document.createElement('button');
          fakeButton.type = this.type;
          fakeButton.style.display = 'none';
          form.appendChild(fakeButton);
          fakeButton.click();
          fakeButton.remove();
        }
      }
    };
    this.onFocus = () => {
      this.grFocus.emit();
    };
    this.onBlur = () => {
      this.grBlur.emit();
    };
    this.variant = 'default';
    this.disabled = false;
    this.loading = false;
    this.size = 'medium';
    this.caret = false;
    this.pill = false;
    this.expand = undefined;
    this.circle = false;
    this.href = undefined;
    this.target = undefined;
    this.rel = undefined;
    this.type = 'button';
  }
  componentWillLoad() {
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label', 'tabindex', 'title']);
  }
  /** Sets focus on the button. */
  async setFocus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the button. */
  async removeFocus() {
    this.button.blur();
  }
  render() {
    const { rel, target, href, variant, size, expand, type, inheritedAttributes, disabled } = this;
    const TagType = href === undefined ? 'button' : 'a';
    const attrs = TagType === 'button'
      ? { type }
      : {
        href,
        rel,
        target,
      };
    return (h(Host, { onClick: this.handleClick, "aria-disabled": disabled ? 'true' : null, class: {
        [`button-${variant}`]: true,
        [`button-${size}`]: true,
        [`button-${expand}`]: expand !== undefined,
        'button-caret': this.caret,
        'button-circle': this.circle,
        'button-pill': this.pill,
        'button-disabled': disabled,
        'button-loading': this.loading,
      } }, h(TagType, Object.assign({ ref: el => (this.button = el) }, attrs, { class: "button-native", disabled: disabled, onFocus: this.onFocus, onBlur: this.onBlur }, inheritedAttributes), h("span", { class: "button-inner" }, h("slot", { name: "icon-only" }), h("slot", { name: "start" }), h("slot", null), h("slot", { name: "end" }), this.caret && (h("span", { class: "caret" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Chevron Down"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "48", d: "M112 184l144 144 144-144" }))))), this.loading && h("gr-spinner", null))));
  }
  get el() { return this; }
  static get style() { return buttonCss; }
}, [1, "gr-button", {
    "variant": [513],
    "disabled": [516],
    "loading": [516],
    "size": [513],
    "caret": [4],
    "pill": [516],
    "expand": [513],
    "circle": [516],
    "href": [1],
    "target": [1],
    "rel": [1],
    "type": [1],
    "setFocus": [64],
    "removeFocus": [64]
  }]);
function defineCustomElement$4() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-button", "gr-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-button":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Button);
      }
      break;
    case "gr-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
  } });
}
defineCustomElement$4();

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */
//
// Returns an element's offset relative to its parent. Similar to element.offsetTop and element.offsetLeft, except the
// parent doesn't have to be positioned relative or absolute.
//
// NOTE: This was created to work around what appears to be a bug in Chrome where a slotted element's offsetParent
// seems to ignore elements inside the surrounding shadow DOM: https://bugs.chromium.org/p/chromium/issues/detail?id=920069
//
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}

//
// Scrolls an element into view of its container. If the element is already in view, nothing will happen.
//
function scrollIntoView$1(element, container, direction = 'vertical', behavior = 'smooth') {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === 'horizontal' || direction === 'both') {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    }
    else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === 'vertical' || direction === 'both') {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    }
    else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

function isTabbable(el) {
  const tabIndex = el.tabIndex;
  return tabIndex > -1;
}
function getNearestTabbableElement(el) {
  // Check the element
  if (isTabbable(el)) {
    return el;
  }
  // Check the element's shadow root
  if (el.shadowRoot) {
    const tabbableShadowChild = [...el.shadowRoot.children].find(isTabbable);
    if (tabbableShadowChild) {
      return tabbableShadowChild;
    }
  }
  // Check the element's children
  if (el.children) {
    return [...el.children].map(getNearestTabbableElement)[0];
  }
  return null;
}

var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect$2(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


const applyStyles$1 = {
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect$2,
  requires: ['computeStyles']
};

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

var max = Math.max;
var min = Math.min;
var round = Math.round;

function getBoundingClientRect(element, includeScale) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (isHTMLElement(element) && includeScale) {
    var offsetHeight = element.offsetHeight;
    var offsetWidth = element.offsetWidth; // Do not attempt to divide by 0, otherwise we get `Infinity` as scale
    // Fallback to 1 in case both values are `0`

    if (offsetWidth > 0) {
      scaleX = round(rect.width) / offsetWidth || 1;
    }

    if (offsetHeight > 0) {
      scaleY = round(rect.height) / offsetHeight || 1;
    }
  }

  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}

// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && isShadowRoot(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

function getComputedStyle$1(element) {
  return getWindow(element).getComputedStyle(element);
}

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf(getNodeName(element)) >= 0;
}

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return ((isElement(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

function getParentNode(element) {
  if (getNodeName(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element) // fallback

  );
}

function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle$1(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') !== -1;
  var isIE = navigator.userAgent.indexOf('Trident') !== -1;

  if (isIE && isHTMLElement(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = getComputedStyle$1(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = getParentNode(element);

  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }

  while (isHTMLElement(currentNode) && ['html', 'body'].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle$1(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && isTableElement(offsetParent) && getComputedStyle$1(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && (getNodeName(offsetParent) === 'html' || getNodeName(offsetParent) === 'body' && getComputedStyle$1(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === 'y' ? top : left;
  var maxProp = axis === 'y' ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = within(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect$1(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (!contains(state.elements.popper, arrowElement)) {

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


const arrow$1 = {
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect$1,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
};

function getVariation(placement) {
  return placement.split('-')[1];
}

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = left;
  var sideY = top;
  var win = window;

  if (adaptive) {
    var offsetParent = getOffsetParent(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === getWindow(popper)) {
      offsetParent = getDocumentElement(popper);

      if (getComputedStyle$1(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const computeStyles$1 = {
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
};

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


const eventListeners = {
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
};

var hash$1 = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash$1[matched];
  });
}

var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0; // NB: This isn't supported on iOS <= 12. If the keyboard is open, the popper
  // can be obscured underneath it.
  // Also, `html.clientHeight` adds the bottom bar height in Safari iOS, even
  // if it isn't open, so if this isn't available, the popper will be detected
  // to overflow the bottom of the screen too early.

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height; // Uses Layout Viewport (like Chrome; Safari does not currently)
    // In Chrome, it returns a value very close to 0 (+/-) but contains rounding
    // errors due to floating point numbers, so we need to check precision.
    // Safari returns a number <= 0, usually < -1 when pinch-zoomed
    // Feature detection fails in mobile emulation mode in Chrome.
    // Math.abs(win.innerWidth / visualViewport.scale - visualViewport.width) <
    // 0.001
    // Fallback here: "Not Safari" userAgent

    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + getWindowScrollBarX(element),
    y: y
  };
}

// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;

  if (getComputedStyle$1(body || html).direction === 'rtl') {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = getComputedStyle$1(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf(getNodeName(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }

  return getScrollParent(getParentNode(node));
}

/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents(getParentNode(target)));
}

function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = listScrollParents(getParentNode(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf(getComputedStyle$1(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;

  if (!isElement(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;
    }
  }

  return offsets;
}

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== 'number' ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function (placement) {
    return getVariation(placement) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[getBasePlacement(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }

  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat(getBasePlacement(placement) === auto ? computeAutoPlacement(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = getBasePlacement(placement);

    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = detectOverflow(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }

    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


const flip$1 = {
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
};

function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


const hide$1 = {
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
};

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const offset$1 = {
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
};

function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


const popperOffsets$1 = {
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
};

function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? top : left;
    var altSide = mainAxis === 'y' ? bottom : right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min$1 = offset + overflow[mainSide];
    var max$1 = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset, tether ? max(max$1, tetherMax) : max$1);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? top : left;

    var _altSide = mainAxis === 'x' ? bottom : right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


const preventOverflow$1 = {
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
};

function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }

    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: isElement(reference) ? listScrollParents(reference) : reference.contextElement ? listScrollParents(reference.contextElement) : [],
          popper: listScrollParents(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: getCompositeRect(reference, getOffsetParent(popper), state.options.strategy === 'fixed'),
          popper: getLayoutRect(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });

        for (var index = 0; index < state.orderedModifiers.length; index++) {

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}

var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper = /*#__PURE__*/popperGenerator({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

//
class Popover {
  constructor(anchor, popover, options) {
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.anchor = anchor;
    this.popover = popover;
    this.options = Object.assign({
      skidding: 0,
      distance: 0,
      placement: 'bottom-start',
      strategy: 'absolute',
      transitionElement: this.popover,
      visibleClass: 'popover-visible',
      onAfterShow: () => { },
      onAfterHide: () => { },
      onTransitionEnd: () => { }
    }, options);
    this.isVisible = false;
    this.popover.hidden = true;
    this.popover.classList.remove(this.options.visibleClass);
    this.popover.addEventListener('transitionend', this.handleTransitionEnd);
  }
  handleTransitionEnd(event) {
    const target = event.target;
    // Make sure the transition event originates from from the correct element, and not one that has bubbled up
    if (target === this.options.transitionElement) {
      // This is called before the element is hidden so users can do things like reset scroll. It will fire once for
      // every transition property. Use `event.propertyName` to determine which property has finished transitioning.
      this.options.onTransitionEnd.call(this, event);
      // Make sure we only do this once, since transitionend will fire for every transition
      if (!this.isVisible && !this.popover.hidden) {
        this.popover.hidden = true;
        this.popover.classList.remove(this.options.visibleClass);
        this.options.onAfterHide.call(this);
      }
    }
  }
  destroy() {
    this.popover.removeEventListener('transitionend', this.handleTransitionEnd);
    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }
  }
  show() {
    this.isVisible = true;
    this.popover.hidden = false;
    requestAnimationFrame(() => this.popover.classList.add(this.options.visibleClass));
    if (this.popper) {
      this.popper.destroy();
    }
    this.popper = createPopper(this.anchor, this.popover, {
      placement: this.options.placement,
      strategy: this.options.strategy,
      modifiers: [
        {
          name: 'flip',
          options: {
            boundary: 'viewport'
          }
        },
        {
          name: 'offset',
          options: {
            offset: [this.options.skidding, this.options.distance]
          }
        }
      ]
    });
    this.popover.addEventListener('transitionend', () => this.options.onAfterShow.call(this), { once: true });
    // Reposition the menu after it appears in case a modifier kicked in
    requestAnimationFrame(() => this.popper.update());
  }
  hide() {
    // Apply the hidden styles and wait for the transition before hiding completely
    this.isVisible = false;
    this.popover.classList.remove(this.options.visibleClass);
  }
  setOptions(options) {
    this.options = Object.assign(this.options, options);
    this.isVisible
      ? this.popover.classList.add(this.options.visibleClass)
      : this.popover.classList.remove(this.options.visibleClass);
    // Update popper options
    if (this.popper) {
      this.popper.setOptions({
        placement: this.options.placement,
        strategy: this.options.strategy
      });
      requestAnimationFrame(() => this.popper.update());
    }
  }
}

const dropdownCss = ".gr-scroll-lock{overflow:hidden !important}:host{--panel-background-color:var(--gr-color-white);--panel-border-radius:var(--gr-border-radius-medium);--panel-border-color:var(--gr-panel-border-color);--panel-box-shadow:var(--gr-shadow-large);--transition:150ms opacity, 150ms transform;display:inline-block;position:relative;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.dropdown-trigger{display:block}.dropdown-positioner{position:absolute;z-index:var(--gr-z-index-dropdown)}.dropdown-panel{max-height:50vh;font-family:var(--gr-font-family);font-size:var(--gr-font-size-medium);font-weight:var(--gr-font-weight-normal);background-color:var(--panel-background-color);border:solid 1px var(--panel-border-color);border-radius:var(--panel-border-radius);box-shadow:var(--panel-box-shadow);opacity:0;overflow:auto;overscroll-behavior:none;pointer-events:none;transform:scale(0.9);transition:var(--transition)}.dropdown-positioner[data-popper-placement^=top] .dropdown-panel{transform-origin:bottom}.dropdown-positioner[data-popper-placement^=bottom] .dropdown-panel{transform-origin:top}.dropdown-positioner[data-popper-placement^=left] .dropdown-panel{transform-origin:right}.dropdown-positioner[data-popper-placement^=right] .dropdown-panel{transform-origin:left}.dropdown-positioner.popover-visible .dropdown-panel{opacity:1;transform:none;pointer-events:all}";

let id$1 = 0;
const Dropdown = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.grShow = createEvent(this, "gr-show", 7);
    this.grAfterShow = createEvent(this, "gr-after-show", 7);
    this.grHide = createEvent(this, "gr-hide", 7);
    this.grAfterHide = createEvent(this, "gr-after-hide", 7);
    this.componentId = `dropdown-${++id$1}`;
    this.isVisible = false;
    this.open = false;
    this.placement = 'bottom-start';
    this.closeOnSelect = true;
    this.containingElement = undefined;
    this.distance = 2;
    this.skidding = 0;
    this.hoist = false;
  }
  handleOpenChange() {
    this.open ? this.show() : this.hide();
    this.updateAccessibleTrigger();
  }
  handlePopoverOptionsChange() {
    this.popoverElement.setOptions({
      strategy: this.hoist ? 'fixed' : 'absolute',
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
    });
  }
  connectedCallback() {
    if (!this.containingElement) {
      this.containingElement = this.el;
    }
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleTriggerKeyDown = this.handleTriggerKeyDown.bind(this);
    this.handleTriggerKeyUp = this.handleTriggerKeyUp.bind(this);
    this.handleTriggerSlotChange = this.handleTriggerSlotChange.bind(this);
  }
  componentDidLoad() {
    this.popoverElement = new Popover(this.trigger, this.positioner, {
      strategy: this.hoist ? 'fixed' : 'absolute',
      placement: this.placement,
      distance: this.distance,
      skidding: this.skidding,
      transitionElement: this.panel,
      onAfterHide: () => this.grAfterHide.emit(),
      onAfterShow: () => this.grAfterShow.emit(),
      onTransitionEnd: () => {
        if (!this.open) {
          this.panel.scrollTop = 0;
        }
      },
    });
    // Show on init if open
    if (this.open) {
      this.show();
    }
  }
  disconnectedCallback() {
    this.hide();
    this.popoverElement.destroy();
  }
  /** Shows the dropdown panel */
  async show() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (this.isVisible) {
      return;
    }
    const grShow = this.grShow.emit();
    if (grShow.defaultPrevented) {
      this.open = false;
      return;
    }
    this.panel.addEventListener('gr-activate', this.handleMenuItemActivate);
    this.panel.addEventListener('gr-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('mousedown', this.handleDocumentMouseDown);
    this.isVisible = true;
    this.open = true;
    this.popoverElement.show();
  }
  /** Hides the dropdown panel */
  async hide() {
    // Prevent subsequent calls to the method, whether manually or triggered by the `open` watcher
    if (!this.isVisible) {
      return;
    }
    const grHide = this.grHide.emit();
    if (grHide.defaultPrevented) {
      this.open = true;
      return;
    }
    this.panel.removeEventListener('gr-activate', this.handleMenuItemActivate);
    this.panel.removeEventListener('gr-select', this.handlePanelSelect);
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
    this.isVisible = false;
    this.open = false;
    this.popoverElement.hide();
  }
  /** Sets focus on the trigger. */
  async focusOnTrigger() {
    const slot = this.trigger.querySelector('slot');
    const trigger = slot.assignedElements({ flatten: true })[0];
    if (trigger) {
      if (typeof trigger.setFocus === 'function') {
        trigger.setFocus();
      }
      else if (typeof trigger.focus === 'function') {
        trigger.focus();
      }
    }
  }
  getMenu() {
    return this.panel
      .querySelector('slot')
      .assignedElements({ flatten: true })
      .filter(el => el.tagName.toLowerCase() === 'gr-menu')[0];
  }
  handleDocumentKeyDown(event) {
    var _a;
    // Close when escape is pressed
    if (event.key === 'Escape') {
      this.hide();
      this.focusOnTrigger();
      return;
    }
    // Handle tabbing
    if (event.key === 'Tab') {
      // Tabbing within an open menu should close the dropdown and refocus the trigger
      if (this.open && ((_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.tagName.toLowerCase()) === 'gr-menu-item') {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }
      // Tabbing outside of the containing element closes the panel
      //
      // If the dropdown is used within a shadow DOM, we need to obtain the activeElement within that shadowRoot,
      // otherwise `document.activeElement` will only return the name of the parent shadow DOM element.
      setTimeout(() => {
        var _a;
        const activeElement = this.containingElement.getRootNode() instanceof ShadowRoot
          ? (_a = document.activeElement.shadowRoot) === null || _a === void 0 ? void 0 : _a.activeElement
          : document.activeElement;
        if ((activeElement === null || activeElement === void 0 ? void 0 : activeElement.closest(this.containingElement.tagName.toLowerCase())) !== this.containingElement) {
          this.hide();
          return;
        }
      });
    }
  }
  handleDocumentMouseDown(event) {
    // Close when clicking outside of the containing element
    const path = event.composedPath();
    if (!path.includes(this.containingElement)) {
      this.hide();
      return;
    }
  }
  handleMenuItemActivate(event) {
    const item = event.target;
    scrollIntoView$1(item, this.panel);
  }
  handlePanelSelect(event) {
    const target = event.target;
    // Hide the dropdown when a menu item is selected
    if (this.closeOnSelect && target.tagName.toLowerCase() === 'gr-menu') {
      this.hide();
      this.focusOnTrigger();
    }
  }
  handleTriggerClick() {
    this.open ? this.hide() : this.show();
  }
  handleTriggerKeyDown(event) {
    const menu = this.getMenu();
    const menuItems = menu ? [...menu.querySelectorAll('gr-menu-item')] : null;
    const firstMenuItem = menuItems[0];
    const lastMenuItem = menuItems[menuItems.length - 1];
    // Close when escape or tab is pressed
    if (event.key === 'Escape') {
      this.focusOnTrigger();
      this.hide();
      return;
    }
    // When spacebar/enter is pressed, show the panel but don't focus on the menu. This let's the user press the same
    // key again to hide the menu in case they don't want to make a selection.
    if ([' ', 'Enter'].includes(event.key)) {
      event.preventDefault();
      this.open ? this.hide() : this.show();
      return;
    }
    // When up/down is pressed, we make the assumption that the user is familiar with the menu and plans to make a
    // selection. Rather than toggle the panel, we focus on the menu (if one exists) and activate the first item for
    // faster navigation.
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      // Show the menu if it's not already open
      if (!this.open) {
        this.show();
      }
      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstMenuItem) {
        firstMenuItem.setFocus();
        return;
      }
      if (event.key === 'ArrowUp' && lastMenuItem) {
        lastMenuItem.setFocus();
        return;
      }
    }
    // Other keys bring focus to the menu and initiate type-to-select behavior
    const ignoredKeys = ['Tab', 'Shift', 'Meta', 'Ctrl', 'Alt'];
    if (this.open && menu && !ignoredKeys.includes(event.key)) {
      menu.typeToSelect(event.key);
      return;
    }
  }
  handleTriggerKeyUp(event) {
    // Prevent space from triggering a click event in Firefox
    if (event.key === ' ') {
      event.preventDefault();
    }
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }
  //
  // Slotted triggers can be arbitrary content, but we need to link them to the dropdown panel with `aria-haspopup` and
  // `aria-expanded`. These must be applied to the "accessible trigger" (the tabbable portion of the trigger element
  // that gets slotted in) so screen readers will understand them. The accessible trigger could be the slotted element,
  // a child of the slotted element, or an element in the slotted element's shadow root.
  //
  // For example, the accessible trigger of an <gr-button> is a <button> located inside its shadow root.
  //
  // To determine this, we assume the first tabbable element in the trigger slot is the "accessible trigger."
  //
  updateAccessibleTrigger() {
    const slot = this.trigger.querySelector('slot');
    const assignedElements = slot.assignedElements({ flatten: true });
    const accessibleTrigger = assignedElements.map(getNearestTabbableElement)[0];
    if (accessibleTrigger) {
      accessibleTrigger.setAttribute('aria-haspopup', 'true');
      accessibleTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    }
  }
  render() {
    return (h(Host, { id: this.componentId, class: {
        'dropdown-open': this.open,
      } }, h("span", { class: "dropdown-trigger", ref: el => (this.trigger = el), onClick: this.handleTriggerClick, onKeyDown: this.handleTriggerKeyDown, onKeyUp: this.handleTriggerKeyUp }, h("slot", { name: "trigger", onSlotchange: this.handleTriggerSlotChange })), h("div", { ref: el => (this.positioner = el), class: "dropdown-positioner" }, h("div", { ref: el => (this.panel = el), class: "dropdown-panel", role: "menu", "aria-hidden": this.open ? 'false' : 'true', "aria-labelledby": this.componentId }, h("slot", null)))));
  }
  get el() { return this; }
  static get watchers() { return {
    "open": ["handleOpenChange"],
    "distance": ["handlePopoverOptionsChange"],
    "hoist": ["handlePopoverOptionsChange"],
    "placement": ["handlePopoverOptionsChange"],
    "skidding": ["handlePopoverOptionsChange"]
  }; }
  static get style() { return dropdownCss; }
}, [1, "gr-dropdown", {
    "open": [1540],
    "placement": [1],
    "closeOnSelect": [4, "close-on-select"],
    "containingElement": [1040],
    "distance": [2],
    "skidding": [2],
    "hoist": [4],
    "show": [64],
    "hide": [64],
    "focusOnTrigger": [64]
  }]);
function defineCustomElement$3() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-dropdown"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-dropdown":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Dropdown);
      }
      break;
  } });
}
defineCustomElement$3();

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const menuCss = ".gr-scroll-lock{overflow:hidden !important}:host{--padding-top:var(--gr-spacing-x-small);--padding-bottom:var(--gr-spacing-x-small);display:block;padding-top:var(--padding-top);padding-left:0;padding-right:0;padding-bottom:var(--padding-bottom);box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host:focus{outline:none}";

const Menu = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.grSelect = createEvent(this, "gr-select", 7);
    this.typeToSelectString = '';
  }
  connectedCallback() {
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
  /**
   * Initiates type-to-select logic, which automatically selects an option based on what the user is currently typing.
   * The key passed will be appended to the internal query and the selection will be updated. After a brief period, the
   * internal query is cleared automatically. This method is intended to be used with the keydown event. Useful for
   * enabling type-to-select when the menu doesn't have focus.
   */
  async typeToSelect(key) {
    clearTimeout(this.typeToSelectTimeout);
    this.typeToSelectTimeout = setTimeout(() => (this.typeToSelectString = ''), 750);
    this.typeToSelectString += key.toLowerCase();
    const items = this.getItems();
    for (const item of items) {
      const slot = item.shadowRoot.querySelector('slot:not([name])');
      const label = getTextContent(slot).toLowerCase().trim();
      if (label.substring(0, this.typeToSelectString.length) === this.typeToSelectString) {
        item.setFocus();
        break;
      }
    }
  }
  getItems() {
    const slot = this.menu.querySelector('slot');
    return [...slot.assignedElements({ flatten: true })].filter((el) => el.tagName.toLowerCase() === 'gr-menu-item' && !el.disabled);
  }
  getActiveItem() {
    return this.getItems().find(i => i === document.activeElement);
  }
  setActiveItem(item) {
    item.setFocus();
  }
  handleClick(event) {
    const target = event.target;
    const item = target.closest('gr-menu-item');
    if (item && !item.disabled) {
      this.grSelect.emit({ item });
    }
  }
  handleKeyDown(event) {
    // Make a selection when pressing enter
    if (event.key === 'Enter') {
      const item = this.getActiveItem();
      event.preventDefault();
      if (item) {
        this.grSelect.emit({ item });
      }
    }
    // Prevent scrolling when space is pressed
    if (event.key === ' ') {
      event.preventDefault();
    }
    // Move the selection when pressing down or up
    if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      const items = this.getItems();
      const selectedItem = this.getActiveItem();
      let index = items.indexOf(selectedItem);
      if (items.length) {
        event.preventDefault();
        if (event.key === 'ArrowDown') {
          index++;
        }
        else if (event.key === 'ArrowUp') {
          index--;
        }
        else if (event.key === 'Home') {
          index = 0;
        }
        else if (event.key === 'End') {
          index = items.length - 1;
        }
        if (index < 0)
          index = 0;
        if (index > items.length - 1)
          index = items.length - 1;
        this.setActiveItem(items[index]);
        return;
      }
    }
    this.typeToSelect(event.key);
  }
  render() {
    return (h("div", { ref: el => (this.menu = el), class: "menu", role: "menu", onClick: this.handleClick, onKeyDown: this.handleKeyDown }, h("slot", null)));
  }
  static get style() { return menuCss; }
}, [1, "gr-menu", {
    "typeToSelect": [64]
  }]);
function defineCustomElement$2() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-menu":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Menu);
      }
      break;
  } });
}
defineCustomElement$2();

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const tagCss = ":host{--height:calc(var(--gr-form-element-height-medium) * 0.8);--line-height:calc(var(--gr-form-element-height-medium) - 1px * 2);--border-radius:var(--gr-form-element-border-radius-medium);--border-width:1px;--border-style:solid;--padding-top:0;--padding-start:var(--gr-spacing-small);--padding-end:var(--gr-spacing-small);--padding-bottom:0;--font-size:var(--gr-form-element-font-size-medium);--background-color:rgba(var(--gr-color-primary-rgb), 0.05);--border-color:rgba(var(--gr-color-primary-rgb), 0.2);--color:var(--gr-color-primary-shade);--clear-color:var(--gr-color-primary);--clear-color-hover:var(--gr-color-primary-shade);--clear-margin-left:var(--gr-spacing-xx-small);--clear-margin-right:calc(-1 * var(--gr-spacing-xxx-small));display:inline-block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host(.tag-success){--background-color:rgba(var(--gr-color-success-rgb), 0.05);--border-color:rgba(var(--gr-color-success-rgb), 0.2);--color:var(--gr-color-success-shade);--clear-color:var(--gr-color-success);--clear-color-hover:var(--gr-color-success-shade)}:host(.tag-info){--background-color:rgba(var(--gr-color-medium-rgb), 0.05);--border-color:rgba(var(--gr-color-medium-rgb), 0.2);--color:var(--gr-color-medium-shade);--clear-color:var(--gr-color-medium);--clear-color-hover:var(--gr-color-medium-shade)}:host(.tag-warning){--background-color:rgba(var(--gr-color-warning-rgb), 0.05);--border-color:rgba(var(--gr-color-warning-rgb), 0.2);--color:var(--gr-color-warning-shade);--clear-color:var(--gr-color-warning);--clear-color-hover:var(--gr-color-warning-shade)}:host(.tag-danger){--background-color:rgba(var(--gr-color-danger-rgb), 0.05);--border-color:rgba(var(--gr-color-danger-rgb), 0.2);--color:var(--gr-color-danger-shade);--clear-color:var(--gr-color-danger);--clear-color-hover:var(--gr-color-danger-shade)}:host(.tag-small){--font-size:var(--gr-form-element-font-size-small);--height:calc(var(--gr-form-element-height-small) * 0.8);--line-height:calc(var(--gr-form-element-height-small) - 1px * 2);--border-radius:var(--gr-form-element-border-radius-small);--padding-start:var(--gr-spacing-x-small);--padding-end:var(--gr-spacing-x-small);--clear-margin-left:var(--gr-spacing-xx-small);--clear-margin-right:calc(-1 * var(--gr-spacing-xxx-small))}:host(.tag-large){--font-size:var(--gr-form-element-font-size-large);--height:calc(var(--gr-form-element-height-large) * 0.8);--line-height:calc(var(--gr-form-element-height-large) - 1px * 2);--border-radius:var(--gr-form-element-border-radius-large);--padding:0 var(--gr-spacing-medium);--clear-margin-left:var(--gr-spacing-xx-small);--clear-margin-right:calc(-1 * var(--gr-spacing-x-small))}.tag{display:flex;align-items:center;border-style:var(--border-style);border-width:var(--border-width);border-radius:var(--border-radius);white-space:nowrap;user-select:none;cursor:default;font-family:var(--gr-font-family);font-size:var(--font-size);font-weight:var(--gr-font-weight-normal);height:var(--height);line-height:var(--line-height);padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);background-color:var(--background-color);border-color:var(--border-color);color:var(--color)}.tag-clear{--color:var(--clear-color);--color-hover:var(--clear-color-hover);--padding-start:0;--padding-end:0;margin-left:var(--clear-margin-left);margin-right:var(--clear-margin-right);--height:1em}.tag-clear svg{font-size:0.7em}.tag-truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.tag-clear svg{width:1.1em;height:1.1em}:host(.tag-pill) .tag{border-radius:var(--height)}";

const Tag = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.grClear = createEvent(this, "gr-clear", 7);
    this.type = 'primary';
    this.size = 'medium';
    this.pill = false;
    this.clearable = false;
    this.truncate = false;
    this.title = '';
  }
  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
  }
  handleClearClick() {
    this.grClear.emit();
  }
  render() {
    return (h(Host, { class: {
        [`tag-${this.type}`]: true,
        [`tag-${this.size}`]: true,
        'tag-pill': this.pill,
        'tag-clearable': this.clearable,
      } }, h("span", { class: "tag" }, h("span", { class: { 'tag-truncate': this.truncate }, title: this.title }, h("slot", null)), this.clearable && (h("gr-button", { variant: "plain", size: this.size, class: "tag-clear", "aria-label": "clear", onClick: this.handleClearClick }, h("svg", { slot: "icon-only", role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Close"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M368 368L144 144M368 144L144 368" })))))));
  }
  static get style() { return tagCss; }
}, [1, "gr-tag", {
    "type": [513],
    "size": [513],
    "pill": [516],
    "clearable": [516],
    "truncate": [516],
    "title": [513]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-tag", "gr-button", "gr-spinner"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-tag":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Tag);
      }
      break;
    case "gr-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "gr-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
  } });
}
defineCustomElement();

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const HTMLElementSSR = (typeof HTMLElement !== 'undefined' ? HTMLElement : class {
});

const selectCss = ".form-control .form-control-label{display:none}.form-control .form-control-help-text{display:none}.form-control .form-control-invalid-text{display:none}.form-control-has-label .form-control-label{display:flex;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-label-color);margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-label.form-control-small .form-control-label{font-size:var(--gr-form-element-label-font-size-small)}.form-control-has-label.form-control-medium .form-control-label{font-size:var(--gr-form-element-label-font-size-medium)}.form-control-has-label.form-control-large .form-control-label{font-size:var(--gr-form-element-label-font-size-large)}.form-control-has-label .form-control-label .asterisk{margin-left:var(--gr-spacing-x-small);color:var(--gr-color-medium)}.form-control-has-label .form-control-label .asterisk svg{width:0.6em;height:0.6em;margin-bottom:var(--gr-spacing-xxx-small)}.form-control-has-help-text .form-control-help-text{display:block;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-help-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-help-text.form-control-small .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-small);min-height:1.625rem}.form-control-has-help-text.form-control-medium .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-medium);min-height:1.875rem}.form-control-has-help-text.form-control-large .form-control-help-text{font-size:var(--gr-form-element-help-text-font-size-large);min-height:2.125rem}.form-control-has-invalid-text .form-control-invalid-text{display:flex;margin-left:-2px;line-height:var(--gr-line-height-normal);color:var(--gr-form-element-invalid-text-color);margin-top:var(--gr-spacing-xxx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon{margin-top:var(--gr-spacing-xxx-small);margin-right:var(--gr-spacing-xx-small)}.form-control-has-invalid-text .form-control-invalid-text .icon svg{width:1.4em;height:1.4em}.form-control-has-invalid-text.form-control-small .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-small);min-height:1.625rem}.form-control-has-invalid-text.form-control-medium .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-medium);min-height:1.875rem}.form-control-has-invalid-text.form-control-large .form-control-invalid-text{font-size:var(--gr-form-element-invalid-text-font-size-large);min-height:2.125rem}.gr-scroll-lock{overflow:hidden !important}:host{--font-size:var(--gr-form-element-font-size-medium);--font-weight:var(--gr-font-weight-normal);--background-color:var(--gr-color-white);--background-color-hover:var(--gr-color-white);--background-color-focus:var(--gr-color-white);--background-color-invalid:var(--gr-color-white);--background-color-invalid-hover:var(--gr-color-white);--border-radius:var(--gr-form-element-border-radius-small);--border-color:var(--gr-color-light-shade);--border-color-hover:var(--gr-color-medium);--border-color-focus:var(--gr-color-primary);--border-color-invalid:var(--gr-color-danger);--border-color-invalid-hover:var(--gr-color-danger-shade);--color:var(--gr-color-dark-tint);--placeholder-color:var(--gr-color-medium-tint);--min-height:var(--gr-form-element-height-medium);--label-margin-start:var(--gr-spacing-medium);--label-margin-end:var(--gr-spacing-medium);--clear-icon-margin-end:var(--gr-spacing-medium);--caret-margin-end:var(--gr-spacing-medium);--tags-padding-top:3px;--tags-padding-bottom:3px;--tags-margin-end:var(--gr-spacing-xx-small);--focus-ring:0 0 0 var(--gr-focus-ring-width) rgb(var(--gr-color-primary-rgb), 0.33);display:block;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}.select-small{--font-size:var(--gr-form-element-font-size-small);--min-height:var(--gr-form-element-height-small);--label-margin-start:var(--gr-spacing-small);--label-margin-end:var(--gr-spacing-small);--clear-icon-margin-end:var(--gr-spacing-small);--caret-margin-end:var(--gr-spacing-small);--tags-padding-top:2px;--tags-padding-bottom:2px}.select-large{--font-size:var(--gr-form-element-font-size-large);--min-height:var(--gr-form-element-height-large);--label-margin-start:var(--gr-spacing-large);--label-margin-end:var(--gr-spacing-large);--clear-icon-margin-end:var(--gr-spacing-large);--caret-margin-end:var(--gr-spacing-large);--tags-padding-top:4px;--tags-padding-bottom:4px}.select{display:block}.select-box{display:inline-flex;align-items:center;justify-content:start;position:relative;width:100%;font-family:var(--gr-font-family);font-size:var(--font-size);font-weight:var(--font-weight);letter-spacing:normal;background-color:var(--background-color);border:solid 1px var(--border-color);border-radius:var(--border-radius);min-height:var(--min-height);color:var(--color);vertical-align:middle;overflow:hidden;transition:150ms color, 150ms border, 150ms box-shadow;cursor:pointer}.select.select-invalid:not(.select-disabled) .select-box{background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.select.select-invalid:not(.select-disabled):not(.select-focused) .select-box:hover{background-color:var(--background-color-invalid-hover);border-color:var(--border-color-invalid-hover)}.select.select-invalid:not(.select-disabled) .select-box{background-color:var(--background-color-invalid);border-color:var(--border-color-invalid)}.select:not(.select-disabled) .select-box:hover{background-color:var(--background-color-hover);border-color:var(--border-color-hover)}.select.select-focused:not(.select-disabled) .select-box{outline:none;box-shadow:var(--focus-ring);border-color:var(--border-color-focus);background-color:var(--background-color-focus)}.select-disabled .select-box{opacity:0.5;cursor:not-allowed;outline:none}.select-disabled .select-tags,.select-disabled .select-clear{pointer-events:none}.select-label{flex:1 1 auto;display:flex;align-items:center;user-select:none;margin-top:0;margin-left:var(--label-margin-start);margin-right:var(--label-margin-end);margin-bottom:0;scrollbar-width:none;-ms-overflow-style:none;overflow-x:auto;overflow-y:hidden;white-space:nowrap}.select-label::-webkit-scrollbar{width:0;height:0}.select-has-tags .select-label{margin-left:0}.select-clear{display:inline-flex;align-items:center;font-size:inherit;color:var(--gr-color-medium);border:none;background:none;padding:0;transition:150ms color;cursor:pointer;margin-right:var(--clear-icon-margin-end)}.select-clear:hover{color:var(--gr-color-dark)}.select-clear:focus{outline:none}.select-clear svg{width:1.2em;height:1.2em;font-size:var(--font-size)}.caret{flex:0 0 auto;display:inline-flex;transition:250ms transform ease;margin-right:var(--caret-margin-end)}.caret svg{width:1em;height:1em;font-size:var(--font-size)}.select-open .caret{transform:rotate(-180deg)}.select-placeholder-visible .select-label{color:var(--placeholder-color)}.select-tags{display:inline-flex;align-items:center;flex-wrap:wrap;justify-content:left;margin-left:var(--gr-spacing-xx-small);padding-bottom:var(--tags-padding-bottom)}.select-tags gr-tag{padding-top:var(--tags-padding-top)}.select-tags gr-tag:not(:last-of-type){margin-right:var(--tags-margin-end)}.select-hidden-select{clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;position:absolute;top:0;left:0;width:100%;height:100%}.select-pill .select-box{border-radius:var(--min-height)}";

let id = 0;
const Select = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.grChange = createEvent(this, "gr-change", 7);
    this.grFocus = createEvent(this, "gr-focus", 7);
    this.grBlur = createEvent(this, "gr-blur", 7);
    this.inputId = `select-${++id}`;
    this.labelId = `select-label-${id}`;
    this.helpTextId = `select-help-text-${id}`;
    this.invalidTextId = `select-invalid-text-${id}`;
    this.inheritedAttributes = {};
    this.handleBlur = () => {
      // Don't blur if the control is open. We'll move focus back once it closes.
      if (!this.isOpen) {
        this.hasFocus = false;
        this.grBlur.emit();
      }
    };
    this.handleFocus = () => {
      if (!this.hasFocus) {
        this.hasFocus = true;
        this.grFocus.emit();
      }
    };
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.hasInvalidTextSlot = false;
    this.hasLabelSlot = false;
    this.isOpen = false;
    this.items = [];
    this.displayLabel = '';
    this.displayTags = [];
    this.multiple = false;
    this.maxTagsVisible = 3;
    this.disabled = false;
    this.name = '';
    this.placeholder = '';
    this.size = 'medium';
    this.hoist = false;
    this.value = '';
    this.pill = false;
    this.label = '';
    this.requiredIndicator = false;
    this.helpText = '';
    this.invalidText = '';
    this.invalid = false;
    this.clearable = false;
  }
  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }
  }
  handleLabelChange() {
    this.handleSlotChange();
  }
  handleMultipleChange() {
    // Cast to array | string based on `this.multiple`
    const value = this.getValueAsArray();
    this.value = this.multiple ? value : value[0] || '';
    this.syncItemsFromValue();
  }
  handleValueChange() {
    this.syncItemsFromValue();
    this.grChange.emit();
  }
  connectedCallback() {
    this.handleClearClick = this.handleClearClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleLabelClick = this.handleLabelClick.bind(this);
    this.handleMenuHide = this.handleMenuHide.bind(this);
    this.handleMenuShow = this.handleMenuShow.bind(this);
    this.handleMenuSelect = this.handleMenuSelect.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleTagInteraction = this.handleTagInteraction.bind(this);
    this.el.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
  }
  componentWillLoad() {
    this.handleSlotChange();
    this.inheritedAttributes = inheritAttributes(this.el, ['aria-label']);
  }
  componentDidLoad() {
    {
      this.resizeObserver = new ResizeObserver(() => this.resizeMenu());
    }
    this.reportDuplicateItemValues();
    // We need to do an initial sync after the component has rendered, so this will suppress the re-render warning
    requestAnimationFrame(() => this.syncItemsFromValue());
  }
  disconnectedCallback() {
    this.el.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }
  /** Sets focus on the select. */
  async setFocus() {
    this.hasFocus = true;
    this.grFocus.emit();
    this.dropdown.focusOnTrigger();
  }
  getItemLabel(item) {
    const slot = item.shadowRoot.querySelector('slot:not([name])');
    return getTextContent(slot);
  }
  getItems() {
    return [...this.el.querySelectorAll('gr-menu-item')];
  }
  getValueAsArray() {
    return Array.isArray(this.value) ? this.value : [this.value];
  }
  handleClearClick(event) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    this.syncItemsFromValue();
  }
  handleKeyDown(event) {
    const target = event.target;
    const items = this.getItems();
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    // Ignore key presses on tags
    if (target.tagName.toLowerCase() === 'gr-tag') {
      return;
    }
    // Tabbing out of the control closes it
    if (event.key === 'Tab') {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }
    // Up/down opens the menu
    if (['ArrowDown', 'ArrowUp'].includes(event.key)) {
      event.preventDefault();
      // Show the menu if it's not already open
      if (!this.isOpen) {
        this.dropdown.show();
      }
      // Focus on a menu item
      if (event.key === 'ArrowDown' && firstItem) {
        firstItem.setFocus();
        return;
      }
      if (event.key === 'ArrowUp' && lastItem) {
        lastItem.setFocus();
        return;
      }
    }
    // All other "printable" keys open the menu and initiate type to select
    if (!this.isOpen && event.key.length === 1) {
      event.stopPropagation();
      event.preventDefault();
      this.dropdown.show();
      this.menu.typeToSelect(event.key);
    }
  }
  handleLabelClick() {
    this.box.focus();
  }
  handleMenuSelect(event) {
    const item = event.detail.item;
    if (this.multiple) {
      this.value = this.value.includes(item.value)
        ? this.value.filter(v => v !== item.value)
        : [...this.value, item.value];
    }
    else {
      this.value = item.value;
    }
    this.syncItemsFromValue();
  }
  handleMenuShow(event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.resizeMenu();
    this.resizeObserver.observe(this.el);
    this.isOpen = true;
  }
  handleMenuHide() {
    this.resizeObserver.unobserve(this.el);
    this.isOpen = false;
    // Restore focus on the box after the menu is hidden
    this.box.focus();
  }
  handleSlotChange() {
    this.hasHelpTextSlot = hasSlot(this.el, 'help-text');
    this.hasInvalidTextSlot = hasSlot(this.el, 'invalid-text');
    this.hasLabelSlot = hasSlot(this.el, 'label');
    this.syncItemsFromValue();
    this.reportDuplicateItemValues();
  }
  handleTagInteraction(event) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath();
    const clearButton = path.find(el => {
      if (el instanceof HTMLElementSSR) {
        return el.classList.contains('tag-clear');
      }
    });
    if (clearButton) {
      event.stopPropagation();
    }
  }
  reportDuplicateItemValues() {
    const items = this.getItems();
    // Report duplicate values since they can break selection logic
    const duplicateValues = items.map(item => item.value).filter((e, i, a) => a.indexOf(e) !== i);
    if (duplicateValues.length) {
      throw new Error('Duplicate value found on <gr-menu-item> in <gr-select>: "' + duplicateValues.join('", "') + '"');
    }
  }
  resizeMenu() {
    this.menu.style.width = `${this.box.clientWidth}px`;
  }
  syncItemsFromValue() {
    const items = this.getItems();
    const value = this.getValueAsArray();
    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));
    // Sync display label
    if (this.multiple) {
      const checkedItems = [];
      value.map(val => items.map(item => (item.value === val ? checkedItems.push(item) : null)));
      this.displayTags = checkedItems.map(item => {
        return (h("gr-tag", { type: "info", size: this.size, pill: this.pill, clearable: true, onClick: this.handleTagInteraction, onKeyDown: this.handleTagInteraction, "onGr-clear": event => {
            event.stopPropagation();
            if (!this.disabled) {
              item.checked = false;
              this.syncValueFromItems();
            }
          } }, this.getItemLabel(item)));
      });
      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(h("gr-tag", { type: "info", size: this.size, pill: this.pill }, "+", total - this.maxTagsVisible));
      }
    }
    else {
      const checkedItem = items.filter(item => item.value === value[0])[0];
      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
      this.displayTags = [];
    }
  }
  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);
    if (this.multiple) {
      this.value = this.value.filter(val => checkedValues.includes(val));
    }
    else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
  }
  render() {
    var _a;
    const hasSelection = this.multiple ? this.value.length > 0 : this.value !== '';
    const ariaLabelAttributes = this.inheritedAttributes['aria-label']
      ? { 'aria-label': this.inheritedAttributes['aria-label'] }
      : { 'aria-labelledby': this.labelId };
    renderHiddenInput(this.el, this.name, parseValue(this.value), this.disabled);
    return (h(FormControl, { inputId: this.inputId, label: this.label, labelId: this.labelId, hasLabelSlot: this.hasLabelSlot, helpTextId: this.helpTextId, helpText: this.helpText, hasHelpTextSlot: this.hasHelpTextSlot, invalidTextId: this.invalidTextId, invalidText: this.invalidText, invalid: this.invalid, hasInvalidTextSlot: this.hasInvalidTextSlot, size: this.size, onLabelClick: this.handleLabelClick, requiredIndicator: this.requiredIndicator }, h("gr-dropdown", { ref: el => (this.dropdown = el), hoist: this.hoist, closeOnSelect: !this.multiple, containingElement: this.el, class: {
        'select': true,
        'select-open': this.isOpen,
        'select-empty': ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) === 0,
        'select-focused': this.hasFocus,
        'select-clearable': this.clearable,
        'select-disabled': this.disabled,
        'select-multiple': this.multiple,
        'select-has-tags': this.multiple && hasSelection,
        'select-placeholder-visible': this.displayLabel === '',
        [`select-${this.size}`]: true,
        'select-pill': this.pill,
        'select-invalid': this.invalid,
      }, "onGr-show": this.handleMenuShow, "onGr-hide": this.handleMenuHide }, h("div", Object.assign({ slot: "trigger", ref: el => (this.box = el), id: this.inputId, class: "select-box", role: "combobox" }, ariaLabelAttributes, { "aria-describedby": this.invalid ? this.invalidTextId : this.helpTextId, "aria-haspopup": "true", "aria-expanded": this.isOpen ? 'true' : 'false', "aria-invalid": this.invalid ? 'true' : 'false', "aria-required": this.requiredIndicator ? 'true' : 'false', tabIndex: this.disabled ? -1 : 0, onBlur: this.handleBlur, onFocus: this.handleFocus, onKeyDown: this.handleKeyDown }), h("div", { class: "select-label" }, this.displayTags.length ? (h("span", { class: "select-tags" }, this.displayTags)) : (this.displayLabel || this.placeholder)), this.clearable && hasSelection && (h("button", { class: "select-clear", type: "button", onClick: this.handleClearClick, "aria-label": "clear", tabindex: "-1" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Close Circle"), h("path", { d: "M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z", fill: "none", stroke: "currentColor", "stroke-miterlimit": "10", "stroke-width": "32" }), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M320 320L192 192M192 320l128-128" })))), h("span", { class: "caret" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Chevron Down"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "48", d: "M112 184l144 144 144-144" }))), h("input", { class: "select-hidden-select", "aria-hidden": "true", value: hasSelection ? '1' : '', tabIndex: -1 })), h("gr-menu", { ref: el => (this.menu = el), class: "select-menu", "onGr-select": this.handleMenuSelect }, h("slot", { onSlotchange: this.handleSlotChange })))));
  }
  get el() { return this; }
  static get watchers() { return {
    "disabled": ["handleDisabledChange"],
    "helpText": ["handleLabelChange"],
    "invalidText": ["handleLabelChange"],
    "label": ["handleLabelChange"],
    "multiple": ["handleMultipleChange"],
    "value": ["handleValueChange"]
  }; }
  static get style() { return selectCss; }
}, [1, "gr-select", {
    "multiple": [4],
    "maxTagsVisible": [2, "max-tags-visible"],
    "disabled": [4],
    "name": [1],
    "placeholder": [1],
    "size": [1],
    "hoist": [4],
    "value": [1025],
    "pill": [4],
    "label": [1],
    "requiredIndicator": [4, "required-indicator"],
    "helpText": [1, "help-text"],
    "invalidText": [1, "invalid-text"],
    "invalid": [516],
    "clearable": [4],
    "hasFocus": [32],
    "hasHelpTextSlot": [32],
    "hasInvalidTextSlot": [32],
    "hasLabelSlot": [32],
    "isOpen": [32],
    "items": [32],
    "displayLabel": [32],
    "displayTags": [32],
    "setFocus": [64]
  }]);
const parseValue = (value) => {
  if (value == null) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return value.toString();
};
function defineCustomElement$1$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-select", "gr-button", "gr-dropdown", "gr-menu", "gr-spinner", "gr-tag"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-select":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Select);
      }
      break;
    case "gr-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "gr-dropdown":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "gr-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "gr-spinner":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "gr-tag":
      if (!customElements.get(tagName)) {
        defineCustomElement();
      }
      break;
  } });
}
defineCustomElement$1$1();

const GrSelect = Select;

/*!
 * (C) PAQT.com B.V. https://paqt.com - MIT License
 */

const menuItemCss = ".gr-scroll-lock{overflow:hidden !important}:host{--line-height:var(--gr-line-height-normal);--background-color:transparent;--background-color-focused:var(--gr-color-primary);--color:var(--gr-color-dark);--color-focused:var(--gr-color-primary-contrast);--color-disabled:var(--gr-color-medium);--padding-top:var(--gr-spacing-xx-small);--padding-start:var(--gr-spacing-x-large);--padding-end:var(--gr-spacing-x-large);--padding-bottom:var(--gr-spacing-xx-small);--transition:background-color 150ms linear, color 150ms linear;position:relative;display:flex;align-items:stretch;font-family:var(--gr-font-family);font-size:var(--gr-font-size-medium);font-weight:var(--gr-font-weight-normal);line-height:var(--line-height);letter-spacing:var(--gr-letter-spacing-normal);text-align:left;background-color:var(--background-color);color:var(--color);padding-top:var(--padding-top);padding-left:var(--padding-start);padding-right:var(--padding-end);padding-bottom:var(--padding-bottom);transition:var(--transition);user-select:none;white-space:nowrap;cursor:pointer;box-sizing:border-box}:host *,:host *:before,:host *:after{box-sizing:inherit}:host(.menu-item-focused:not(.menu-item-disabled)){outline:none;background-color:var(--background-color-focused);color:var(--color-focused)}:host(.menu-item-disabled){outline:none;color:var(--color-disabled);cursor:not-allowed}.checkmark{display:flex;position:absolute;left:0.5em;top:calc(50% - 0.5em);visibility:hidden;align-items:center;font-size:inherit}.checkmark svg{display:inline-block;width:1.1em;height:1.1em;contain:strict;fill:currentcolor;box-sizing:content-box !important}:host(.menu-item-checked) .checkmark{visibility:visible}.label{flex:1 1 auto}.start{flex:0 0 auto;display:flex;align-items:center}.start ::slotted(:last-child){margin-right:0.5em}.end{flex:0 0 auto;display:flex;align-items:center}.end ::slotted(:first-child){margin-left:0.5em}";

const MenuItem = /*@__PURE__*/ proxyCustomElement(class extends H {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.hasFocus = false;
    this.checked = false;
    this.value = '';
    this.disabled = false;
  }
  connectedCallback() {
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }
  /** Sets focus on the menu item. */
  async setFocus(options) {
    this.el.focus(options);
  }
  /** Removes focus from the menu item. */
  async removeFocus() {
    this.el.blur();
  }
  handleBlur() {
    this.hasFocus = false;
  }
  handleFocus() {
    this.hasFocus = true;
  }
  handleMouseEnter() {
    this.setFocus();
  }
  handleMouseLeave() {
    this.removeFocus();
  }
  render() {
    return (h(Host, { class: {
        'menu-item-checked': this.checked,
        'menu-item-disabled': this.disabled,
        'menu-item-focused': this.hasFocus,
      }, role: "menuitem", "aria-disabled": this.disabled ? 'true' : 'false', "aria-checked": this.checked ? 'true' : 'false', tabIndex: !this.disabled ? 0 : null, onFocus: this.handleFocus, onBlur: this.handleBlur, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, h("span", { class: "checkmark" }, h("svg", { role: "img", "aria-hidden": "true", viewBox: "0 0 512 512" }, h("title", null, "Checkmark"), h("path", { fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "32", d: "M416 128L192 384l-96-96" }))), h("span", { class: "start" }, h("slot", { name: "start" })), h("span", { class: "label" }, h("slot", null)), h("span", { class: "end" }, h("slot", { name: "end" }))));
  }
  get el() { return this; }
  static get style() { return menuItemCss; }
}, [1, "gr-menu-item", {
    "checked": [516],
    "value": [513],
    "disabled": [516],
    "hasFocus": [32],
    "setFocus": [64],
    "removeFocus": [64]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["gr-menu-item"];
  components.forEach(tagName => { switch (tagName) {
    case "gr-menu-item":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MenuItem);
      }
      break;
  } });
}
defineCustomElement$1();

const GrMenuItem = MenuItem;

// It was difficult to find a multi-select web component that matches these criteria:
// - Is a dropdown vs multi-select list.
// - Open source.
// - Supports being in a ScopedRegistry out of the box (i.e. does not auto-register with customElements).
// - Looks attractive / compatible with mostly Material elements.
// - Styleable
// - Does not bloat output size considerably.

// Web components evaluated (https://open-wc.org/guides/community/component-libraries/):
// - Material: No multiselect component.
// - Freshwords/@crayon: Considerable bloat in output due to i18n translations
//   that are used by _other_ components.
// - Carbon Design System: Workable, but less moderm / Material-like.
// - UI5: Auto-registers globally.
// - Vaadin: Auto-registers globally.
// - Liquid: Not open source.
// - [Many others]: No multiselect component.

const grSelectElements = {
  'gr-select': GrSelect,
  'gr-menu-item': GrMenuItem,
};

class AdvancedCameraCardSelect extends e$1(s) {
    constructor() {
        super(...arguments);
        this.value = null;
        this.multiple = false;
        this.clearable = false;
        this._refSelect = e$2();
    }
    reset() {
        this.value = null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _valueChangedHandler(_ev) {
        const value = this._refSelect.value?.value;
        // The underlying gr-select element is very sensitive and occasionally fires
        // the change event even if the value has not actually changed. Prevent that
        // from propagating upwards.
        if (value !== undefined && !isEqual(this.value, value)) {
            const initialValueSet = this.value === null;
            this.value = value;
            // The underlying gr-select element will call on the first first value set
            // (even when the user has not interacted with the control). Do not
            // dispatch events for this.
            if (!initialValueSet) {
                fireAdvancedCameraCardEvent(this, 'select:change', value);
            }
        }
    }
    willUpdate(changedProps) {
        if (changedProps.has('initialValue') && this.initialValue && !this.value) {
            this.value = this.initialValue;
        }
    }
    render() {
        return x ` <gr-select
      ${n$2(this._refSelect)}
      label=${this.label ?? ''}
      placeholder=${this.placeholder ?? ''}
      size="small"
      ?multiple=${this.multiple}
      ?clearable=${this.clearable}
      .value=${this.value ?? []}
      @gr-change=${this._valueChangedHandler.bind(this)}
    >
      ${this.options?.map((option) => x `<gr-menu-item value="${option.value ?? ''}"
            >${option.label}</gr-menu-item
          >`)}
    </gr-select>`;
    }
    static get styles() {
        return r$1(css$1);
    }
}
AdvancedCameraCardSelect.elementDefinitions = {
    ...grSelectElements,
};
__decorate([
    n$1({ attribute: false, hasChanged: contentsChanged })
], AdvancedCameraCardSelect.prototype, "options", void 0);
__decorate([
    n$1({ attribute: false, hasChanged: contentsChanged })
], AdvancedCameraCardSelect.prototype, "value", void 0);
__decorate([
    n$1({ attribute: false, hasChanged: contentsChanged })
], AdvancedCameraCardSelect.prototype, "initialValue", void 0);
__decorate([
    n$1({ attribute: true })
], AdvancedCameraCardSelect.prototype, "label", void 0);
__decorate([
    n$1({ attribute: true })
], AdvancedCameraCardSelect.prototype, "placeholder", void 0);
__decorate([
    n$1({ attribute: true, type: Boolean })
], AdvancedCameraCardSelect.prototype, "multiple", void 0);
__decorate([
    n$1({ attribute: true, type: Boolean })
], AdvancedCameraCardSelect.prototype, "clearable", void 0);

let AdvancedCameraCardMediaFilter = class AdvancedCameraCardMediaFilter extends e$1(s) {
    constructor() {
        super(...arguments);
        this._mediaFilterController = new MediaFilterController(this);
        this._refMediaType = e$2();
        this._refCamera = e$2();
        this._refWhen = e$2();
        this._refWhenFrom = e$2();
        this._refWhenTo = e$2();
        this._refWhat = e$2();
        this._refWhere = e$2();
        this._refFavorite = e$2();
        this._refTags = e$2();
    }
    willUpdate(changedProps) {
        if (changedProps.has('viewManagerEpoch')) {
            this._mediaFilterController.setViewManager(this.viewManagerEpoch?.manager ?? null);
        }
        if (changedProps.has('cameraManager') && this.cameraManager) {
            this._mediaFilterController.computeCameraOptions(this.cameraManager);
            this._mediaFilterController.computeMetadataOptions(this.cameraManager);
        }
        // The first time the viewManager is set, compute the initial default selections.
        if (!changedProps.get('viewManager') &&
            this.viewManagerEpoch &&
            this.cameraManager) {
            this._mediaFilterController.computeInitialDefaultsFromView(this.cameraManager);
        }
    }
    render() {
        const valueChange = async () => {
            if (!this.cameraManager || !this.viewManagerEpoch || !this.cardWideConfig) {
                return;
            }
            await this._mediaFilterController.valueChangeHandler(this.cameraManager, this.cardWideConfig, {
                camera: this._refCamera.value?.value ?? undefined,
                mediaType: (this._refMediaType.value?.value ?? undefined),
                when: {
                    selected: this._refWhen.value?.value ?? undefined,
                    from: this._refWhenFrom.value?.value,
                    to: this._refWhenTo.value?.value,
                },
                favorite: (this._refFavorite.value?.value ?? undefined),
                where: this._refWhere.value?.value ?? undefined,
                what: this._refWhat.value?.value ?? undefined,
                tags: this._refTags.value?.value ?? undefined,
            });
        };
        // Ensure that the "When" selector and the custom calendar to/from selectors
        // are ~mutually exclusive.
        const whenChange = async (whenPriority) => {
            if (whenPriority === 'custom' && this._refWhen.value) {
                if (!this._refWhenFrom.value?.value && !this._refWhenTo.value?.value) {
                    this._refWhen.value.reset();
                }
                else {
                    this._refWhen.value.value = MediaFilterCoreWhen.Custom;
                }
            }
            else if (this._refWhen.value?.value !== MediaFilterCoreWhen.Custom) {
                this._refWhenFrom.value?.reset();
                this._refWhenTo.value?.reset();
            }
            await valueChange();
        };
        if (!this.cameraManager || !this.viewManagerEpoch) {
            return;
        }
        const controls = this._mediaFilterController.getControlsToShow(this.cameraManager);
        const defaults = this._mediaFilterController.getDefaults();
        const whatOptions = this._mediaFilterController.getWhatOptions();
        const tagsOptions = this._mediaFilterController.getTagsOptions();
        const whereOptions = this._mediaFilterController.getWhereOptions();
        return x ` <advanced-camera-card-select
        ${n$2(this._refMediaType)}
        label=${localize('media_filter.media_type')}
        placeholder=${localize('media_filter.select_media_type')}
        .options=${this._mediaFilterController.getMediaTypeOptions()}
        .initialValue=${defaults?.mediaType}
        @advanced-camera-card:select:change=${() => valueChange()}
      >
      </advanced-camera-card-select>
      <div class="when">
        <advanced-camera-card-select
          ${n$2(this._refWhen)}
          .label=${localize('media_filter.when')}
          placeholder=${localize('media_filter.select_when')}
          .options=${this._mediaFilterController.getWhenOptions()}
          .initialValue=${defaults?.when}
          clearable
          @advanced-camera-card:select:change=${() => whenChange('selected')}
        >
        </advanced-camera-card-select>
        <advanced-camera-card-date-picker
          class="${e$3({
            selected: !!this._refWhenFrom.value?.value,
            hidden: this._refWhen.value?.value !== MediaFilterCoreWhen.Custom,
        })}"
          ${n$2(this._refWhenFrom)}
          .icon=${'mdi:calendar-arrow-right'}
          @advanced-camera-card:date-picker:change=${() => whenChange('custom')}
        >
        </advanced-camera-card-date-picker>
        <advanced-camera-card-date-picker
          class="${e$3({
            selected: !!this._refWhenTo.value?.value,
            hidden: this._refWhen.value?.value !== MediaFilterCoreWhen.Custom,
        })}"
          ${n$2(this._refWhenTo)}
          .icon=${'mdi:calendar-arrow-left'}
          @advanced-camera-card:date-picker:change=${() => whenChange('custom')}
        >
        </advanced-camera-card-date-picker>
      </div>
      <advanced-camera-card-select
        ${n$2(this._refCamera)}
        .label=${localize('media_filter.camera')}
        placeholder=${localize('media_filter.select_camera')}
        .options=${this._mediaFilterController.getCameraOptions()}
        .initialValue=${defaults?.cameraIDs}
        clearable
        multiple
        @advanced-camera-card:select:change=${() => valueChange()}
      >
      </advanced-camera-card-select>
      ${controls.events && whatOptions.length
            ? x ` <advanced-camera-card-select
            ${n$2(this._refWhat)}
            label=${localize('media_filter.what')}
            placeholder=${localize('media_filter.select_what')}
            clearable
            multiple
            .options=${whatOptions}
            .initialValue=${defaults?.what}
            @advanced-camera-card:select:change=${() => valueChange()}
          >
          </advanced-camera-card-select>`
            : ''}
      ${controls.events && tagsOptions.length
            ? x ` <advanced-camera-card-select
            ${n$2(this._refTags)}
            label=${localize('media_filter.tag')}
            placeholder=${localize('media_filter.select_tag')}
            clearable
            multiple
            .options=${tagsOptions}
            .initialValue=${defaults?.tags}
            @advanced-camera-card:select:change=${() => valueChange()}
          >
          </advanced-camera-card-select>`
            : ''}
      ${controls.events && whereOptions.length
            ? x ` <advanced-camera-card-select
            ${n$2(this._refWhere)}
            label=${localize('media_filter.where')}
            placeholder=${localize('media_filter.select_where')}
            clearable
            multiple
            .options=${whereOptions}
            .initialValue=${defaults?.where}
            @advanced-camera-card:select:change=${() => valueChange()}
          >
          </advanced-camera-card-select>`
            : ''}
      ${controls.favorites
            ? x `
            <advanced-camera-card-select
              ${n$2(this._refFavorite)}
              label=${localize('media_filter.favorite')}
              placeholder=${localize('media_filter.select_favorite')}
              .options=${this._mediaFilterController.getFavoriteOptions()}
              .initialValue=${defaults?.favorite}
              clearable
              @advanced-camera-card:select:change=${() => valueChange()}
            >
            </advanced-camera-card-select>
          `
            : ''}`;
    }
    static get styles() {
        return r$1(css$2);
    }
};
AdvancedCameraCardMediaFilter.elementDefinitions = {
    'advanced-camera-card-select': AdvancedCameraCardSelect,
    'advanced-camera-card-date-picker': AdvancedCameraCardDatePicker,
};
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardMediaFilter.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardMediaFilter.prototype, "cameraManager", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardMediaFilter.prototype, "viewManagerEpoch", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardMediaFilter.prototype, "cardWideConfig", void 0);
AdvancedCameraCardMediaFilter = __decorate([
    t$1('advanced-camera-card-media-filter')
], AdvancedCameraCardMediaFilter);

const t=t=>"object"==typeof t&&null!=t&&1===t.nodeType,e=(t,e)=>(!e||"hidden"!==t)&&("visible"!==t&&"clip"!==t),n=(t,n)=>{if(t.clientHeight<t.scrollHeight||t.clientWidth<t.scrollWidth){const o=getComputedStyle(t,null);return e(o.overflowY,n)||e(o.overflowX,n)||(t=>{const e=(t=>{if(!t.ownerDocument||!t.ownerDocument.defaultView)return null;try{return t.ownerDocument.defaultView.frameElement}catch(t){return null}})(t);return !!e&&(e.clientHeight<t.scrollHeight||e.clientWidth<t.scrollWidth)})(t)}return !1},o=(t,e,n,o,l,r,i,s)=>r<t&&i>e||r>t&&i<e?0:r<=t&&s<=n||i>=e&&s>=n?r-t-o:i>e&&s<n||r<t&&s>n?i-e+l:0,l=t=>{const e=t.parentElement;return null==e?t.getRootNode().host||null:e},r=(e,r)=>{var i,s,d,h;if("undefined"==typeof document)return [];const{scrollMode:c,block:f,inline:u,boundary:a,skipOverflowHiddenElements:g}=r,p="function"==typeof a?a:t=>t!==a;if(!t(e))throw new TypeError("Invalid target");const m=document.scrollingElement||document.documentElement,w=[];let W=e;for(;t(W)&&p(W);){if(W=l(W),W===m){w.push(W);break}null!=W&&W===document.body&&n(W)&&!n(document.documentElement)||null!=W&&n(W,g)&&w.push(W);}const b=null!=(s=null==(i=window.visualViewport)?void 0:i.width)?s:innerWidth,H=null!=(h=null==(d=window.visualViewport)?void 0:d.height)?h:innerHeight,{scrollX:y,scrollY:M}=window,{height:v,width:E,top:x,right:C,bottom:I,left:R}=e.getBoundingClientRect(),{top:T,right:B,bottom:F,left:V}=(t=>{const e=window.getComputedStyle(t);return {top:parseFloat(e.scrollMarginTop)||0,right:parseFloat(e.scrollMarginRight)||0,bottom:parseFloat(e.scrollMarginBottom)||0,left:parseFloat(e.scrollMarginLeft)||0}})(e);let k="start"===f||"nearest"===f?x-T:"end"===f?I+F:x+v/2-T+F,D="center"===u?R+E/2-V+B:"end"===u?C+B:R-V;const L=[];for(let t=0;t<w.length;t++){const e=w[t],{height:l,width:r,top:i,right:s,bottom:d,left:h}=e.getBoundingClientRect();if("if-needed"===c&&x>=0&&R>=0&&I<=H&&C<=b&&(e===m&&!n(e)||x>=i&&I<=d&&R>=h&&C<=s))return L;const a=getComputedStyle(e),g=parseInt(a.borderLeftWidth,10),p=parseInt(a.borderTopWidth,10),W=parseInt(a.borderRightWidth,10),T=parseInt(a.borderBottomWidth,10);let B=0,F=0;const V="offsetWidth"in e?e.offsetWidth-e.clientWidth-g-W:0,S="offsetHeight"in e?e.offsetHeight-e.clientHeight-p-T:0,X="offsetWidth"in e?0===e.offsetWidth?0:r/e.offsetWidth:0,Y="offsetHeight"in e?0===e.offsetHeight?0:l/e.offsetHeight:0;if(m===e)B="start"===f?k:"end"===f?k-H:"nearest"===f?o(M,M+H,H,p,T,M+k,M+k+v,v):k-H/2,F="start"===u?D:"center"===u?D-b/2:"end"===u?D-b:o(y,y+b,b,g,W,y+D,y+D+E,E),B=Math.max(0,B+M),F=Math.max(0,F+y);else {B="start"===f?k-i-p:"end"===f?k-d+T+S:"nearest"===f?o(i,d,l,p,T+S,k,k+v,v):k-(i+l/2)+S/2,F="start"===u?D-h-g:"center"===u?D-(h+r/2)+V/2:"end"===u?D-s+W+V:o(h,s,r,g,W+V,D,D+E,E);const{scrollLeft:t,scrollTop:n}=e;B=0===Y?0:Math.max(0,Math.min(n+B/Y,e.scrollHeight-l/Y+S)),F=0===X?0:Math.max(0,Math.min(t+F/X,e.scrollWidth-r/X+V)),k+=n-B,D+=t-F;}L.push({el:e,top:B,left:F});}return L};

// Alternative to the stock element.scrollIntoView that suppports limiting
// scrolling to a boundary, rather than the entire browser root.
//
// See: https://github.com/dermotduffy/advanced-camera-card/issues/1814
// See: https://github.com/w3c/csswg-drafts/issues/9452
const scrollIntoView = (element, options) => {
    r(element, options).forEach(({ el, top, left }) => {
        el.scrollTop = top;
        el.scrollLeft = left;
    });
};

const GALLERY_MIN_EXTENSION_SECONDS = 0.5;
class GalleryCoreController {
    constructor(host, getSlot, getSentinelBottom, showLoaderTopCallback, showSentinelBottomCallback) {
        this._options = null;
        this._touchScrollYPosition = null;
        // Wheel / touch events may be voluminous, throttle extension calls.
        this._throttledExtendUp = throttle(this._extendUp.bind(this), GALLERY_MIN_EXTENSION_SECONDS * 1000, {
            leading: true,
            trailing: false,
        });
        this._wasEverNonEmpty = false;
        this._touchStartHandler = (ev) => {
            // Remember the Y touch position on touch start, so that we can calculate if
            // the user gestured upwards or downards on touchend.
            if (ev.touches.length === 1) {
                this._touchScrollYPosition = ev.touches[0].screenY;
            }
            else {
                this._touchScrollYPosition = null;
            }
        };
        this._touchEndHandler = async (ev) => {
            if (!this._host.scrollTop &&
                ev.changedTouches.length === 1 &&
                this._touchScrollYPosition !== null) {
                if (ev.changedTouches[0].screenY > this._touchScrollYPosition) {
                    await this._throttledExtendUp();
                }
            }
            this._touchScrollYPosition = null;
        };
        this._wheelHandler = async (ev) => {
            if (!this._host.scrollTop && ev.deltaY < 0) {
                await this._throttledExtendUp();
            }
        };
        this._host = host;
        this._host.addController(this);
        this._getSlot = getSlot;
        this._getSentintelBottom = getSentinelBottom;
        this._showLoaderTop = showLoaderTopCallback;
        this._showSentinelBottom = showSentinelBottomCallback;
        this._resizeObserver = new ResizeObserver(() => this._setColumnCount());
        this._intersectionObserver = new IntersectionObserver(async (entries) => {
            if (entries.some((entry) => entry.isIntersecting)) {
                await this._extendDown();
            }
        });
    }
    removeController() {
        this._host.removeController(this);
    }
    setOptions(options) {
        this._options = options;
        this._setColumnCount();
    }
    hostConnected() {
        this._resizeObserver.observe(this._host);
        // Since the scroll event does not fire if the user is already at the top of
        // the container, instead we manually use the wheel and touchstart/end
        // events to detect "top upwards scrolling" (to trigger an extension of the
        // gallery).
        this._host.addEventListener('wheel', this._wheelHandler, { passive: true });
        this._host.addEventListener('touchstart', this._touchStartHandler, {
            passive: true,
        });
        this._host.addEventListener('touchend', this._touchEndHandler);
        // Request update in order to ensure the intersection observer reconnects
        // with the loader sentinel.
        this._host.requestUpdate();
    }
    hostDisconnected() {
        this._host.removeEventListener('wheel', this._wheelHandler);
        this._host.removeEventListener('touchstart', this._touchStartHandler);
        this._host.removeEventListener('touchend', this._touchEndHandler);
        this._resizeObserver.disconnect();
        this._intersectionObserver.disconnect();
    }
    hostUpdated() {
        const sentinel = this._getSentintelBottom();
        this._intersectionObserver.disconnect();
        if (sentinel) {
            this._intersectionObserver.observe(sentinel);
        }
    }
    _setColumnCount() {
        if (!this._options?.columnWidth) {
            return;
        }
        const roundFunc = this._options.columnCountRoundMethod === 'ceil' ? Math.ceil : Math.floor;
        const columns = Math.max(1, roundFunc(this._host.clientWidth / this._options.columnWidth));
        this._host.style.setProperty('--advanced-camera-card-gallery-columns', String(columns));
    }
    async _extendUp() {
        if (!this._options?.extendUp) {
            return;
        }
        this._showLoaderTop(true);
        const start = new Date();
        await this._waitForExtend('up');
        const delta = new Date().getTime() - start.getTime();
        if (delta < GALLERY_MIN_EXTENSION_SECONDS * 1000) {
            // Hidden gem: "legitimate" (?!) use of sleep() :-) These calls can return
            // very quickly even with caching disabled since the time window
            // constraints on the query will usually be very narrow and the backend
            // can thus very quickly reply. It's often so fast it actually looks like
            // a rendering issue where the progress indictor barely registers before
            // it's gone again. This optional pause ensures there is at least some
            // visual feedback to the user that lasts long enough they can 'feel' the
            // fetch has happened.
            //
            // This is only applied on the 'up' extend since the 'down' extend may be
            // called multiple times for large card sizes (e.g. fullscreen) where a
            // delay is not desirable.
            await sleep(GALLERY_MIN_EXTENSION_SECONDS - delta / 1000);
        }
        this._showLoaderTop(false);
    }
    async _extendDown() {
        if (!this._options?.extendDown) {
            return;
        }
        this._showSentinelBottom(false);
        await this._waitForExtend('down');
        // Sentinel will be re-shown next time the contents changes, see:
        // updateContents() .
    }
    async _waitForExtend(direction) {
        await new Promise((resolve) => {
            fireAdvancedCameraCardEvent(this._host, `gallery:extend:${direction}`, { resolve }, {
                bubbles: false,
                composed: false,
            });
        });
    }
    updateContents() {
        const slot = this._getSlot();
        if (!slot) {
            return;
        }
        const contents = slot
            .assignedElements()
            .filter((element) => element instanceof HTMLElement);
        const firstSelected = contents.find((element) => element.getAttribute('selected') !== null);
        if (contents.length) {
            if (!this._wasEverNonEmpty && firstSelected) {
                // As a special case, if this is the first setting of the slot contents,
                // the gallery is scrolled to the selected element (if any). This is
                // only done on the first setting, as subsequent gallery extensions
                // should not cause the gallery to rescroll to the item that happens to
                // be selected.
                // See: https://github.com/dermotduffy/advanced-camera-card/issues/885
                scrollIntoView(firstSelected, {
                    boundary: this._host,
                    block: 'center',
                });
            }
            this._wasEverNonEmpty = true;
        }
        // Always render the bottom sentinel when the contents changes, in order to allow
        // the gallery to be extended downwards.
        this._showSentinelBottom(true);
    }
}

var css = ":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n  overflow: auto;\n  -ms-overflow-style: none;\n  scrollbar-width: none;\n  --advanced-camera-card-gallery-gap: 3px;\n  --advanced-camera-card-gallery-columns: 4;\n}\n\n.grid {\n  display: grid;\n  grid-template-columns: repeat(var(--advanced-camera-card-gallery-columns), minmax(0, 1fr));\n  grid-auto-rows: var(--advanced-camera-card-thumbnail-size);\n  gap: var(--advanced-camera-card-gallery-gap);\n}\n\n:host::-webkit-scrollbar {\n  display: none;\n}\n\nadvanced-camera-card-progress-indicator.top {\n  grid-column: 1/-1;\n  box-sizing: border-box;\n  padding: 5px 0px 5px 0px;\n}";

let AdvancedCameraCardGalleryCore = class AdvancedCameraCardGalleryCore extends s {
    constructor() {
        super(...arguments);
        this.columnWidth = THUMBNAIL_WIDTH_DEFAULT;
        this.extendUp = false;
        this.extendDown = false;
        this._refSentinelBottom = e$2();
        this._refSlot = e$2();
        this._controller = new GalleryCoreController(this, () => this._refSlot.value ?? null, () => this._refSentinelBottom.value ?? null, (show) => {
            this._showLoaderTop = show;
        }, (show) => {
            this._showSentinelBottom = show;
        });
        // Top loader: A progress indicator is shown across the top of the gallery if
        // the user is _already_ at the top of the gallery and scrolls upwards. This
        // attempts to fetch new content from "later" (more recently) than the current
        // query. This is hidden by default.
        this._showLoaderTop = false;
        // Bottom sentinel: A progress indicator shown in a "cell" (not across) at the
        // bottom of the gallery. Once visible an attempt is optionally made to extend
        // the gallery downwards. This is rendered by default (so intersection can be
        // detected), and hidden during fetches.
        this._showSentinelBottom = true;
    }
    willUpdate(changedProps) {
        if (['columnCountRoundMethod', 'columnWidth', 'extendUp', 'extendDown'].some((prop) => changedProps.has(prop))) {
            this._controller.setOptions({
                extendUp: this.extendUp,
                extendDown: this.extendDown,
                columnWidth: this.columnWidth,
                columnCountRoundMethod: this.columnCountRoundMethod,
            });
        }
    }
    render() {
        return x ` <div class="grid">
      ${this.extendUp && this._showLoaderTop
            ? x `${renderProgressIndicator({
                cardWideConfig: this.cardWideConfig,
                classes: {
                    top: true,
                },
                size: 'small',
            })}`
            : ''}
      <slot ${n$2(this._refSlot)} @slotchange=${() => this._controller.updateContents()}>
      </slot>
      ${this.extendDown && this._showSentinelBottom
            ? x `${renderProgressIndicator({
                cardWideConfig: this.cardWideConfig,
                componentRef: this._refSentinelBottom,
                size: 'small',
            })}`
            : ''}
    </div>`;
    }
    static get styles() {
        return r$1(css);
    }
};
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardGalleryCore.prototype, "hass", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardGalleryCore.prototype, "columnWidth", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardGalleryCore.prototype, "columnCountRoundMethod", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardGalleryCore.prototype, "cardWideConfig", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardGalleryCore.prototype, "extendUp", void 0);
__decorate([
    n$1({ attribute: false })
], AdvancedCameraCardGalleryCore.prototype, "extendDown", void 0);
__decorate([
    r$2()
], AdvancedCameraCardGalleryCore.prototype, "_showLoaderTop", void 0);
__decorate([
    r$2()
], AdvancedCameraCardGalleryCore.prototype, "_showSentinelBottom", void 0);
AdvancedCameraCardGalleryCore = __decorate([
    t$1('advanced-camera-card-gallery-core')
], AdvancedCameraCardGalleryCore);
//# sourceMappingURL=gallery-core-d1db19fc.js.map
