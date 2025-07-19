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
          <h1 class="font-heading text-5xl font-bold">
            Setup Step 1/2:<br />Bluetooth
          </h1>
        </div>
        <div class="h-gr-half-4">
          <span class="font-text text-2xl">
            Please connect to a compatible bluetooth device!
          </span>
        </div>
        <div class="h-gr-half-4 flex flex-row justify-center items-center border-black">
          <button
            class="border-dotted border-black border-2 p-5 rounded-xl"
            type="button"
            onClick={handleOnClick}
          >
            <span class="inline-block align-middle leading-none font-interactive">
              Scan & Connect <br /> Bluetooth Device {"->"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default BluetoothSetupIsland;
