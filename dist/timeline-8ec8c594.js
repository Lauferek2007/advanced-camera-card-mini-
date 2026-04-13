import{_ as e,y as t,t as i,u as a,Q as r,C as o,v as n,a2 as s}from"./card-0548e5ec.js";import"./card-635e8ca4.js";import"./timeline-core-6f541de3.js";import"./until-a5c1319d.js";import"./startOfHour-1eccc011.js";import"./endOfDay-f915d37c.js";import"./date-picker-75f016a9.js";let d=class extends a{_getKeys(){const e=this.viewManagerEpoch?.manager.getView()?.query;if(r.isMediaQuery(e)){const t=e.getQueryCameraIDs();if(t&&t.size)return{type:"camera",cameraIDs:t}}else if(r.isFolderQuery(e)){const t=e.getQuery()?.folder;if(t)return{type:"folder",folder:t}}const t=this.cameraManager?.getStore().getCameraIDsWithCapability({anyCapabilities:["clips","snapshots","recordings"]}),i=this.foldersManager?.getFolder()??null;return t?.size?{type:"camera",cameraIDs:t}:i?{type:"folder",folder:i}:void 0}render(){return this.timelineConfig?o`
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
