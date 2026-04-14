import{s as a,e,x as t,n as i,d as r,_ as s,l as m,t as n,m as o}from"./card-ec49c919.js";import"./image-updating-player-8aefa3b8.js";let d=class extends a{constructor(){super(...arguments),this._refImage=e()}async getMediaPlayerController(){return await this.updateComplete,await(this._refImage.value?.getMediaPlayerController())??null}render(){if(this.hass&&this.cameraConfig)return t`
      <advanced-camera-card-mini-image-updating-player
        ${i(this._refImage)}
        .hass=${this.hass}
        .imageConfig=${this.cameraConfig.image}
        .cameraConfig=${this.cameraConfig}
      >
      </advanced-camera-card-mini-image-updating-player>
    `}static get styles(){return r(o)}};s([m({attribute:!1})],d.prototype,"hass",void 0),s([m({attribute:!1})],d.prototype,"cameraConfig",void 0),d=s([n("advanced-camera-card-mini-live-image")],d);export{d as AdvancedCameraCardLiveImage};
