// islands/SensorDataDisplayIsland.tsx

import { IS_BROWSER } from "$fresh/runtime.ts";
import { ChartJs } from "https://deno.land/x/fresh_charts@0.3.1/deps.ts";
// Import the date-fns adapter. This import usually handles the registration itself
// by attaching to the Chart object, which fresh_charts makes available via ChartJs.Chart.
// Ensure this import happens *after* ChartJs is available.
import "https://esm.sh/stable/chartjs-adapter-date-fns@3.0.0?target=es2022";

// Import the base Chart type from chart.js
import type { Chart as ChartJsBaseInstanceType } from "https://esm.sh/stable/chart.js@4.3.0/auto?target=es2022";
// Import the Chart component from your local integration
import ChartIsland from "./integrations/Chart.tsx"; // Renamed to ChartComponent to avoid confusion with Chart type

import { useEffect, useRef, useState } from "preact/hooks";

// Extend the ChartJsBaseInstanceType with the methods provided by chartjs-plugin-zoom
// This is module augmentation, telling TypeScript that these methods exist on the Chart instance
// once the plugin is registered.
declare module "https://esm.sh/stable/chart.js@4.4.0" {
  interface Chart {
    // Methods added by chartjs-plugin-zoom
    pan(pan: PanAmount, scales?: Scale[], mode?: UpdateMode): void;
    zoom(zoom: ZoomAmount, mode?: UpdateMode): void;
    zoomRect(p0: Point, p1: Point, mode?: UpdateMode): void;
    zoomScale(id: string, range: ScaleRange, mode?: UpdateMode): void;
    resetZoom(mode?: UpdateMode): void;
    getZoomLevel(): number;
    getInitialScaleBounds(): Record<string, { min: number; max: number }>;
    isZoomedOrPanned(): boolean;
  }
}

// Define types used in the module augmentation
type Point = { x: number; y: number };
type ZoomAmount = number | Partial<Point> & { focalPoint?: Point };
type PanAmount = number | Partial<Point>;
type ScaleRange = { min: number | string; max: number | string };
// Import Chart and UpdateMode types for the module augmentation
import type { Scale, UpdateMode } from "https://esm.sh/stable/chart.js@4.4.0";

// Helper function to generate some dummy data
const generateData = (count: number, min: number, max: number): number[] => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.random() * (max - min) + min);
  }
  return data;
};

const generateLabels = (count: number): number[] => {
  const labels: number[] = [];
  let currentDate = new Date();
  for (let i = 0; i < count; i++) {
    labels.push(currentDate.getTime());
    currentDate = new Date(currentDate.getTime() + 60 * 60 * 1000); // Add 1 hour
  }
  return labels;
};

const numSamples: number = 500;
const labels: number[] = generateLabels(numSamples);

// Initial data for the chart
const initialData = {
  labels: labels,
  // xLabels: labels.map((label) => new Date(label).toLocaleString()),
  datasets: [{
    label: "My First dataset",
    type: "line",
    borderColor: "rgba(75, 192, 192, 0.4)",
    backgroundColor: "rgba(75, 192, 192, 0.1)",
    pointBorderColor: "rgba(75, 192, 192, 0.7)",
    pointBackgroundColor: "rgba(75, 192, 192, 0.5)",
    pointBorderWidth: 1,
    data: generateData(numSamples, 0, 20),
  }],
};

