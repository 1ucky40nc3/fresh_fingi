import { useSignal } from "@preact/signals";
import ChartIsland from "./ChartIsland.tsx";
import {
  getZoomByPanCurrentlyEnabled,
  getZoomByWheelCurrentlyEnabled,
} from "../utils/zoom.ts";

// Helper for generating dummy data (replace with your actual data logic)
const Utils = {
  numbers: (config: { count: number; min: number; max: number }) => {
    const arr = [];
    for (let i = 0; i < config.count; i++) {
      arr.push(Math.random() * (config.max - config.min) + config.min);
    }
    return arr;
  },
  // Example for hourly points - adapt as needed for Luxon
  hourlyPoints: (config: { count: number; min: number; max: number }) => {
    const data = [];
    let date = new Date("2025-01-01T00:00:00Z");
    for (let i = 0; i < config.count; i++) {
      data.push({
        x: date.toISOString(), // Luxon will parse this
        y: Math.random() * (config.max - config.min) + config.min,
      });
      date.setHours(date.getHours() + 1); // Add an hour
    }
    return data;
  },
  randomColor: (alpha: number) => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},${alpha})`;
  },
};

export default function SensorDataDisplayIsland() {
  // Example data (adjust as needed)
  const chartData = {
    datasets: [{
      label: "My First dataset",
      borderColor: Utils.randomColor(0.4),
      backgroundColor: Utils.randomColor(0.1),
      pointBorderColor: Utils.randomColor(0.7),
      pointBackgroundColor: Utils.randomColor(0.5),
      pointBorderWidth: 1,
      data: Utils.hourlyPoints({ count: 500, min: 0, max: 1000 }),
    }],
  };

  const zoomPluginOptions = useSignal<ZoomPluginOptions>({
    zoom: {
      wheel: {
        enabled: true,
      },
      pinch: {
        enabled: true,
      },
      mode: "xy",
    },
    pan: {
      enabled: true,
      mode: "xy",
    },
  });

  const chartOptions = {
    scales: {
      x: {
        position: "bottom",
        type: "time",
        ticks: {
          autoSkip: true,
          autoSkipPadding: 50,
          maxRotation: 0,
        },
        time: {
          unit: "hour", // Use hour as unit
          displayFormats: {
            hour: "HH:mm",
            minute: "HH:mm",
            second: "HH:mm:ss",
          },
        },
      },
      y: {
        position: "right",
        ticks: {
          callback: (val: any, index: number, ticks: any[]) =>
            index === 0 || index === ticks.length - 1 ? null : val,
        },
        grid: {
          borderColor: Utils.randomColor(1),
          color: "rgba( 0, 0, 0, 0.1)",
        },
        title: {
          display: true,
          text: (ctx: any) => ctx.scale.axis + " axis",
        },
      },
    },
    plugins: {
      zoom: zoomPluginOptions.value, // Pass the mutable zoomOptions state
      title: {
        display: true,
        position: "bottom",
        text: (): string => {
          return `Zoom: ${
            getZoomByWheelCurrentlyEnabled(zoomPluginOptions)
              ? "enabled"
              : "disabled"
          }, Pan: ${
            getZoomByPanCurrentlyEnabled(zoomPluginOptions)
              ? "enabled"
              : "disabled"
          }`;
        },
      },
      datalabels: {
        // ... (your datalabels config)
      },
    },
    onClick(e: any) {
      console.log("Chart clicked:", e.type);
    },
  };

  return (
    <>
      <ChartIsland
        type="line" // or 'scatter' as in the example
        // @ts-expect-error Ignore chart data typing errors
        data={chartData}
        options={chartOptions as any} // Cast if type issues persist, or refine ChartOptions type
        zoomPluginOptions={zoomPluginOptions}
      />
    </>
  );
}
