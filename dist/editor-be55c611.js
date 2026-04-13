import { z as isEqual, I as setOrRemoveAttribute, _ as __decorate, y as n, t, u as s, C as x, l as localize, v as r, x as r$1, ab as copyConfig, ae as isConfigUpgradeable, af as profilesSchema, ag as setProfiles, ah as sideLoadHomeAssistantElements, ac as getConfigValue, f as getEntityTitle, O as prettifyTitle, ai as CONF_VIEW_DEFAULT_RESET, aj as CONF_VIEW_DEFAULT_RESET_AFTER_INTERACTION, ak as CONF_VIEW_DEFAULT_RESET_EVERY_SECONDS, al as CONF_VIEW_DEFAULT_RESET_INTERACTION_MODE, am as CONF_VIEW_DEFAULT_RESET_ENTITIES, an as CONF_VIEW_TRIGGERS, ao as CONF_VIEW_TRIGGERS_FILTER_SELECTED_CAMERA, ap as CONF_VIEW_TRIGGERS_SHOW_TRIGGER_STATUS, aq as CONF_VIEW_TRIGGERS_UNTRIGGER_SECONDS, ar as CONF_VIEW_TRIGGERS_ACTIONS, as as CONF_VIEW_TRIGGERS_ACTIONS_TRIGGER, at as CONF_VIEW_TRIGGERS_ACTIONS_UNTRIGGER, au as CONF_VIEW_TRIGGERS_ACTIONS_INTERACTION_MODE, av as CONF_VIEW_KEYBOARD_SHORTCUTS, aw as CONF_VIEW_KEYBOARD_SHORTCUTS_ENABLED, ax as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_LEFT, ay as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_RIGHT, az as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_UP, aA as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_DOWN, aB as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_ZOOM_IN, aC as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_ZOOM_OUT, aD as CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_HOME, aE as CONF_STATUS_BAR_ITEMS, aF as STATUS_BAR_PRIORITY_MAX, aG as CONF_MENU_BUTTONS, aH as MENU_PRIORITY_MAX, J as e, aI as ZOOM_MIN, aJ as ZOOM_MAX, aK as CONF_TIMELINE_STYLE, aL as CONF_TIMELINE_WINDOW_SECONDS, aM as CONF_TIMELINE_CLUSTERING_THRESHOLD, aN as CONF_TIMELINE_EVENTS_MEDIA_TYPE, aO as CONF_TIMELINE_SHOW_RECORDINGS, aP as BUTTON_SIZE_MIN, aQ as THUMBNAIL_WIDTH_MIN, aR as THUMBNAIL_WIDTH_MAX, aS as arrayMove, aT as CONF_FOLDERS, aU as getArrayConfigPath, a4 as renderMessage, aV as FOLDERS_CONFIGURATION_URL, aW as getCameraID, aX as CONF_CAMERAS, aY as fireHASSEvent, aZ as upgradeConfig, a_ as CONF_PROFILES, a$ as CONF_VIEW_DEFAULT, b0 as CONF_VIEW_CAMERA_SELECT, b1 as CONF_VIEW_DIM, b2 as CONF_VIEW_INTERACTION_SECONDS, b3 as CONF_VIEW_DEFAULT_CYCLE_CAMERA, b4 as CONF_VIEW_THEME_THEMES, b5 as CONF_MENU_STYLE, b6 as CONF_MENU_POSITION, b7 as CONF_MENU_ALIGNMENT, b8 as CONF_MENU_BUTTON_SIZE, b9 as CONF_STATUS_BAR_STYLE, ba as CONF_STATUS_BAR_POSITION, bb as CONF_STATUS_BAR_HEIGHT, bc as STATUS_BAR_HEIGHT_MIN, bd as CONF_STATUS_BAR_POPUP_SECONDS, be as CONF_LIVE_PRELOAD, bf as CONF_LIVE_DRAGGABLE, bg as CONF_LIVE_ZOOMABLE, bh as CONF_LIVE_LAZY_LOAD, bi as CONF_LIVE_LAZY_UNLOAD, bj as CONF_LIVE_AUTO_PLAY, bk as CONF_LIVE_AUTO_PAUSE, bl as CONF_LIVE_AUTO_MUTE, bm as CONF_LIVE_AUTO_UNMUTE, bn as CONF_LIVE_TRANSITION_EFFECT, bo as CONF_LIVE_SHOW_IMAGE_DURING_LOAD, bp as CONF_LIVE_DISPLAY_MODE, bq as CONF_LIVE_DISPLAY_GRID_SELECTED_POSITION, br as CONF_LIVE_DISPLAY_GRID_SELECTED_WIDTH_FACTOR, bs as CONF_LIVE_DISPLAY_GRID_COLUMNS, bt as CONF_LIVE_DISPLAY_GRID_MAX_COLUMNS, bu as CONF_LIVE_CONTROLS_BUILTIN, bv as CONF_LIVE_CONTROLS_WHEEL, bw as CONF_LIVE_CONTROLS_NEXT_PREVIOUS_STYLE, bx as CONF_LIVE_CONTROLS_NEXT_PREVIOUS_SIZE, by as CONF_LIVE_CONTROLS_THUMBNAILS_SIZE, bz as CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_DETAILS, bA as CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, bB as CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, bC as CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, bD as CONF_LIVE_CONTROLS_THUMBNAILS_MEDIA_TYPE, bE as CONF_LIVE_CONTROLS_THUMBNAILS_EVENTS_MEDIA_TYPE, bF as CONF_LIVE_CONTROLS_THUMBNAILS_MODE, bG as CONF_LIVE_CONTROLS_TIMELINE_MODE, bH as CONF_LIVE_CONTROLS_TIMELINE_STYLE, bI as CONF_LIVE_CONTROLS_TIMELINE_WINDOW_SECONDS, bJ as CONF_LIVE_CONTROLS_TIMELINE_CLUSTERING_THRESHOLD, bK as CONF_LIVE_CONTROLS_TIMELINE_EVENTS_MEDIA_TYPE, bL as CONF_LIVE_CONTROLS_TIMELINE_SHOW_RECORDINGS, bM as CONF_LIVE_CONTROLS_TIMELINE_FORMAT_24H, bN as CONF_LIVE_CONTROLS_TIMELINE_PAN_MODE, bO as CONF_LIVE_CONTROLS_PTZ_MODE, bP as CONF_LIVE_CONTROLS_PTZ_POSITION, bQ as CONF_LIVE_CONTROLS_PTZ_ORIENTATION, bR as CONF_LIVE_CONTROLS_PTZ_HIDE_PAN_TILT, bS as CONF_LIVE_CONTROLS_PTZ_HIDE_ZOOM, bT as CONF_LIVE_CONTROLS_PTZ_HIDE_HOME, bU as CONF_LIVE_MICROPHONE_DISCONNECT_SECONDS, bV as CONF_LIVE_MICROPHONE_ALWAYS_CONNECTED, bW as CONF_LIVE_MICROPHONE_MUTE_AFTER_MICROPHONE_MUTE_SECONDS, bX as CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SIZE, bY as CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_DETAILS, bZ as CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, b_ as CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, b$ as CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, c0 as CONF_MEDIA_GALLERY_CONTROLS_FILTER_MODE, c1 as CONF_MEDIA_VIEWER_AUTO_PLAY, c2 as CONF_MEDIA_VIEWER_AUTO_PAUSE, c3 as CONF_MEDIA_VIEWER_AUTO_MUTE, c4 as CONF_MEDIA_VIEWER_AUTO_UNMUTE, c5 as CONF_MEDIA_VIEWER_DRAGGABLE, c6 as CONF_MEDIA_VIEWER_ZOOMABLE, c7 as CONF_MEDIA_VIEWER_LAZY_LOAD, c8 as CONF_MEDIA_VIEWER_TRANSITION_EFFECT, c9 as CONF_MEDIA_VIEWER_SNAPSHOT_CLICK_PLAYS_CLIP, ca as CONF_MEDIA_VIEWER_DISPLAY_MODE, cb as CONF_MEDIA_VIEWER_DISPLAY_GRID_SELECTED_POSITION, cc as CONF_MEDIA_VIEWER_DISPLAY_GRID_SELECTED_WIDTH_FACTOR, cd as CONF_MEDIA_VIEWER_DISPLAY_GRID_COLUMNS, ce as CONF_MEDIA_VIEWER_DISPLAY_GRID_MAX_COLUMNS, cf as CONF_MEDIA_VIEWER_CONTROLS_BUILTIN, cg as CONF_MEDIA_VIEWER_CONTROLS_WHEEL, ch as CONF_MEDIA_VIEWER_CONTROLS_NEXT_PREVIOUS_STYLE, ci as CONF_MEDIA_VIEWER_CONTROLS_NEXT_PREVIOUS_SIZE, cj as CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SIZE, ck as CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_DETAILS, cl as CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, cm as CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, cn as CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, co as CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_MODE, cp as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_MODE, cq as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_STYLE, cr as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_WINDOW_SECONDS, cs as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_CLUSTERING_THRESHOLD, ct as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_EVENTS_MEDIA_TYPE, cu as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_SHOW_RECORDINGS, cv as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_FORMAT_24H, cw as CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_PAN_MODE, cx as CONF_IMAGE_MODE, cy as CONF_IMAGE_URL, cz as CONF_IMAGE_ENTITY, cA as CONF_IMAGE_ENTITY_PARAMETERS, cB as CONF_IMAGE_REFRESH_SECONDS, cC as CONF_TIMELINE_FORMAT_24H, cD as CONF_TIMELINE_CONTROLS_THUMBNAILS_SIZE, cE as CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_DETAILS, cF as CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, cG as CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, cH as CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, cI as CONF_TIMELINE_CONTROLS_THUMBNAILS_MODE, cJ as CONF_DIMENSIONS_ASPECT_RATIO_MODE, cK as CONF_DIMENSIONS_ASPECT_RATIO, cL as CONF_DIMENSIONS_HEIGHT, cM as CONF_PERFORMANCE_FEATURES_CARD_LOADING_INDICATOR, cN as CONF_PERFORMANCE_FEATURES_CARD_LOADING_EFFECTS, cO as CONF_PERFORMANCE_FEATURES_ANIMATED_PROGRESS_INDICATOR, cP as CONF_PERFORMANCE_FEATURES_MEDIA_CHUNK_SIZE, cQ as MEDIA_CHUNK_SIZE_MAX, cR as CONF_PERFORMANCE_FEATURES_MAX_SIMULTANEOUS_ENGINE_REQUESTS, cS as CONF_PERFORMANCE_STYLE_BORDER_RADIUS, cT as CONF_PERFORMANCE_STYLE_BOX_SHADOW, cU as CONF_REMOTE_CONTROL_ENTITIES_CAMERA, cV as deleteConfigValue, ad as setConfigValue, cW as CONF_FOLDERS_ARRAY_TYPE, cX as CONF_FOLDERS_ARRAY_TITLE, cY as CONF_FOLDERS_ARRAY_ICON, cZ as CONF_FOLDERS_ARRAY_ID, c_ as CONF_FOLDERS_ARRAY_HA_URL, c$ as CONF_CAMERAS_ARRAY_CAMERA_ENTITY, d0 as CONF_CAMERAS_ARRAY_LIVE_PROVIDER, d1 as CONF_CAMERAS_ARRAY_TITLE, d2 as CONF_CAMERAS_ARRAY_ICON, d3 as CONF_CAMERAS_ARRAY_ID, d4 as CONF_CAMERAS_ARRAY_ALWAYS_ERROR_IF_ENTITY_UNAVAILABLE, d5 as CONF_CAMERAS_ARRAY_FRIGATE_CAMERA_NAME, d6 as CONF_CAMERAS_ARRAY_FRIGATE_URL, d7 as CONF_CAMERAS_ARRAY_FRIGATE_LABELS, d8 as CONF_CAMERAS_ARRAY_FRIGATE_ZONES, d9 as CONF_CAMERAS_ARRAY_FRIGATE_CLIENT_ID, da as CONF_CAMERAS_ARRAY_MOTIONEYE_URL, db as CONF_CAMERAS_ARRAY_MOTIONEYE_IMAGES_DIRECTORY_PATTERN, dc as CONF_CAMERAS_ARRAY_MOTIONEYE_IMAGES_FILE_PATTERN, dd as CONF_CAMERAS_ARRAY_MOTIONEYE_MOVIES_DIRECTORY_PATTERN, de as CONF_CAMERAS_ARRAY_MOTIONEYE_MOVIES_FILE_PATTERN, df as CONF_CAMERAS_ARRAY_REOLINK_URL, dg as CONF_CAMERAS_ARRAY_REOLINK_MEDIA_RESOLUTION, dh as CONF_CAMERAS_ARRAY_GO2RTC_MODES, di as CONF_CAMERAS_ARRAY_GO2RTC_STREAM, dj as CONF_CAMERAS_ARRAY_GO2RTC_URL, dk as CONF_CAMERAS_ARRAY_IMAGE_MODE, dl as CONF_CAMERAS_ARRAY_IMAGE_URL, dm as CONF_CAMERAS_ARRAY_IMAGE_ENTITY, dn as CONF_CAMERAS_ARRAY_IMAGE_ENTITY_PARAMETERS, dp as CONF_CAMERAS_ARRAY_IMAGE_REFRESH_SECONDS, dq as CONF_CAMERAS_ARRAY_WEBRTC_CARD_ENTITY, dr as CONF_CAMERAS_ARRAY_WEBRTC_CARD_URL, ds as CONF_CAMERAS_ARRAY_DEPENDENCIES_ALL_CAMERAS, dt as CONF_CAMERAS_ARRAY_DEPENDENCIES_CAMERAS, du as CONF_CAMERAS_ARRAY_TRIGGERS_OCCUPANCY, dv as CONF_CAMERAS_ARRAY_TRIGGERS_MOTION, dw as CONF_CAMERAS_ARRAY_TRIGGERS_ENTITIES, dx as CONF_CAMERAS_ARRAY_TRIGGERS_EVENTS, dy as CONF_CAMERAS_ARRAY_CAST_METHOD, dz as CONF_CAMERAS_ARRAY_CAST_DASHBOARD_DASHBOARD_PATH, dA as CONF_CAMERAS_ARRAY_CAST_DASHBOARD_VIEW_PATH, dB as CONF_CAMERAS_ARRAY_DIMENSIONS_ASPECT_RATIO, dC as CONF_CAMERAS_ARRAY_DIMENSIONS_ROTATION, dD as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_FIT, dE as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_POSITION_X, dF as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_POSITION_Y, dG as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_TOP, dH as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_BOTTOM, dI as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_LEFT, dJ as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_RIGHT, dK as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_ZOOM_FACTOR, dL as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_PAN_X, dM as CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_PAN_Y, dN as CONF_CAMERAS_ARRAY_CAPABILITIES_DISABLE, dO as CONF_CAMERAS_ARRAY_CAPABILITIES_DISABLE_EXCEPT, dP as CONF_CAMERAS_ARRAY_PROXY_LIVE, dQ as CONF_CAMERAS_ARRAY_PROXY_MEDIA, dR as CONF_CAMERAS_ARRAY_PROXY_DYNAMIC, dS as CONF_CAMERAS_ARRAY_PROXY_SSL_VERIFICATION, dT as CONF_CAMERAS_ARRAY_PROXY_SSL_CIPHERS, dU as CONF_PERFORMANCE_PROFILE, dV as configDefaults } from './card-edc26888.js';

