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
        data={props.chartData}
        options={chartOptions}
        zoomPluginOptions={zoomPluginOptions}
      />
    </>
  );
}
