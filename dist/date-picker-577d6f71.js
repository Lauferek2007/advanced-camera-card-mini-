import { _ as __decorate, y as n, t, u as s, Y as e, C as x, l as localize, a0 as n$1, M as stopEventFromActivatingCardWideActions, v as r, w as fireAdvancedCameraCardEvent } from './card-edc26888.js';

var css = ":host {\n  display: inline-block;\n  position: relative;\n  width: var(--mdc-icon-size, 24px);\n  height: var(--mdc-icon-size, 24px);\n}\n\ninput {\n  display: block;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  padding: 0px;\n  border: 0px;\n}\n\n/**\n * Hack warning: Safari on iOS does not support showPicker with\n * datetime-local:\n * https://caniuse.com/mdn-api_htmlinputelement_showpicker_datetime_local_input\n *\n * The hack is to render the input element in front of the icon, with an\n * opacity of 0. This only works if the underlying input element accepts the\n * click at the exact place the user happens to click. From trial and error,\n * this seems to work better than expected / quite reliably, but had the user\n * manually changed icon sizes with Safari iOS their experience may vary.\n */\n@supports (-webkit-touch-callout: none) {\n  input {\n    opacity: 0;\n    z-index: 1;\n  }\n}\n@supports not (-webkit-touch-callout: none) {\n  input {\n    visibility: hidden;\n  }\n}\nadvanced-camera-card-icon {\n  display: block;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n}";

let AdvancedCameraCardDatePicker = class AdvancedCameraCardDatePicker extends s {
    constructor() {
        super(...arguments);
        this._refInput = e();
    }
    get value() {
        return this._refInput.value?.value ? new Date(this._refInput.value.value) : null;
    }
    reset() {
        if (this._refInput.value) {
            this._refInput.value.value = '';
        }
    }
    render() {
        const changed = () => {
            const value = this._refInput.value?.value;
            fireAdvancedCameraCardEvent(this, 'date-picker:change', {
                date: value ? new Date(value) : null,
            });
        };
        return x `<input
        aria-label="${localize('timeline.select_date')}"
        title="${localize('timeline.select_date')}"
        ${n$1(this._refInput)}
        type="datetime-local"
        @input=${() => changed()}
        @change=${() => changed()}
      />
      <advanced-camera-card-icon
        aria-label="${localize('timeline.select_date')}"
        title="${localize('timeline.select_date')}"
        .icon=${{ icon: this.icon ?? `mdi:calendar-search` }}
        @click=${(ev) => {
            stopEventFromActivatingCardWideActions(ev);
            this._refInput.value?.showPicker();
        }}
      >
      </advanced-camera-card-icon>`;
    }
    static get styles() {
        return r(css);
    }
};
__decorate([
    n({ attribute: false })
], AdvancedCameraCardDatePicker.prototype, "icon", void 0);
AdvancedCameraCardDatePicker = __decorate([
    t('advanced-camera-card-date-picker')
], AdvancedCameraCardDatePicker);

export { AdvancedCameraCardDatePicker as A };
//# sourceMappingURL=date-picker-577d6f71.js.map
