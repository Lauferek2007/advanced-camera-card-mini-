import{g as e,R as a,_ as t,t as i,s as n,C as r,e as s,c as o,a as l,x as c,b as d,h as g,o as m,n as h,r as u,d as _,f,i as p,j as v,k as M}from"./card-ec49c919.js";import"./index-f4ee202f.js";import"./media-dimensions-container-38e697dd.js";import"./dispatch-live-error-6283630e.js";import"./live-provider-4878ee40.js";const C=e=>{const a=f(e),t=Array.isArray(p(a,"profiles"))?p(a,"profiles").filter((e=>"string"==typeof e)):[];return v(a,"profiles",Array.from(new Set([...t,"low-performance"]))),v(a,"view.default","live"),v(a,"view.default_cycle_camera",!1),v(a,"view.triggers.show_trigger_status",!1),v(a,"live.display.mode","single"),v(a,"live.preload",!1),v(a,"live.draggable",!1),v(a,"live.zoomable",!1),v(a,"live.show_image_during_load",!1),v(a,"live.transition_effect","none"),v(a,"live.controls.builtin",!1),v(a,"live.controls.wheel",!1),v(a,"live.controls.next_previous.style","none"),v(a,"live.controls.ptz.mode","off"),v(a,"live.controls.thumbnails.mode","none"),v(a,"live.controls.timeline.mode","none"),v(a,"menu.style","outside"),v(a,"status_bar.style","none"),v(a,"cameras_global.capabilities.disable_except",["live","menu"]),v(a,"cameras_global.image.refresh_seconds",15),a};console.info(`%c Advanced Camera Card Ultra %c ${e()} `,"padding: 3px; color: black; background: pink;","padding: 3px; color: black; background: white;"),window.customCards=window.customCards||[],window.customCards.push({type:"advanced-camera-card-mini-ultra",name:"Advanced Camera Card Mini Ultra",description:"Live-only variant with a much smaller feature surface",preview:!0,documentationURL:a});let y=class extends n{constructor(){super(...arguments),this._controller=new r(this,(()=>{}),(()=>this._refMenu.value?.toggleMenu()),(()=>null)),this._refMenu=s()}get _config(){return this._controller.getConfigManager().getConfig()}get _hass(){return this._controller.getHASSManager().getHASS()}set hass(e){this._controller.getHASSManager().setHASS(e),this._refMenu.value&&(this._refMenu.value.hass=e)}set isPanel(e){this._controller.getConditionStateManager().setState({panel:e})}get isPanel(){return!!this._controller.getConditionStateManager().getState().panel}static async getConfigElement(){return await r.getConfigElement()}static getStubConfig(e,a){return C(r.getStubConfig(a))}setConfig(e){this._controller.getConfigManager().setConfig(C(e))}shouldUpdate(){return!!this.isConnected&&(this._controller.getMessageManager().hasMessage()||this._controller.getInitializationManager().isInitializedMandatory()||this._controller.getInitializationManager().initializeMandatory(),!0)}_getButtons(){const e=this._config,a=this._hass,t=this._controller.getViewManager().getView(),i=this._controller.getCameraManager();if(!e||!a)return[];const n=[],r=i.getStore().getCameraIDsWithCapability("menu");return r.size>1&&n.push({type:"custom:advanced-camera-card-mini-menu-submenu",enabled:!0,icon:"mdi:video-switch",title:"Cameras",items:[...r].map((e=>{const a=i.getCameraMetadata(e);return{enabled:!0,icon:a?.icon.icon,entity:a?.icon.entity,state_color:!0,title:a?.title,selected:t?.camera===e,tap_action:o("camera_select",e)}}))}),this._controller.getFullscreenManager().isSupported()&&n.push({type:"custom:advanced-camera-card-mini-menu-icon",enabled:!0,icon:this._controller.getFullscreenManager().isInFullscreen()?"mdi:fullscreen-exit":"mdi:fullscreen",title:"Fullscreen",alignment:"opposing",tap_action:l("fullscreen")}),n}render(){if(!this._config||!this._hass)return;const e=this._controller.getActionsManager().getMergedActions(),a=this._getButtons(),t=!1!==this._config.performance?.features.card_loading_indicator&&!this._controller.getMessageManager().hasMessage();return c`
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
