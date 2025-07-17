import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";
import BluetoothSetupIsland from "./BluetoothSetupIsland.tsx";
import SensorSetupIsland from "./SensorSetupIsland.tsx";
import TrainingIsland from "./TrainingIsland.tsx";
import NavigationNotificationIsland from "./NavigationNotificationIsland.tsx";

interface StageProps {
  appContext: Signal<TAppContext>;
}

const StageIsland: FunctionComponent<StageProps> = (
  props: StageProps,
) => {
  return (
    <>
      <div class="min-h-screen flex flex-col">
        <NavigationNotificationIsland appContext={props.appContext}>
        </NavigationNotificationIsland>
        {props.appContext.value.state === "bluetoothSetup" && (
          <BluetoothSetupIsland appContext={props.appContext}>
          </BluetoothSetupIsland>
        )}
        {props.appContext.value.state === "sensorSetup" && (
          <SensorSetupIsland appContext={props.appContext}></SensorSetupIsland>
        )}
        {props.appContext.value.state === "training" && (
          <TrainingIsland appContext={props.appContext}></TrainingIsland>
        )}
      </div>
    </>
  );
};

export default StageIsland;
