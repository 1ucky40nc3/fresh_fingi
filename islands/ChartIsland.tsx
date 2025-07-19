import { useEffect, useRef, useState } from "preact/hooks";
import { Signal, useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import {
  Chart,
  ChartData,
  ChartOptions,
  ChartType,
  DefaultDataPoint,
  registerables,
} from "chart.js";
import "chartjs-adapter-luxon";

interface ChartIslandProps<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
> {
  type: TType;
  data: Signal<ChartData<TType, TData>>;
  options: Signal<ChartOptions<TType>>;
}

export default function ChartIsland<
  TType extends ChartType = ChartType,
  TData = DefaultDataPoint<TType>,
>(
  { type, data, options }: ChartIslandProps<TType, TData>,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<TType, TData>>();
  const [chartJsLoaded, setChartJsLoaded] = useState(false);

  useEffect(() => {
    // We use a state to ensure Chart.js is registered only once per component lifecycle
    // across re-renders.
    if (IS_BROWSER && !chartJsLoaded) {
      Promise.all([
        import("npm:chartjs-plugin-zoom"),
        import("npm:@1ucky40nc3/chartjs-plugin-streaming"),
      ]).then(([zoomPlugin, streamingPlugin]) => {
        // Register all necessary components (scales, elements, controllers, etc.)
        Chart.register(...registerables); // Required for Chart.js v3+
        // Register the zoom plugin
        // @ts-expect-error Ignore typing errors between zoom plugin and chart component types
        Chart.register(zoomPlugin.default);
        // Register the streaming plugin
        Chart.register(streamingPlugin.RealTimeScale);
        Chart.register(streamingPlugin.StreamingPlugin);

        setChartJsLoaded(true);
        console.log("Chart.js and plugins/adapters registered.");
      }).catch((error) => {
        console.error(
          "Failed to import or register chartjs plugins:",
          error,
        );
      });
    }

    if (canvasRef.current && chartJsLoaded) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      if (containerRef.current) {
        options.value = {
          ...options.value,
          aspectRatio: containerRef.current?.offsetHeight /
            containerRef.current?.offsetWidth,
        };
      }

      chartRef.current = new Chart<TType, TData>(canvasRef.current, {
        type: type,
        data: data.value,
        options: options.value,
      });
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = undefined;
      }
    };
  }, [type, data, options, chartJsLoaded]);

  const doStopDataStream: Signal<boolean> = useSignal<boolean>(true);
  const onRefreshHandler: Signal<{ (): void }> = useSignal<{ (): void }>(
    () => {},
  );

  const handleStopAndResumeDataStream: { (): void } = (): void => {
    if (chartRef.current) {
      console.debug("Toggle stop/resume data streaming");
      // @ts-expect-error  Property 'realtime' does not exist on type
      if (chartRef.current.config.options?.scales?.x?.realtime) {
        // @ts-expect-error  Property 'realtime' does not exist on type
        const realtime = chartRef.current.config.options.scales.x.realtime;

        // Replace the `onRefresh` handle with a empty dummy function if we want to stop the data stream
        const tmpOnRefreshHandler: { (): void } = realtime.onRefresh;
        realtime.onRefresh = onRefreshHandler.value;
        onRefreshHandler.value = tmpOnRefreshHandler;
        // Do stop the scrolling
        realtime.pause = doStopDataStream.value;
      }
      doStopDataStream.value = !doStopDataStream.value;
      console.debug(
        `Did toggle the doStopDataStream value to '${doStopDataStream}'`,
      );
    }
  };

  const handleResetZoom: { (): void } = (): void => {
    if (chartRef.current) {
      console.debug("Reset chart zoom");

      chartRef.current.data = data.value;
      chartRef.current.resetZoom();
    }
  };

  const handleClearData: { (): void } = (): void => {
    if (chartRef.current) {
      console.debug("Clear data");

      for (const dataset of data.value.datasets) {
        dataset.data = [] as TData;
      }
      chartRef.current.data = data.value;
      chartRef.current.resetZoom();
    }
  };
  return (
    <>
      <div
        ref={containerRef}
        class=" flex flex-col justify-around"
      >
        <div class="pt-6 pb-6 w-gr-double-3">
          <canvas ref={canvasRef}>
          </canvas>
        </div>
        <div class="flex flex-row flex-grow justify-around">
          <button
            class="border-dotted border-black border-2 p-1 rounded-xl"
            onClick={handleStopAndResumeDataStream}
          >
            <span class="inline-block align-middle leading-none font-interactive">
              {doStopDataStream.value ? "Stop" : "Resume"}
            </span>
          </button>
          <button
            class="border-dotted border-black border-2 p-1 rounded-xl"
            onClick={handleResetZoom}
          >
            <span class="inline-block align-middle leading-none font-interactive">
              Reset Zoom
            </span>
          </button>
          <button
            class="border-dotted border-black border-2 p-1 rounded-xl"
            onClick={handleClearData}
          >
            <span class="inline-block align-middle leading-none font-interactive">
              Clear data
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
