import { RawAdvancedCameraCardConfig } from '../config/types';
import { getIntegrationManifest } from '../ha/integration';
import { IntegrationManifest } from '../ha/integration/types';
import { DeviceRegistryManager } from '../ha/registry/device';
import { HomeAssistant } from '../ha/types';
import { HASS_WEB_PROXY_DOMAIN } from '../ha/web-proxy';
import { getLanguage } from '../localize/localize';

const PACKAGE_VERSION = '__ADVANCED_CAMERA_CARD_PACKAGE_VERSION__';
const GIT_ABBREV_HASH = '__ADVANCED_CAMERA_CARD_GIT_ABBREV_HASH__';
const BUILD_DATE = '__ADVANCED_CAMERA_CARD_BUILD_DATE__';
const GIT_DATE = '__ADVANCED_CAMERA_CARD_GIT_DATE__';

const getBuildInfoValue = (value: string): string | undefined =>
  value.startsWith('__ADVANCED_CAMERA_CARD_') || !value ? undefined : value;

type FrigateDevices = Record<string, string>;

interface GitDiagnostics {
  build_version?: string;
  build_date?: string;
  commit_date?: string;
}

interface IntegrationDiagnostics {
  detected: boolean;
  version?: string;
}

export const getReleaseVersion = (): string => {
  const releaseVersion: string = '__ADVANCED_CAMERA_CARD_RELEASE_VERSION__';

  /* istanbul ignore if: depends on rollup substitution -- @preserve */
  if (releaseVersion === 'pkg') {
    return PACKAGE_VERSION;
  }

  /* istanbul ignore if: depends on rollup substitution -- @preserve */
  if (releaseVersion === 'dev') {
    return `dev+${getBuildInfoValue(GIT_ABBREV_HASH) ?? 'unknown'}`;
  }

  return releaseVersion;
};

interface Diagnostics {
  card_version: string;
  browser: string;
  date: Date;
  lang: string;
  timezone: string;
  git: GitDiagnostics;

  ha_version?: string;
  config?: RawAdvancedCameraCardConfig;

  custom_integrations: {
    frigate: IntegrationDiagnostics & {
      devices?: FrigateDevices;
    };
    hass_web_proxy: IntegrationDiagnostics;
  };
}

const getIntegrationDiagnostics = async (
  integration: string,
  hass?: HomeAssistant,
): Promise<IntegrationDiagnostics> => {
  let manifest: IntegrationManifest | null = null;

  if (hass) {
    try {
      manifest = await getIntegrationManifest(hass, integration);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // Silently ignore integrations not being found.
    }
  }

  return {
    detected: !!manifest,
    ...(manifest?.version && { version: manifest.version }),
  };
};

export const getDiagnostics = async (
  hass?: HomeAssistant,
  deviceRegistryManager?: DeviceRegistryManager,
  rawConfig?: RawAdvancedCameraCardConfig,
): Promise<Diagnostics> => {
  // Get the Frigate devices in order to extract the Frigate integration and
  // server version numbers.
  const frigateDevices =
    hass && deviceRegistryManager
      ? await deviceRegistryManager.getMatchingDevices(
          hass,
          (device) => device.manufacturer === 'Frigate',
        )
      : [];

  const frigateVersionMap: Map<string, string> = new Map();
  frigateDevices?.forEach((device) => {
    device.config_entries.forEach((configEntry) => {
      if (device.model) {
        frigateVersionMap.set(configEntry, device.model);
      }
    });
  });

  return {
    card_version: getReleaseVersion(),
    browser: navigator.userAgent,
    date: new Date(),
    lang: getLanguage(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    git: {
      ...(getBuildInfoValue(GIT_ABBREV_HASH) && {
        hash: getBuildInfoValue(GIT_ABBREV_HASH),
      }),
      ...(getBuildInfoValue(BUILD_DATE) && {
        build_date: getBuildInfoValue(BUILD_DATE),
      }),
      ...(getBuildInfoValue(GIT_DATE) && {
        commit_date: getBuildInfoValue(GIT_DATE),
      }),
    },
    ...(hass && { ha_version: hass.config.version }),
    custom_integrations: {
      frigate: {
        ...(await getIntegrationDiagnostics('frigate', hass)),
        ...(frigateVersionMap.size && {
          devices: Object.fromEntries(frigateVersionMap),
        }),
      },
      hass_web_proxy: await getIntegrationDiagnostics(HASS_WEB_PROXY_DOMAIN, hass),
    },
    ...(rawConfig && { config: rawConfig }),
  };
};
