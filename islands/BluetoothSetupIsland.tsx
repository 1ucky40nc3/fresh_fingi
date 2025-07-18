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
        <div class="h-gr-double-3 flex items-center">
          <h1>Setup Step 1/2: Bluetooth</h1>
        </div>
        <div class="h-gr-half-4">
          <span>Please connect to a compatible bluetooth device!</span>
        </div>
        <div class="h-gr-half-4 flex flex-row justify-center items-center">
          <button type="button" onClick={handleOnClick}>
            <span>Scan and connect to a bluetooth device.</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BluetoothSetupIsland;
