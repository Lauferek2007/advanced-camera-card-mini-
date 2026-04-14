import{_ as e,l as i,t as a,s as t,e as r,x as s,n,a9 as o,ac as d,aa as l,ab as c,aJ as h,d as g,ad as m,am as u,Q as v,eG as C,eH as p,eI as w,aB as M,aC as y,ah as I,H as _,ae as b,eJ as f,ey as D,ew as A,eK as N,ax as x,eE as $,K as j,r as L,G as k,m as z}from"./card-ec49c919.js";import"./image-player-df8a33e8.js";import{i as T}from"./media-dimensions-container-38e697dd.js";import{L as E,M as S,a as Z,A as P}from"./dispatch-live-error-6283630e.js";import{V as G,h as Q,M as R,m as O}from"./audio-a95c18e7.js";let Y=class extends t{constructor(){super(...arguments),this.controls=!1,this._refVideo=r(),this._mediaPlayerController=new G(this,(()=>this._refVideo.value??null),(()=>this.controls))}async getMediaPlayerController(){return this._mediaPlayerController}render(){return s`
      <video
        ${n(this._refVideo)}
        muted
        playsinline
        crossorigin="anonymous"
        ?autoplay=${!1}
        ?controls=${this.controls}
        @loadedmetadata=${e=>{e.target&&this.controls&&Q(e.target,R)}}
        @loadeddata=${e=>{o(this,e,{...this._mediaPlayerController&&{mediaPlayerController:this._mediaPlayerController},capabilities:{supportsPause:!0,hasAudio:O(e.target)},technology:["mp4"]})}}
        @volumechange=${()=>d(this)}
        @play=${()=>l(this)}
        @pause=${()=>c(this)}
      >
        <source src="${h(this.url)}" type="video/mp4" />
      </video>
    `}static get styles(){return g(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\nvideo {\n  width: 100%;\n  height: 100%;\n  display: block;\n  object-fit: var(--advanced-camera-card-media-layout-fit, contain);\n  object-position: var(--advanced-camera-card-media-layout-position-x, 50%) var(--advanced-camera-card-media-layout-position-y, 50%);\n  object-view-box: inset(var(--advanced-camera-card-media-layout-view-box-top, 0%) var(--advanced-camera-card-media-layout-view-box-right, 0%) var(--advanced-camera-card-media-layout-view-box-bottom, 0%) var(--advanced-camera-card-media-layout-view-box-left, 0%));\n}")}};e([i()],Y.prototype,"url",void 0),e([i({type:Boolean})],Y.prototype,"controls",void 0),Y=e([a("advanced-camera-card-mini-video-player")],Y);let V=class extends t{constructor(){super(),this._refProvider=r(),this._refContainer=r(),this._lazyLoadController=new E(this),this._url=null,this._lazyLoadController.addListener((e=>e&&this._setURL()))}async getMediaPlayerController(){return await this.updateComplete,await(this._refProvider.value?.getMediaPlayerController())??null}async _switchToRelatedClipView(){const e=this.viewManagerEpoch?.manager.getView();if(!(this.hass&&e&&this.cameraManager&&this.media&&u.isEvent(this.media)&&v.isEventQuery(e.query)))return;const i=e.query.clone();i.convertToClipsQueries();i.getQuery()&&await(this.viewManagerEpoch?.manager.setViewByParametersWithExistingQuery({params:{view:"media",query:i},queryExecutorOptions:{selectResult:{id:this.media.getID()??void 0},rejectResults:e=>!e.hasSelectedResult()}}))}async _setURL(){const e=this.media?.getContentID();if(!(this.media&&e&&this.hass&&this._lazyLoadController?.isLoaded()))return;let i=this.resolvedMediaCache?.get(e)??null;if(i||(i=await C(this.hass,e,this.resolvedMediaCache)),!i)return;const a=i.url;if(p(a))return void(this._url=w(this.hass,a));const t=this.media.getCameraID(),r=t?this.cameraManager?.getStore().getCamera(t):null,s=r?.getProxyConfig();if(s)try{const e={endpoint:a,sign:!1},i=await M(this.hass,e,s,{context:"media",openLimit:0});i.sign?this._url=await y(this.hass,i.endpoint):this._url=i.endpoint}catch(e){I(e)}else this._url=a}willUpdate(e){(e.has("viewerConfig")||!this._lazyLoadController&&this.viewerConfig)&&this._lazyLoadController.setConfiguration(this.viewerConfig?.lazy_load),(e.has("media")||e.has("viewerConfig")||e.has("resolvedMediaCache")||e.has("hass"))&&this._setURL(),e.has("viewerConfig")&&this.viewerConfig?.zoomable&&import("./zoomer-69a2b4c8.js")}_getRelevantCameraConfig(){const e=this.media?.getCameraID();return e?this.cameraManager?.getStore().getCameraConfig(e)??null:null}_renderContainer(e){if(!this.media)return e;const i=this.media.getCameraID(),a=this.media.getID()??void 0,t=i?this.cameraManager?.getStore().getCameraConfig(i)??null:null,r=this.viewManagerEpoch?.manager.getView(),n=s` <advanced-camera-card-mini-media-dimensions-container
      .dimensionsConfig=${this._getRelevantCameraConfig()?.dimensions}
    >
      ${e}
    </advanced-camera-card-mini-media-dimensions-container>`;return s`
      ${this.viewerConfig?.zoomable?s`<advanced-camera-card-mini-zoomer
            .defaultSettings=${T([t?.dimensions?.layout],(()=>t?.dimensions?.layout?{pan:t.dimensions.layout.pan,zoom:t.dimensions.layout.zoom}:void 0))}
            .settings=${a?r?.context?.zoom?.[a]?.requested:void 0}
            @advanced-camera-card-mini:zoom:zoomed=${async()=>(await this.getMediaPlayerController())?.setControls(!1)}
            @advanced-camera-card-mini:zoom:unzoomed=${async()=>(await this.getMediaPlayerController())?.setControls()}
            @advanced-camera-card-mini:zoom:change=${e=>_(e,this.viewManagerEpoch?.manager,a)}
          >
            ${n}
          </advanced-camera-card-mini-zoomer>`:n}
    `}render(){if(this._lazyLoadController?.isLoaded()&&this.media&&this.hass&&this.viewerConfig)return this._url?this._renderContainer(s`
      ${u.isVideo(this.media)?this.media.getVideoContentType()===f.HLS?s`<advanced-camera-card-mini-ha-hls-player
              ${n(this._refProvider)}
              allow-exoplayer
              aria-label="${this.media.getTitle()??""}"
              ?autoplay=${!1}
              controls
              muted
              playsinline
              title="${this.media.getTitle()??""}"
              url=${this._url}
              .hass=${this.hass}
              ?controls=${this.viewerConfig.controls.builtin}
            >
            </advanced-camera-card-mini-ha-hls-player>`:s`
              <advanced-camera-card-mini-video-player
                ${n(this._refProvider)}
                url=${this._url}
                aria-label="${this.media.getTitle()??""}"
                title="${this.media.getTitle()??""}"
                ?controls=${this.viewerConfig.controls.builtin}
              >
              </advanced-camera-card-mini-video-player>
            `:s`<advanced-camera-card-mini-image-player
            ${n(this._refProvider)}
            url="${this._url}"
            aria-label="${this.media.getTitle()??""}"
            title="${this.media.getTitle()??""}"
            @click=${()=>{this.viewerConfig?.snapshot_click_plays_clip&&this._switchToRelatedClipView()}}
          ></advanced-camera-card-mini-image-player>`}
    `):b({cardWideConfig:this.cardWideConfig})}static get styles(){return g(':host {\n  background-color: var(--advanced-camera-card-background);\n  background-position: center;\n  background-repeat: no-repeat;\n  background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+DQo8c3ZnDQogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjIuMiAoYjBhODQ4NjU0MSwgMjAyMi0xMi0wMSkiDQogICBzb2RpcG9kaTpkb2NuYW1lPSJpcmlzLW91dGxpbmUuc3ZnIg0KICAgaWQ9InN2ZzQiDQogICB2ZXJzaW9uPSIxLjEiDQogICB2aWV3Qm94PSIwIDAgMjQgMjQiDQogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSINCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCINCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyINCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KICA8ZGVmcw0KICAgICBpZD0iZGVmczgiIC8+DQogIDxzb2RpcG9kaTpuYW1lZHZpZXcNCiAgICAgaWQ9Im5hbWVkdmlldzYiDQogICAgIHBhZ2Vjb2xvcj0iI2I5M2UzZSINCiAgICAgYm9yZGVyY29sb3I9IiMwMDAwMDAiDQogICAgIGJvcmRlcm9wYWNpdHk9IjAuMjUiDQogICAgIGlua3NjYXBlOnNob3dwYWdlc2hhZG93PSIyIg0KICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC42MDc4NDMxNCINCiAgICAgaW5rc2NhcGU6cGFnZWNoZWNrZXJib2FyZD0iZmFsc2UiDQogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSINCiAgICAgc2hvd2dyaWQ9ImZhbHNlIg0KICAgICBpbmtzY2FwZTp6b29tPSIxOS4zNzg1NzgiDQogICAgIGlua3NjYXBlOmN4PSI4LjI4MjM0MTUiDQogICAgIGlua3NjYXBlOmN5PSIxMi4zNTkwMDgiDQogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMzg0MCINCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTUyNyINCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjEwODAiDQogICAgIGlua3NjYXBlOndpbmRvdy15PSIyMjciDQogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiDQogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzQiIC8+DQogIDxnDQogICAgIGlkPSJnMTExOSINCiAgICAgc3R5bGU9ImZpbGwtb3BhY2l0eTowLjA1O2ZpbGw6I2ZmZmZmZiI+DQogICAgPGNpcmNsZQ0KICAgICAgIHN0eWxlPSJkaXNwbGF5OmlubGluZTtmaWxsOiMwMDAwMDA7ZmlsbC1vcGFjaXR5OjAuNDk3ODI4MjU7c3Ryb2tlLXdpZHRoOjEuMzk3Mjk7b3BhY2l0eTowLjUiDQogICAgICAgaWQ9InBhdGgxNzAiDQogICAgICAgY3g9IjEyIg0KICAgICAgIGN5PSIxMiINCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iQmFja2dyb3VuZCINCiAgICAgICByPSIxMS4yNSIgLz4NCiAgICA8cGF0aA0KICAgICAgIGQ9Ik0gMTMuNzMwMDAxLDE1IDkuODMwMDAwMywyMS43NiBDIDEwLjUzLDIxLjkxIDExLjI1LDIyIDEyLDIyIGMgMi40MDAwMDEsMCA0LjYsLTAuODUgNi4zMiwtMi4yNSBMIDE0LjY2MDAwMSwxMy40IE0gMi40NjAwMDAzLDE1IGMgMC45MiwyLjkyIDMuMTUsNS4yNiA1Ljk5LDYuMzQgTCAxMi4xMiwxNSBtIC0zLjU3OTk5OTcsLTMgLTMuOSwtNi43NDk5OTk2IGMgLTEuNjQsMS43NDk5OTkgLTIuNjQsNC4xMzk5OTkzIC0yLjY0LDYuNzQ5OTk5NiAwLDAuNjggMC4wNywxLjM1IDAuMiwyIGggNy40OSBNIDIxLjgsOS45OTk5OTk3IEggMTQuMzEwMDAxIEwgMTQuNjAwMDAxLDEwLjUgMTkuMzYsMTguNzUgQyAyMSwxNi45NyAyMiwxNC42IDIyLDEyIDIyLDExLjMxIDIxLjkzLDEwLjY0IDIxLjgsOS45OTk5OTk3IG0gLTAuMjYsLTEgQyAyMC42Miw2LjA3MDAwMDUgMTguMzksMy43NDAwMDAyIDE1LjU1MDAwMSwyLjY2MDAwMDIgTCAxMS44OCw4Ljk5OTk5OTcgTSA5LjQwMDAwMDMsMTAuNSAxNC4xNzAwMDEsMi4yNDAwMDAyIGMgLTAuNywtMC4xNSAtMS40MjAwMDEsLTAuMjQgLTIuMTcwMDAxLC0wLjI0IC0yLjM5OTk5OTcsMCAtNC41OTk5OTk3LDAuODQgLTYuMzE5OTk5NywyLjI1MDAwMDMgbCAzLjY2LDYuMzQ5OTk5NSB6Ig0KICAgICAgIGlkPSJwYXRoMiINCiAgICAgICBpbmtzY2FwZTpsYWJlbD0iSXJpcyINCiAgICAgICBzdHlsZT0iZmlsbC1vcGFjaXR5OjAuNTAyMjEwMDI7ZmlsbDojZmZmZmZmO29wYWNpdHk6MC43NSIgLz4NCiAgPC9nPg0KPC9zdmc+DQo=");\n  background-size: 10%;\n  background-position: center;\n}\n\n:host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\n.zoom-wrapper {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\nadvanced-camera-card-progress-indicator {\n  padding: 30px;\n  box-sizing: border-box;\n}')}};e([i({attribute:!1})],V.prototype,"hass",void 0),e([i({attribute:!1})],V.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],V.prototype,"media",void 0),e([i({attribute:!1})],V.prototype,"viewerConfig",void 0),e([i({attribute:!1})],V.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],V.prototype,"cameraManager",void 0),e([i({attribute:!1})],V.prototype,"cardWideConfig",void 0),e([m()],V.prototype,"_url",void 0),V=e([a("advanced-camera-card-mini-viewer-provider")],V);let W=class extends t{constructor(){super(...arguments),this.showControls=!0,this._selected=null,this._media=null,this._mediaActionsController=new S,this._mediaHeightController=new Z(this,".embla__slide"),this._loadedMediaPlayerController=null,this._refCarousel=r()}connectedCallback(){super.connectedCallback(),this._mediaHeightController.setRoot(this.renderRoot),this.requestUpdate()}disconnectedCallback(){this._mediaActionsController.destroy(),this._mediaHeightController.destroy(),super.disconnectedCallback()}_getTransitionEffect(){return this.viewerConfig?.transition_effect??A.media_viewer.transition_effect}_getPlugins(){return[P()]}_getMediaNeighbors(){const e=this._media?.length??0;if(!this._media||null===this._selected)return null;const i=this._selected>0?this._selected-1:null,a=this._selected+1<e?this._selected+1:null;return{...null!==i&&{previous:{index:i,media:this._media[i]}},...null!==a&&{next:{index:a,media:this._media[a]}}}}_setViewSelectedIndex(e){const i=this.viewManagerEpoch?.manager.getView();if(!this._media||!i)return;if(this._selected===e)return;const a=i?.queryResults?.clone().selectResultIfFound((i=>i===this._media?.[e]),{main:!0,cameraID:this.viewFilterCameraID});if(!a)return;const t=a.getSelectedResult(this.viewFilterCameraID),r=u.isMedia(t)?t.getCameraID():null;this.viewManagerEpoch?.manager.setViewByParameters({params:{queryResults:a,...r&&{camera:r}},modifiers:[new N("mediaViewer","seek")]})}_getSlides(){if(!this._media)return[];const e=[];for(let i=0;i<this._media.length;++i){const a=this._media[i];if(a){const t=this._renderMediaItem(a);t&&(e[i]=t)}}return e}willUpdate(e){if(e.has("viewerConfig")&&this._mediaActionsController.setOptions({playerSelector:"advanced-camera-card-mini-viewer-provider",...this.viewerConfig?.auto_play&&{autoPlayConditions:this.viewerConfig.auto_play},...this.viewerConfig?.auto_pause&&{autoPauseConditions:this.viewerConfig.auto_pause},...this.viewerConfig?.auto_mute&&{autoMuteConditions:this.viewerConfig.auto_mute},...this.viewerConfig?.auto_unmute&&{autoUnmuteConditions:this.viewerConfig.auto_unmute}}),e.has("viewManagerEpoch")){const e=this.viewManagerEpoch?.manager.getView();e?.context?.mediaViewer?.seek||x(this,!1,"unseekable");const i=this.viewManagerEpoch?.oldView,a=i?.queryResults?.getResults(this.viewFilterCameraID)??null,t=e?.queryResults?.getResults(this.viewFilterCameraID)??null;let r=!1;this._media&&a===t||(this._media=t?.filter((e=>u.isMedia(e)))??null,r=!0);const s=i?.queryResults?.getSelectedResult(this.viewFilterCameraID),n=e?.queryResults?.getSelectedResult(this.viewFilterCameraID);if(s!==n||r){const e=this._media?.findIndex((e=>e===n))??null;this._selected=e??(this._media&&this._media.length?this._media.length-1:null)}}}_renderNextPrevious(e,i){const a=e=>{if(!i||!this._media)return;const a=("previous"===e?i.previous?.index:i.next?.index)??null;null!==a&&this._setViewSelectedIndex(a)},t=$(this),r="ltr"===t&&"left"===e||"rtl"===t&&"right"===e?"previous":"next";return s` <advanced-camera-card-mini-next-previous-control
      slot=${e}
      .hass=${this.hass}
      .side=${e}
      .controlConfig=${this.viewerConfig?.controls.next_previous}
      .thumbnail=${i?.[r]?.media.getThumbnail()??void 0}
      .label=${i?.[r]?.media.getTitle()??""}
      ?disabled=${!i?.[r]}
      @click=${e=>{a(r),j(e)}}
    ></advanced-camera-card-mini-next-previous-control>`}render(){const e=this._media?.length??0;if(!this._media||!e)return L({message:k("common.no_media"),type:"info",icon:"mdi:multimedia",...this.viewFilterCameraID&&{context:{camera_id:this.viewFilterCameraID}}});if(!this.hass||!this.cameraManager||null===this._selected)return;const i=this._getMediaNeighbors(),a=this.viewManagerEpoch?.manager.getView();return s`
      <advanced-camera-card-mini-carousel
        ${n(this._refCarousel)}
        .dragEnabled=${this.viewerConfig?.draggable??!0}
        .plugins=${T([this.viewerConfig,this._media],this._getPlugins.bind(this))}
        .selected=${this._selected}
        .wheelScrolling=${this.viewerConfig?.controls.wheel}
        transitionEffect=${this._getTransitionEffect()}
        @advanced-camera-card-mini:carousel:select=${e=>{this._setViewSelectedIndex(e.detail.index)}}
        @advanced-camera-card-mini:media:loaded=${e=>{this._loadedMediaPlayerController=e.detail.mediaPlayerController??null,this._mediaHeightController.recalculate(),this._seekHandler()}}
        @advanced-camera-card-mini:media:unloaded=${()=>{this._loadedMediaPlayerController=null}}
      >
        ${this.showControls?this._renderNextPrevious("left",i):""}
        ${T([this._media,a],(()=>this._getSlides()))}
        ${this.showControls?this._renderNextPrevious("right",i):""}
      </advanced-camera-card-mini-carousel>
      ${a?s` <advanced-camera-card-mini-ptz
            .hass=${this.hass}
            .config=${this.viewerConfig?.controls.ptz}
            .forceVisibility=${a?.context?.ptzControls?.enabled}
          >
          </advanced-camera-card-mini-ptz>`:""}
      <div class="seek-warning">
        <advanced-camera-card-mini-icon
          title="${k("media_viewer.unseekable")}"
          .icon=${{icon:"mdi:clock-remove"}}
        >
        </advanced-camera-card-mini-icon>
      </div>
    `}updated(e){super.updated(e);(!!this._refCarousel.value&&this._mediaActionsController.setRoot(this._refCarousel.value)||e.has("viewManagerEpoch"))&&this._setMediaTarget(),e.has("viewManagerEpoch")&&this.viewManagerEpoch?.manager.getView()?.context?.mediaViewer!==this.viewManagerEpoch?.oldView?.context?.mediaViewer&&this._seekHandler()}_setMediaTarget(){this._media?.length&&null!==this._selected?(this._mediaActionsController.setTarget(this._selected,!this.viewFilterCameraID||this.viewManagerEpoch?.manager.getView()?.camera===this.viewFilterCameraID),this._mediaHeightController.setSelected(this._selected)):this._mediaActionsController.unsetTarget()}async _seekHandler(){const e=this.viewManagerEpoch?.manager.getView(),i=e?.context?.mediaViewer?.seek;if(!(this.hass&&i&&this._media&&this._loadedMediaPlayerController&&null!==this._selected))return;const a=this._media[this._selected];if(!a)return;const t=a.includesTime(i);x(this,!t,"unseekable"),t||this._loadedMediaPlayerController.isPaused()?t&&this._loadedMediaPlayerController.isPaused()&&this._loadedMediaPlayerController.play():this._loadedMediaPlayerController.pause();const r=await(this.cameraManager?.getMediaSeekTime(a,i))??null;null!==r&&this._loadedMediaPlayerController.seek(r)}_renderMediaItem(e){const i=this.viewManagerEpoch?.manager.getView();return this.hass&&i&&this.viewerConfig?s` <div class="embla__slide">
      <advanced-camera-card-mini-viewer-provider
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .media=${e}
        .viewerConfig=${this.viewerConfig}
        .resolvedMediaCache=${this.resolvedMediaCache}
        .cameraManager=${this.cameraManager}
        .cardWideConfig=${this.cardWideConfig}
      ></advanced-camera-card-mini-viewer-provider>
    </div>`:null}static get styles(){return g(":host {\n  display: block;\n  --video-max-height: none;\n  transition: max-height 0.1s ease-in-out;\n  position: relative;\n  border-radius: var(--advanced-camera-card-border-radius-final);\n  overflow: hidden;\n}\n\n:host(:not([grid-id])) {\n  height: 100%;\n}\n\n:host([unselected]) advanced-camera-card-carousel,\n:host([unselected]) .seek-warning {\n  pointer-events: none;\n}\n\n:host([unseekable]) advanced-camera-card-carousel {\n  filter: brightness(50%);\n}\n\n:host([unseekable]) .seek-warning {\n  display: block;\n}\n\n.seek-warning {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translateX(-50%) translateY(-50%);\n  color: white;\n}\n\n.embla__slide {\n  display: flex;\n  height: 100%;\n  width: 100%;\n  flex: 0 0 100%;\n}")}};e([i({attribute:!1})],W.prototype,"hass",void 0),e([i({attribute:!1})],W.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],W.prototype,"viewFilterCameraID",void 0),e([i({attribute:!1,hasChanged:D})],W.prototype,"viewerConfig",void 0),e([i({attribute:!1})],W.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],W.prototype,"cardWideConfig",void 0),e([i({attribute:!1})],W.prototype,"cameraManager",void 0),e([i({attribute:!1})],W.prototype,"showControls",void 0),e([m()],W.prototype,"_selected",void 0),W=e([a("advanced-camera-card-mini-viewer-carousel")],W);let B=class extends t{_renderCarousel(e){const i=this.viewManagerEpoch?.manager.getView()?.camera,a=e?this.cameraManager?.getStore().getCameraConfig(e)?.dimensions?.grid?.width_factor:void 0;return s`
      <advanced-camera-card-mini-viewer-carousel
        grid-id=${h(e)}
        grid-width-factor=${h(a)}
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .viewFilterCameraID=${e}
        .viewerConfig=${this.viewerConfig}
        .resolvedMediaCache=${this.resolvedMediaCache}
        .cameraManager=${this.cameraManager}
        .cardWideConfig=${this.cardWideConfig}
        .showControls=${!e||i===e}
      >
      </advanced-camera-card-mini-viewer-carousel>
    `}willUpdate(e){e.has("viewManagerEpoch")&&this._needsGrid()&&import("./media-grid-50a4aff6.js")}_needsGrid(){const e=this.viewManagerEpoch?.manager.getView(),i=e?.queryResults?.getCameraIDs();return!!e?.isGrid()&&!!e?.supportsMultipleDisplayModes()&&(i?.size??0)>1}_gridSelectCamera(e){const i=this.viewManagerEpoch?.manager.getView();this.viewManagerEpoch?.manager.setViewByParameters({params:{camera:e,queryResults:i?.queryResults?.clone().promoteCameraSelectionToMainSelection(e)}})}render(){const e=this.viewManagerEpoch?.manager.getView(),i=e?.queryResults?.getCameraIDs();return i&&this._needsGrid()?s`
      <advanced-camera-card-mini-media-grid
        .selected=${e?.camera}
        .displayConfig=${this.viewerConfig?.display}
        @advanced-camera-card-mini:media-grid:selected=${e=>this._gridSelectCamera(e.detail.selected)}
      >
        ${[...i].map((e=>this._renderCarousel(e)))}
      </advanced-camera-card-mini-media-grid>
    `:this._renderCarousel()}static get styles(){return g(z)}};e([i({attribute:!1})],B.prototype,"hass",void 0),e([i({attribute:!1})],B.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],B.prototype,"viewerConfig",void 0),e([i({attribute:!1})],B.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],B.prototype,"cardWideConfig",void 0),e([i({attribute:!1})],B.prototype,"cameraManager",void 0),B=e([a("advanced-camera-card-mini-viewer-grid")],B);let U=class extends t{constructor(){super(...arguments),this.isEmpty=!1}willUpdate(e){if(e.has("viewManagerEpoch")){const e=this.viewManagerEpoch?.manager.getView();this.isEmpty=!e?.queryResults?.getResults()?.filter((e=>u.isMedia(e))).length}}render(){if(this.hass&&this.viewManagerEpoch&&this.viewerConfig&&this.cameraManager&&this.cardWideConfig){if(this.isEmpty){const e=!!this.viewManagerEpoch.manager.getView()?.context?.loading?.query;return L({type:"info",message:k(e?"error.awaiting_media":"common.no_media"),icon:"mdi:multimedia",dotdotdot:e})}return s` <advanced-camera-card-mini-viewer-grid
      .hass=${this.hass}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .viewerConfig=${this.viewerConfig}
      .resolvedMediaCache=${this.resolvedMediaCache}
      .cameraManager=${this.cameraManager}
      .cardWideConfig=${this.cardWideConfig}
    >
    </advanced-camera-card-mini-viewer-grid>`}}static get styles(){return g(":host {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n:host([empty]) {\n  aspect-ratio: 16/9;\n}\n\nadvanced-camera-card-viewer-carousel {\n  flex: 1;\n  min-height: 0;\n}")}};e([i({attribute:!1})],U.prototype,"hass",void 0),e([i({attribute:!1})],U.prototype,"viewManagerEpoch",void 0),e([i({attribute:!1})],U.prototype,"viewerConfig",void 0),e([i({attribute:!1})],U.prototype,"resolvedMediaCache",void 0),e([i({attribute:!1})],U.prototype,"cameraManager",void 0),e([i({attribute:!1})],U.prototype,"cardWideConfig",void 0),e([i({attribute:"empty",reflect:!0,type:Boolean})],U.prototype,"isEmpty",void 0),U=e([a("advanced-camera-card-mini-viewer")],U);export{U as AdvancedCameraCardViewer};
