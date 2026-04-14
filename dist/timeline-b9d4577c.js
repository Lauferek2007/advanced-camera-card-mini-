import{_ as e,l as t,t as i,s as a,Q as r,x as o,d as n,m as s}from"./card-ec49c919.js";import"./card-e23982d8.js";import"./timeline-core-f5b9319e.js";import"./until-3d3a4b46.js";import"./startOfHour-2a812157.js";import"./endOfDay-43a29bde.js";import"./date-picker-3021977d.js";let d=class extends a{_getKeys(){const e=this.viewManagerEpoch?.manager.getView()?.query;if(r.isMediaQuery(e)){const t=e.getQueryCameraIDs();if(t&&t.size)return{type:"camera",cameraIDs:t}}else if(r.isFolderQuery(e)){const t=e.getQuery()?.folder;if(t)return{type:"folder",folder:t}}const t=this.cameraManager?.getStore().getCameraIDsWithCapability({anyCapabilities:["clips","snapshots","recordings"]}),i=this.foldersManager?.getFolder()??null;return t?.size?{type:"camera",cameraIDs:t}:i?{type:"folder",folder:i}:void 0}render(){return this.timelineConfig?o`
      <advanced-camera-card-mini-timeline-core
        .hass=${this.hass}
        .viewManagerEpoch=${this.viewManagerEpoch}
        .timelineConfig=${this.timelineConfig}
        .thumbnailConfig=${this.timelineConfig.controls.thumbnails}
        .cameraManager=${this.cameraManager}
        .foldersManager=${this.foldersManager}
        .conditionStateManager=${this.conditionStateManager}
        .viewItemManager=${this.viewItemManager}
        .keys=${this._getKeys()}
        .cardWideConfig=${this.cardWideConfig}
        .itemClickAction=${"none"===this.timelineConfig.controls.thumbnails.mode?"play":"select"}
      >
      </advanced-camera-card-mini-timeline-core>
    `:o``}static get styles(){return n(s)}};e([t({attribute:!1})],d.prototype,"hass",void 0),e([t({attribute:!1})],d.prototype,"viewManagerEpoch",void 0),e([t({attribute:!1})],d.prototype,"timelineConfig",void 0),e([t({attribute:!1})],d.prototype,"cameraManager",void 0),e([t({attribute:!1})],d.prototype,"foldersManager",void 0),e([t({attribute:!1})],d.prototype,"conditionStateManager",void 0),e([t({attribute:!1})],d.prototype,"viewItemManager",void 0),e([t({attribute:!1})],d.prototype,"cardWideConfig",void 0),d=e([i("advanced-camera-card-mini-timeline")],d);export{d as AdvancedCameraCardTimeline};
