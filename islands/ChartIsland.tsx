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
        import("npm:@1ucky40nc3/chartjs-plugin-streaming"),
      ]).then(([zoomPlugin, streamingPlugin]) => {
        // Register all necessary components (scales, elements, controllers, etc.)
        Chart.register(...registerables); // Required for Chart.js v3+
        // Register the zoom plugin
        // @ts-expect-error Ignore typing errors between zoom plugin and chart component types
        Chart.register(zoomPlugin.default);
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
  }, [type, data, options, chartJsLoaded]);

  const handleResetZoom = () => {
    if (chartRef.current) {
      console.debug("Reset chart zoom");
      chartRef.current.data = data.value;
      //// @ts-expect-error Property 'resetZoom' does not exist on type 'Chart<TType, TData, unknown>'.deno-ts(2339)
      chartRef.current.resetZoom();
    }
  };

  return (
    <>
      <canvas ref={canvasRef}></canvas>
      <div>
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleResetZoom}
        >
          Reset Zoom
        </button>
      </div>
    </>
  );
}
