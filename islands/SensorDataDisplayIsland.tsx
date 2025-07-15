import { Signal, useSignal } from "@preact/signals";
import { ChartData, ChartOptions } from "chart.js";
import ChartIsland from "./ChartIsland.tsx";

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

  const chartOptions: Signal<ChartOptions> = useSignal<ChartOptions>({
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        position: "bottom",
        type: "realtime",
        time: {
          unit: "second",
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
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
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      zoom: zoomPluginOptions,
    },
  });

  return (
    <>
      <div>
        <ChartIsland
          type="line"
          data={props.chartData}
          options={chartOptions}
        />
      </div>
    </>
  );
}
