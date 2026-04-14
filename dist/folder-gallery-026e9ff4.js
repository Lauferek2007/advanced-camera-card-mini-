import{ag as e,K as a,am as r,Q as t,_ as i,l as n,t as o,s,x as l,al as c,r as d,G as h,d as u}from"./card-ec49c919.js";import{g as m,u as g}from"./card-e23982d8.js";import"./gallery-core-806ce2cf.js";import"./until-3d3a4b46.js";import"./endOfDay-43a29bde.js";import"./date-picker-3021977d.js";class y{constructor(e){this._host=e}setThumbnailSize(a){this._host.style.setProperty("--advanced-camera-card-mini-thumbnail-size",`${a??e}px`)}getColumnWidth(a){return a?a.show_details?200:a.size:e}getColumnCountRoundMethod(e){return e?.show_details?"floor":"ceil"}itemClickHandler(e,i,n,o){a(n);const s=e.getView();if(s)if(r.isMedia(i))e.setViewByParameters({params:{view:"media",queryResults:s.queryResults?.clone().selectResultIfFound((e=>e===i))}});else if(r.isFolder(i)&&t.isFolderQuery(s.query)){const a=s.query.getQuery();if(!a||!o)return;const r=o.generateChildFolderQuery(a,i);if(!r)return;e.setViewByParametersWithExistingQuery({params:{query:s.query.clone().setQuery(r)}})}}}let p=class extends s{constructor(){super(...arguments),this._controller=new y(this)}willUpdate(e){e.has("galleryConfig")&&this._controller.setThumbnailSize(this.galleryConfig?.controls.thumbnails.size)}_renderThumbnail(e,a,r){return l`<advanced-camera-card-mini-thumbnail
      class=${c({selected:a})}
      .hass=${this.hass}
      .item=${e}
      .viewManagerEpoch=${this.viewManagerEpoch}
      .viewItemManager=${this.viewItemManager}
      ?selected=${a}
      ?details=${!!this.galleryConfig?.controls.thumbnails.show_details}
      ?show_favorite_control=${!!this.galleryConfig?.controls.thumbnails.show_favorite_control}
      ?show_timeline_control=${!!this.galleryConfig?.controls.thumbnails.show_timeline_control}
      ?show_download_control=${!!this.galleryConfig?.controls.thumbnails.show_download_control}
      @click=${a=>r(e,a)}
    >
    </advanced-camera-card-mini-thumbnail>`}_renderThumbnails(){const e=this.viewManagerEpoch?.manager.getView()?.queryResults?.getSelectedResult();return l`
      ${this.viewManagerEpoch?.manager.getView()?.queryResults?.getResults()?.map((a=>this._renderThumbnail(a,a===e,((e,a)=>{const r=this.viewManagerEpoch?.manager;r&&this._controller.itemClickHandler(r,e,a,this.foldersManager)}))))}
    `}render(){const e=!!this.viewManagerEpoch?.manager.getView()?.context?.loading?.query,a=m(this.viewManagerEpoch?.manager.getView());return l`
      <advanced-camera-card-mini-surround-basic>
        ${this.viewManagerEpoch?.manager.getView()?.queryResults?.hasResults()||!e&&a?l`<advanced-camera-card-mini-gallery-core
              .hass=${this.hass}
              .columnWidth=${this._controller.getColumnWidth(this.galleryConfig?.controls.thumbnails)}
              .columnCountRoundMethod=${this._controller.getColumnCountRoundMethod(this.galleryConfig?.controls.thumbnails)}
            >
              ${a?this._renderThumbnail(a,!1,((e,a)=>g(e,a,this.viewManagerEpoch))):""}
              ${this._renderThumbnails()}
            </advanced-camera-card-mini-gallery-core>`:d({type:"info",message:h(e?"error.awaiting_folder":"common.no_folder"),icon:"mdi:folder-play",dotdotdot:e})}
      </advanced-camera-card-mini-surround-basic>
    `}static get styles(){return u(":host {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n\nadvanced-camera-card-surround-basic {\n  max-height: 110dvh;\n}\n\nadvanced-camera-card-thumbnail {\n  height: 100%;\n  min-height: var(--advanced-camera-card-thumbnail-size);\n  background-color: var(--secondary-background-color);\n}\n\nadvanced-camera-card-thumbnail:not([details]) {\n  width: 100%;\n}\n\nadvanced-camera-card-thumbnail.selected {\n  border: 4px solid var(--accent-color);\n  border-radius: calc(var(--advanced-camera-card-border-radius-final) + 4px);\n}")}};i([n({attribute:!1})],p.prototype,"hass",void 0),i([n({attribute:!1})],p.prototype,"viewManagerEpoch",void 0),i([n({attribute:!1})],p.prototype,"viewItemManager",void 0),i([n({attribute:!1})],p.prototype,"galleryConfig",void 0),i([n({attribute:!1})],p.prototype,"foldersManager",void 0),p=i([o("advanced-camera-card-mini-folder-gallery")],p);export{p as AdvancedCameraCardFolderGallery};
