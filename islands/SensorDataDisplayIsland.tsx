import { useSignal } from "@preact/signals";
import { DateTime } from "luxon";
import { ChartData, ChartOptions } from "chart.js";
import ChartIsland from "./ChartIsland.tsx";

// Helper for generating dummy data (replace with your actual data logic)
const Utils = {
  numbers: (config: { count: number; min: number; max: number }): number[] => {
    const data: number[] = [];
    let value: number = (config.max + config.min) / 2;
    for (let i = 0; i < config.count; i++) {
      value += Math.max(
        Math.min(5 - Math.random() * 10, config.max),
        config.min,
      );
      data.push(value);
    }
    return data;
  },
  // Example for hourly points - adapt as needed for Luxon
  dates: (config: { count: number; hertz: number }): string[] => {
    const offset: number = 1000 / config.hertz; // Offset between dates in ms
    const dates: string[] = [];
    let date = DateTime.now();
    for (let i = 0; i < config.count; i++) {
      dates.push(date.toISO());
      date = date.plus({ milliseconds: offset });
    }
    return dates;
  },
};

export default function SensorDataDisplayIsland() {
  // Example data (adjust as needed)
  const chartData = useSignal<ChartData>({
    labels: Utils.dates({ count: 1000, hertz: 80 }),
    datasets: [{
      label: "My First dataset",
      pointBorderWidth: 1,
      // data: Utils.hourlyPoints({ count: 500, min: 0, max: 1000 }),
      data: Utils.numbers({ count: 1000, min: -200, max: 200 }),
    }],
  });

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

  const chartOptions: ChartOptions = {
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
          unit: "second", // Use hour as unit
          displayFormats: {
            hour: "HH:mm",
            minute: "HH:mm",
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "X - Axis",
        },
      },
      y: {
        position: "right",
        title: {
          display: true,
          text: "Y - Axis",
        },
      },
    },
    plugins: {
      zoom: zoomPluginOptions.value,
      datalabels: {
        // ... (your datalabels config)
      },
    },
  };

  return (
    <>
      <ChartIsland
        type="line"
        data={chartData}
        options={chartOptions}
        zoomPluginOptions={zoomPluginOptions}
      />
    </>
  );
}
