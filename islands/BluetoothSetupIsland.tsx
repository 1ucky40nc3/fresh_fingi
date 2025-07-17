import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface BluetoothSetupProps {
  appContext: Signal<TAppContext>;
}

const BluetoothSetupIsland: FunctionComponent<BluetoothSetupProps> = (
  props: BluetoothSetupProps,
) => {
  function handleOnClick() {
    console.debug("Handle bluetooth scan and connect button click.");
    props.appContext.value.state = "sensorSetup";
    console.debug(props.appContext.value);
    props.appContext.value.bluetoothConnected = true;
    console.debug(props.appContext.value);
  }
  return (
    <>
      <div class="flex flex-col">
        <h1>Bluetooth Setup</h1>
        <button type="button" onClick={handleOnClick}>
          <span>Scan and connect to a bluetooth device.</span>
        </button>
      </div>
    </>
  );
};

export default BluetoothSetupIsland;
