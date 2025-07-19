import { FunctionComponent, JSX } from "preact";
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
        <div class="h-gr-double-3 flex items-center">
          <h1>Setup Step 2/2: Calibration</h1>
        </div>
        <div class="h-gr-half-4">
          <span>
            Calibrate sensor. The calibration consists of taring the sensor.
          </span>
        </div>
        <div class="h-gr-half-4 flex flex-col justify-center items-center">
          <button type="button" onClick={handleOnClick}>
            <span class="font-interactive">Tare Sensor -{">"}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SensorSetupIsland;
