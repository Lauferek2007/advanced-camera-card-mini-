import{u as a,Y as e,C as t,a0 as i,v as r,_ as s,y as n,t as m,a2 as o}from"./card-c2e90b76.js";import"./image-updating-player-45ba4c80.js";let g=class extends a{constructor(){super(...arguments),this._refImage=e()}async getMediaPlayerController(){return await this.updateComplete,await(this._refImage.value?.getMediaPlayerController())??null}render(){if(this.hass&&this.cameraConfig)return t`
      <advanced-camera-card-mini-image-updating-player
        ${i(this._refImage)}
        .hass=${this.hass}
        .imageConfig=${this.cameraConfig.image}
        .cameraConfig=${this.cameraConfig}
      >
      </advanced-camera-card-mini-image-updating-player>
    `}static get styles(){return r(o)}};s([n({attribute:!1})],g.prototype,"hass",void 0),s([n({attribute:!1})],g.prototype,"cameraConfig",void 0),g=s([m("advanced-camera-card-mini-live-image")],g);export{g as AdvancedCameraCardLiveImage};
