import{_ as e,y as t,t as n,u as i,Y as a,C as c,l as s,a0 as r,M as l,v as o,w as p}from"./card-c2e90b76.js";let u=class extends i{constructor(){super(...arguments),this._refInput=a()}get value(){return this._refInput.value?.value?new Date(this._refInput.value.value):null}reset(){this._refInput.value&&(this._refInput.value.value="")}render(){const e=()=>{const e=this._refInput.value?.value;p(this,"date-picker:change",{date:e?new Date(e):null})};return c`<input
        aria-label="${s("timeline.select_date")}"
        title="${s("timeline.select_date")}"
        ${r(this._refInput)}
        type="datetime-local"
        @input=${()=>e()}
        @change=${()=>e()}
      />
      <advanced-camera-card-mini-icon
        aria-label="${s("timeline.select_date")}"
        title="${s("timeline.select_date")}"
        .icon=${{icon:this.icon??"mdi:calendar-search"}}
        @click=${e=>{l(e),this._refInput.value?.showPicker()}}
      >
      </advanced-camera-card-mini-icon>`}static get styles(){return o(":host {\n  display: inline-block;\n  position: relative;\n  width: var(--mdc-icon-size, 24px);\n  height: var(--mdc-icon-size, 24px);\n}\n\ninput {\n  display: block;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  padding: 0px;\n  border: 0px;\n}\n\n/**\n * Hack warning: Safari on iOS does not support showPicker with\n * datetime-local:\n * https://caniuse.com/mdn-api_htmlinputelement_showpicker_datetime_local_input\n *\n * The hack is to render the input element in front of the icon, with an\n * opacity of 0. This only works if the underlying input element accepts the\n * click at the exact place the user happens to click. From trial and error,\n * this seems to work better than expected / quite reliably, but had the user\n * manually changed icon sizes with Safari iOS their experience may vary.\n */\n@supports (-webkit-touch-callout: none) {\n  input {\n    opacity: 0;\n    z-index: 1;\n  }\n}\n@supports not (-webkit-touch-callout: none) {\n  input {\n    visibility: hidden;\n  }\n}\nadvanced-camera-card-icon {\n  display: block;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n}")}};e([t({attribute:!1})],u.prototype,"icon",void 0),u=e([n("advanced-camera-card-mini-date-picker")],u);export{u as A};
