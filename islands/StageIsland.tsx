import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";
import BluetoothSetupIsland from "./BluetoothSetupIsland.tsx";
import SensorSetupIsland from "./SensorSetupIsland.tsx";
import TrainingIsland from "./TrainingIsland.tsx";
import NavigationNotificationIsland from "./NavigationNotificationIsland.tsx";

interface StageProps {
  appState: Signal<TAppState>;
  bluetoothConnected: Signal<boolean>;
  sensorMeasurement: Signal<number>;
}

const StageIsland: FunctionComponent<StageProps> = (
  { appState, bluetoothConnected, sensorMeasurement }: StageProps,
) => {
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
            sensorMeasurement={sensorMeasurement}
          >
          </SensorSetupIsland>
        )}
        {appState.value === "training" && (
          <TrainingIsland appState={appState}></TrainingIsland>
        )}
      </div>
    </>
  );
};

export default StageIsland;
