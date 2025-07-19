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
        enabled: false, // We disable the `zoom` by default while streaming (this get's toggled when pausing the stream)
      },
      pinch: {
        enabled: false, // We disable the `pinch` by default while streaming (this get's toggled when pausing the stream)
      },
      mode: "xy",
    },
    pan: {
      enabled: false, // We disable the `zoom` by default while streaming (this get's toggled when pausing the stream)
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
        ticks: {
          font: {
            family: "font-text",
          },
        },
      },
      y: {
        position: "right",
        ticks: {
          font: {
            family: "font-text",
          },
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
        display: true,
        labels: {
          font: {
            family: "font-heading",
            weight: "bold",
            size: 20,
          },
        },
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
