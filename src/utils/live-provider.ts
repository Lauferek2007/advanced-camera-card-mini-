import { CameraProxyConfig } from '../camera-manager/types';
import { supports2WayAudio as gortcSupports2WayAudio } from '../camera-manager/utils/go2rtc/audio';
import { CameraConfig } from '../config/schema/cameras';
import { LiveProvider } from '../config/schema/cameras.js';
import { HomeAssistant } from '../ha/types';
import { Endpoint } from '../types';

export const getResolvedLiveProvider = (
  config: CameraConfig | undefined,
): Exclude<LiveProvider, 'auto'> => {
  if (config?.live_provider === 'auto') {
    if (config.webrtc_card?.entity || config.webrtc_card?.url) {
      return 'webrtc-card';
    } else if (config.go2rtc?.stream || config.go2rtc?.url || config.go2rtc?.host) {
      return 'go2rtc';
    } else if (config.camera_entity) {
      return 'ha';
    }
    // Mini defaults avoid automatic JSMPEG selection, since canvas decoding is
    // expensive on weaker devices.
    return 'image';
  }
  return config?.live_provider ?? 'image';
};

export const liveProviderSupports2WayAudio = async (
  hass: HomeAssistant,
  config: CameraConfig,
  go2rtcMetadataEndpoint?: Endpoint | null,
  proxyConfig?: CameraProxyConfig,
): Promise<boolean> => {
  if (config.capabilities?.disable?.includes('2-way-audio')) {
    return false;
  }

  if (
    config.capabilities?.disable_except &&
    !config.capabilities.disable_except.includes('2-way-audio')
  ) {
    return false;
  }

  if (getResolvedLiveProvider(config) !== 'go2rtc') {
    return false;
  }

  return gortcSupports2WayAudio(hass, go2rtcMetadataEndpoint, proxyConfig);
};
