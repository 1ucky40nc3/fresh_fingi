/**
 * Implement access to the `chartjs-plugin-zoom` types.
 *
 * Part of the following types is basically copied from the `chartjs-plugin-zoom` code.
 * This is why we include the copyright notice below.
 * Thanks to the chartjs-plugin-zoom contributors for sharing their great project!
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2013-2024 chartjs-plugin-zoom contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @typedef {"x" | "y" | "xy"} Mode - Defines the direction or mode for an operation.
 */
type Mode = "x" | "y" | "xy";

/**
 * @typedef {"ctrl" | "alt" | "shift" | "meta"} Key - Represents a keyboard modifier key.
 */
type Key = "ctrl" | "alt" | "shift" | "meta";

/**
 * @typedef {"afterDraw" | "afterDatasetsDraw" | "beforeDraw" | "beforeDatasetsDraw"} DrawTime - Specifies the drawing phase within a Chart.js render cycle.
 */
type DrawTime =
  | "afterDraw"
  | "afterDatasetsDraw"
  | "beforeDraw"
  | "beforeDatasetsDraw";

/**
 * @typedef {object} PanOptions - Options for configuring pan behavior.
 * @property {boolean} enabled - Boolean to enable panning.
 * @property {Mode} [mode] - Panning directions. Remove the appropriate direction to disable.
 * @property {Key} [modifierKey] - Modifier key required for panning with mouse.
 * @property {Mode} [scaleMode] - Defines the scale mode for panning.
 * @property {number} [threshold] - Minimal pan distance required before actually applying pan.
 */
type PanOptions = {
  /**
   * Boolean to enable panning
   */
  enabled: boolean;
  /**
   * Panning directions. Remove the appropriate direction to disable.
   */
  mode?: Mode; // We ignore the other option `| { (chart: Chart): Mode };` because it is not serializable.
  /**
   * Modifier key required for panning with mouse
   */
  modifierKey?: Key;
  scaleMode?: Mode; // We ignore the other option `| { (chart: Chart): Mode };` because it is not serializable.
  /**
   * Minimal pan distance required before actually applying pan
   */
  threshold?: number;
};

/**
 * @typedef {object} ScaleLimits - Defines the minimum, maximum, and minimum range for a scale.
 * @property {number | "original"} [min] - The minimum value for the scale. Can be a number or "original" to use the original scale minimum.
 * @property {number | "original"} [max] - The maximum value for the scale. Can be a number or "original" to use the original scale maximum.
 * @property {number} [minRange] - The minimum range (max - min) allowed for the scale.
 */
type ScaleLimits = {
  min?: number | "original";
  max?: number | "original";
  minRange?: number;
};

/**
 * @typedef {object} LimitOptions - Defines scale limits, indexed by the scale's ID or by axis (x/y).
 * @property {ScaleLimits} [axisId] - Scale limits, indexed by the scale's ID (key) or by axis (x/y).
 */
type LimitOptions = {
  // Scale limits, indexed by the scale's ID (key) or by axis (x/y)
  [axisId: string]: ScaleLimits;
};

/**
 * @typedef {object} WheelOptions - Options for configuring zoom behavior via mouse wheel.
 * @property {boolean} [enabled] - Enable the zoom via mouse wheel.
 * @property {number} [speed] - Speed of zoom via mouse wheel (percentage of zoom on a wheel event).
 * @property {Key} [modifierKey] - Modifier key required for zooming with mouse.
 */
type WheelOptions = {
  /**
   * Enable the zoom via mouse wheel
   */
  enabled?: boolean;

  /**
   * Speed of zoom via mouse wheel
   * (percentage of zoom on a wheel event)
   */
  speed?: number;

  /**
   * Modifier key required for zooming with mouse
   */
  modifierKey?: Key;
};

/**
 * @typedef {string} Color - Represents a color value, typically a CSS color string.
 */
type Color = string;

/**
 * @typedef {object} DragOptions - Options for configuring zoom behavior via drag.
 * @property {boolean} [enabled] - Enable the zoom via drag.
 * @property {number} [threshold] - Minimal zoom distance required before actually applying zoom.
 * @property {Color} [borderColor] - Border color of the drag area.
 * @property {number} [borderWidth] - Border width of the drag area.
 * @property {Color} [backgroundColor] - Background color of the drag area.
 * @property {Key} [modifierKey] - Modifier key required for drag-to-zoom.
 * @property {DrawTime} [drawTime] - Draw time for the drag-to-zoom area.
 */
type DragOptions = {
  /**
   * Enable the zoom via drag
   */
  enabled?: boolean;

  /**
   * Minimal zoom distance required before actually applying zoom
   */
  threshold?: number;

  /**
   * Border color of the drag area
   */
  borderColor?: Color;

  /**
   * Border width of the drag area
   */
  borderWidth?: number;

  /**
   * Background color of the drag area
   */
  backgroundColor?: Color;

  /**
   * Modifier key required for drag-to-zoom
   */
  modifierKey?: Key;

  /**
   * Draw time required for drag-to-zoom
   */
  drawTime?: DrawTime;
};

/**
 * @typedef {object} PinchOptions - Options for configuring zoom behavior via pinch.
 * @property {boolean} [enabled] - Enable the zoom via piinch.
 */
type PinchOptions = {
  /**
   * Enable the zoom via pinch
   */
  enabled?: boolean;
};

/**
 * @typedef {object} ZoomOptions - Options for configuring zoom behavior.
 * @property {Mode} [mode] - Zooming directions. Remove the appropriate direction to disable.
 * @property {WheelOptions} [wheel] - Options of the mouse wheel mode.
 * @property {DragOptions} [drag] - Options of the drag-to-zoom mode.
 * @property {PinchOptions} [pinch] - Options of the pnich-to-zoom mode.
 */
type ZoomOptions = {
  /**
   * Zooming directions. Remove the appropriate direction to disable
   */
  mode?: Mode;

  /**
   * Options of the mouse wheel mode
   */
  wheel?: WheelOptions;

  /**
   * Options of the drag-to-zoom mode
   */
  drag?: DragOptions;

  /**
   * Options of the pinch mode
   */
  pinch?: PinchOptions;
};

/**
 * @typedef {object} ZoomPluginOptions - Root options for the Chart.js zoom plugin.
 * @property {PanOptions} [pan] - Options for pan behavior.
 * @property {LimitOptions} [limits] - Defines scale limits for zooming and panning.
 * @property {ZoomOptions} [zoom] - Options for zoom behavior.
 */
type ZoomPluginOptions = {
  pan?: PanOptions;
  limits?: LimitOptions;
  zoom?: ZoomOptions;
};