class KeyAssignerController {
    constructor(host) {
        this._assigning = false;
        this._value = null;
        this._blurEventHandler = () => {
            this._setAssigning(false);
        };
        this._keydownEventHandler = (ev) => {
            // Don't allow _only_ a modifier.
            if (!ev.key || ['Control', 'Alt', 'Shift', 'Meta'].includes(ev.key)) {
                return;
            }
            this.setValue({
                key: ev.key,
                ctrl: ev.ctrlKey,
                alt: ev.altKey,
                shift: ev.shiftKey,
                meta: ev.metaKey,
            });
            this._setAssigning(false);
        };
        this._host = host;
        this._host.addController(this);
    }
    setValue(value) {
        if (!isEqual(value, this._value)) {
            this._value = value;
            this._host.requestUpdate();
            this._host.dispatchEvent(new CustomEvent('value-changed', {
                detail: {
                    value: this._value,
                },
            }));
        }
    }
    getValue() {
        return this._value;
    }
    hasValue() {
        return !!this._value;
    }
    isAssigning() {
        return this._assigning;
    }
    toggleAssigning() {
        this._setAssigning(!this._assigning);
    }
    _setAssigning(assigning) {
        this._assigning = assigning;
        setOrRemoveAttribute(this._host, this._assigning, 'assigning');
        if (this._assigning) {
            this._host.addEventListener('keydown', this._keydownEventHandler);
        }
        else {
            this._host.removeEventListener('keydown', this._keydownEventHandler);
        }
        this._host.requestUpdate();
    }
    hostConnected() {
        this._host.addEventListener('blur', this._blurEventHandler);
    }
    hostDisconnected() {
        this._host.removeEventListener('blur', this._blurEventHandler);
    }
}

var css$1 = ":host {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 10px;\n  height: 56px;\n  border: 1px solid var(--divider-color);\n}\n\n:host([assigning]) ha-button.assign span,\n:host([assigning]) ha-button.assign advanced-camera-card-icon {\n  animation: pulse 0.5s infinite;\n}\n@keyframes pulse {\n  50% {\n    color: var(--warning-color);\n  }\n}\n\nha-button {\n  padding-left: 4px;\n  padding-right: 4px;\n}\n\nadvanced-camera-card-icon {\n  padding: 10px;\n}\n\ndiv.label {\n  width: 100px;\n  margin-left: 4px;\n}\n\ndiv.key-row {\n  flex: 1;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding-left: 10px;\n  padding-right: 10px;\n}\n\ndiv.key {\n  display: flex;\n  align-items: center;\n  height: 90%;\n  width: min-content;\n  margin-left: 5px;\n  margin-right: 5px;\n}\n\ndiv.key-inner {\n  height: 100%;\n  width: 100%;\n  padding-top: 2px;\n  padding-bottom: 2px;\n  padding-left: 4px;\n  padding-right: 4px;\n  border: 2px;\n  border-radius: 4px;\n  border-style: outset;\n  border-color: var(--divider-color);\n  font-family: monospace;\n  text-transform: capitalize;\n}\n\ndiv.unassigned {\n  font-style: italic;\n}\n\ndiv.key + div.key:before {\n  display: flex;\n  align-items: center;\n  margin-right: 5px;\n  content: \" + \";\n}";

