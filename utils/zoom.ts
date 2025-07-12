import { Signal } from "@preact/signals";

export function getZoomByWheelCurrentlyEnabled(
  zoomPluginOptions: Signal<ZoomPluginOptions>,
): boolean {
  return Boolean(
    zoomPluginOptions.value.zoom?.wheel
      ?.enabled,
  );
}

export function getZoomByPinchCurrentlyEnabled(
  zoomPluginOptions: Signal<ZoomPluginOptions>,
): boolean {
  return Boolean(
    zoomPluginOptions.value.zoom?.pinch
      ?.enabled,
  );
}

export function getZoomByPanCurrentlyEnabled(
  zoomPluginOptions: Signal<ZoomPluginOptions>,
): boolean {
  return Boolean(zoomPluginOptions.value.pan?.enabled);
}
