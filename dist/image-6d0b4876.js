import{u as a,Y as e,C as t,a0 as r,v as i,_ as s,y as o,t as n,a2 as g}from"./card-7246ea11.js";import"./image-updating-player-436fc045.js";let m=class extends a{constructor(){super(...arguments),this._refImage=e()}async getMediaPlayerController(){return await this.updateComplete,await(this._refImage.value?.getMediaPlayerController())??null}render(){if(this.hass&&this.cameraConfig)return t`
      <advanced-camera-card-image-updating-player
        ${r(this._refImage)}
        .hass=${this.hass}
        .imageConfig=${this.cameraConfig.image}
        .cameraConfig=${this.cameraConfig}
      >
      </advanced-camera-card-image-updating-player>
    `}static get styles(){return i(g)}};s([o({attribute:!1})],m.prototype,"hass",void 0),s([o({attribute:!1})],m.prototype,"cameraConfig",void 0),m=s([n("advanced-camera-card-live-image")],m);export{m as AdvancedCameraCardLiveImage};