let AdvancedCameraCardKeyAssigner = class AdvancedCameraCardKeyAssigner extends s {
    constructor() {
        super(...arguments);
        this._controller = new KeyAssignerController(this);
    }
    willUpdate(changedProps) {
        if (changedProps.has('value')) {
            this._controller.setValue(this.value ?? null);
        }
    }
    render() {
        if (!this.label) {
            return;
        }
        const renderKey = (key) => {
            return x `<div class="key">
        <div class="key-inner">${key}</div>
      </div>`;
        };
        return x `
      <div class="label">${this.label}</div>
      <ha-button
        title="${localize('key_assigner.assign')}"
        aria-label="${localize('key_assigner.assign')}"
        class="assign"
        @click=${() => {
            this._controller.toggleAssigning();
        }}
      >
        <advanced-camera-card-icon
          .icon=${{ icon: 'mdi:keyboard-settings' }}>
        </advanced-camera-card-icon>
      </ha-button>
      ${this._controller.hasValue()
            ? x `<ha-button
              title="${localize('key_assigner.unassign')}"
              aria-label="${localize('key_assigner.unassign')}"
              @click=${() => {
                this._controller.setValue(null);
            }}
            >
              <advanced-camera-card-icon
                .icon=${{ icon: 'mdi:keyboard-off' }}
              ></advanced-camera-card-icon>
            </ha-button>`
            : ''}
      <div class="key-row">
        ${this.value?.ctrl ? renderKey(localize('key_assigner.modifiers.ctrl')) : ''}
        ${this.value?.shift ? renderKey(localize('key_assigner.modifiers.shift')) : ''}
        ${this.value?.meta ? renderKey(localize('key_assigner.modifiers.meta')) : ''}
        ${this.value?.alt ? renderKey(localize('key_assigner.modifiers.alt')) : ''}
        ${this.value?.key ? renderKey(this.value.key) : ''}
      </div>
      </span>`;
    }
    static get styles() {
        return r(css$1);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardKeyAssigner.prototype, "label", void 0);
__decorate([
    n({ attribute: false })
], AdvancedCameraCardKeyAssigner.prototype, "value", void 0);
AdvancedCameraCardKeyAssigner = __decorate([
    t('advanced-camera-card-key-assigner')
], AdvancedCameraCardKeyAssigner);

/**
 * Get entities from the HASS object.
 * @param hass
 * @param domain
 * @returns A list of entities ids.
 */
const getEntitiesFromHASS = (hass, domain) => {
    const entities = Object.keys(hass.states).filter((eid) => !domain || eid.substring(0, eid.indexOf('.')) === domain);
    return entities.sort();
};

var css = "ha-icon-button {\n  color: var(--advanced-camera-card-button-color);\n  background-color: var(--advanced-camera-card-button-background);\n  border-radius: var(--advanced-camera-card-button-border-radius);\n  padding: 0px;\n  margin: 3px;\n  --ha-icon-display: block;\n  /* Buttons can always be clicked */\n  pointer-events: auto;\n}\n\n.option {\n  padding: 8px 4px;\n  cursor: pointer;\n}\n\n.option.option-overrides .title {\n  color: var(--warning-color);\n}\n\n.row {\n  display: flex;\n  margin-bottom: -14px;\n  pointer-events: none;\n}\n\n.title {\n  padding-left: 16px;\n  margin-top: -6px;\n  pointer-events: none;\n}\n\n.title.warning {\n  color: var(--warning-color);\n}\n\n.secondary {\n  padding-left: 40px;\n  color: var(--secondary-text-color);\n  pointer-events: none;\n}\n\n.values {\n  background: var(--secondary-background-color);\n  display: grid;\n  grid-template-columns: minmax(0, 1fr);\n}\n\n.values + .option,\n.submenu + .option {\n  margin-top: 10px;\n}\n\ndiv.upgrade {\n  width: auto;\n  border: 1px dotted var(--primary-color);\n  margin: 10px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\ndiv.upgrade span {\n  padding: 10px;\n}\n\n.submenu-header {\n  display: flex;\n  padding: 10px;\n  cursor: pointer;\n}\n\n.submenu.selected > .submenu-header {\n  background-color: var(--primary-color);\n  color: var(--primary-text-color);\n}\n\n.submenu-header * {\n  flex-basis: auto;\n  pointer-events: none;\n}\n\n.submenu-header .new {\n  font-style: italic;\n}\n\n.submenu:not(.selected) > .submenu-header .new {\n  color: var(--secondary-text-color, \"black\");\n}\n\n.submenu-header advanced-camera-card-icon {\n  margin-right: 15px;\n}\n\n.submenu.selected {\n  border: 1px solid var(--primary-color);\n}\n\n.submenu {\n  width: calc(100% - 20px);\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 10px;\n}\n\n.submenu:first-child,\n:not(.submenu) + .submenu {\n  margin-top: 10px;\n}\n\n.submenu .values .controls {\n  display: inline-block;\n  margin-left: auto;\n  margin-right: 0px;\n  margin-bottom: 5px;\n  margin-top: 5px;\n}\n\n.submenu .values .controls ha-icon-button {\n  --ha-icon-button-size: 32px;\n  --mdc-icon-size: calc(var(--ha-icon-button-size) / 2);\n}\n\nspan.info {\n  padding: 10px;\n}\n\nha-selector {\n  padding: 10px;\n  border: 1px solid var(--divider-color);\n}\n\nadvanced-camera-card-message::part(icon) {\n  color: var(--primary-color);\n}";

const MENU_CAMERAS = 'cameras';
const MENU_CAMERAS_CAPABILITIES = 'cameras.capabilities';
const MENU_CAMERAS_CAST = 'cameras.cast';
const MENU_CAMERAS_DEPENDENCIES = 'cameras.dependencies';
const MENU_CAMERAS_DIMENSIONS = 'cameras.dimensions';
const MENU_CAMERAS_DIMENSIONS_LAYOUT = 'cameras.dimensions.layout';
const MENU_CAMERAS_ENGINE = 'cameras.engine';
const MENU_CAMERAS_FRIGATE = 'cameras.frigate';
const MENU_CAMERAS_GO2RTC = 'cameras.go2rtc';
const MENU_CAMERAS_IMAGE = 'cameras.image';
const MENU_CAMERAS_LIVE_PROVIDER = 'cameras.live_provider';
const MENU_CAMERAS_MOTIONEYE = 'cameras.motioneye';
const MENU_CAMERAS_PROXY = 'cameras.proxy';
const MENU_CAMERAS_REOLINK = 'cameras.reolink';
const MENU_CAMERAS_TRIGGERS = 'cameras.triggers';
const MENU_CAMERAS_WEBRTC_CARD = 'cameras.webrtc_card';
const MENU_FOLDERS = 'folders';
const MENU_FOLDERS_HA = 'folders.ha';
const MENU_LIVE_CONTROLS = 'live.controls';
const MENU_LIVE_CONTROLS_NEXT_PREVIOUS = 'live.controls.next_previous';
const MENU_LIVE_CONTROLS_PTZ = 'live.controls.ptz';
const MENU_LIVE_CONTROLS_THUMBNAILS = 'live.controls.thumbnails';
const MENU_LIVE_CONTROLS_TIMELINE = 'live.controls.timeline';
const MENU_LIVE_DISPLAY = 'live.display';
const MENU_LIVE_MICROPHONE = 'live.microphone';
const MENU_MEDIA_GALLERY_CONTROLS_FILTER = 'media_gallery.controls.filter';
const MENU_MEDIA_GALLERY_CONTROLS_THUMBNAILS = 'media_gallery.controls.thumbnails';
const MENU_MEDIA_VIEWER_CONTROLS = 'media_viewer.controls';
const MENU_MEDIA_VIEWER_CONTROLS_NEXT_PREVIOUS = 'media_viewer.controls.next_previous';
const MENU_MEDIA_VIEWER_CONTROLS_THUMBNAILS = 'media_viewer.controls.thumbnails';
const MENU_MEDIA_VIEWER_CONTROLS_TIMELINE = 'media_viewer.controls.timeline';
const MENU_MEDIA_VIEWER_DISPLAY = 'media_viewer.display';
const MENU_MENU_BUTTONS = 'menu.buttons';
const MENU_OPTIONS = 'options';
const MENU_PERFORMANCE_FEATURES = 'performance.features';
const MENU_PERFORMANCE_STYLE = 'performance.style';
const MENU_REMOTE_CONTROL_ENTITIES = 'remote_control.entities';
const MENU_STATUS_BAR_ITEMS = 'status_bar.items';
const MENU_TIMELINE_FORMAT = 'timeline.format';
const MENU_TIMELINE_CONTROLS_THUMBNAILS = 'timeline.controls.thumbnails';
const MENU_VIEW_DEFAULT_RESET = 'view.default_reset';
const MENU_VIEW_KEYBOARD_SHORTCUTS = 'view.keyboard_shortcuts';
const MENU_VIEW_TRIGGERS = 'view.triggers';
const MENU_VIEW_TRIGGERS_ACTIONS = 'view.triggers.actions';
const options = {
    cameras: {
        icon: 'video',
        name: localize('editor.cameras'),
        secondary: localize('editor.cameras_secondary'),
    },
    view: {
        icon: 'eye',
        name: localize('editor.view'),
        secondary: localize('editor.view_secondary'),
    },
    menu: {
        icon: 'menu',
        name: localize('editor.menu'),
        secondary: localize('editor.menu_secondary'),
    },
    status_bar: {
        icon: 'sign-text',
        name: localize('editor.status_bar'),
        secondary: localize('editor.status_bar_secondary'),
    },
    live: {
        icon: 'cctv',
        name: localize('editor.live'),
        secondary: localize('editor.live_secondary'),
    },
    folders: {
        icon: 'folder-multiple',
        name: localize('editor.folders'),
        secondary: localize('editor.folders'),
    },
    media_gallery: {
        icon: 'grid',
        name: localize('editor.media_gallery'),
        secondary: localize('editor.media_gallery_secondary'),
    },
    media_viewer: {
        icon: 'filmstrip',
        name: localize('editor.media_viewer'),
        secondary: localize('editor.media_viewer_secondary'),
    },
    image: {
        icon: 'image',
        name: localize('editor.image'),
        secondary: localize('editor.image_secondary'),
    },
    timeline: {
        icon: 'chart-gantt',
        name: localize('editor.timeline'),
        secondary: localize('editor.timeline_secondary'),
    },
    dimensions: {
        icon: 'aspect-ratio',
        name: localize('editor.dimensions'),
        secondary: localize('editor.dimensions_secondary'),
    },
    performance: {
        icon: 'speedometer',
        name: localize('editor.performance'),
        secondary: localize('editor.performance_secondary'),
    },
    profiles: {
        icon: 'folder-wrench-outline',
        name: localize('editor.profiles'),
        secondary: localize('editor.profiles_secondary'),
    },
    remote_control: {
        icon: 'remote',
        name: localize('editor.remote_control'),
        secondary: localize('editor.remote_control_secondary'),
    },
    overrides: {
        icon: 'file-replace',
        name: localize('editor.overrides'),
        secondary: localize('editor.overrides_secondary'),
    },
};
let AdvancedCameraCardEditor = class AdvancedCameraCardEditor extends s {
    constructor() {
        super(...arguments);
        this._defaults = copyConfig(configDefaults);
        this._initialized = false;
        this._configUpgradeable = false;
        this._expandedMenus = {};
        this._viewModes = [
            { value: '', label: '' },
            { value: 'clip', label: localize('config.view.views.clip') },
            { value: 'clips', label: localize('config.view.views.clips') },
            { value: 'folder', label: localize('config.view.views.folder') },
            { value: 'folders', label: localize('config.view.views.folders') },
            { value: 'image', label: localize('config.view.views.image') },
            { value: 'live', label: localize('config.view.views.live') },
            { value: 'recording', label: localize('config.view.views.recording') },
            { value: 'recordings', label: localize('config.view.views.recordings') },
            { value: 'snapshot', label: localize('config.view.views.snapshot') },
            { value: 'snapshots', label: localize('config.view.views.snapshots') },
            { value: 'timeline', label: localize('config.view.views.timeline') },
        ];
        this._cameraSelectViewModes = [
            ...this._viewModes,
            { value: 'current', label: localize('config.view.views.current') },
        ];
        this._filterModes = [
            { value: '', label: '' },
            {
                value: 'none',
                label: localize('config.common.controls.filter.modes.none'),
            },
            {
                value: 'left',
                label: localize('config.common.controls.filter.modes.left'),
            },
            {
                value: 'right',
                label: localize('config.common.controls.filter.modes.right'),
            },
        ];
        this._menuStyles = [
            { value: '', label: '' },
            { value: 'none', label: localize('config.menu.styles.none') },
            { value: 'hidden', label: localize('config.menu.styles.hidden') },
            { value: 'overlay', label: localize('config.menu.styles.overlay') },
            { value: 'hover', label: localize('config.menu.styles.hover') },
            { value: 'hover-card', label: localize('config.menu.styles.hover-card') },
            { value: 'outside', label: localize('config.menu.styles.outside') },
        ];
        this._menuPositions = [
            { value: '', label: '' },
            { value: 'left', label: localize('config.menu.positions.left') },
            { value: 'right', label: localize('config.menu.positions.right') },
            { value: 'top', label: localize('config.menu.positions.top') },
            { value: 'bottom', label: localize('config.menu.positions.bottom') },
        ];
        this._menuAlignments = [
            { value: '', label: '' },
            { value: 'left', label: localize('config.menu.alignments.left') },
            { value: 'right', label: localize('config.menu.alignments.right') },
            { value: 'top', label: localize('config.menu.alignments.top') },
            { value: 'bottom', label: localize('config.menu.alignments.bottom') },
        ];
        this._nextPreviousControlStyles = [
            { value: '', label: '' },
            {
                value: 'chevrons',
                label: localize('config.common.controls.next_previous.styles.chevrons'),
            },
            {
                value: 'icons',
                label: localize('config.common.controls.next_previous.styles.icons'),
            },
            {
                value: 'none',
                label: localize('config.common.controls.next_previous.styles.none'),
            },
            {
                value: 'thumbnails',
                label: localize('config.common.controls.next_previous.styles.thumbnails'),
            },
        ];
        this._aspectRatioModes = [
            { value: '', label: '' },
            {
                value: 'dynamic',
                label: localize('config.dimensions.aspect_ratio_modes.dynamic'),
            },
            { value: 'static', label: localize('config.dimensions.aspect_ratio_modes.static') },
            {
                value: 'unconstrained',
                label: localize('config.dimensions.aspect_ratio_modes.unconstrained'),
            },
        ];
        this._thumbnailModes = [
            { value: '', label: '' },
            {
                value: 'none',
                label: localize('config.common.controls.thumbnails.modes.none'),
            },
            {
                value: 'above',
                label: localize('config.common.controls.thumbnails.modes.above'),
            },
            {
                value: 'below',
                label: localize('config.common.controls.thumbnails.modes.below'),
            },
            {
                value: 'left',
                label: localize('config.common.controls.thumbnails.modes.left'),
            },
            {
                value: 'right',
                label: localize('config.common.controls.thumbnails.modes.right'),
            },
        ];
        this._thumbnailMediaTypes = [
            { value: '', label: '' },
            {
                value: 'events',
                label: localize('config.common.controls.thumbnails.media_types.events'),
            },
            {
                value: 'recordings',
                label: localize('config.common.controls.thumbnails.media_types.recordings'),
            },
        ];
        this._thumbnailEventsMediaTypes = [
            { value: '', label: '' },
            {
                value: 'clips',
                label: localize('config.common.controls.thumbnails.events_media_types.clips'),
            },
            {
                value: 'snapshots',
                label: localize('config.common.controls.thumbnails.events_media_types.snapshots'),
            },
        ];
        this._transitionEffects = [
            { value: '', label: '' },
            { value: 'none', label: localize('config.media_viewer.transition_effects.none') },
            { value: 'slide', label: localize('config.media_viewer.transition_effects.slide') },
        ];
        this._imageModes = [
            { value: '', label: '' },
            { value: 'camera', label: localize('config.common.image.modes.camera') },
            { value: 'entity', label: localize('config.common.image.modes.entity') },
            { value: 'screensaver', label: localize('config.common.image.modes.screensaver') },
            { value: 'url', label: localize('config.common.image.modes.url') },
        ];
        this._timelineEventsMediaTypes = [
            { value: '', label: '' },
            { value: 'all', label: localize('config.common.timeline.events_media_types.all') },
            {
                value: 'clips',
                label: localize('config.common.timeline.events_media_types.clips'),
            },
            {
                value: 'snapshots',
                label: localize('config.common.timeline.events_media_types.snapshots'),
            },
        ];
        this._timelineStyleTypes = [
            { value: '', label: '' },
            { value: 'ribbon', label: localize('config.common.timeline.styles.ribbon') },
            { value: 'stack', label: localize('config.common.timeline.styles.stack') },
        ];
        this._mediaActionNegativeConditions = [
            { value: '', label: '' },
            {
                value: 'unselected',
                label: localize('config.common.media_action_conditions.unselected'),
            },
            { value: 'hidden', label: localize('config.common.media_action_conditions.hidden') },
        ];
        this._mediaActionPositiveConditions = [
            { value: '', label: '' },
            {
                value: 'selected',
                label: localize('config.common.media_action_conditions.selected'),
            },
            {
                value: 'visible',
                label: localize('config.common.media_action_conditions.visible'),
            },
        ];
        this._mediaLiveUnmuteConditions = [
            ...this._mediaActionPositiveConditions,
            {
                value: 'microphone',
                label: localize('config.common.media_action_conditions.microphone_unmute'),
            },
        ];
        this._mediaLiveMuteConditions = [
            ...this._mediaActionNegativeConditions,
            {
                value: 'microphone',
                label: localize('config.common.media_action_conditions.microphone_mute'),
            },
        ];
        this._layoutFits = [
            { value: '', label: '' },
            {
                value: 'contain',
                label: localize('config.cameras.dimensions.layout.fits.contain'),
            },
            { value: 'cover', label: localize('config.cameras.dimensions.layout.fits.cover') },
            { value: 'fill', label: localize('config.cameras.dimensions.layout.fits.fill') },
        ];
        this._miniTimelineModes = [
            { value: '', label: '' },
            { value: 'none', label: localize('config.common.controls.timeline.modes.none') },
            { value: 'above', label: localize('config.common.controls.timeline.modes.above') },
            { value: 'below', label: localize('config.common.controls.timeline.modes.below') },
        ];
        this._profiles = [
            { value: '', label: '' },
            { value: 'casting', label: localize('config.profiles.casting') },
            { value: 'low-performance', label: localize('config.profiles.low-performance') },
            { value: 'scrubbing', label: localize('config.profiles.scrubbing') },
        ];
        this._go2rtcModes = [
            { value: '', label: '' },
            { value: 'mse', label: localize('config.cameras.go2rtc.modes.mse') },
            { value: 'webrtc', label: localize('config.cameras.go2rtc.modes.webrtc') },
            { value: 'mp4', label: localize('config.cameras.go2rtc.modes.mp4') },
            { value: 'mjpeg', label: localize('config.cameras.go2rtc.modes.mjpeg') },
        ];
        this._microphoneButtonTypes = [
            { value: '', label: '' },
            { value: 'momentary', label: localize('config.menu.buttons.types.momentary') },
            { value: 'toggle', label: localize('config.menu.buttons.types.toggle') },
        ];
        this._displayModes = [
            { value: '', label: '' },
            { value: 'single', label: localize('display_modes.single') },
            { value: 'grid', label: localize('display_modes.grid') },
        ];
        this._gridSelectPositions = [
            { value: '', label: '' },
            {
                value: 'default',
                label: localize('config.common.display.grid_selected_positions.default'),
            },
            {
                value: 'first',
                label: localize('config.common.display.grid_selected_positions.first'),
            },
            {
                value: 'last',
                label: localize('config.common.display.grid_selected_positions.last'),
            },
        ];
        this._castMethods = [
            { value: '', label: '' },
            { value: 'standard', label: localize('config.cameras.cast.methods.standard') },
            { value: 'dashboard', label: localize('config.cameras.cast.methods.dashboard') },
        ];
        this._ptzModes = [
            { value: '', label: '' },
            { value: 'on', label: localize('config.live.controls.ptz.modes.on') },
            { value: 'off', label: localize('config.live.controls.ptz.modes.off') },
        ];
        this._ptzOrientations = [
            { value: '', label: '' },
            {
                value: 'vertical',
                label: localize('config.live.controls.ptz.orientations.vertical'),
            },
            {
                value: 'horizontal',
                label: localize('config.live.controls.ptz.orientations.horizontal'),
            },
        ];
        this._ptzPositions = [
            { value: '', label: '' },
            {
                value: 'top-left',
                label: localize('config.live.controls.ptz.positions.top-left'),
            },
            {
                value: 'top-right',
                label: localize('config.live.controls.ptz.positions.top-right'),
            },
            {
                value: 'bottom-left',
                label: localize('config.live.controls.ptz.positions.bottom-left'),
            },
            {
                value: 'bottom-right',
                label: localize('config.live.controls.ptz.positions.bottom-right'),
            },
        ];
        this._triggersActionsInteractionModes = [
            { value: '', label: '' },
            {
                value: 'all',
                label: localize('config.view.triggers.actions.interaction_modes.all'),
            },
            {
                value: 'inactive',
                label: localize('config.view.triggers.actions.interaction_modes.inactive'),
            },
            {
                value: 'active',
                label: localize('config.view.triggers.actions.interaction_modes.active'),
            },
        ];
        this._triggersActionsTrigger = [
            { value: '', label: '' },
            {
                value: 'default',
                label: localize('config.view.triggers.actions.triggers.default'),
            },
            {
                value: 'live',
                label: localize('config.view.triggers.actions.triggers.live'),
            },
            {
                value: 'media',
                label: localize('config.view.triggers.actions.triggers.media'),
            },
            {
                value: 'none',
                label: localize('config.view.triggers.actions.triggers.none'),
            },
        ];
        this._triggersActionsUntrigger = [
            { value: '', label: '' },
            {
                value: 'default',
                label: localize('config.view.triggers.actions.untriggers.default'),
            },
            {
                value: 'none',
                label: localize('config.view.triggers.actions.untriggers.none'),
            },
        ];
        this._triggersEvents = [
            { value: '', label: '' },
            {
                value: 'events',
                label: localize('config.cameras.triggers.events.events'),
            },
            {
                value: 'clips',
                label: localize('config.cameras.triggers.events.clips'),
            },
            {
                value: 'snapshots',
                label: localize('config.cameras.triggers.events.snapshots'),
            },
        ];
        this._timelinePanModes = [
            { value: '', label: '' },
            {
                value: 'pan',
                label: localize('config.common.controls.timeline.pan_modes.pan'),
            },
            {
                value: 'seek',
                label: localize('config.common.controls.timeline.pan_modes.seek'),
            },
            {
                value: 'seek-in-media',
                label: localize('config.common.controls.timeline.pan_modes.seek-in-media'),
            },
            {
                value: 'seek-in-camera',
                label: localize('config.common.controls.timeline.pan_modes.seek-in-camera'),
            },
        ];
        this._capabilities = [
            { value: '', label: '' },
            {
                value: 'live',
                label: localize('config.cameras.capabilities.capabilities.live'),
            },
            {
                value: 'substream',
                label: localize('config.cameras.capabilities.capabilities.substream'),
            },
            {
                value: 'clips',
                label: localize('config.cameras.capabilities.capabilities.clips'),
            },
            {
                value: 'recordings',
                label: localize('config.cameras.capabilities.capabilities.recordings'),
            },
            {
                value: 'snapshots',
                label: localize('config.cameras.capabilities.capabilities.snapshots'),
            },
            {
                value: 'favorite-events',
                label: localize('config.cameras.capabilities.capabilities.favorite-events'),
            },
            {
                value: 'favorite-recordings',
                label: localize('config.cameras.capabilities.capabilities.favorite-recordings'),
            },
            {
                value: 'seek',
                label: localize('config.cameras.capabilities.capabilities.seek'),
            },
            {
                value: 'ptz',
                label: localize('config.cameras.capabilities.capabilities.ptz'),
            },
            {
                value: 'menu',
                label: localize('config.cameras.capabilities.capabilities.menu'),
            },
        ];
        this._defaultResetInteractionModes = [
            { value: '', label: '' },
            {
                value: 'all',
                label: localize('config.view.default_reset.interaction_modes.all'),
            },
            {
                value: 'inactive',
                label: localize('config.view.default_reset.interaction_modes.inactive'),
            },
            {
                value: 'active',
                label: localize('config.view.default_reset.interaction_modes.active'),
            },
        ];
        this._proxyModes = [
            { value: '', label: '' },
            {
                value: 'auto',
                label: localize('config.cameras.proxy.modes.auto'),
            },
            {
                value: true,
                label: localize('config.cameras.proxy.modes.true'),
            },
            {
                value: false,
                label: localize('config.cameras.proxy.modes.false'),
            },
        ];
        this._proxySSLCiphers = [
            { value: '', label: '' },
            {
                value: 'auto',
                label: localize('config.cameras.proxy.ssl_ciphers.auto'),
            },
            {
                value: 'default',
                label: localize('config.cameras.proxy.ssl_ciphers.default'),
            },
            {
                value: 'insecure',
                label: localize('config.cameras.proxy.ssl_ciphers.insecure'),
            },
            {
                value: 'intermediate',
                label: localize('config.cameras.proxy.ssl_ciphers.intermediate'),
            },
            {
                value: 'modern',
                label: localize('config.cameras.proxy.ssl_ciphers.modern'),
            },
        ];
        this._proxySSLVerification = [
            { value: '', label: '' },
            {
                value: 'auto',
                label: localize('config.cameras.proxy.ssl_verification.auto'),
            },
            {
                value: true,
                label: localize('config.cameras.proxy.ssl_verification.true'),
            },
            {
                value: false,
                label: localize('config.cameras.proxy.ssl_verification.false'),
            },
        ];
        this._reolinkMediaResolution = [
            { value: '', label: '' },
            {
                value: 'high',
                label: localize('config.cameras.reolink.media_resolution.high'),
            },
            {
                value: 'low',
                label: localize('config.cameras.reolink.media_resolution.low'),
            },
        ];
        this._statusBarStyles = [
            { value: '', label: '' },
            { value: 'hover', label: localize('config.status_bar.styles.hover') },
            { value: 'hover-card', label: localize('config.status_bar.styles.hover-card') },
            { value: 'none', label: localize('config.status_bar.styles.none') },
            { value: 'outside', label: localize('config.status_bar.styles.outside') },
            { value: 'overlay', label: localize('config.status_bar.styles.overlay') },
            { value: 'popup', label: localize('config.status_bar.styles.popup') },
        ];
        this._statusBarPositions = [
            { value: '', label: '' },
            { value: 'top', label: localize('config.status_bar.positions.top') },
            { value: 'bottom', label: localize('config.status_bar.positions.bottom') },
        ];
        this._themes = [
            { value: '', label: '' },
            { value: 'ha', label: localize('config.view.theme.themes.ha') },
            { value: 'dark', label: localize('config.view.theme.themes.dark') },
            { value: 'light', label: localize('config.view.theme.themes.light') },
            { value: 'traditional', label: localize('config.view.theme.themes.traditional') },
        ];
        this._rotations = [
            { value: '', label: '' },
            { value: 0, label: localize('config.cameras.dimensions.rotations.0') },
            { value: 90, label: localize('config.cameras.dimensions.rotations.90') },
            { value: 180, label: localize('config.cameras.dimensions.rotations.180') },
            { value: 270, label: localize('config.cameras.dimensions.rotations.270') },
        ];
    }
    setConfig(config) {
        // Note: This does not use Zod to parse the full configuration, so it may be
        // partially or completely invalid. It's more useful to have a partially
        // valid configuration here, to allow the user to fix the broken parts. As
        // such, RawAdvancedCameraCardConfig is used as the type.
        this._config = config;
        this._configUpgradeable = isConfigUpgradeable(config);
        const profiles = profilesSchema.safeParse(this._config.profiles);
        if (profiles.success) {
            const defaults = copyConfig(configDefaults);
            setProfiles(this._config, defaults, profiles.data);
            this._defaults = defaults;
        }
    }
    willUpdate() {
        if (!this._initialized) {
            sideLoadHomeAssistantElements().then((success) => {
                if (success) {
                    this._initialized = true;
                }
            });
        }
    }
    /**
     * Render an option set header
     * @param optionSetName The name of the EditorOptionsSet.
     * @returns A rendered template.
     */
    _renderOptionSetHeader(optionSetName, titleClass) {
        const optionSet = options[optionSetName];
        return x `
      <div
        class="option option-${optionSetName}"
        @click=${this._toggleMenu}
        .domain=${'options'}
        .key=${optionSetName}
      >
        <div class="row">
          <advanced-camera-card-icon
            .icon=${{ icon: `mdi:${optionSet.icon}` }}
          ></advanced-camera-card-icon>
          <div class="title ${titleClass ?? ''}">${optionSet.name}</div>
        </div>
        <div class="secondary">${optionSet.secondary}</div>
      </div>
    `;
    }
    /**
     * Get a localized help label for a given config path.
     * @param configPath The config path.
     * @returns A localized label.
     */
    _getLabel(configPath) {
        // Strip out array indices from the path.
        const path = configPath
            .split('.')
            .filter((e) => !e.match(/^\[[0-9]+\]$/))
            .join('.');
        return localize(`config.${path}`);
    }
    /**
     * Render an entity selector.
     * @param configPath The configuration path to set/read.
     * @param domain Only entities from this domain will be shown.
     * @returns A rendered template.
     */
    _renderEntitySelector(configPath, domain) {
        if (!this._config) {
            return;
        }
        return x `
      <ha-selector
        .hass=${this.hass}
        .selector=${{ entity: { domain: domain } }}
        .label=${this._getLabel(configPath)}
        .value=${getConfigValue(this._config, configPath, '')}
        .required=${false}
        @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
      >
      </ha-selector>
    `;
    }
    /**
     * Render an option/"select" selector.
     * @param configPath The configuration path to set/read.
     * @param options The options to show in the selector.
     * @param params Option parameters to control the selector.
     * @returns A rendered template.
     */
    _renderOptionSelector(configPath, options = [], params) {
        if (!this._config) {
            return;
        }
        return x `
      <ha-selector
        .hass=${this.hass}
        .selector=${{
            select: {
                mode: 'dropdown',
                multiple: !!params?.multiple,
                custom_value: !options.length,
                options: options,
            },
        }}
        .label=${params?.label || this._getLabel(configPath)}
        .value=${getConfigValue(this._config, configPath, '')}
        .required=${false}
        @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
      >
      </ha-selector>
    `;
    }
    /**
     * Render an icon selector.
     * @param configPath The configuration path to set/read.
     * @param params Optional parameters to control the selector.
     * @returns A rendered template.
     */
    _renderIconSelector(configPath, params) {
        if (!this._config) {
            return;
        }
        return x `
      <ha-selector
        .hass=${this.hass}
        .selector=${{
            icon: {},
        }}
        .label=${params?.label || this._getLabel(configPath)}
        .value=${getConfigValue(this._config, configPath, '')}
        .required=${false}
        @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
      >
      </ha-selector>
    `;
    }
    /**
     * Render a number slider.
     * @param configPath Configuration path of the variable.
     * @param params Optional parameters to control the selector.
     * @returns A rendered template.
     */
    _renderNumberInput(configPath, params) {
        if (!this._config) {
            return;
        }
        const value = getConfigValue(this._config, configPath);
        const mode = params?.max === undefined ? 'box' : 'slider';
        return x `
      <ha-selector
        .hass=${this.hass}
        .selector=${{
            number: {
                min: params?.min || 0,
                max: params?.max,
                mode: mode,
                step: params?.step,
            },
        }}
        .label=${params?.label || this._getLabel(configPath)}
        .value=${value ?? params?.default}
        .required=${false}
        @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
      >
      </ha-selector>
    `;
    }
    /**
     * Render a simple text info box.
     * @param info The string to display.
     * @returns A rendered template.
     */
    _renderInfo(info) {
        return x ` <span class="info">${info}</span>`;
    }
    /**
     * Get an editor title for the camera.
     * @param cameraIndex The index of the camera in the cameras array.
     * @param cameraConfig The raw camera configuration object.
     * @returns A string title.
     */
    _getEditorCameraTitle(cameraIndex, cameraConfig) {
        // Attempt to render a recognizable name for the camera, starting with the
        // most likely to be useful and working our ways towards the least useful.
        // This is only used for the editor since the card itself can use the
        // cameraManager.
        return ((typeof cameraConfig?.title === 'string' && cameraConfig.title) ||
            (typeof cameraConfig?.camera_entity === 'string'
                ? getEntityTitle(this.hass, cameraConfig.camera_entity)
                : '') ||
            (typeof cameraConfig?.webrtc_card === 'object' &&
                cameraConfig.webrtc_card &&
                typeof cameraConfig.webrtc_card['entity'] === 'string' &&
                cameraConfig.webrtc_card['entity']) ||
            // Usage of engine specific logic here is allowed as an exception, since
            // the camera manager cannot be started with an unparsed and unloaded
            // config.
            (typeof cameraConfig?.frigate === 'object' &&
                cameraConfig.frigate &&
                typeof cameraConfig?.frigate['camera_name'] === 'string' &&
                cameraConfig.frigate['camera_name']
                ? prettifyTitle(cameraConfig.frigate['camera_name'])
                : '') ||
            (typeof cameraConfig?.id === 'string' && cameraConfig.id) ||
            localize('editor.camera') + ' #' + cameraIndex);
    }
    /**
     * Get an editor title for the camera.
     * @param cameraIndex The index of the camera in the cameras array.
     * @param cameraConfig The raw camera configuration object.
     * @returns A string title.
     */
    _getEditorFolderTitle(folderIndex, folderConfig) {
        // Attempt to render a recognizable name for the camera, starting with the
        // most likely to be useful and working our ways towards the least useful.
        // This is only used for the editor since the card itself can use the
        // cameraManager.
        return ((typeof folderConfig?.title === 'string' && folderConfig.title) ||
            (typeof folderConfig?.id === 'string' && folderConfig.id) ||
            localize('common.folder') + ' #' + folderIndex);
    }
    _renderViewDefaultResetMenu() {
        return this._putInSubmenu(MENU_VIEW_DEFAULT_RESET, true, `config.${CONF_VIEW_DEFAULT_RESET}.editor_label`, 'mdi:restart', x `
        ${this._renderSwitch(CONF_VIEW_DEFAULT_RESET_AFTER_INTERACTION, this._defaults.view.default_reset.after_interaction)}
        ${this._renderNumberInput(CONF_VIEW_DEFAULT_RESET_EVERY_SECONDS)}
        ${this._renderOptionSelector(CONF_VIEW_DEFAULT_RESET_INTERACTION_MODE, this._defaultResetInteractionModes, {
            label: localize('config.view.default_reset.interaction_mode'),
        })},
        ${this._renderOptionSelector(CONF_VIEW_DEFAULT_RESET_ENTITIES, this.hass ? getEntitiesFromHASS(this.hass) : [], {
            multiple: true,
        })}
      `);
    }
    _renderViewTriggersMenu() {
        return this._putInSubmenu(MENU_VIEW_TRIGGERS, true, `config.${CONF_VIEW_TRIGGERS}.editor_label`, 'mdi:target-account', x `
        ${this._renderSwitch(CONF_VIEW_TRIGGERS_FILTER_SELECTED_CAMERA, this._defaults.view.triggers.filter_selected_camera, {
            label: localize(`config.${CONF_VIEW_TRIGGERS_FILTER_SELECTED_CAMERA}`),
        })}
        ${this._renderSwitch(CONF_VIEW_TRIGGERS_SHOW_TRIGGER_STATUS, this._defaults.view.triggers.show_trigger_status, {
            label: localize(`config.${CONF_VIEW_TRIGGERS_SHOW_TRIGGER_STATUS}`),
        })}
        ${this._renderNumberInput(CONF_VIEW_TRIGGERS_UNTRIGGER_SECONDS, {
            default: this._defaults.view.triggers.untrigger_seconds,
        })}
        ${this._putInSubmenu(MENU_VIEW_TRIGGERS_ACTIONS, true, `config.${CONF_VIEW_TRIGGERS_ACTIONS}.editor_label`, 'mdi:cogs', x ` ${this._renderOptionSelector(CONF_VIEW_TRIGGERS_ACTIONS_TRIGGER, this._triggersActionsTrigger, {
            label: localize('config.view.triggers.actions.trigger'),
        })}
          ${this._renderOptionSelector(CONF_VIEW_TRIGGERS_ACTIONS_UNTRIGGER, this._triggersActionsUntrigger, {
            label: localize('config.view.triggers.actions.untrigger'),
        })}
          ${this._renderOptionSelector(CONF_VIEW_TRIGGERS_ACTIONS_INTERACTION_MODE, this._triggersActionsInteractionModes, {
            label: localize('config.view.triggers.actions.interaction_mode'),
        })}`)}
      `);
    }
    _renderKeyAssigner(configPath, defaultValue) {
        return x ` <advanced-camera-card-key-assigner
      .label=${localize(`config.${configPath}`)}
      .value=${this._config
            ? getConfigValue(this._config, configPath, defaultValue)
            : null}
      @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
    ></advanced-camera-card-key-assigner>`;
    }
    _renderViewKeyboardShortcutMenu() {
        return this._putInSubmenu(MENU_VIEW_KEYBOARD_SHORTCUTS, true, `config.${CONF_VIEW_KEYBOARD_SHORTCUTS}.editor_label`, 'mdi:keyboard', x `
        ${this._renderSwitch(CONF_VIEW_KEYBOARD_SHORTCUTS_ENABLED, this._defaults.view.keyboard_shortcuts.enabled, {
            label: localize(`config.${CONF_VIEW_KEYBOARD_SHORTCUTS_ENABLED}`),
        })}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_LEFT, this._defaults.view.keyboard_shortcuts.ptz_left)}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_RIGHT, this._defaults.view.keyboard_shortcuts.ptz_right)}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_UP, this._defaults.view.keyboard_shortcuts.ptz_up)}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_DOWN, this._defaults.view.keyboard_shortcuts.ptz_down)}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_ZOOM_IN, this._defaults.view.keyboard_shortcuts.ptz_zoom_in)}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_ZOOM_OUT, this._defaults.view.keyboard_shortcuts.ptz_zoom_out)}
        ${this._renderKeyAssigner(CONF_VIEW_KEYBOARD_SHORTCUTS_PTZ_HOME, this._defaults.view.keyboard_shortcuts.ptz_home)}
      `);
    }
    _renderStatusBarItem(item) {
        return x ` ${this._putInSubmenu(MENU_STATUS_BAR_ITEMS, item, `config.status_bar.items.${item}`, 'mdi:feature-search', x `
        ${this._renderSwitch(`${CONF_STATUS_BAR_ITEMS}.${item}.enabled`, this._defaults.status_bar.items[item]?.enabled ?? true, {
            label: localize('config.status_bar.items.enabled'),
        })}
        ${this._renderNumberInput(`${CONF_STATUS_BAR_ITEMS}.${item}.priority`, {
            max: STATUS_BAR_PRIORITY_MAX,
            default: this._defaults.status_bar.items[item]?.priority,
            label: localize('config.status_bar.items.priority'),
        })}
      `)}`;
    }
    _renderMenuButton(button, additionalOptions) {
        const menuButtonAlignments = [
            { value: '', label: '' },
            { value: 'matching', label: localize('config.menu.buttons.alignments.matching') },
            { value: 'opposing', label: localize('config.menu.buttons.alignments.opposing') },
        ];
        return x ` ${this._putInSubmenu(MENU_MENU_BUTTONS, button, `config.menu.buttons.${button}`, 'mdi:gesture-tap-button', x `
        ${this._renderSwitch(`${CONF_MENU_BUTTONS}.${button}.enabled`, this._defaults.menu.buttons[button]?.enabled ?? true, {
            label: localize('config.menu.buttons.enabled'),
        })}
        ${this._renderOptionSelector(`${CONF_MENU_BUTTONS}.${button}.alignment`, menuButtonAlignments, {
            label: localize('config.menu.buttons.alignment'),
        })}
        ${this._renderSwitch(`${CONF_MENU_BUTTONS}.${button}.permanent`, this._defaults.menu.buttons[button]?.permanent ?? false, {
            label: localize('config.menu.buttons.permanent'),
        })}
        ${this._renderNumberInput(`${CONF_MENU_BUTTONS}.${button}.priority`, {
            max: MENU_PRIORITY_MAX,
            default: this._defaults.menu.buttons[button]?.priority,
            label: localize('config.menu.buttons.priority'),
        })}
        ${this._renderIconSelector(`${CONF_MENU_BUTTONS}.${button}.icon`, {
            label: localize('config.menu.buttons.icon'),
        })}
        ${additionalOptions}
      `)}`;
    }
    /**
     * Put a given rendered template into a submenu.
     * @param domain The submenu domain.
     * @param key The submenu key.
     * @param icon The icon for the submenu.
     * @param labelPath The path to the label to localize.
     * @param template The template to put in the submenu.
     * @returns
     */
    _putInSubmenu(domain, key, labelPath, icon, template) {
        const selected = this._expandedMenus[domain] === key;
        const submenuClasses = {
            submenu: true,
            selected: selected,
        };
        return x ` <div class="${e(submenuClasses)}">
      <div
        class="submenu-header"
        @click=${this._toggleMenu}
        .domain=${domain}
        .key=${key}
      >
        <advanced-camera-card-icon .icon=${{ icon: icon }}></advanced-camera-card-icon>
        <span>${localize(labelPath)}</span>
      </div>
      ${selected ? x `<div class="values">${template}</div>` : ''}
    </div>`;
    }
    /**
     * Render a media layout section.
     * @param domain The submenu domain.
     * @param labelPath The path to the label.
     * @param configPathFit The path to the fit config.
     * @param configPathPositionX The path to the position.x config.
     * @param configPathPositionY The path to the position.y config.
     * @returns A rendered template.
     */
    _renderMediaLayout(domain, labelPath, configPathFit, configPathPositionX, configPathPositionY, configPathViewBoxTop, configPathViewBoxBottom, configPathViewBoxLeft, configPathViewBoxRight, configPathZoom, configPathPanX, configPathPanY) {
        return this._putInSubmenu(domain, true, labelPath, 'mdi:page-layout-body', x `
        ${this._renderNumberInput(configPathZoom, {
            min: ZOOM_MIN,
            max: ZOOM_MAX,
            label: localize('config.cameras.dimensions.layout.zoom'),
            step: 0.1,
        })}
        ${this._renderNumberInput(configPathPanX, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.pan.x'),
        })}
        ${this._renderNumberInput(configPathPanY, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.pan.y'),
        })}
        ${this._renderOptionSelector(configPathFit, this._layoutFits, {
            label: localize('config.cameras.dimensions.layout.fit'),
        })}
        ${this._putInSubmenu(`${domain}.position`, true, 'config.cameras.dimensions.layout.position.editor_label', 'mdi:aspect-ratio', x ` ${this._renderNumberInput(configPathPositionX, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.position.x'),
        })}
          ${this._renderNumberInput(configPathPositionY, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.position.y'),
        })}`)}
        ${this._putInSubmenu(`${domain}.view_box`, true, 'config.cameras.dimensions.layout.view_box.editor_label', 'mdi:crop', x `
            ${this._renderNumberInput(configPathViewBoxTop, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.view_box.top'),
        })}
            ${this._renderNumberInput(configPathViewBoxBottom, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.view_box.bottom'),
        })}
            ${this._renderNumberInput(configPathViewBoxLeft, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.view_box.left'),
        })}
            ${this._renderNumberInput(configPathViewBoxRight, {
            min: 0,
            max: 100,
            label: localize('config.cameras.dimensions.layout.view_box.right'),
        })}
          `)}
      `);
    }
    /**
     * Render the core timeline controls (mini or full timeline),
     * @param configPathStyle Timeline style config path.
     * @param configPathWindowSeconds Timeline window config path.
     * @param configPathClusteringThreshold Clustering threshold config path.
     * @param configPathTimelineEventsMediaType Timeline media config path.
     * @param configPathShowRecordings Show recordings config path.
     * @param defaultShowRecordings Default value of show_recordings.
     * @returns A rendered template.
     */
    _renderTimelineCoreControls(domain, configPathStyle, configPathWindowSeconds, configPathClusteringThreshold, configPathTimelineEventsMediaType, configPathShowRecordings, configPathFormat24h, defaultShowRecordings, defaultFormat24h, configPathPanMode) {
        return x `
      ${this._renderOptionSelector(configPathStyle, this._timelineStyleTypes, {
            label: localize(`config.common.${CONF_TIMELINE_STYLE}`),
        })}
      ${configPathPanMode
            ? this._renderOptionSelector(configPathPanMode, this._timelinePanModes, {
                label: localize(`config.common.controls.timeline.pan_mode`),
            })
            : ``}
      ${this._renderNumberInput(configPathWindowSeconds, {
            label: localize(`config.common.${CONF_TIMELINE_WINDOW_SECONDS}`),
        })}
      ${this._renderNumberInput(configPathClusteringThreshold, {
            label: localize(`config.common.${CONF_TIMELINE_CLUSTERING_THRESHOLD}`),
        })}
      ${this._renderOptionSelector(configPathTimelineEventsMediaType, this._timelineEventsMediaTypes, {
            label: localize(`config.common.${CONF_TIMELINE_EVENTS_MEDIA_TYPE}`),
        })}
      ${this._renderSwitch(configPathShowRecordings, defaultShowRecordings, {
            label: localize(`config.common.${CONF_TIMELINE_SHOW_RECORDINGS}`),
        })}
      ${this._putInSubmenu(`${domain}.format`, true, 'config.common.controls.timeline.format.editor_label', 'mdi:clock-edit', x `
          ${this._renderSwitch(configPathFormat24h, defaultFormat24h, {
            label: localize('config.common.controls.timeline.format.24h'),
        })}
        `)}
    `;
    }
    /**
     * Render the mini timeline controls.
     * @param domain The submenu domain.
     * @param configPathWindowSeconds Timeline window config path.
     * @param configPathClusteringThreshold Clustering threshold config path.
     * @param configPathTimelineEventsMediaType Timeline media config path.
     * @param configPathShowRecordings Show recordings config path.
     * @returns A rendered template.
     */
    _renderMiniTimeline(domain, configPathMode, configPathStyle, configPathWindowSeconds, configPathClusteringThreshold, configPathTimelineEventsMediaType, configPathShowRecordings, configPathFormat24h, defaultShowRecordings, defaultFormat24h, configPathPanMode) {
        return this._putInSubmenu(domain, true, 'config.common.controls.timeline.editor_label', 'mdi:chart-gantt', x ` ${this._renderOptionSelector(configPathMode, this._miniTimelineModes, {
            label: localize('config.common.controls.timeline.mode'),
        })}
      ${this._renderTimelineCoreControls(domain, configPathStyle, configPathWindowSeconds, configPathClusteringThreshold, configPathTimelineEventsMediaType, configPathShowRecordings, configPathFormat24h, defaultShowRecordings, defaultFormat24h, configPathPanMode)}`);
    }
    /**
     * Render the next & previous controls.
     * @param domain The submenu domain.
     * @param configPathStyle Next previous style config path.
     * @param configPathSize Next previous size config path.
     * @returns A rendered template.
     */
    _renderViewDisplay(domain, configPathMode, configPathSelectedPosition, configPathSelectedWidthFactor, configPathColumns, configPathMaxColumns) {
        return this._putInSubmenu(domain, true, 'config.common.display.editor_label', 'mdi:palette-swatch', x `
        ${this._renderOptionSelector(configPathMode, this._displayModes, {
            label: localize('config.common.display.mode'),
        })}
        ${this._renderOptionSelector(configPathSelectedPosition, this._gridSelectPositions, {
            label: localize('config.common.display.grid_selected_position'),
        })}
        ${this._renderNumberInput(configPathSelectedWidthFactor, {
            min: 0,
            label: localize('config.common.display.grid_selected_width_factor'),
        })}
        ${this._renderNumberInput(configPathColumns, {
            min: 0,
            label: localize('config.common.display.grid_columns'),
        })}
        ${this._renderNumberInput(configPathMaxColumns, {
            min: 0,
            label: localize('config.common.display.grid_max_columns'),
        })}
      `);
    }
    /**
     * Render the next & previous controls.
     * @param domain The submenu domain.
     * @param configPathStyle Next previous style config path.
     * @param configPathSize Next previous size config path.
     * @returns A rendered template.
     */
    _renderNextPreviousControls(domain, configPathStyle, configPathSize, options) {
        return this._putInSubmenu(domain, true, 'config.common.controls.next_previous.editor_label', 'mdi:arrow-right-bold-circle', x `
        ${this._renderOptionSelector(configPathStyle, this._nextPreviousControlStyles.filter((item) => (!!options?.allowThumbnails || item.value !== 'thumbnails') &&
            (!!options?.allowIcons || item.value !== 'icons')), {
            label: localize('config.common.controls.next_previous.style'),
        })}
        ${this._renderNumberInput(configPathSize, {
            min: BUTTON_SIZE_MIN,
            label: localize('config.common.controls.next_previous.size'),
        })}
      `);
    }
    /**
     * Render the thumbnails controls.
     * @param domain The submenu domain.
     * @param configPathMode Thumbnails mode config path.
     * @param configPathSize Thumbnails size config path.
     * @param configPathShowDetails Thumbnails show details config path.
     * @param configPathShowFavoriteControl Thumbnails show favorite control config path.
     * @param configPathShowTimelineControl Thumbnails show timeline control config path,
     * @param options An optional config path to media selection and mini-timeline mode.
     * @returns A rendered template.
     */
    _renderThumbnailsControls(domain, configPathSize, configPathShowDetails, configPathShowFavoriteControl, configPathShowTimelineControl, configPathShowDownloadControl, defaults, options) {
        return this._putInSubmenu(domain, true, 'config.common.controls.thumbnails.editor_label', 'mdi:image-text', x `
        ${options?.configPathMode
            ? x `${this._renderOptionSelector(options.configPathMode, this._thumbnailModes, {
                label: localize('config.common.controls.thumbnails.mode'),
            })}`
            : x ``}
        ${options?.configPathMediaType
            ? x `${this._renderOptionSelector(options.configPathMediaType, this._thumbnailMediaTypes, {
                label: localize('config.common.controls.thumbnails.media_type'),
            })}`
            : x ``}
        ${options?.configPathEventsMediaType
            ? x `${this._renderOptionSelector(options.configPathEventsMediaType, this._thumbnailEventsMediaTypes, {
                label: localize('config.common.controls.thumbnails.events_media_type'),
            })}`
            : x ``}
        ${this._renderNumberInput(configPathSize, {
            min: THUMBNAIL_WIDTH_MIN,
            max: THUMBNAIL_WIDTH_MAX,
            label: localize('config.common.controls.thumbnails.size'),
        })}
        ${this._renderSwitch(configPathShowDetails, defaults.show_details, {
            label: localize('config.common.controls.thumbnails.show_details'),
        })}
        ${this._renderSwitch(configPathShowFavoriteControl, defaults.show_favorite_control, {
            label: localize('config.common.controls.thumbnails.show_favorite_control'),
        })}
        ${this._renderSwitch(configPathShowTimelineControl, defaults.show_timeline_control, {
            label: localize('config.common.controls.thumbnails.show_timeline_control'),
        })}
        ${this._renderSwitch(configPathShowDownloadControl, defaults.show_download_control, {
            label: localize('config.common.controls.thumbnails.show_download_control'),
        })}
      `);
    }
    /**
     * Render the thumbnails controls.
     * @param domain The submenu domain.
     * @param configPathMode Filter mode config path.
     * @returns A rendered template.
     */
    _renderFilterControls(domain, configPathMode) {
        return this._putInSubmenu(domain, true, 'config.common.controls.filter.editor_label', 'mdi:filter-cog', x `
        ${configPathMode
            ? x `${this._renderOptionSelector(configPathMode, this._filterModes, {
                label: localize('config.common.controls.filter.mode'),
            })}`
            : x ``}
      `);
    }
    _renderImageOptions(configPathMode, configPathUrl, configPathEntity, configPathEntityParameters, configPathRefreshSeconds) {
        return x `
      ${this._renderOptionSelector(configPathMode, this._imageModes, {
            label: localize('config.common.image.mode'),
        })}
      ${this._renderStringInput(configPathUrl, {
            label: localize('config.common.image.url'),
        })}
      ${this._renderOptionSelector(configPathEntity, this.hass ? getEntitiesFromHASS(this.hass) : [], {
            label: localize('config.common.image.entity'),
        })}
      ${this._renderStringInput(configPathEntityParameters, {
            label: localize('config.common.image.entity_parameters'),
        })}
      ${this._renderNumberInput(configPathRefreshSeconds, {
            label: localize('config.common.image.refresh_seconds'),
        })}
    `;
    }
    _modifyConfig(func) {
        if (this._config) {
            const newConfig = copyConfig(this._config);
            if (func(newConfig)) {
                this._updateConfig(newConfig);
            }
        }
    }
    _renderArrayManagementControls(configPathArray, index, menu, add) {
        const array = this._config ? getConfigValue(this._config, configPathArray) : null;
        return x `
      <div class="controls">
        <ha-icon-button
          .label=${localize('editor.move_up')}
          .disabled=${add || !this._config || !Array.isArray(array) || index <= 0}
          @click=${() => !add &&
            this._modifyConfig((config) => {
                const array = getConfigValue(config, configPathArray);
                if (Array.isArray(array) && index > 0) {
                    arrayMove(array, index, index - 1);
                    this._openMenu(menu, index - 1);
                    return true;
                }
                return false;
            })}
        >
          <advanced-camera-card-icon
            .icon=${{ icon: 'mdi:arrow-up' }}
          ></advanced-camera-card-icon>
        </ha-icon-button>
        <ha-icon-button
          .label=${localize('editor.move_down')}
          .disabled=${add ||
            !this._config ||
            !Array.isArray(this._config.cameras) ||
            index >= this._config.cameras.length - 1}
          @click=${() => !add &&
            this._modifyConfig((config) => {
                const array = getConfigValue(config, configPathArray);
                if (Array.isArray(array) && index < array.length - 1) {
                    arrayMove(array, index, index + 1);
                    this._openMenu(menu, index + 1);
                    return true;
                }
                return false;
            })}
        >
          <advanced-camera-card-icon
            .icon=${{ icon: 'mdi:arrow-down' }}
          ></advanced-camera-card-icon>
        </ha-icon-button>
        <ha-icon-button
          .label=${localize('editor.delete')}
          .disabled=${add}
          @click=${() => {
            this._modifyConfig((config) => {
                const array = getConfigValue(config, configPathArray);
                if (Array.isArray(array)) {
                    array.splice(index, 1);
                    this._closeMenu(menu);
                    return true;
                }
                return false;
            });
        }}
        >
          <advanced-camera-card-icon
            .icon=${{ icon: 'mdi:delete' }}
          ></advanced-camera-card-icon>
        </ha-icon-button>
      </div>
    `;
    }
    _renderFolder(folders, folderIndex, addNewFolder) {
        const submenuClasses = {
            submenu: true,
            selected: this._expandedMenus[MENU_FOLDERS] === folderIndex,
        };
        const folderTypes = [
            { value: '', label: '' },
            { value: 'ha', label: localize('config.folders.types.ha') },
        ];
        return x ` <div class="${e(submenuClasses)}">
      <div
        class="submenu-header"
        @click=${this._toggleMenu}
        .domain=${MENU_FOLDERS}
        .key=${folderIndex}
      >
        <advanced-camera-card-icon
          .icon=${{ icon: addNewFolder ? 'mdi:folder-plus' : 'mdi:folder' }}
        ></advanced-camera-card-icon>
        <span>
          ${addNewFolder
            ? x ` <span class="new"> [${localize('editor.add_new_folder')}...] </span>`
            : x `<span
                >${this._getEditorFolderTitle(folderIndex, folders[folderIndex] || {})}</span
              >`}
        </span>
      </div>
      ${this._expandedMenus[MENU_FOLDERS] === folderIndex
            ? x ` <div class="values">
            ${this._renderArrayManagementControls(CONF_FOLDERS, folderIndex, MENU_FOLDERS, addNewFolder)}
            ${this._renderOptionSelector(getArrayConfigPath(CONF_FOLDERS_ARRAY_TYPE, folderIndex), folderTypes)}
            ${this._renderStringInput(getArrayConfigPath(CONF_FOLDERS_ARRAY_TITLE, folderIndex))}
            ${this._renderIconSelector(getArrayConfigPath(CONF_FOLDERS_ARRAY_ICON, folderIndex), {
                label: localize('config.folders.icon'),
            })}
            ${this._renderStringInput(getArrayConfigPath(CONF_FOLDERS_ARRAY_ID, folderIndex))}
            ${this._putInSubmenu(MENU_FOLDERS_HA, folderIndex, 'config.folders.ha.editor_label', 'mdi:home-assistant', x `
                ${this._renderStringInput(getArrayConfigPath(CONF_FOLDERS_ARRAY_HA_URL, folderIndex))}
                ${renderMessage({
                message: localize('config.folders.ha.path_info'),
                icon: 'mdi:information-outline',
                url: {
                    link: FOLDERS_CONFIGURATION_URL,
                    title: localize('error.configuration'),
                },
            })}
              `)}
          </div>`
            : ''}
    </div>`;
    }
    /**
     * Render a camera section.
     * @param cameras The full array of cameras.
     * @param cameraIndex The index (in the array) to render.
     * @param addNewCamera Whether or not this is a section to add a new non-existent camera.
     * @returns A rendered template.
     */
    _renderCamera(cameras, cameraIndex, entities, addNewCamera) {
        const liveProviders = [
            { value: '', label: '' },
            { value: 'auto', label: localize('config.cameras.live_providers.auto') },
            { value: 'ha', label: localize('config.cameras.live_providers.ha') },
            {
                value: 'image',
                label: localize('config.cameras.live_providers.image'),
            },
            {
                value: 'jsmpeg',
                label: localize('config.cameras.live_providers.jsmpeg'),
            },
            {
                value: 'go2rtc',
                label: localize('config.cameras.live_providers.go2rtc'),
            },
            {
                value: 'webrtc-card',
                label: localize('config.cameras.live_providers.webrtc-card'),
            },
        ];
        const dependentCameras = [];
        cameras.forEach((camera, index) => {
            if (index !== cameraIndex) {
                dependentCameras.push({
                    value: getCameraID(camera),
                    label: this._getEditorCameraTitle(index, camera),
                });
            }
        });
        const submenuClasses = {
            submenu: true,
            selected: this._expandedMenus[MENU_CAMERAS] === cameraIndex,
        };
        return x `
      <div class="${e(submenuClasses)}">
        <div
          class="submenu-header"
          @click=${this._toggleMenu}
          .domain=${MENU_CAMERAS}
          .key=${cameraIndex}
        >
          <advanced-camera-card-icon
            .icon=${{ icon: addNewCamera ? 'mdi:video-plus' : 'mdi:video' }}
          ></advanced-camera-card-icon>
          <span>
            ${addNewCamera
            ? x ` <span class="new">
                  [${localize('editor.add_new_camera')}...]
                </span>`
            : x `<span
                  >${this._getEditorCameraTitle(cameraIndex, cameras[cameraIndex] || {})}</span
                >`}
          </span>
        </div>
        ${this._expandedMenus[MENU_CAMERAS] === cameraIndex
            ? x ` <div class="values">
              ${this._renderArrayManagementControls(CONF_CAMERAS, cameraIndex, MENU_CAMERAS, addNewCamera)}
              ${this._renderEntitySelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_CAMERA_ENTITY, cameraIndex), 'camera')}
              ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_LIVE_PROVIDER, cameraIndex), liveProviders)}
              ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_TITLE, cameraIndex))}
              ${this._renderIconSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_ICON, cameraIndex), {
                label: localize('config.cameras.icon'),
            })}
              ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_ID, cameraIndex))}
              ${this._renderSwitch(getArrayConfigPath(CONF_CAMERAS_ARRAY_ALWAYS_ERROR_IF_ENTITY_UNAVAILABLE, cameraIndex), this._defaults.cameras.always_error_if_entity_unavailable)}
              ${this._putInSubmenu(MENU_CAMERAS_ENGINE, true, 'config.cameras.engines.editor_label', 'mdi:engine', x `${this._putInSubmenu(MENU_CAMERAS_FRIGATE, cameraIndex, 'config.cameras.frigate.editor_label', 'frigate', x `
                    ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_FRIGATE_CAMERA_NAME, cameraIndex))}
                    ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_FRIGATE_URL, cameraIndex))}
                    ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_FRIGATE_LABELS, cameraIndex), [], {
                multiple: true,
                label: localize('config.cameras.frigate.labels'),
            })}
                    ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_FRIGATE_ZONES, cameraIndex), [], {
                multiple: true,
                label: localize('config.cameras.frigate.zones'),
            })}
                    ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_FRIGATE_CLIENT_ID, cameraIndex))}
                  `)}
                ${this._putInSubmenu(MENU_CAMERAS_MOTIONEYE, cameraIndex, 'config.cameras.motioneye.editor_label', 'motioneye', x ` ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_MOTIONEYE_URL, cameraIndex))}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_MOTIONEYE_IMAGES_DIRECTORY_PATTERN, cameraIndex))}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_MOTIONEYE_IMAGES_FILE_PATTERN, cameraIndex))}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_MOTIONEYE_MOVIES_DIRECTORY_PATTERN, cameraIndex))}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_MOTIONEYE_MOVIES_FILE_PATTERN, cameraIndex))}`)}
                ${this._putInSubmenu(MENU_CAMERAS_REOLINK, cameraIndex, 'config.cameras.reolink.editor_label', 'reolink', x ` ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_REOLINK_URL, cameraIndex))}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_REOLINK_MEDIA_RESOLUTION, cameraIndex), this._reolinkMediaResolution, {
                label: localize('config.cameras.reolink.media_resolution.editor_label'),
            })}`)}`)}
              ${this._putInSubmenu(MENU_CAMERAS_LIVE_PROVIDER, true, 'config.cameras.live_provider_options.editor_label', 'mdi:cctv', x ` ${this._putInSubmenu(MENU_CAMERAS_GO2RTC, cameraIndex, 'config.cameras.go2rtc.editor_label', 'mdi:alpha-g-circle', x `${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_GO2RTC_MODES, cameraIndex), this._go2rtcModes, {
                multiple: true,
                label: localize('config.cameras.go2rtc.modes.editor_label'),
            })}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_GO2RTC_STREAM, cameraIndex))}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_GO2RTC_URL, cameraIndex))} `)}
                ${this._putInSubmenu(MENU_CAMERAS_IMAGE, true, 'config.cameras.image.editor_label', 'mdi:image', this._renderImageOptions(getArrayConfigPath(CONF_CAMERAS_ARRAY_IMAGE_MODE, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_IMAGE_URL, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_IMAGE_ENTITY, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_IMAGE_ENTITY_PARAMETERS, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_IMAGE_REFRESH_SECONDS, cameraIndex)))}
                ${this._putInSubmenu(MENU_CAMERAS_WEBRTC_CARD, cameraIndex, 'config.cameras.webrtc_card.editor_label', 'mdi:webrtc', x `${this._renderEntitySelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_WEBRTC_CARD_ENTITY, cameraIndex), 'camera')}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_WEBRTC_CARD_URL, cameraIndex))}`)}`)}
              ${this._putInSubmenu(MENU_CAMERAS_DEPENDENCIES, cameraIndex, 'config.cameras.dependencies.editor_label', 'mdi:graph', x ` ${this._renderSwitch(getArrayConfigPath(CONF_CAMERAS_ARRAY_DEPENDENCIES_ALL_CAMERAS, cameraIndex), this._defaults.cameras.dependencies.all_cameras)}
                ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_DEPENDENCIES_CAMERAS, cameraIndex), dependentCameras, {
                multiple: true,
            })}`)}
              ${this._putInSubmenu(MENU_CAMERAS_TRIGGERS, cameraIndex, 'config.cameras.triggers.editor_label', 'mdi:magnify-scan', x `
                  ${this._renderSwitch(getArrayConfigPath(CONF_CAMERAS_ARRAY_TRIGGERS_OCCUPANCY, cameraIndex), this._defaults.cameras.triggers.occupancy)}
                  ${this._renderSwitch(getArrayConfigPath(CONF_CAMERAS_ARRAY_TRIGGERS_MOTION, cameraIndex), this._defaults.cameras.triggers.motion)}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_TRIGGERS_ENTITIES, cameraIndex), entities, {
                multiple: true,
            })}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_TRIGGERS_EVENTS, cameraIndex), this._triggersEvents, {
                multiple: true,
                label: localize('config.cameras.triggers.events.editor_label'),
            })}
                `)}
              ${this._putInSubmenu(MENU_CAMERAS_CAST, cameraIndex, 'config.cameras.cast.editor_label', 'mdi:cast', x `
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_CAST_METHOD, cameraIndex), this._castMethods)}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_CAST_DASHBOARD_DASHBOARD_PATH, cameraIndex))}
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_CAST_DASHBOARD_VIEW_PATH, cameraIndex))}
                `)}
              ${this._putInSubmenu(MENU_CAMERAS_DIMENSIONS, cameraIndex, 'config.cameras.dimensions.editor_label', 'mdi:aspect-ratio', x `
                  ${this._renderStringInput(getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_ASPECT_RATIO, cameraIndex))}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_ROTATION, cameraIndex), this._rotations)}
                  ${this._renderMediaLayout(MENU_CAMERAS_DIMENSIONS_LAYOUT, 'config.cameras.dimensions.layout.editor_label', getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_FIT, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_POSITION_X, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_POSITION_Y, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_TOP, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_BOTTOM, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_LEFT, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_VIEW_BOX_RIGHT, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_ZOOM_FACTOR, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_PAN_X, cameraIndex), getArrayConfigPath(CONF_CAMERAS_ARRAY_DIMENSIONS_LAYOUT_PAN_Y, cameraIndex))}
                `)}
              ${this._putInSubmenu(MENU_CAMERAS_CAPABILITIES, cameraIndex, 'config.cameras.capabilities.editor_label', 'mdi:cog-stop', x `
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_CAPABILITIES_DISABLE, cameraIndex), this._capabilities, {
                multiple: true,
            })}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_CAPABILITIES_DISABLE_EXCEPT, cameraIndex), this._capabilities, {
                multiple: true,
            })}
                `)}
              ${this._putInSubmenu(MENU_CAMERAS_PROXY, cameraIndex, 'config.cameras.proxy.editor_label', 'mdi:arrow-decision', x `
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_PROXY_LIVE, cameraIndex), this._proxyModes, {
                label: localize('config.cameras.proxy.live'),
            })}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_PROXY_MEDIA, cameraIndex), this._proxyModes, {
                label: localize('config.cameras.proxy.media'),
            })}
                  ${this._renderSwitch(getArrayConfigPath(CONF_CAMERAS_ARRAY_PROXY_DYNAMIC, cameraIndex), this._defaults.cameras.proxy.dynamic)}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_PROXY_SSL_VERIFICATION, cameraIndex), this._proxySSLVerification, {
                label: localize('config.cameras.proxy.ssl_verification.editor_label'),
            })}
                  ${this._renderOptionSelector(getArrayConfigPath(CONF_CAMERAS_ARRAY_PROXY_SSL_CIPHERS, cameraIndex), this._proxySSLCiphers, {
                label: localize('config.cameras.proxy.ssl_ciphers.editor_label'),
            })}
                `)}
            </div>`
            : ``}
      </div>
    `;
    }
    /**
     * Render a string input field.
     * @param configPath The configuration path to set/read.
     * @param type The allowable input
     * @returns A rendered template.
     */
    _renderStringInput(configPath, params) {
        if (!this._config) {
            return;
        }
        return x `
      <ha-selector
        .hass=${this.hass}
        .selector=${{ text: { type: params?.type || 'text' } }}
        .label=${params?.label ?? this._getLabel(configPath)}
        .value=${getConfigValue(this._config, configPath, '')}
        .required=${false}
        @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
      >
      </ha-selector>
    `;
    }
    /**
     * Render a boolean selector.
     * @param configPath The configuration path to set/read.
     * @param valueDefault The default switch value if unset.
     * @param params Optional parameters to control the selector.
     * @returns A rendered template.
     */
    _renderSwitch(configPath, valueDefault, params) {
        if (!this._config) {
            return;
        }
        return x `
      <ha-selector
        .hass=${this.hass}
        .selector=${{ boolean: {} }}
        .label=${params?.label || this._getLabel(configPath)}
        .value=${getConfigValue(this._config, configPath, valueDefault)}
        .required=${false}
        @value-changed=${(ev) => this._valueChangedHandler(configPath, ev)}
      >
      </ha-selector>
    `;
    }
    _updateConfig(config) {
        this._config = config;
        fireHASSEvent(this, 'config-changed', { config: this._config });
    }
    render() {
        if (!this.hass || !this._config) {
            return x ``;
        }
        const entities = getEntitiesFromHASS(this.hass);
        const cameras = (getConfigValue(this._config, CONF_CAMERAS) ||
            []);
        const folders = (getConfigValue(this._config, CONF_FOLDERS) ||
            []);
        return x `
      ${this._configUpgradeable
            ? x ` <div class="upgrade">
              <span>${localize('editor.upgrade_available')}</span>
              <span>
                <mwc-button
                  raised
                  label="${localize('editor.upgrade')}"
                  @click=${() => {
                if (this._config) {
                    const upgradedConfig = copyConfig(this._config);
                    upgradeConfig(upgradedConfig);
                    this._updateConfig(upgradedConfig);
                }
            }}
                >
                </mwc-button>
              </span>
            </div>
            <br />`
            : x ``}
      <div class="card-config">
        ${this._renderOptionSetHeader('cameras')}
        ${this._expandedMenus[MENU_OPTIONS] === 'cameras'
            ? x `
              <div class="values">
                ${cameras.map((_, index) => this._renderCamera(cameras, index, entities))}
                ${this._renderCamera(cameras, cameras.length, entities, true)}
              </div>
            `
            : ''}
        ${this._renderOptionSetHeader('profiles')}
        ${this._expandedMenus[MENU_OPTIONS] === 'profiles'
            ? x ` <div class="values">
              ${this._renderOptionSelector(CONF_PROFILES, this._profiles, {
                multiple: true,
                label: localize('config.profiles.editor_label'),
            })}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('view')}
        ${this._expandedMenus[MENU_OPTIONS] === 'view'
            ? x `
              <div class="values">
                ${this._renderOptionSelector(CONF_VIEW_DEFAULT, this._viewModes)}
                ${this._renderOptionSelector(CONF_VIEW_CAMERA_SELECT, this._cameraSelectViewModes)}
                ${this._renderSwitch(CONF_VIEW_DIM, this._defaults.view.dim)}
                ${this._renderNumberInput(CONF_VIEW_INTERACTION_SECONDS)}
                ${this._renderSwitch(CONF_VIEW_DEFAULT_CYCLE_CAMERA, this._defaults.view.default_cycle_camera)}
                ${this._renderViewDefaultResetMenu()} ${this._renderViewTriggersMenu()}
                ${this._renderViewKeyboardShortcutMenu()}
                ${this._renderOptionSelector(CONF_VIEW_THEME_THEMES, this._themes, {
                label: localize('config.view.theme.themes.editor_label'),
                multiple: true,
            })}
              </div>
            `
            : ''}
        ${this._renderOptionSetHeader('menu')}
        ${this._expandedMenus[MENU_OPTIONS] === 'menu'
            ? x `
              <div class="values">
                ${this._renderOptionSelector(CONF_MENU_STYLE, this._menuStyles)}
                ${this._renderOptionSelector(CONF_MENU_POSITION, this._menuPositions)}
                ${this._renderOptionSelector(CONF_MENU_ALIGNMENT, this._menuAlignments)}
                ${this._renderNumberInput(CONF_MENU_BUTTON_SIZE, {
                min: BUTTON_SIZE_MIN,
            })}
                ${this._renderMenuButton('iris') /* */}
                ${this._renderMenuButton('cameras') /* */}
                ${this._renderMenuButton('substreams') /* */}
                ${this._renderMenuButton('live') /* */}
                ${this._renderMenuButton('clips') /* */}
                ${this._renderMenuButton('snapshots')}
                ${this._renderMenuButton('recordings')}
                ${this._renderMenuButton('folders')}
                ${this._renderMenuButton('image') /* */}
                ${this._renderMenuButton('download')}
                ${this._renderMenuButton('camera_ui')}
                ${this._renderMenuButton('fullscreen')}
                ${this._renderMenuButton('expand') /* */}
                ${this._renderMenuButton('timeline')}
                ${this._renderMenuButton('media_player')}
                ${this._renderMenuButton('microphone', x `${this._renderOptionSelector(`${CONF_MENU_BUTTONS}.microphone.type`, this._microphoneButtonTypes, { label: localize('config.menu.buttons.type') })}`)}
                ${this._renderMenuButton('play') /*  */}
                ${this._renderMenuButton('mute') /*  */}
                ${this._renderMenuButton('screenshot')}
                ${this._renderMenuButton('display_mode')}
                ${this._renderMenuButton('ptz_controls')}
                ${this._renderMenuButton('ptz_home')}
              </div>
            `
            : ''}
        ${this._renderOptionSetHeader('status_bar')}
        ${this._expandedMenus[MENU_OPTIONS] === 'status_bar'
            ? x `
              <div class="values">
                ${this._renderOptionSelector(CONF_STATUS_BAR_STYLE, this._statusBarStyles)}
                ${this._renderOptionSelector(CONF_STATUS_BAR_POSITION, this._statusBarPositions)}
                ${this._renderNumberInput(CONF_STATUS_BAR_HEIGHT, {
                min: STATUS_BAR_HEIGHT_MIN,
                label: localize('config.status_bar.height'),
            })}
                ${this._renderNumberInput(CONF_STATUS_BAR_POPUP_SECONDS, {
                min: 0,
                max: 60,
                default: this._defaults.status_bar.popup_seconds,
                label: localize('config.status_bar.popup_seconds'),
            })}
                ${this._renderStatusBarItem('title') /* */}
                ${this._renderStatusBarItem('resolution') /* */}
                ${this._renderStatusBarItem('technology') /* */}
                ${this._renderStatusBarItem('engine') /* */}
              </div>
            `
            : ''}
        ${this._renderOptionSetHeader('live')}
        ${this._expandedMenus[MENU_OPTIONS] === 'live'
            ? x `
              <div class="values">
                ${this._renderSwitch(CONF_LIVE_PRELOAD, this._defaults.live.preload)}
                ${this._renderSwitch(CONF_LIVE_DRAGGABLE, this._defaults.live.draggable)}
                ${this._renderSwitch(CONF_LIVE_ZOOMABLE, this._defaults.live.zoomable)}
                ${this._renderSwitch(CONF_LIVE_LAZY_LOAD, this._defaults.live.lazy_load)}
                ${this._renderOptionSelector(CONF_LIVE_LAZY_UNLOAD, this._mediaActionNegativeConditions, {
                multiple: true,
            })}
                ${this._renderOptionSelector(CONF_LIVE_AUTO_PLAY, this._mediaActionPositiveConditions, {
                multiple: true,
            })}
                ${this._renderOptionSelector(CONF_LIVE_AUTO_PAUSE, this._mediaActionNegativeConditions, {
                multiple: true,
            })}
                ${this._renderOptionSelector(CONF_LIVE_AUTO_MUTE, this._mediaLiveMuteConditions, {
                multiple: true,
            })}
                ${this._renderOptionSelector(CONF_LIVE_AUTO_UNMUTE, this._mediaLiveUnmuteConditions, {
                multiple: true,
            })}
                ${this._renderOptionSelector(CONF_LIVE_TRANSITION_EFFECT, this._transitionEffects)}
                ${this._renderSwitch(CONF_LIVE_SHOW_IMAGE_DURING_LOAD, this._defaults.live.show_image_during_load)}
                ${this._renderViewDisplay(MENU_LIVE_DISPLAY, CONF_LIVE_DISPLAY_MODE, CONF_LIVE_DISPLAY_GRID_SELECTED_POSITION, CONF_LIVE_DISPLAY_GRID_SELECTED_WIDTH_FACTOR, CONF_LIVE_DISPLAY_GRID_COLUMNS, CONF_LIVE_DISPLAY_GRID_MAX_COLUMNS)}
                ${this._putInSubmenu(MENU_LIVE_CONTROLS, true, 'config.live.controls.editor_label', 'mdi:gamepad', x `
                    ${this._renderSwitch(CONF_LIVE_CONTROLS_BUILTIN, this._defaults.live.controls.builtin, {
                label: localize('config.common.controls.builtin'),
            })}
                    ${this._renderSwitch(CONF_LIVE_CONTROLS_WHEEL, this._defaults.live.controls.wheel, {
                label: localize('config.common.controls.wheel'),
            })}
                    ${this._renderNextPreviousControls(MENU_LIVE_CONTROLS_NEXT_PREVIOUS, CONF_LIVE_CONTROLS_NEXT_PREVIOUS_STYLE, CONF_LIVE_CONTROLS_NEXT_PREVIOUS_SIZE, {
                allowIcons: true,
            })}
                    ${this._renderThumbnailsControls(MENU_LIVE_CONTROLS_THUMBNAILS, CONF_LIVE_CONTROLS_THUMBNAILS_SIZE, CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_DETAILS, CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, CONF_LIVE_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, this._defaults.live.controls.thumbnails, {
                configPathMediaType: CONF_LIVE_CONTROLS_THUMBNAILS_MEDIA_TYPE,
                configPathEventsMediaType: CONF_LIVE_CONTROLS_THUMBNAILS_EVENTS_MEDIA_TYPE,
                configPathMode: CONF_LIVE_CONTROLS_THUMBNAILS_MODE,
            })}
                    ${this._renderMiniTimeline(MENU_LIVE_CONTROLS_TIMELINE, CONF_LIVE_CONTROLS_TIMELINE_MODE, CONF_LIVE_CONTROLS_TIMELINE_STYLE, CONF_LIVE_CONTROLS_TIMELINE_WINDOW_SECONDS, CONF_LIVE_CONTROLS_TIMELINE_CLUSTERING_THRESHOLD, CONF_LIVE_CONTROLS_TIMELINE_EVENTS_MEDIA_TYPE, CONF_LIVE_CONTROLS_TIMELINE_SHOW_RECORDINGS, CONF_LIVE_CONTROLS_TIMELINE_FORMAT_24H, this._defaults.live.controls.timeline.show_recordings, this._defaults.live.controls.timeline.format['24h'], CONF_LIVE_CONTROLS_TIMELINE_PAN_MODE)}
                    ${this._putInSubmenu(MENU_LIVE_CONTROLS_PTZ, true, 'config.live.controls.ptz.editor_label', 'mdi:pan', x `
                        ${this._renderOptionSelector(CONF_LIVE_CONTROLS_PTZ_MODE, this._ptzModes)}
                        ${this._renderOptionSelector(CONF_LIVE_CONTROLS_PTZ_POSITION, this._ptzPositions)}
                        ${this._renderOptionSelector(CONF_LIVE_CONTROLS_PTZ_ORIENTATION, this._ptzOrientations)}
                        ${this._renderSwitch(CONF_LIVE_CONTROLS_PTZ_HIDE_PAN_TILT, this._defaults.live.controls.ptz.hide_pan_tilt, {
                label: localize('config.live.controls.ptz.hide_pan_tilt'),
            })}
                        ${this._renderSwitch(CONF_LIVE_CONTROLS_PTZ_HIDE_ZOOM, this._defaults.live.controls.ptz.hide_pan_tilt, {
                label: localize('config.live.controls.ptz.hide_zoom'),
            })}
                        ${this._renderSwitch(CONF_LIVE_CONTROLS_PTZ_HIDE_HOME, this._defaults.live.controls.ptz.hide_home, {
                label: localize('config.live.controls.ptz.hide_home'),
            })}
                      `)}
                  `)}
                ${this._putInSubmenu(MENU_LIVE_MICROPHONE, true, 'config.live.microphone.editor_label', 'mdi:microphone', x `
                    ${this._renderNumberInput(CONF_LIVE_MICROPHONE_DISCONNECT_SECONDS)}
                    ${this._renderSwitch(CONF_LIVE_MICROPHONE_ALWAYS_CONNECTED, this._defaults.live.microphone.always_connected)}
                    ${this._renderNumberInput(CONF_LIVE_MICROPHONE_MUTE_AFTER_MICROPHONE_MUTE_SECONDS)}
                  `)}
              </div>
            `
            : ''}
        ${this._renderOptionSetHeader('folders')}
        ${this._expandedMenus[MENU_OPTIONS] === 'folders'
            ? x ` <div class="values">
              ${folders.map((_, index) => this._renderFolder(folders, index))}
              ${this._renderFolder(folders, folders.length, true)}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('media_gallery')}
        ${this._expandedMenus[MENU_OPTIONS] === 'media_gallery'
            ? x ` <div class="values">
              ${this._renderThumbnailsControls(MENU_MEDIA_GALLERY_CONTROLS_THUMBNAILS, CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SIZE, CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_DETAILS, CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, CONF_MEDIA_GALLERY_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, this._defaults.media_gallery.controls.thumbnails)}
              ${this._renderFilterControls(MENU_MEDIA_GALLERY_CONTROLS_FILTER, CONF_MEDIA_GALLERY_CONTROLS_FILTER_MODE)}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('media_viewer')}
        ${this._expandedMenus[MENU_OPTIONS] === 'media_viewer'
            ? x ` <div class="values">
              ${this._renderOptionSelector(CONF_MEDIA_VIEWER_AUTO_PLAY, this._mediaActionPositiveConditions, {
                multiple: true,
            })}
              ${this._renderOptionSelector(CONF_MEDIA_VIEWER_AUTO_PAUSE, this._mediaActionNegativeConditions, {
                multiple: true,
            })}
              ${this._renderOptionSelector(CONF_MEDIA_VIEWER_AUTO_MUTE, this._mediaActionNegativeConditions, {
                multiple: true,
            })}
              ${this._renderOptionSelector(CONF_MEDIA_VIEWER_AUTO_UNMUTE, this._mediaActionPositiveConditions, {
                multiple: true,
            })}
              ${this._renderSwitch(CONF_MEDIA_VIEWER_DRAGGABLE, this._defaults.media_viewer.draggable)}
              ${this._renderSwitch(CONF_MEDIA_VIEWER_ZOOMABLE, this._defaults.media_viewer.zoomable)}
              ${this._renderSwitch(CONF_MEDIA_VIEWER_LAZY_LOAD, this._defaults.media_viewer.lazy_load)}
              ${this._renderOptionSelector(CONF_MEDIA_VIEWER_TRANSITION_EFFECT, this._transitionEffects)}
              ${this._renderSwitch(CONF_MEDIA_VIEWER_SNAPSHOT_CLICK_PLAYS_CLIP, this._defaults.media_viewer.snapshot_click_plays_clip)}
              ${this._renderViewDisplay(MENU_MEDIA_VIEWER_DISPLAY, CONF_MEDIA_VIEWER_DISPLAY_MODE, CONF_MEDIA_VIEWER_DISPLAY_GRID_SELECTED_POSITION, CONF_MEDIA_VIEWER_DISPLAY_GRID_SELECTED_WIDTH_FACTOR, CONF_MEDIA_VIEWER_DISPLAY_GRID_COLUMNS, CONF_MEDIA_VIEWER_DISPLAY_GRID_MAX_COLUMNS)}
              ${this._putInSubmenu(MENU_MEDIA_VIEWER_CONTROLS, true, 'config.media_viewer.controls.editor_label', 'mdi:gamepad', x `
                  ${this._renderSwitch(CONF_MEDIA_VIEWER_CONTROLS_BUILTIN, this._defaults.media_viewer.controls.builtin, {
                label: localize('config.common.controls.builtin'),
            })}
                  ${this._renderSwitch(CONF_MEDIA_VIEWER_CONTROLS_WHEEL, this._defaults.media_viewer.controls.wheel, {
                label: localize('config.common.controls.wheel'),
            })}
                  ${this._renderNextPreviousControls(MENU_MEDIA_VIEWER_CONTROLS_NEXT_PREVIOUS, CONF_MEDIA_VIEWER_CONTROLS_NEXT_PREVIOUS_STYLE, CONF_MEDIA_VIEWER_CONTROLS_NEXT_PREVIOUS_SIZE, {
                allowThumbnails: true,
            })}
                  ${this._renderThumbnailsControls(MENU_MEDIA_VIEWER_CONTROLS_THUMBNAILS, CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SIZE, CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_DETAILS, CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, this._defaults.media_viewer.controls.thumbnails, {
                configPathMode: CONF_MEDIA_VIEWER_CONTROLS_THUMBNAILS_MODE,
            })}
                  ${this._renderMiniTimeline(MENU_MEDIA_VIEWER_CONTROLS_TIMELINE, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_MODE, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_STYLE, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_WINDOW_SECONDS, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_CLUSTERING_THRESHOLD, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_EVENTS_MEDIA_TYPE, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_SHOW_RECORDINGS, CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_FORMAT_24H, this._defaults.media_viewer.controls.timeline.show_recordings, this._defaults.media_viewer.controls.timeline.format['24h'], CONF_MEDIA_VIEWER_CONTROLS_TIMELINE_PAN_MODE)}
                `)}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('image')}
        ${this._expandedMenus[MENU_OPTIONS] === 'image'
            ? x ` <div class="values">
              ${this._renderImageOptions(CONF_IMAGE_MODE, CONF_IMAGE_URL, CONF_IMAGE_ENTITY, CONF_IMAGE_ENTITY_PARAMETERS, CONF_IMAGE_REFRESH_SECONDS)}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('timeline')}
        ${this._expandedMenus[MENU_OPTIONS] === 'timeline'
            ? x ` <div class="values">
              ${this._renderTimelineCoreControls(MENU_TIMELINE_FORMAT, CONF_TIMELINE_STYLE, CONF_TIMELINE_WINDOW_SECONDS, CONF_TIMELINE_CLUSTERING_THRESHOLD, CONF_TIMELINE_EVENTS_MEDIA_TYPE, CONF_TIMELINE_SHOW_RECORDINGS, CONF_TIMELINE_FORMAT_24H, this._defaults.timeline.show_recordings, this._defaults.timeline.format['24h'])}
              ${this._renderThumbnailsControls(MENU_TIMELINE_CONTROLS_THUMBNAILS, CONF_TIMELINE_CONTROLS_THUMBNAILS_SIZE, CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_DETAILS, CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_FAVORITE_CONTROL, CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_TIMELINE_CONTROL, CONF_TIMELINE_CONTROLS_THUMBNAILS_SHOW_DOWNLOAD_CONTROL, this._defaults.timeline.controls.thumbnails, {
                configPathMode: CONF_TIMELINE_CONTROLS_THUMBNAILS_MODE,
            })}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('dimensions')}
        ${this._expandedMenus[MENU_OPTIONS] === 'dimensions'
            ? x ` <div class="values">
              ${this._renderOptionSelector(CONF_DIMENSIONS_ASPECT_RATIO_MODE, this._aspectRatioModes)}
              ${this._renderStringInput(CONF_DIMENSIONS_ASPECT_RATIO)}
              ${this._renderStringInput(CONF_DIMENSIONS_HEIGHT)}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('performance', getConfigValue(this._config, CONF_PERFORMANCE_PROFILE) === 'low'
            ? 'warning'
            : undefined)}
        ${this._expandedMenus[MENU_OPTIONS] === 'performance'
            ? x ` <div class="values">
              ${getConfigValue(this._config, CONF_PERFORMANCE_PROFILE) === 'low'
                ? this._renderInfo(localize('config.performance.warning'))
                : x ``}
              ${this._putInSubmenu(MENU_PERFORMANCE_FEATURES, true, 'config.performance.features.editor_label', 'mdi:feature-search', x `
                  ${this._renderSwitch(CONF_PERFORMANCE_FEATURES_CARD_LOADING_INDICATOR, this._defaults.performance.features.card_loading_indicator)}
                  ${this._renderSwitch(CONF_PERFORMANCE_FEATURES_CARD_LOADING_EFFECTS, this._defaults.performance.features.card_loading_effects)}
                  ${this._renderSwitch(CONF_PERFORMANCE_FEATURES_ANIMATED_PROGRESS_INDICATOR, this._defaults.performance.features.animated_progress_indicator)}
                  ${this._renderNumberInput(CONF_PERFORMANCE_FEATURES_MEDIA_CHUNK_SIZE, {
                max: MEDIA_CHUNK_SIZE_MAX,
            })}
                  ${this._renderNumberInput(CONF_PERFORMANCE_FEATURES_MAX_SIMULTANEOUS_ENGINE_REQUESTS, {
                min: 1,
            })}
                `)}
              ${this._putInSubmenu(MENU_PERFORMANCE_STYLE, true, 'config.performance.style.editor_label', 'mdi:palette-swatch-variant', x `
                  ${this._renderSwitch(CONF_PERFORMANCE_STYLE_BORDER_RADIUS, this._defaults.performance.style.border_radius)}
                  ${this._renderSwitch(CONF_PERFORMANCE_STYLE_BOX_SHADOW, this._defaults.performance.style.box_shadow)}
                `)}
            </div>`
            : ''}
        ${this._renderOptionSetHeader('remote_control')}
        ${this._expandedMenus[MENU_OPTIONS] === 'remote_control'
            ? x ` <div class="values">
              ${this._putInSubmenu(MENU_REMOTE_CONTROL_ENTITIES, true, 'config.remote_control.entities.editor_label', 'mdi:devices', x `
                  ${this._renderEntitySelector(CONF_REMOTE_CONTROL_ENTITIES_CAMERA, 'input_select')}
                `)}
            </div>`
            : ''}
        ${this._config['overrides'] !== undefined
            ? x ` ${this._renderOptionSetHeader('overrides')}
            ${this._expandedMenus[MENU_OPTIONS] === 'overrides'
                ? x ` <div class="values">
                  ${this._renderInfo(localize('config.overrides.info'))}
                </div>`
                : ''}`
            : x ``}
      </div>
    `;
    }
    /**
     * Close the editor menu with the given domain.
     * @param targetDomain The menu domain to close.
     */
    _closeMenu(targetDomain) {
        delete this._expandedMenus[targetDomain];
        this.requestUpdate();
    }
    /**
     * Open an editor menu.
     * @param targetDomain The menu domain to open.
     * @param key The menu object key to open.
     */
    _openMenu(targetDomain, key) {
        this._expandedMenus[targetDomain] = key;
        this.requestUpdate();
    }
    /**
     * Toggle an editor menu.
     * @param ev An event.
     */
    _toggleMenu(ev) {
        if (ev && ev.target) {
            const domain = ev.target.domain;
            const key = ev.target.key;
            if (this._expandedMenus[domain] === key) {
                this._closeMenu(domain);
            }
            else {
                this._openMenu(domain, key);
            }
        }
    }
    /**
     * Handle a changed option value.
     * @param ev Event triggering the change.
     */
    _valueChangedHandler(key, ev) {
        if (!this._config || !this.hass) {
            return;
        }
        let value;
        if (ev.detail && ev.detail.value !== undefined) {
            value = ev.detail.value;
            if (typeof value === 'string') {
                value = value.trim();
            }
        }
        if (getConfigValue(this._config, key) === value) {
            return;
        }
        const newConfig = copyConfig(this._config);
        if (value === '' || value === undefined) {
            deleteConfigValue(newConfig, key);
        }
        else {
            setConfigValue(newConfig, key, value);
        }
        this._updateConfig(newConfig);
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardEditor.prototype, "hass", void 0);
__decorate([
    r$1()
], AdvancedCameraCardEditor.prototype, "_config", void 0);
__decorate([
    r$1()
], AdvancedCameraCardEditor.prototype, "_defaults", void 0);
__decorate([
    r$1()
], AdvancedCameraCardEditor.prototype, "_expandedMenus", void 0);
AdvancedCameraCardEditor = __decorate([
    t('advanced-camera-card-mini-editor')
], AdvancedCameraCardEditor);

export { AdvancedCameraCardEditor };
//# sourceMappingURL=editor-be55c611.js.map
