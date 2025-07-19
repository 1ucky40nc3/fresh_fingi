import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal, useSignal } from "@preact/signals";
import BluetoothSetupIsland from "./BluetoothSetupIsland.tsx";
import SensorSetupIsland from "./SensorSetupIsland.tsx";
import TrainingIsland, { TrainingChartData } from "./TrainingIsland.tsx";
import NavigationNotificationIsland from "./NavigationNotificationIsland.tsx";
import { addExampleTimeSeriesData } from "../utils/data.ts";

interface StageProps {
  appState: Signal<TAppState>;
  bluetoothConnected: Signal<boolean>;
  sensorMeasurement: Signal<number>;
}

const StageIsland: FunctionComponent<StageProps> = (
  { appState, bluetoothConnected }: StageProps,
) => {
  const data: TimeSeriesDataType[] = [];
  const chartData = useSignal<TrainingChartData>({
    datasets: [{
      type: "line",
      label: "Sensor Time Series Data",
      data: data,
      tension: 0.3,
      pointBorderWidth: 1,
    }],
  });

  const onRefresh: Signal<{ (): void }> = useSignal((): void => {
    addExampleTimeSeriesData(chartData.value.datasets[0].data, {
      count: 100,
      min: -200,
      max: 200,
    });
  });

  return (
    <>
      <div class="min-h-screen flex flex-col">
        <NavigationNotificationIsland
          appState={appState}
          bluetoothConnected={bluetoothConnected}
        >
        </NavigationNotificationIsland>
        {appState.value === "bluetoothSetup" && (
          <BluetoothSetupIsland
            appState={appState}
            bluetoothConnected={bluetoothConnected}
          >
          </BluetoothSetupIsland>
        )}
        {appState.value === "sensorSetup" && (
          <SensorSetupIsland
            appState={appState}
          >
          </SensorSetupIsland>
        )}
        {appState.value === "training" && (
          <TrainingIsland chartData={chartData} onRefresh={onRefresh}>
          </TrainingIsland>
        )}
      </div>
    </>
  );
};

export default StageIsland;
