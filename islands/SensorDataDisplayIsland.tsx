import { Signal, useSignal } from "@preact/signals";
import { ChartData, ChartOptions } from "chart.js";
import ChartIsland from "./ChartIsland.tsx";
import { Context } from "npm:chartjs-plugin-datalabels";

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
  const datalabelsPluginOptions = {
    backgroundColor: (context: Context) => context.dataset.borderColor,
    padding: 4,
    borderRadius: 4,
    clip: true,
    color: "white",
    font: {
      weight: "bold",
    },
    formatter: (value: TimeSeriesDataType) => value.x,
  };

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        position: "bottom",
        type: "realtime",
        time: {
          unit: "second", // Use hour as unit
          displayFormats: {
            second: "HH:mm:ss",
          },
        },
        title: {
          display: true,
          text: "X - Axis",
        },
        realtime: {
          duration: 20000,
          refresh: 1000,
          delay: 2000,
          onRefresh: props.onRefresh.value,
        },
      },
      y: {
        position: "right",
        title: {
          display: true,
          text: "Y - Axis",
        },
        beginAtZero: true,
      },
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      zoom: zoomPluginOptions.value,
      // @ts-expect-error Some typing error
      datalabels: datalabelsPluginOptions,
    },
  };

  return (
    <>
      <div>
        <ChartIsland
          type="line"
          data={props.chartData}
          options={chartOptions}
          zoomPluginOptions={zoomPluginOptions}
        />
      </div>
    </>
  );
}
