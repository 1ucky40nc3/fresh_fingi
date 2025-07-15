import { Signal, useSignal } from "@preact/signals";
import { ChartData, ChartOptions } from "chart.js";
import ChartIsland from "./ChartIsland.tsx";
import { DARK_MODE_COLORS } from "../colors.ts";

export type SensorDataDisplayChartData = ChartData<
  "line",
  TimeSeriesDataType[]
>;

interface SensorDataDisplayIslandProps {
  chartData: Signal<SensorDataDisplayChartData>;
  onRefresh: Signal<{ (): void }>;
}

export default function SensorDataDisplayIsland(
  props: SensorDataDisplayIslandProps,
) {
  const zoomPluginOptions: ZoomPluginOptions = {
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
  };

  const sharedScaleOptios = {
    ticks: {
      color: "white",
    },
    grid: {
      color: DARK_MODE_COLORS["drk-surface-a10"],
    },
  };

  const chartOptions: Signal<ChartOptions> = useSignal<ChartOptions>({
    responsive: true,
    maintainAspectRatio: true,
    color: DARK_MODE_COLORS["drk-surface-a10"],
    backgroundColor: DARK_MODE_COLORS["drk-primary-a20"],
    borderColor: DARK_MODE_COLORS["drk-primary-a10"],
    scales: {
      x: {
        position: "bottom",
        type: "realtime",
        realtime: {
          duration: 20000, // Show the last 20 seconds
          refresh: 100, // Refresh every 100 ms
          delay: 100, // Delay in ms until the newest data point is shown
          onRefresh: props.onRefresh.value,
        },
        ...sharedScaleOptios,
      },
      y: {
        position: "right",
        title: {
          display: true,
          text: "Force (kg)",
          color: "white",
        },
        beginAtZero: true,
        ...sharedScaleOptios,
      },
    },
    interaction: {
      intersect: false,
    },

    plugins: {
      zoom: zoomPluginOptions,
      legend: {
        display: false,
      },
    },
  });

  return (
    <>
      <ChartIsland
        type="line"
        data={props.chartData}
        options={chartOptions}
      />
    </>
  );
}
