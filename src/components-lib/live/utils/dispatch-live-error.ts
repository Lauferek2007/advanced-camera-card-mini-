import { fireAdvancedCameraCardEvent } from '../../../utils/fire-advanced-camera-card-mini-event';

export function dispatchLiveErrorEvent(element: EventTarget): void {
  fireAdvancedCameraCardEvent(element, 'live:error');
}
