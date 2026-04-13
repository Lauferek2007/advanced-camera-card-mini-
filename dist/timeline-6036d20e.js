import{_ as e,y as t,t as a,u as i,Q as r,C as o,v as n,a2 as s}from"./card-7246ea11.js";import"./card-94a4d201.js";import"./timeline-core-a37173c0.js";import"./until-e45307d2.js";import"./startOfHour-40af9c39.js";import"./endOfDay-3ac4a564.js";import"./date-picker-6c661d07.js";let d=class extends i{_getKeys(){const e=this.viewManagerEpoch?.manager.getView()?.query;if(r.isMediaQuery(e)){const t=e.getQueryCameraIDs();if(t&&t.size)return{type:"camera",cameraIDs:t}}else if(r.isFolderQuery(e)){const t=e.getQuery()?.folder;if(t)return{type:"folder",folder:t}}const t=this.cameraManager?.getStore().getCameraIDsWithCapability({anyCapabilities:["clips","snapshots","recordings"]}),a=this.foldersManager?.getFolder()??null;return t?.size?{type:"camera",cameraIDs:t}:a?{type:"folder",folder:a}:void 0}render(){return this.timelineConfig?o`
      <advanced-camera-card-timeline-core
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
      </advanced-camera-card-timeline-core>
    `:o``}static get styles(){return n(s)}};e([t({attribute:!1})],d.prototype,"hass",void 0),e([t({attribute:!1})],d.prototype,"viewManagerEpoch",void 0),e([t({attribute:!1})],d.prototype,"timelineConfig",void 0),e([t({attribute:!1})],d.prototype,"cameraManager",void 0),e([t({attribute:!1})],d.prototype,"foldersManager",void 0),e([t({attribute:!1})],d.prototype,"conditionStateManager",void 0),e([t({attribute:!1})],d.prototype,"viewItemManager",void 0),e([t({attribute:!1})],d.prototype,"cardWideConfig",void 0),d=e([a("advanced-camera-card-timeline")],d);export{d as AdvancedCameraCardTimeline};
