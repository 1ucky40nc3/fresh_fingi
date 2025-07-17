import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface BluetoothSetupProps {
  appState: Signal<TAppState>;
  bluetoothConnected: Signal<boolean>;
}

const BluetoothSetupIsland: FunctionComponent<BluetoothSetupProps> = (
  { appState, bluetoothConnected }: BluetoothSetupProps,
) => {
  function handleOnClick() {
    console.debug("Handle bluetooth scan and connect button click.");
    appState.value = "sensorSetup";
    bluetoothConnected.value = true;
  }
  return (
    <>
      <div class="flex flex-col">
        <h1>Setup Step 1/2: Bluetooth</h1>
        <button type="button" onClick={handleOnClick}>
          <span>Scan and connect to a bluetooth device.</span>
        </button>
      </div>
    </>
  );
};

export default BluetoothSetupIsland;
