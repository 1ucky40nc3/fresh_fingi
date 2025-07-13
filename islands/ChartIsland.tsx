// islands/ChartComponent.tsx

import { useEffect, useRef, useState } from "preact/hooks";
import { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  DefaultDataPoint,
  registerables,
} from "chart.js";
import "chartjs-adapter-luxon";
import {
  getZoomByPanCurrentlyEnabled,
  getZoomByPinchCurrentlyEnabled,
  getZoomByWheelCurrentlyEnabled,
} from "../utils/zoom.ts";

interface ChartIslandProps<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
> {
  type: TType;
  data: Signal<ChartData<TType, TData>>;
  options?: ChartOptions<TType>;
  zoomPluginOptions: Signal<ZoomPluginOptions>;
}

export default function ChartIsland<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
>(
  { type, data, options, zoomPluginOptions }: ChartIslandProps<TType, TData>,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<TType, TData>>();
  const [chartJsLoaded, setChartJsLoaded] = useState(false);

  useEffect(() => {
    // We use a state to ensure Chart.js is registered only once per component lifecycle
    // across re-renders.
    if (IS_BROWSER && !chartJsLoaded) {
      Promise.all([
        import("npm:chartjs-plugin-zoom"),
        import("npm:chartjs-plugin-datalabels"),
        import("npm:chartjs-plugin-streaming"),
      ]).then(([zoomPlugin, datalabelsPlugin, streamingPlugin]) => {
        // Register all necessary components (scales, elements, controllers, etc.)
        Chart.register(...registerables); // Required for Chart.js v3+
        // Register the zoom plugin
        // @ts-expect-error Ignore typing errors between zoom plugin and chart component types
        Chart.register(zoomPlugin.default);
        // Register the datalabels plugin
        // @ts-expect-error Ignore typing errors between datalabels plugin and chart component types
        Chart.register(datalabelsPlugin);
        // Register the streaming plugin
        Chart.register(streamingPlugin.RealTimeScale);
        Chart.register(streamingPlugin.StreamingPlugin);

        setChartJsLoaded(true);
        console.log("Chart.js and plugins/adapters registered.");
      }).catch((error) => {
        console.error(
          "Failed to import or register chartjs plugins:",
          error,
        );
      });
    }

    if (canvasRef.current && chartJsLoaded) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart<TType, TData>(canvasRef.current, {
        type: type,
        data: data.value,
        options: options,
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = undefined;
      }
    };
  }, [type, data, options, chartJsLoaded]); // Depend on chartJsLoaded to re-trigger chart creation

  // const [zoomOptionsState, setZoomOptions] = useState(zoomOptions);

  // Action Handlers
  const handleToggleZoom = () => {
    if (chartRef.current) {
      const currentWheelEnabled: boolean = getZoomByWheelCurrentlyEnabled(
        zoomPluginOptions,
      );
      const currentPinchEnabled: boolean = getZoomByPinchCurrentlyEnabled(
        zoomPluginOptions,
      );
      zoomPluginOptions.value.zoom = {
        ...zoomPluginOptions.value,
        wheel: { enabled: !currentWheelEnabled },
        pinch: { enabled: !currentPinchEnabled },
      };
      console.debug(
        `Changed wheel-zoom option to: ${
          getZoomByWheelCurrentlyEnabled(zoomPluginOptions)
        }`,
      );
      console.debug(
        `Changed pinch-zoom option to: ${
          getZoomByPinchCurrentlyEnabled(zoomPluginOptions)
        }`,
      );
      // Call update on the chart instance to apply changes
      chartRef.current.update();
    }
  };

  const handleTogglePan = () => {
    if (chartRef.current) {
      const currentPanEnabled: boolean = getZoomByPanCurrentlyEnabled(
        zoomPluginOptions,
      );
      zoomPluginOptions.value.pan = {
        enabled: !currentPanEnabled,
        mode: "xy",
      };
      console.debug(
        `Changed pan-zoom option to: ${
          getZoomByPanCurrentlyEnabled(zoomPluginOptions)
        }`,
      );
      chartRef.current.update();
    }
  };

  const handleResetZoom = () => {
    if (chartRef.current) {
      console.debug("Reset chart zoom");
      chartRef.current.data = data.value;
      //// @ts-expect-error Property 'resetZoom' does not exist on type 'Chart<TType, TData, unknown>'.deno-ts(2339)
      chartRef.current.resetZoom();
    }
  };

  const handleZoomNextWeek = () => {
    if (chartRef.current) {
      // Luxon specific date handling
      const now = new Date(); // Or use a proper Luxon DateTime object
      const nextWeekStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 7,
      ).toISOString();
      const nextWeekEnd = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 14,
      ).toISOString();
      //// @ts-expect-error Property 'zoomScale' does not exist on type 'Chart<TType, TData, unknown>'.deno-ts(2339)
      chartRef.current.zoomScale("x", {
        // @ts-expect-error Type 'string' is not assignable to type 'number'.deno-ts(2322) index.d.ts(7, 21): The expected type comes from property 'min' which is declared here on type 'ScaleRange'
        min: nextWeekStart,
        // @ts-expect-error Type 'string' is not assignable to type 'number'.deno-ts(2322) index.d.ts(7, 21): The expected type comes from property 'min' which is declared here on type 'ScaleRange'
        max: nextWeekEnd,
      }, "default");
      chartRef.current.update();
    }
  };

  // Update manually
  // const handler: { (): void } = () => {
  //   if (chartRef.current) {
  //     chartRef.current.data = data.value;
  //     chartRef.current.update();
  //   }
  // };
  // // Effect to update the chart when the signal changes
  // setInterval(handler, 1000 / 60);
  return (
    <>
      <div>
        {/* Action Buttons */}
        <div class="my-4 flex gap-2">
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleToggleZoom}
          >
            Toggle Zoom
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleTogglePan}
          >
            Toggle Pan
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleResetZoom}
          >
            Reset Zoom
          </button>
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleZoomNextWeek}
          >
            Zoom to Next Week (X)
          </button>
        </div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}
