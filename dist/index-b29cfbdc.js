import{dW as e,_ as a,x as i,y as t,t as r,u as o,Y as n,dX as s,C as d,a4 as c,l,a0 as m,J as g,dY as h,v,dV as p,dZ as u,d_ as C,M as I,g as M,a8 as _,a2 as b}from"./card-c2e90b76.js";import{i as w}from"./media-dimensions-container-48f78f68.js";import{L as y,d as f,M as D,a as A,A as $}from"./dispatch-live-error-b00a8443.js";import{g as L}from"./live-provider-c1f370cc.js";class S{constructor(e){this._inBackground=!1,this._lastMediaLoadedInfo=null,this._handleMediaLoaded=e=>{this._lastMediaLoadedInfo={source:e.composedPath()[0],mediaLoadedInfo:e.detail},this._inBackground&&e.stopPropagation()},this._host=e,e.addController(this),this._intersectionObserver=new IntersectionObserver(this._intersectionHandler.bind(this))}hostConnected(){this._intersectionObserver.observe(this._host),this._host.addEventListener("advanced-camera-card-mini:media:loaded",this._handleMediaLoaded)}hostDisconnected(){this._intersectionObserver.disconnect(),this._host.removeEventListener("advanced-camera-card-mini:media:loaded",this._handleMediaLoaded)}isInBackground(){return this._inBackground}_intersectionHandler(a){const i=this._inBackground;this._inBackground=!a.some((e=>e.isIntersecting)),!this._inBackground&&this._lastMediaLoadedInfo&&e(this._lastMediaLoadedInfo.source,this._lastMediaLoadedInfo.mediaLoadedInfo),i!==this._inBackground&&this._host.requestUpdate()}}let N=class extends o{constructor(){super(),this.label="",this._isVideoMediaLoaded=!1,this._hasProviderError=!1,this._showStreamTroubleshooting=!1,this._refProvider=n(),this._lazyLoadController=new y(this),this._importPromises=[],this._lazyLoadController.addListener((e=>{e||(this._isVideoMediaLoaded=!1,s(this))}))}async getMediaPlayerController(){return await this.updateComplete,await(this._refProvider.value?.getMediaPlayerController())??null}_shouldShowImageDuringLoading(){return!(this._isVideoMediaLoaded||!this.camera?.getConfig()?.camera_entity||!this.hass||!this.liveConfig?.show_image_during_load||this._showStreamTroubleshooting||this._hasProviderError)}disconnectedCallback(){this._isVideoMediaLoaded=!1,super.disconnectedCallback()}_videoMediaShowHandler(){this._isVideoMediaLoaded=!0,this._showStreamTroubleshooting=!1}_providerErrorHandler(){this._hasProviderError=!0}willUpdate(e){if((e.has("liveConfig")||!this._lazyLoadController&&this.liveConfig)&&this._lazyLoadController.setConfiguration(this.liveConfig?.lazy_load,this.liveConfig?.lazy_unload),e.has("liveConfig")&&(this.liveConfig?.show_image_during_load&&this._importPromises.push(import("./image-6b37d9d2.js")),this.liveConfig?.zoomable&&this._importPromises.push(import("./zoomer-4a5bb56e.js"))),e.has("camera")){const e=L(this.camera?.getConfig());"jsmpeg"===e?this._importPromises.push(import("./jsmpeg-e8c6bca2.js")):"ha"===e?this._importPromises.push(import("./ha-27fbc9da.js")):"webrtc-card"===e?this._importPromises.push(import("./webrtc-card-793ba216.js")):"image"===e?this._importPromises.push(import("./image-6b37d9d2.js")):"go2rtc"===e&&this._importPromises.push(import("./index-ff9fac05.js"))}}async getUpdateComplete(){const e=await super.getUpdateComplete();return await Promise.all(this._importPromises),this._importPromises=[],e}_renderContainer(e){const a=this.camera?.getConfig(),i=d` <advanced-camera-card-mini-media-dimensions-container
      .dimensionsConfig=${a?.dimensions}
      @advanced-camera-card-mini:media:loaded=${e=>{e.detail.placeholder?e.stopPropagation():this._videoMediaShowHandler()}}
    >
      ${e}
    </advanced-camera-card-mini-media-dimensions-container>`;return d` ${this.liveConfig?.zoomable?d` <advanced-camera-card-mini-zoomer
          .defaultSettings=${w([a?.dimensions?.layout],(()=>a?.dimensions?.layout?{pan:a.dimensions.layout.pan,zoom:a.dimensions.layout.zoom}:void 0))}
          .settings=${this.zoomSettings}
          @advanced-camera-card-mini:zoom:zoomed=${async()=>(await this.getMediaPlayerController())?.setControls(!1)}
          @advanced-camera-card-mini:zoom:unzoomed=${async()=>(await this.getMediaPlayerController())?.setControls()}
        >
          ${i}
        </advanced-camera-card-mini-zoomer>`:i}`}render(){const e=this.camera?.getConfig();if(!(this._lazyLoadController?.isLoaded()&&this.hass&&this.liveConfig&&this.camera&&e))return;this.title=this.label,this.ariaLabel=this.label;const a=L(this.camera?.getConfig());if("ha"===a||"image"===a||e?.camera_entity&&e.always_error_if_entity_unavailable){if(!e?.camera_entity)return f(this),c({message:l("error.no_live_camera"),type:"error",icon:"mdi:camera",context:e});const a=this.hass.states[e.camera_entity];if(!a)return f(this),c({message:l("error.live_camera_not_found"),type:"error",icon:"mdi:camera",context:e});if("unavailable"===a.state)return f(this),s(this),c({message:`${l("error.live_camera_unavailable")}${this.label?`: ${this.label}`:""}`,type:"info",icon:"mdi:cctv-off",dotdotdot:!0})}const i=this._shouldShowImageDuringLoading(),t=!this._isVideoMediaLoaded,r={hidden:i};return d`${this._renderContainer(d`
      ${i||"image"===a?d` <advanced-camera-card-mini-live-image
            ${m(this._refProvider)}
            .hass=${this.hass}
            .cameraConfig=${e}
            class=${g({...r,hidden:!1})}
            @advanced-camera-card-mini:live:error=${()=>this._providerErrorHandler()}
            @advanced-camera-card-mini:media:loaded=${e=>{e.detail.placeholder="image"!==a}}
          >
          </advanced-camera-card-mini-live-image>`:d``}
      ${"ha"===a?d` <advanced-camera-card-mini-live-ha
            ${m(this._refProvider)}
            class=${g(r)}
            .hass=${this.hass}
            .cameraConfig=${e}
            ?controls=${this.liveConfig.controls.builtin}
            @advanced-camera-card-mini:live:error=${()=>this._providerErrorHandler()}
          >
          </advanced-camera-card-mini-live-ha>`:"go2rtc"===a?d`<advanced-camera-card-mini-live-go2rtc
              ${m(this._refProvider)}
              class=${g(r)}
              .hass=${this.hass}
              .camera=${this.camera}
              .cameraEndpoints=${this.cameraEndpoints}
              .microphoneState=${this.microphoneState}
              .microphoneConfig=${this.liveConfig.microphone}
              ?controls=${this.liveConfig.controls.builtin}
              @advanced-camera-card-mini:live:error=${()=>this._providerErrorHandler()}
            >
            </advanced-camera-card-mini-live-go2rtc>`:"webrtc-card"===a?d`<advanced-camera-card-mini-live-webrtc-card
                ${m(this._refProvider)}
                class=${g(r)}
                .hass=${this.hass}
                .cameraConfig=${e}
                .cameraEndpoints=${this.cameraEndpoints}
                .cardWideConfig=${this.cardWideConfig}
                ?controls=${this.liveConfig.controls.builtin}
                @advanced-camera-card-mini:live:error=${()=>this._providerErrorHandler()}
              >
              </advanced-camera-card-mini-live-webrtc-card>`:"jsmpeg"===a?d` <advanced-camera-card-mini-live-jsmpeg
                  ${m(this._refProvider)}
                  class=${g(r)}
                  .hass=${this.hass}
                  .cameraConfig=${e}
                  .cameraEndpoints=${this.cameraEndpoints}
                  .cardWideConfig=${this.cardWideConfig}
                  @advanced-camera-card-mini:live:error=${()=>this._providerErrorHandler()}
                >
                </advanced-camera-card-mini-live-jsmpeg>`:d``}
    `)}
    ${t?d`<advanced-camera-card-mini-icon
          title=${l("error.awaiting_live")}
          .icon=${{icon:"mdi:progress-helper"}}
          @click=${()=>{this._showStreamTroubleshooting=!this._showStreamTroubleshooting}}
        ></advanced-camera-card-mini-icon>`:""}
    ${this._showStreamTroubleshooting?c({type:"error",icon:"mdi:camera-off",message:l("error.stream_not_loading"),url:{link:h,title:l("error.troubleshooting")}},{overlay:!0}):""}`}static get styles(){return v(':host {\n  background-color: var(--advanced-camera-card-background);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoYjBhODQ4NjU0MSwgMjAyMi0xMi0wMSkiDQogICBzb2RpcG9kaTpkb2NuYW1lPSJpcmlzLW91dGxpbmUuc3ZnIg0KICAgaWQ9InN2ZzQiDQogICB2ZXJzaW9uPSIxLjEiDQogICB2aWV3Qm94PSIwIDAgMjQgMjQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCINCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczgiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9Im5hbWVkdmlldzYiDQogICAgIHBhZ2Vjb2xvcj0iI2I5M2UzZSINCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiDQogICAgIGJvcmRlcm9wYWNpdHk9IjAuMjUiDQogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIg0KICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC42MDc4NDMxNCINCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iZmFsc2UiDQogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICBpbmtzY2FwZTp6b29tPSIxOS4zNzg1NzgiDQogICAgIGlua3NjYXBlOmN4PSI4LjI4MjM0MTUiDQogICAgIGlua3NjYXBlOmN5PSIxMi4zNTkwMDgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMzg0MCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTUyNyINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjEwODAiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSIyMjciDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQiIC8+DQogIDxnDQogICAgIGlkPSJnMTExOSINCiAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eTowLjA1O2ZpbGw6I2ZmZmZmZiI+DQogICAgPGNpcmNsZQ0KICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjAuNDk3ODI4MjU7c3Ryb2tlLXdpZHRoOjEuMzk3Mjk7b3BhY2l0eTowLjUiDQogICAgICAgaWQ9InBhdGgxNzAiDQogICAgICAgY3g9IjEyIg0KICAgICAgIGN5PSIxMiINCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iQmFja2dyb3VuZCINCiAgICAgICByPSIxMS4yNSIgLz4NCiAgICA8cGF0aA0KICAgICAgIGQ9Ik0gMTMuNzMwMDAxLDE1IDkuODMwMDAwMywyMS43NiBDIDEwLjUzLDIxLjkxIDExLjI1LDIyIDEyLDIyIGMgMi40MDAwMDEsMCA0LjYsLTAuODUgNi4zMiwtMi4yNSBMIDE0LjY2MDAwMSwxMy40IE0gMi40NjAwMDAzLDE1IGMgMC45MiwyLjkyIDMuMTUsNS4yNiA1Ljk5LDYuMzQgTCAxMi4xMiwxNSBtIC0zLjU3OTk5OTcsLTMgLTMuOSwtNi43NDk5OTk2IGMgLTEuNjQsMS43NDk5OTkgLTIuNjQsNC4xMzk5OTkzIC0yLjY0LDYuNzQ5OTk5NiAwLDAuNjggMC4wNywxLjM1IDAuMiwyIGggNy40OSBNIDIxLjgsOS45OTk5OTk3IEggMTQuMzEwMDAxIEwgMTQuNjAwMDAxLDEwLjUgMTkuMzYsMTguNzUgQyAyMSwxNi45NyAyMiwxNC42IDIyLDEyIDIyLDExLjMxIDIxLjkzLDEwLjY0IDIxLjgsOS45OTk5OTk3IG0gLTAuMjYsLTEgQyAyMC42Miw2LjA3MDAwMDUgMTguMzksMy43NDAwMDAyIDE1LjU1MDAwMSwyLjY2MDAwMDIgTCAxMS44OCw4Ljk5OTk5OTcgTSA5LjQwMDAwMDMsMTAuNSAxNC4xNzAwMDEsMi4yNDAwMDAyIGMgLTAuNywtMC4xNSAtMS40MjAwMDEsLTAuMjQgLTIuMTcwMDAxLC0wLjI0IC0yLjM5OTk5OTcsMCAtNC41OTk5OTk3LDAuODQgLTYuMzE5OTk5NywyLjI1MDAwMDMgbCAzLjY2LDYuMzQ5OTk5NSB6Ig0KICAgICAgIGlkPSJwYXRoMiINCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iSXJpcyINCiAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjAuNTAyMjEwMDI7ZmlsbDojZmZmZmZmO29wYWNpdHk6MC43NSIgLz4NCiAgPC9nPg0KPC9zdmc+DQo=");\n  background-size: 10%;\n  background-position: center;\n}\n\n:host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.zoom-wrapper {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.hidden {\n  display: none;\n}\n\nadvanced-camera-card-icon {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n  color: var(--primary-color);\n  cursor: help;\n}')}};a([t({attribute:!1})],N.prototype,"hass",void 0),a([t({attribute:!1})],N.prototype,"camera",void 0),a([t({attribute:!1})],N.prototype,"cameraEndpoints",void 0),a([t({attribute:!1})],N.prototype,"liveConfig",void 0),a([t({attribute:!1})],N.prototype,"label",void 0),a([t({attribute:!1})],N.prototype,"cardWideConfig",void 0),a([t({attribute:!1})],N.prototype,"microphoneState",void 0),a([t({attribute:!1})],N.prototype,"zoomSettings",void 0),a([i()],N.prototype,"_isVideoMediaLoaded",void 0),a([i()],N.prototype,"_hasProviderError",void 0),a([i()],N.prototype,"_showStreamTroubleshooting",void 0),N=a([r("advanced-camera-card-mini-live-provider")],N);let z=class extends o{constructor(){super(...arguments),this._cameraToSlide={},this._refPTZControl=n(),this._refCarousel=n(),this._refSingle=n(),this._mediaActionsController=new D,this._mediaHeightController=new A(this,".embla__slide"),this._mediaHasLoaded=!1}connectedCallback(){super.connectedCallback(),this._mediaHeightController.setRoot(this.renderRoot),this.requestUpdate()}disconnectedCallback(){this._mediaActionsController.destroy(),this._mediaHeightController.destroy(),super.disconnectedCallback()}_getTransitionEffect(){return this.liveConfig?.transition_effect??p.live.transition_effect}_getSelectedCameraIndex(){if(this.viewFilterCameraID)return 0;const e=this.cameraManager?.getStore().getCameraIDsWithCapability("live"),a=this.viewManagerEpoch?.manager.getView();return e?.size&&a?Math.max(0,Array.from(e).indexOf(a.camera)):0}willUpdate(e){(e.has("microphoneState")||e.has("liveConfig"))&&this._mediaActionsController.setOptions({playerSelector:"advanced-camera-card-mini-live-provider",...this.liveConfig?.auto_play&&{autoPlayConditions:this.liveConfig.auto_play},...this.liveConfig?.auto_pause&&{autoPauseConditions:this.liveConfig.auto_pause},...this.liveConfig?.auto_mute&&{autoMuteConditions:this.liveConfig.auto_mute},...this.liveConfig?.auto_unmute&&{autoUnmuteConditions:this.liveConfig.auto_unmute},...(this.liveConfig?.auto_unmute||this.liveConfig?.auto_mute)&&{microphoneState:this.microphoneState,microphoneMuteSeconds:this.liveConfig.microphone.mute_after_microphone_mute_seconds}})}_getPlugins(){return[$()]}_getLazyLoadCount(){return!1===this.liveConfig?.lazy_load?null:0}_getSlides(){if(!this.cameraManager)return[[],{}];const e=this.viewManagerEpoch?.manager.getView(),a=this.viewFilterCameraID?new Set([this.viewFilterCameraID]):this.cameraManager?.getStore().getCameraIDsWithCapability("live"),i=[],t={};for(const r of a??[]){const a=this._renderLive(this._getSubstreamCameraID(r,e));a&&(t[r]=i.length,i.push(a))}return[i,t]}_setViewHandler(e){const a=this.cameraManager?.getStore().getCameraIDsWithCapability("live");a?.size&&e.detail.index!==this._getSelectedCameraIndex()&&this._setViewCameraID([...a][e.detail.index])}_setViewCameraID(e){e&&this.viewManagerEpoch?.manager.setViewByParametersWithNewQuery({params:{camera:e}})}_renderLive(e){const a=this.cameraManager?.getStore().getCamera(e);if(!(this.liveConfig&&this.hass&&this.cameraManager&&a))return;const i=this.cameraManager.getCameraMetadata(e),t=this.viewManagerEpoch?.manager.getView();return d`
      <div class="embla__slide">
        <advanced-camera-card-mini-live-provider
          .microphoneState=${t?.camera===e?this.microphoneState:void 0}
          .camera=${a}
          .cameraEndpoints=${w([this.cameraManager,e],(()=>this.cameraManager?.getCameraEndpoints(e)??void 0))}
          .label=${i?.title??""}
          .liveConfig=${this.liveConfig}
          .hass=${this.hass}
          .cardWideConfig=${this.cardWideConfig}
          .zoomSettings=${t?.context?.zoom?.[e]?.requested}
          @advanced-camera-card-mini:zoom:change=${a=>u(a,this.viewManagerEpoch?.manager,e)}
        >
        </advanced-camera-card-mini-live-provider>
      </div>
    `}_getSubstreamCameraID(e,a){return a?.context?.live?.overrides?.get(e)??e}_getCameraNeighbors(){const e=this.cameraManager?[...this.cameraManager?.getStore().getCameraIDsWithCapability("live")]:[],a=this.viewManagerEpoch?.manager.getView();if(this.viewFilterCameraID||e.length<=1||!a||!this.hass)return{};const i=this.viewFilterCameraID??a.camera,t=e.indexOf(i);if(t<0)return{};const r=e[t>0?t-1:e.length-1],o=e[t+1<e.length?t+1:0];return{previous:{id:r,metadata:r?this.cameraManager?.getCameraMetadata(this._getSubstreamCameraID(r,a)):null},next:{id:o,metadata:o?this.cameraManager?.getCameraMetadata(this._getSubstreamCameraID(o,a)):null}}}_renderNextPrevious(e,a){const i=C(this),t="ltr"===i&&"left"===e||"rtl"===i&&"right"===e?a?.previous:a?.next;return d`<advanced-camera-card-mini-next-previous-control
      slot=${e}
      .hass=${this.hass}
      .side=${e}
      .controlConfig=${this.liveConfig?.controls.next_previous}
      .label=${t?.metadata?.title??""}
      .icon=${t?.metadata?.icon}
      ?disabled=${!t}
      @click=${e=>{this._setViewCameraID(t?.id),I(e)}}
    >
    </advanced-camera-card-mini-next-previous-control>`}render(){const e=this.viewManagerEpoch?.manager.getView();if(!(this.liveConfig&&this.hass&&e&&this.cameraManager))return;const[a,i]=this._getSlides();if(this._cameraToSlide=i,!a.length)return;const t=a.length>1,r=this._getCameraNeighbors(),o=!(!this._mediaHasLoaded||this.viewFilterCameraID&&this.viewFilterCameraID!==e.camera||!1===e.context?.ptzControls?.enabled)&&e.context?.ptzControls?.enabled,n=()=>{this._mediaHasLoaded=!0,this._mediaHeightController.recalculate()},s=()=>{this._mediaHasLoaded=!1};return t?d`
      <advanced-camera-card-mini-carousel
        ${m(this._refCarousel)}
        .loop=${t}
        .dragEnabled=${t&&this.liveConfig?.draggable}
        .plugins=${w([this.cameraManager,this.liveConfig],this._getPlugins.bind(this))}
        .selected=${this._getSelectedCameraIndex()}
        .wheelScrolling=${this.liveConfig?.controls.wheel}
        transitionEffect=${this._getTransitionEffect()}
        @advanced-camera-card-mini:carousel:select=${this._setViewHandler.bind(this)}
        @advanced-camera-card-mini:media:loaded=${n}
        @advanced-camera-card-mini:media:unloaded=${s}
      >
        ${this._renderNextPrevious("left",r)}
        <!-- -->
        ${a}
        <!-- -->
        ${this._renderNextPrevious("right",r)}
      </advanced-camera-card-mini-carousel>
      <advanced-camera-card-mini-ptz
        .hass=${this.hass}
        .config=${this.liveConfig.controls.ptz}
        .cameraManager=${this.cameraManager}
        .cameraID=${M(e,this.viewFilterCameraID)}
        .forceVisibility=${o}
      >
      </advanced-camera-card-mini-ptz>
    `:d`
        <div
          ${m(this._refSingle)}
          class="single-live"
          @advanced-camera-card-mini:media:loaded=${n}
          @advanced-camera-card-mini:media:unloaded=${s}
        >
          ${a[0]}
        </div>
        <advanced-camera-card-mini-ptz
          .hass=${this.hass}
          .config=${this.liveConfig.controls.ptz}
          .cameraManager=${this.cameraManager}
          .cameraID=${M(e,this.viewFilterCameraID)}
          .forceVisibility=${o}
        >
        </advanced-camera-card-mini-ptz>
      `}_setMediaTarget(){const e=this.viewManagerEpoch?.manager.getView(),a=this._getSelectedCameraIndex();this.viewFilterCameraID?this._mediaActionsController.setTarget(a,e?.camera===this.viewFilterCameraID):this._mediaActionsController.setTarget(a,!0),this._mediaHeightController.setSelected(a)}updated(e){super.updated(e);const a=this._refCarousel.value??this._refSingle.value??null;(!!a&&this._mediaActionsController.setRoot(a)||e.has("viewManagerEpoch"))&&this._setMediaTarget()}static get styles(){return v(":host {\n  display: block;\n  --video-max-height: none;\n  transition: max-height 0.1s ease-in-out;\n  position: relative;\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  overflow: hidden;\n}\n\n:host(:not([grid-id])) {\n  height: 100%;\n}\n\n:host([unselected]) advanced-camera-card-carousel {\n  pointer-events: none;\n}\n\n.embla__slide {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex: 0 0 100%;\n}")}};a([t({attribute:!1})],z.prototype,"hass",void 0),a([t({attribute:!1})],z.prototype,"viewManagerEpoch",void 0),a([t({attribute:!1})],z.prototype,"liveConfig",void 0),a([t({attribute:!1})],z.prototype,"cardWideConfig",void 0),a([t({attribute:!1})],z.prototype,"cameraManager",void 0),a([t({attribute:!1})],z.prototype,"microphoneState",void 0),a([t({attribute:!1})],z.prototype,"viewFilterCameraID",void 0),a([i()],z.prototype,"_mediaHasLoaded",void 0),z=a([r("advanced-camera-card-mini-live-carousel")],z);let j=class extends o{_renderCarousel(e){const a=this.viewManagerEpoch?.manager.getView(),i=e??a?.camera,t=e?this.cameraManager?.getStore().getCameraConfig(e)?.dimensions?.grid?.width_factor:void 0;return d`
      <advanced-camera-card-mini-live-carousel
        grid-id=${_(e)}
        grid-width-factor=${_(t)}
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .viewFilterCameraID=${e}
        .liveConfig=${this.liveConfig}
        .cardWideConfig=${this.cardWideConfig}
        .cameraManager=${this.cameraManager}
        .microphoneState=${this.microphoneState}
        ?triggered=${i&&!!this.triggeredCameraIDs?.has(i)}
      >
      </advanced-camera-card-mini-live-carousel>
    `}_gridSelectCamera(e){this.viewManagerEpoch?.manager.setViewByParameters({params:{camera:e}})}_needsGrid(){const e=this.cameraManager?.getStore().getCameraIDsWithCapability("live"),a=this.viewManagerEpoch?.manager.getView();return!!a?.isGrid()&&!!a?.supportsMultipleDisplayModes()&&!!e&&e.size>1}willUpdate(e){e.has("viewManagerEpoch")&&this._needsGrid()&&import("./media-grid-c145283e.js")}render(){const e=this.cameraManager?.getStore().getCameraIDsWithCapability("live");return e?.size&&this._needsGrid()?d`
      <advanced-camera-card-mini-media-grid
        .selected=${this.viewManagerEpoch?.manager.getView()?.camera}
        .displayConfig=${this.liveConfig?.display}
        @advanced-camera-card-mini:media-grid:selected=${e=>this._gridSelectCamera(e.detail.selected)}
      >
        ${[...e].map((e=>this._renderCarousel(e)))}
      </advanced-camera-card-mini-media-grid>
    `:this._renderCarousel()}static get styles(){return v(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n@keyframes warning-pulse {\n  0% {\n    border: solid 2px var(--trigger-border-color-base);\n  }\n  50% {\n    border: solid 2px var(--trigger-border-color);\n  }\n  100% {\n    border: solid 2px var(--trigger-border-color-base);\n  }\n}\nadvanced-camera-card-mini-live-carousel {\n  --trigger-border-color: var(--advanced-camera-card-trigger-border-color);\n  --trigger-border-color-base: var(\n    --advanced-camera-card-trigger-border-color-base,\n    black\n  );\n}\n\nadvanced-camera-card-mini-live-carousel[triggered] {\n  animation: warning-pulse 5s infinite;\n}\n\nadvanced-camera-card-mini-live-carousel[selected] {\n  --trigger-border-color-base: var(\n    --advanced-camera-card-trigger-border-color-base,\n    var(--advanced-camera-card-foreground-primary)\n  );\n}")}};a([t({attribute:!1})],j.prototype,"hass",void 0),a([t({attribute:!1})],j.prototype,"viewManagerEpoch",void 0),a([t({attribute:!1})],j.prototype,"liveConfig",void 0),a([t({attribute:!1})],j.prototype,"cardWideConfig",void 0),a([t({attribute:!1})],j.prototype,"cameraManager",void 0),a([t({attribute:!1})],j.prototype,"microphoneState",void 0),a([t({attribute:!1})],j.prototype,"triggeredCameraIDs",void 0),j=a([r("advanced-camera-card-mini-live-grid")],j);let x=class extends o{constructor(){super(...arguments),this._controller=new S(this)}render(){if(this.hass&&this.cameraManager)return d`
      <advanced-camera-card-mini-live-grid
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .liveConfig=${this.liveConfig}
        .inBackground=${this._controller.isInBackground()}
        .cardWideConfig=${this.cardWideConfig}
        .cameraManager=${this.cameraManager}
        .microphoneState=${this.microphoneState}
        .triggeredCameraIDs=${this.triggeredCameraIDs}
      >
      </advanced-camera-card-mini-live-grid>
    `}static get styles(){return v(b)}};a([t({attribute:!1})],x.prototype,"hass",void 0),a([t({attribute:!1})],x.prototype,"viewManagerEpoch",void 0),a([t({attribute:!1})],x.prototype,"liveConfig",void 0),a([t({attribute:!1})],x.prototype,"cameraManager",void 0),a([t({attribute:!1})],x.prototype,"cardWideConfig",void 0),a([t({attribute:!1})],x.prototype,"microphoneState",void 0),a([t({attribute:!1})],x.prototype,"triggeredCameraIDs",void 0),x=a([r("advanced-camera-card-mini-live")],x);export{x as AdvancedCameraCardLive};
