import{_ as e,t,a4 as a,C as s,a8 as i,e4 as r,e5 as o,e6 as d,e3 as n,v as l,fo as h,fe as c,dW as m,u as p,Y as u,a0 as y,y as _}from"./card-0548e5ec.js";import{c as v,e as $}from"./image-player-7c0d7010.js";import{d as g}from"./dispatch-live-error-5459541f.js";import{V as b,h as f,M as C,a as w,b as P}from"./audio-967792c0.js";customElements.whenDefined("ha-web-rtc-player").then((()=>{const c=customElements.get("ha-web-rtc-player");let m=class extends c{constructor(){super(...arguments),this._mediaPlayerController=new b(this,(()=>this._videoEl),(()=>this.controls)),this._audioTracksMuteStateCleanup=null,this._addTrack=async e=>{this._remoteStream&&(this._remoteStream.addTrack(e.track),this.hasUpdated||await this.updateComplete,this._videoEl.srcObject=this._remoteStream)}}async getMediaPlayerController(){return this._mediaPlayerController}async _startWebRtc(){await super._startWebRtc(),this.isConnected||this._cleanUp()}render(){return this._error?(g(this),a({type:"error",message:this._error,context:{entity_id:this.entityid}})):s`
        <video
          id="remote-stream"
          ?autoplay=${this.autoPlay}
          .muted=${this.muted}
          ?playsinline=${this.playsInline}
          ?controls=${this.controls}
          poster=${i(this.posterUrl)}
          @loadedmetadata=${()=>{this.controls&&f(this._videoEl,C)}}
          @loadeddata=${e=>this._loadedDataHandler(e)}
          @volumechange=${()=>r(this)}
          @play=${()=>o(this)}
          @pause=${()=>d(this)}
        ></video>
      `}_loadedDataHandler(e){super._loadedData(),n(this,e,{mediaPlayerController:this._mediaPlayerController,capabilities:{supportsPause:!0,hasAudio:w(this._videoEl,this._peerConnection)},technology:["webrtc"]}),this._audioTracksMuteStateCleanup?.(),this._audioTracksMuteStateCleanup=P(this._peerConnection,(()=>{n(this,this._videoEl,{mediaPlayerController:this._mediaPlayerController,capabilities:{supportsPause:!0,hasAudio:w(this._videoEl,this._peerConnection)},technology:["webrtc"]})}))}_cleanUp(){super._cleanUp(),this._audioTracksMuteStateCleanup?.(),this._audioTracksMuteStateCleanup=null}static get styles(){return[super.styles,l(v),h`
          :host {
            width: 100%;
            height: 100%;
          }
          video {
            width: 100%;
            height: 100%;
          }
        `]}};m=e([t("advanced-camera-card-mini-ha-web-rtc-player")],m)})),customElements.whenDefined("ha-camera-stream").then((()=>{const a="web_rtc",i="mjpeg";let r=class extends(customElements.get("ha-camera-stream")){constructor(){super(...arguments),this._mediaLoadedInfoPerStream={},this._mediaLoadedInfoDispatched=null}async getMediaPlayerController(){return await this.updateComplete,await(this._player?.getMediaPlayerController())??null}_storeMediaLoadedInfoHandler(e,t){this._storeMediaLoadedInfo(e,t.detail),t.stopPropagation()}_storeMediaLoadedInfo(e,t){this._mediaLoadedInfoPerStream[e]=t,this.requestUpdate()}_renderStream(e){return this.stateObj?e.type===i?s`
          <advanced-camera-card-mini-image-player
            @advanced-camera-card-mini:media:loaded=${e=>{this._storeMediaLoadedInfo(i,e.detail),e.stopPropagation()}}
            src=${void 0===this._connected||this._connected?(t=this.stateObj,`/api/camera_proxy_stream/${t.entity_id}?token=${t.attributes.access_token}`):this._posterUrl||""}
            technology="mjpeg"
            class="player"
          ></advanced-camera-card-mini-image-player>
        `:"hls"===e.type?s` <advanced-camera-card-mini-ha-hls-player
          ?autoplay=${!1}
          playsinline
          .allowExoPlayer=${this.allowExoPlayer}
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @advanced-camera-card-mini:media:loaded=${e=>{this._storeMediaLoadedInfoHandler("hls",e),e.stopPropagation()}}
          @streams=${this._handleHlsStreams}
          class="player ${e.visible?"":"hidden"}"
        ></advanced-camera-card-mini-ha-hls-player>`:e.type===a?s`<advanced-camera-card-mini-ha-web-rtc-player
          ?autoplay=${!1}
          playsinline
          .muted=${this.muted}
          .controls=${this.controls}
          .hass=${this.hass}
          .entityid=${this.stateObj.entity_id}
          .posterUrl=${this._posterUrl}
          @advanced-camera-card-mini:media:loaded=${e=>{this._storeMediaLoadedInfoHandler(a,e),e.stopPropagation()}}
          @streams=${this._handleWebRtcStreams}
          class="player ${e.visible?"":"hidden"}"
        ></advanced-camera-card-mini-ha-web-rtc-player>`:c:c;var t}updated(e){super.updated(e);const t=this._streams(this._capabilities?.frontend_stream_types,this._hlsStreams,this._webRtcStreams,this.muted).find((e=>e.visible))??null;if(t){const e=this._mediaLoadedInfoPerStream[t.type];e&&e!==this._mediaLoadedInfoDispatched&&(this._mediaLoadedInfoDispatched=e,m(this,e))}}static get styles(){return[super.styles,l(v),h`
          :host {
            width: 100%;
            height: 100%;
          }
          img {
            width: 100%;
            height: 100%;
          }
        `]}};e([$(".player:not(.hidden)")],r.prototype,"_player",void 0),r=e([t("advanced-camera-card-mini-ha-camera-stream")],r)}));let M=class extends p{constructor(){super(...arguments),this.controls=!1,this._playerRef=u()}async getMediaPlayerController(){return await this.updateComplete,await(this._playerRef.value?.getMediaPlayerController())??null}render(){if(this.hass)return s` <advanced-camera-card-mini-ha-camera-stream
      ${y(this._playerRef)}
      .hass=${this.hass}
      .stateObj=${this.cameraConfig?.camera_entity?this.hass.states[this.cameraConfig.camera_entity]:void 0}
      .controls=${this.controls}
      .muted=${!0}
    >
    </advanced-camera-card-mini-ha-camera-stream>`}static get styles(){return l(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}")}};e([_({attribute:!1})],M.prototype,"hass",void 0),e([_({attribute:!1})],M.prototype,"cameraConfig",void 0),e([_({attribute:!0,type:Boolean})],M.prototype,"controls",void 0),M=e([t("advanced-camera-card-mini-live-ha")],M);export{M as AdvancedCameraCardLiveHA};
