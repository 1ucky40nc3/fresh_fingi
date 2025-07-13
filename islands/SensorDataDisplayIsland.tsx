import { Signal, useSignal } from "@preact/signals";
import { ChartData, ChartOptions } from "chart.js";
import ChartIsland from "./ChartIsland.tsx";

export type SensorDataDisplayChartData = ChartData<
  "line",
  TimeSeriesDataType[]
>;

interface SensorDataDisplayIslandProps {
  chartData: Signal<SensorDataDisplayChartData>;
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

  const chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        position: "bottom",
        type: "time",
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
    plugins: {
      zoom: zoomPluginOptions.value,
      datalabels: {
        // ... (your datalabels config)
      },
    },
    animation: {
      // @ts-expect-error Ignore typing error for now
      y: { duration: 0 },
      duration: 10,
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
