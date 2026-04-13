import { CSSResultGroup, LitElement, TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { Ref, createRef, ref } from 'lit/directives/ref.js';
import { styleMap } from 'lit/directives/style-map.js';
import { actionHandler } from './action-handler-directive.js';
import { CardController } from './card-controller/controller';
import './components/live/index.js';
import './components/loading.js';
import './components/menu.js';
import { AdvancedCameraCardMenu } from './components/menu.js';
import './components/message.js';
import { renderMessage } from './components/message.js';
import { AdvancedCameraCardConfig } from './config/schema/types.js';
import type { MenuItem } from './config/schema/elements/custom/menu/types.js';
import { RawAdvancedCameraCardConfig } from './config/types.js';
import { copyConfig, getConfigValue, setConfigValue } from './config/management.js';
import { REPO_URL } from './const.js';
import { HomeAssistant, LovelaceCardEditor } from './ha/types.js';
import cardStyle from './scss/card.scss';
import { MediaLoadedInfo, Message } from './types.js';
import { createCameraAction, createGeneralAction, hasAction } from './utils/action.js';
import { getReleaseVersion } from './utils/diagnostics.js';

const ULTRA_PROFILE = 'low-performance';

const buildUltraConfig = (
  inputConfig: RawAdvancedCameraCardConfig,
): RawAdvancedCameraCardConfig => {
  const config = copyConfig(inputConfig);
  const existingProfiles = Array.isArray(getConfigValue(config, 'profiles'))
    ? (getConfigValue(config, 'profiles') as unknown[]).filter(
        (value): value is string => typeof value === 'string',
      )
    : [];

  setConfigValue(
    config,
    'profiles',
    Array.from(new Set([...existingProfiles, ULTRA_PROFILE])),
  );

  // Keep the ultra variant focused on the lightest stable path: live only.
  setConfigValue(config, 'view.default', 'live');
  setConfigValue(config, 'view.default_cycle_camera', false);
  setConfigValue(config, 'view.triggers.show_trigger_status', false);

  // Force the card into a single live pane with no media side-features.
  setConfigValue(config, 'live.display.mode', 'single');
  setConfigValue(config, 'live.preload', false);
  setConfigValue(config, 'live.draggable', false);
  setConfigValue(config, 'live.zoomable', false);
  setConfigValue(config, 'live.show_image_during_load', false);
  setConfigValue(config, 'live.transition_effect', 'none');
  setConfigValue(config, 'live.controls.builtin', false);
  setConfigValue(config, 'live.controls.wheel', false);
  setConfigValue(config, 'live.controls.next_previous.style', 'none');
  setConfigValue(config, 'live.controls.ptz.mode', 'off');
  setConfigValue(config, 'live.controls.thumbnails.mode', 'none');
  setConfigValue(config, 'live.controls.timeline.mode', 'none');

  // Hide non-live affordances even if the source config tried to enable them.
  setConfigValue(config, 'menu.style', 'outside');
  setConfigValue(config, 'status_bar.style', 'none');

  // Reduce capability surface so the controller avoids non-live paths.
  setConfigValue(config, 'cameras_global.capabilities.disable_except', ['live', 'menu']);
  setConfigValue(config, 'cameras_global.image.refresh_seconds', 15);

  return config;
};

console.info(
  `%c Advanced Camera Card Ultra %c ${getReleaseVersion()} `,
  'padding: 3px; color: black; background: pink;',
  'padding: 3px; color: black; background: white;',
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards = (window as any).customCards || [];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
  type: 'advanced-camera-card-ultra',
  name: 'Advanced Camera Card Ultra',
  description: 'Live-only variant with a much smaller feature surface',
  preview: true,
  documentationURL: REPO_URL,
});

@customElement('advanced-camera-card-ultra')
class AdvancedCameraCardUltra extends LitElement {
  protected _controller = new CardController(
    this,
    () => undefined,
    () => this._refMenu.value?.toggleMenu(),
    () => null,
  );

  protected _refMenu: Ref<AdvancedCameraCardMenu> = createRef();

  get _config(): AdvancedCameraCardConfig | null {
    return this._controller.getConfigManager().getConfig();
  }

  get _hass(): HomeAssistant | null {
    return this._controller.getHASSManager().getHASS();
  }

  set hass(hass: HomeAssistant) {
    this._controller.getHASSManager().setHASS(hass);

    if (this._refMenu.value) {
      this._refMenu.value.hass = hass;
    }
  }

  set isPanel(isPanel: boolean) {
    this._controller.getConditionStateManager().setState({
      panel: isPanel,
    });
  }

