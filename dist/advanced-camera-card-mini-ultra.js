import{a5 as e,a6 as a,_ as t,t as i,u as n,a7 as r,Y as s,b as o,c as l,C as c,K as d,L as g,a9 as m,a0 as h,a4 as u,v as _,ab as p,ac as v,ad as f,aa as M}from"./card-c2e90b76.js";import"./index-b29cfbdc.js";import"./media-dimensions-container-48f78f68.js";import"./dispatch-live-error-b00a8443.js";import"./live-provider-c1f370cc.js";const C=e=>{const a=p(e),t=Array.isArray(v(a,"profiles"))?v(a,"profiles").filter((e=>"string"==typeof e)):[];return f(a,"profiles",Array.from(new Set([...t,"low-performance"]))),f(a,"view.default","live"),f(a,"view.default_cycle_camera",!1),f(a,"view.triggers.show_trigger_status",!1),f(a,"live.display.mode","single"),f(a,"live.preload",!1),f(a,"live.draggable",!1),f(a,"live.zoomable",!1),f(a,"live.show_image_during_load",!1),f(a,"live.transition_effect","none"),f(a,"live.controls.builtin",!1),f(a,"live.controls.wheel",!1),f(a,"live.controls.next_previous.style","none"),f(a,"live.controls.ptz.mode","off"),f(a,"live.controls.thumbnails.mode","none"),f(a,"live.controls.timeline.mode","none"),f(a,"menu.style","outside"),f(a,"status_bar.style","none"),f(a,"cameras_global.capabilities.disable_except",["live","menu"]),f(a,"cameras_global.image.refresh_seconds",15),a};console.info(`%c Advanced Camera Card Ultra %c ${e()} `,"padding: 3px; color: black; background: pink;","padding: 3px; color: black; background: white;"),window.customCards=window.customCards||[],window.customCards.push({type:"advanced-camera-card-mini-ultra",name:"Advanced Camera Card Mini Ultra",description:"Live-only variant with a much smaller feature surface",preview:!0,documentationURL:a});let y=class extends n{constructor(){super(...arguments),this._controller=new r(this,(()=>{}),(()=>this._refMenu.value?.toggleMenu()),(()=>null)),this._refMenu=s()}get _config(){return this._controller.getConfigManager().getConfig()}get _hass(){return this._controller.getHASSManager().getHASS()}set hass(e){this._controller.getHASSManager().setHASS(e),this._refMenu.value&&(this._refMenu.value.hass=e)}set isPanel(e){this._controller.getConditionStateManager().setState({panel:e})}get isPanel(){return!!this._controller.getConditionStateManager().getState().panel}static async getConfigElement(){return await r.getConfigElement()}static getStubConfig(e,a){return C(r.getStubConfig(a))}setConfig(e){this._controller.getConfigManager().setConfig(C(e))}shouldUpdate(){return!!this.isConnected&&(this._controller.getMessageManager().hasMessage()||this._controller.getInitializationManager().isInitializedMandatory()||this._controller.getInitializationManager().initializeMandatory(),!0)}_getButtons(){const e=this._config,a=this._hass,t=this._controller.getViewManager().getView(),i=this._controller.getCameraManager();if(!e||!a)return[];const n=[],r=i.getStore().getCameraIDsWithCapability("menu");return r.size>1&&n.push({type:"custom:advanced-camera-card-mini-menu-submenu",enabled:!0,icon:"mdi:video-switch",title:"Cameras",items:[...r].map((e=>{const a=i.getCameraMetadata(e);return{enabled:!0,icon:a?.icon.icon,entity:a?.icon.entity,state_color:!0,title:a?.title,selected:t?.camera===e,tap_action:o("camera_select",e)}}))}),this._controller.getFullscreenManager().isSupported()&&n.push({type:"custom:advanced-camera-card-mini-menu-icon",enabled:!0,icon:this._controller.getFullscreenManager().isInFullscreen()?"mdi:fullscreen-exit":"mdi:fullscreen",title:"Fullscreen",alignment:"opposing",tap_action:l("fullscreen")}),n}render(){if(!this._config||!this._hass)return;const e=this._controller.getActionsManager().getMergedActions(),a=this._getButtons(),t=!1!==this._config.performance?.features.card_loading_indicator&&!this._controller.getMessageManager().hasMessage();return c`
      <ha-card
        id="ha-card"
        .actionHandler=${d({hasHold:g(e.hold_action),hasDoubleClick:g(e.double_tap_action)})}
        style="${m(this._controller.getStyleManager().getAspectRatioStyle())}"
        @advanced-camera-card-mini:message=${e=>this._controller.getMessageManager().setMessageIfHigherPriority(e.detail)}
        @advanced-camera-card-mini:media:loaded=${e=>this._controller.getMediaLoadedInfoManager().set(e.detail)}
        @advanced-camera-card-mini:media:unloaded=${()=>this._controller.getMediaLoadedInfoManager().clear()}
        @advanced-camera-card-mini:media:volumechange=${()=>this.requestUpdate()}
        @advanced-camera-card-mini:media:play=${()=>this.requestUpdate()}
        @advanced-camera-card-mini:media:pause=${()=>this.requestUpdate()}
        @advanced-camera-card-mini:focus=${()=>this.focus()}
      >
        ${t?c`<advanced-camera-card-mini-loading
              .loaded=${this._controller.getInitializationManager().wasEverInitialized()}
            ></advanced-camera-card-mini-loading>`:""}
        ${a.length?c`<advanced-camera-card-mini-menu
              ${h(this._refMenu)}
              .hass=${this._hass}
              .menuConfig=${{...this._config.menu,style:"outside",position:"top",alignment:"left"}}
              .buttons=${a}
            ></advanced-camera-card-mini-menu>`:""}
        <div class="main">
          ${this._controller.getMessageManager().hasMessage()?u(this._controller.getMessageManager().getMessage()):c`<advanced-camera-card-mini-live
                .hass=${this._hass}
                .viewManagerEpoch=${this._controller.getViewManager().getEpoch()}
                .liveConfig=${this._config.live}
                .cameraManager=${this._controller.getCameraManager()}
                .cardWideConfig=${this._controller.getConfigManager().getCardWideConfig()}
                .microphoneState=${this._controller.getMicrophoneManager().getState()}
              ></advanced-camera-card-mini-live>`}
        </div>
      </ha-card>
    `}static get styles(){return _(M)}getCardSize(){return 6}};y=t([i("advanced-camera-card-mini-ultra")],y);
