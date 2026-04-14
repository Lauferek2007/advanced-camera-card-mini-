import{p as t,a5 as s,B as e,a6 as i}from"./card-ec49c919.js";
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n{constructor(t){this.Y=t}disconnect(){this.Y=void 0}reconnect(t){this.Y=t}deref(){return this.Y}}class o{constructor(){this.Z=void 0,this.q=void 0}get(){return this.Z}pause(){this.Z??=new Promise((t=>this.q=t))}resume(){this.q?.(),this.Z=this.q=void 0}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const h=t=>!i(t)&&"function"==typeof t.then,r=1073741823;const c=t(class extends s{constructor(){super(...arguments),this._$Cwt=r,this._$Cbt=[],this._$CK=new n(this),this._$CX=new o}render(...t){return t.find((t=>!h(t)))??e}update(t,s){const i=this._$Cbt;let n=i.length;this._$Cbt=s;const o=this._$CK,c=this._$CX;this.isConnected||this.disconnected();for(let t=0;t<s.length&&!(t>this._$Cwt);t++){const e=s[t];if(!h(e))return this._$Cwt=t,e;t<n&&e===i[t]||(this._$Cwt=r,n=0,Promise.resolve(e).then((async t=>{for(;c.get();)await c.get();const s=o.deref();if(void 0!==s){const i=s._$Cbt.indexOf(e);i>-1&&i<s._$Cwt&&(s._$Cwt=i,s.setValue(t))}})))}return e}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}});export{c as m};
