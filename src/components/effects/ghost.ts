import { CSSResultGroup, html, TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { BaseEffectComponent } from './base';
import ghostStyle from '../../scss/ghost.scss';

@customElement('advanced-camera-card-mini-effect-ghost')
export class AdvancedCameraCardEffectGhost extends BaseEffectComponent {
  protected render(): TemplateResult {
    return html`<span class="ghost">👻</span>`;
  }

  static get styles(): CSSResultGroup {
    return unsafeCSS(ghostStyle);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'advanced-camera-card-mini-effect-ghost': AdvancedCameraCardEffectGhost;
  }
}
