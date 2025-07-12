// islands/ChartComponent.tsx

import { useEffect, useRef, useState } from "preact/hooks";
import { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";

import {
  Chart,
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  registerables,
} from "chart.js";
import "chartjs-adapter-luxon"; // Note: this typically auto-registers
import {
  getZoomByPanCurrentlyEnabled,
  getZoomByPinchCurrentlyEnabled,
  getZoomByWheelCurrentlyEnabled,
} from "../utils/zoom.ts";

interface ChartProps {
  type: keyof ChartTypeRegistry;
  data: ChartData;
  options?: ChartOptions;
  zoomPluginOptions: Signal<ZoomPluginOptions>;
}

export default function ChartIsland(
  { type, data, options, zoomPluginOptions }: ChartProps,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<any>(null);
  const [chartJsLoaded, setChartJsLoaded] = useState(false);

  useEffect(() => {
    // We use a state to ensure Chart.js is registered only once per component lifecycle
    // across re-renders.
    if (IS_BROWSER && !chartJsLoaded) {
      Promise.all([
        import("npm:chartjs-plugin-zoom@2.0.1"),
        import("npm:chartjs-plugin-datalabels"),
      ]).then(([zoomPlugin, datalabelsPlugin]) => {
        // Register all necessary components (scales, elements, controllers, etc.)
        Chart.register(...registerables); // Required for Chart.js v3+
        // @ts-expect-error Ignore typing errors between zoom plugin and chart component types
        Chart.register(zoomPlugin.default); // Register the zoom plugin
        // @ts-expect-error Ignore typing errors between datalabels plugin and chart component types
        Chart.register(datalabelsPlugin); // Register the datalabels plugin
        // DateAdapter usually registers itself, but can be explicitly registered if issues arise.
        // Chart.register(DateAdapter);
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
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new Chart(canvasRef.current, {
        type,
        data,
        options,
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [type, data, options, chartJsLoaded]); // Depend on chartJsLoaded to re-trigger chart creation

  // const [zoomOptionsState, setZoomOptions] = useState(zoomOptions);

  // Action Handlers
  const handleToggleZoom = () => {
    if (chartInstance.current) {
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
      chartInstance.current.update();
    }
  };

  const handleTogglePan = () => {
    if (chartInstance.current) {
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
      chartInstance.current.update();
    }
  };

  const handleResetZoom = () => {
    if (chartInstance.current) {
      console.debug("Reset chart zoom");
      chartInstance.current.resetZoom();
    }
  };

  const handleZoomNextWeek = () => {
    if (chartInstance.current) {
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

      // chart.zoomScale expects values in the same format as your data's x-axis
      chartInstance.current.zoomScale("x", {
        min: nextWeekStart,
        max: nextWeekEnd,
      }, "default");
      chartInstance.current.update();
    }
  };

  const handleZoomYAxis = () => {
    if (chartInstance.current) {
      chartInstance.current.zoomScale("y", { min: 400, max: 600 }, "default");
      chartInstance.current.update();
    }
  };

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
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleZoomYAxis}
          >
            Zoom to 400-600 (Y)
          </button>
        </div>
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
}
