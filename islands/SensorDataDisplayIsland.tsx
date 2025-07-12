import { Signal, useSignal } from "@preact/signals";
import { ChartData, ChartOptions } from "chart.js";
import { DateTime } from "luxon";
import ChartIsland from "./ChartIsland.tsx";

export type SensorDataDisplayChartData = ChartData<
  "line",
  TimeSeriesDataType[]
>;

interface SensorDataDisplayIslandProps {
  chartData: Signal<SensorDataDisplayChartData>;
  xAxisMin: Signal<string>;
  xAxisMax: Signal<string>;
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
  const MAX_VISIBLE_TIME_WINDOW_SECONDS = 10;

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
        //min: props.xAxisMin.value, // Initial min time
        //max: props.xAxisMax.value, // Initial max time
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
        beginAtZero: false,
      },
    },
    plugins: {
      zoom: zoomPluginOptions.value,
      datalabels: {
        // ... (your datalabels config)
      },
    },
    animation: {
      delay: 0,
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
