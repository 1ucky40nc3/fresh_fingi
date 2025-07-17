import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface SensorSetupProps {
  appState: Signal<TAppState>;
}

const SensorSetupIsland: FunctionComponent<SensorSetupProps> = (
  { appState }: SensorSetupProps,
) => {
  function handleOnClick() {
    appState.value = "training";
  }
  return (
    <>
      <div class="flex flex-col">
        <h1>Setup Step 2/2: Bluetooth</h1>
        <button type="button" onClick={handleOnClick}>
          <span>Tare sensor.</span>
        </button>
      </div>
    </>
  );
};

export default SensorSetupIsland;
