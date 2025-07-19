import { Signal, useSignal } from "@preact/signals";
import { ChartData, ChartOptions } from "chart.js";
import ChartIsland from "./ChartIsland.tsx";

export type TrainingChartData = ChartData<
  "line",
  TimeSeriesDataType[]
>;

interface TrainingProps {
  chartData: Signal<TrainingChartData>;
  onRefresh: Signal<{ (): void }>;
}

export default function Training(
  props: TrainingProps,
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

  const chartOptions: Signal<ChartOptions> = useSignal<ChartOptions>({
    responsive: true,
    maintainAspectRatio: true,
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
      },
      y: {
        position: "right",
        title: {
          display: true,
          text: "Force (kg)",
          color: "white",
        },
        beginAtZero: true,
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