  get isPanel(): boolean {
    return !!this._controller.getConditionStateManager().getState().panel;
  }

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return await CardController.getConfigElement();
  }

  public static getStubConfig(
    _: HomeAssistant,
    entities: string[],
  ): AdvancedCameraCardConfig {
    return buildUltraConfig(
      CardController.getStubConfig(entities) as unknown as RawAdvancedCameraCardConfig,
    ) as unknown as AdvancedCameraCardConfig;
  }

  public setConfig(config: RawAdvancedCameraCardConfig): void {
    this._controller.getConfigManager().setConfig(buildUltraConfig(config));
  }

  protected shouldUpdate(): boolean {
    if (!this.isConnected) {
      return false;
    }

    if (this._controller.getMessageManager().hasMessage()) {
      return true;
    }

    if (!this._controller.getInitializationManager().isInitializedMandatory()) {
      this._controller.getInitializationManager().initializeMandatory();
    }
    return true;
  }

  protected _getButtons(): MenuItem[] {
    const config = this._config;
    const hass = this._hass;
    const view = this._controller.getViewManager().getView();
    const cameraManager = this._controller.getCameraManager();

    if (!config || !hass) {
      return [];
    }

    const buttons: MenuItem[] = [];
    const cameraIDs = cameraManager.getStore().getCameraIDsWithCapability('menu');

    if (cameraIDs.size > 1) {
      buttons.push({
        type: 'custom:advanced-camera-card-menu-submenu',
        enabled: true,
        icon: 'mdi:video-switch',
        title: 'Cameras',
        items: [...cameraIDs].map((cameraID) => {
          const metadata = cameraManager.getCameraMetadata(cameraID);
          return {
            enabled: true,
            icon: metadata?.icon.icon,
            entity: metadata?.icon.entity,
            state_color: true,
            title: metadata?.title,
            selected: view?.camera === cameraID,
            tap_action: createCameraAction('camera_select', cameraID),
          };
        }),
      });
    }

    if (this._controller.getFullscreenManager().isSupported()) {
      buttons.push({
        type: 'custom:advanced-camera-card-menu-icon',
        enabled: true,
        icon: this._controller.getFullscreenManager().isInFullscreen()
          ? 'mdi:fullscreen-exit'
          : 'mdi:fullscreen',
        title: 'Fullscreen',
        alignment: 'opposing',
        tap_action: createGeneralAction('fullscreen'),
      });
    }

    return buttons;
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this._hass) {
      return;
    }

    const actions = this._controller.getActionsManager().getMergedActions();
    const buttons = this._getButtons();
    const showLoading =
      this._config.performance?.features.card_loading_indicator !== false &&
      !this._controller.getMessageManager().hasMessage();

    return html`
      <ha-card
        id="ha-card"
        .actionHandler=${actionHandler({
          hasHold: hasAction(actions.hold_action),
          hasDoubleClick: hasAction(actions.double_tap_action),
        })}
        style="${styleMap(this._controller.getStyleManager().getAspectRatioStyle())}"
        @advanced-camera-card:message=${(ev: CustomEvent<Message>) =>
          this._controller.getMessageManager().setMessageIfHigherPriority(ev.detail)}
        @advanced-camera-card:media:loaded=${(ev: CustomEvent<MediaLoadedInfo>) =>
          this._controller.getMediaLoadedInfoManager().set(ev.detail)}
        @advanced-camera-card:media:unloaded=${() =>
          this._controller.getMediaLoadedInfoManager().clear()}
        @advanced-camera-card:media:volumechange=${() => this.requestUpdate()}
        @advanced-camera-card:media:play=${() => this.requestUpdate()}
        @advanced-camera-card:media:pause=${() => this.requestUpdate()}
        @advanced-camera-card:focus=${() => this.focus()}
      >
        ${showLoading
          ? html`<advanced-camera-card-loading
              .loaded=${this._controller
                .getInitializationManager()
                .wasEverInitialized()}
            ></advanced-camera-card-loading>`
          : ''}
        ${buttons.length
          ? html`<advanced-camera-card-menu
              ${ref(this._refMenu)}
              .hass=${this._hass}
              .menuConfig=${{
                ...this._config.menu,
                style: 'outside',
                position: 'top',
                alignment: 'left',
              }}
              .buttons=${buttons}
            ></advanced-camera-card-menu>`
          : ''}
        <div class="main">
          ${this._controller.getMessageManager().hasMessage()
            ? renderMessage(this._controller.getMessageManager().getMessage())
            : html`<advanced-camera-card-live
                .hass=${this._hass}
                .viewManagerEpoch=${this._controller.getViewManager().getEpoch()}
                .liveConfig=${this._config.live}
                .cameraManager=${this._controller.getCameraManager()}
                .cardWideConfig=${this._controller
                  .getConfigManager()
                  .getCardWideConfig()}
                .microphoneState=${this._controller.getMicrophoneManager().getState()}
              ></advanced-camera-card-live>`}
        </div>
      </ha-card>
    `;
  }

  static get styles(): CSSResultGroup {
    return unsafeCSS(cardStyle);
  }

  public getCardSize(): number {
    return 6;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'advanced-camera-card-ultra': AdvancedCameraCardUltra;
  }
}