export default function SensorDataDisplayIsland() {
  // State to track if the zoom plugin has been loaded and registered
  const [isPluginLoaded, setIsPluginLoaded] = useState(false);

  // Use useEffect for client-side only imports and plugin registration
  // This ensures the plugin is registered only once on the client side
  useEffect(() => {
    if (IS_BROWSER) {
      console.log("importing chartjs plugins");
      Promise.all([
        import("npm:chartjs-plugin-zoom@2.0.1"),
      ]).then(([zoomPlugin]) => {
        // @ts-expect-error ignore plugin default typing issues
        ChartJs.Chart.register(zoomPlugin.default);
        // console.log(dateAdapter);
        // ChartJs.Chart.register(dateAdapter.default); // Register the date adapter
        console.log("imported zoom plugin");
        setIsPluginLoaded(true); // Set state to true once both are loaded
      }).catch((error) => {
        console.error(
          "Failed to import or register chartjs plugins:",
          error,
        );
      });

      // console.log("importing chartjs adapters");
      // ChartJs.Chart._adapters = Chart._adapters;
    }
  }, []); // Empty dependency array ensures this runs only once on component mount

  // import "chartjs-adapter-date-fns"; // Import the adapter

  // useRef to get a direct reference to the Chart.js instance
  // Use ChartJsBaseInstanceType, which is augmented by the declare module block
  const chartRef = useRef<ChartJsBaseInstanceType | null>(null);

  // useState to manage the chart options, especially for dynamic updates
  const [chartOptions, setChartOptions] = useState(() => {
    const zoomOptions = {
      zoom: {
        wheel: { enabled: true },
        pinch: { enabled: true },
        mode: "xy",
      },
      pan: {
        enabled: true,
        mode: "xy",
      },
    };

    const panStatus = () => zoomOptions.pan.enabled ? "enabled" : "disabled";
    const zoomStatus = () =>
      zoomOptions.zoom.wheel.enabled ? "enabled" : "disabled";

    return {
      scales: {
        x: {
          type: "time",
          // Crucially, tell Chart.js to treat the incoming value as a timestamp directly
          parser: (value: number) => new Date(value),
          // You can also use a callback for the tick formatter if you need more custom logic
          ticks: {
            // This formatter will apply to the axis labels
            callback: function (value: any, index: any, ticks: any) {
              return new Date(value).toLocaleTimeString();
            },
          },
          position: "bottom",
          title: {
            display: true,
            text: "X-Axis",
          },
        },
        y: {
          position: "right",
          grid: {
            borderColor: "rgba(0, 0, 0, 0.1)",
            color: "rgba(0, 0, 0, 0.1)",
          },
          title: {
            display: true,
            text: "Y-axis",
          },
        },
      },
      plugins: {
        zoom: zoomOptions,
        title: {
          display: true,
          position: "bottom",
          text: `Zoom: ${zoomStatus()}, Pan: ${panStatus()}`,
        },
      },
      onClick(e: any) {
        console.log(e.type);
      },
      maintainAspectRatio: false, // Allow chart to fill container
      responsive: true, // Make chart responsive
    };
  });

  // Function to update the chart title based on current zoom/pan status
  const updateChartTitle = (currentOptions: any) => {
    const zoomEnabled = currentOptions.plugins.zoom.zoom.wheel.enabled;
    const panEnabled = currentOptions.plugins.zoom.pan.enabled;
    return `Zoom: ${zoomEnabled ? "enabled" : "disabled"}, Pan: ${
      panEnabled ? "enabled" : "disabled"
    }`;
  };

  // Action handlers
  const toggleZoom = () => {
    setChartOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      const zoomPlugin = newOptions.plugins.zoom as any;
      zoomPlugin.zoom.wheel.enabled = !zoomPlugin.zoom.wheel.enabled;
      zoomPlugin.zoom.pinch.enabled = !zoomPlugin.zoom.pinch.enabled;
      newOptions.plugins.title.text = updateChartTitle(newOptions);
      return newOptions;
    });
    // Ensure chart instance exists before calling update
    chartRef.current?.update();
  };

  const togglePan = () => {
    setChartOptions((prevOptions) => {
      const newOptions = { ...prevOptions };
      const zoomPlugin = newOptions.plugins.zoom as any;
      zoomPlugin.pan.enabled = !zoomPlugin.pan.enabled;
      newOptions.plugins.title.text = updateChartTitle(newOptions);
      return newOptions;
    });
    // Ensure chart instance exists before calling update
    chartRef.current?.update();
  };

  const resetZoom = () => {
    // Ensure chart instance exists before calling resetZoom
    chartRef.current?.resetZoom();
  };

  const zoomToNextWeek = () => {
    const now = new Date();
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    // Ensure chart instance exists before calling zoomScale
    chartRef.current?.zoomScale("x", {
      min: now.toISOString(),
      max: nextWeek.toISOString(),
    }, "default");
    chartRef.current?.update();
  };

  const zoomTo400_600 = () => {
    // Ensure chart instance exists before calling zoomScale
    chartRef.current?.zoomScale("y", { min: 400, max: 600 }, "default");
    chartRef.current?.update();
  };

  return (
    <div class="p-4 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">
        Chart with Zoom & Pan Actions
      </h1>

      <div
        class="bg-white p-4 rounded-lg shadow-inner mb-6"
        style="height: 400px;"
      >
        {/* Conditionally render the chart only after the plugin is loaded */}
        {isPluginLoaded
          ? (
            <ChartIsland // Using ChartComponent as per your import
              type="scatter"
              // @ts-expect-error ignore typing issues
              data={initialData}
              // @ts-expect-error ignore typing issues
              options={chartOptions}
              ref={chartRef} // Attach ref to get chart instance
            />
          )
          : (
            <div class="flex items-center justify-center h-full text-gray-500">
              Loading chart plugin and date adapter...
            </div>
          )}
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <button
          onClick={toggleZoom}
          class="px-5 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
          disabled={!isPluginLoaded} // Disable buttons until plugin is loaded
        >
          Toggle Zoom
        </button>
        <button
          onClick={togglePan}
          class="px-5 py-2 bg-green-600 text-white font-semibold rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
          disabled={!isPluginLoaded}
        >
          Toggle Pan
        </button>
        <button
          onClick={resetZoom}
          class="px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
          disabled={!isPluginLoaded}
        >
          Reset Zoom
        </button>
        <button
          onClick={zoomToNextWeek}
          class="px-5 py-2 bg-purple-600 text-white font-semibold rounded-md shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
          disabled={!isPluginLoaded}
        >
          Zoom to Next Week
        </button>
        <button
          onClick={zoomTo400_600}
          class="px-5 py-2 bg-yellow-600 text-white font-semibold rounded-md shadow-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 transition duration-200 ease-in-out transform hover:scale-105"
          disabled={!isPluginLoaded}
        >
          Zoom to 400-600
        </button>
      </div>
    </div>
  );
}
