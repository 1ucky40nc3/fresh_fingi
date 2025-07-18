import { FunctionComponent, JSX } from "preact";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";

interface SensorSetupProps {
  appState: Signal<TAppState>;
  sensorMeasurement: Signal<number>;
}

const SensorSetupIsland: FunctionComponent<SensorSetupProps> = (
  { appState, sensorMeasurement }: SensorSetupProps,
) => {
  const [sensorCalibrationFactor, setSensorCalibrationFactor] = useState<
    number | string
  >("33");
  function handleSensorCalibrationFactorChange(
    event: JSX.TargetedEvent<HTMLInputElement, Event>,
  ) {
    const currentValue: number = Number(event.currentTarget.value);
    console.debug(`Updating sensor calibration factor to: ${currentValue}`);
    setSensorCalibrationFactor(currentValue);
  }

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
            <span>Tare Sensor.</span>
          </button>
          <div class="flex flow-row justify-around">
            <label for="sensor-calibration-factor" class="mr-2">
              Calibration Factor:
            </label>
            <input
              id="sensor-calibration-factor"
              type="number"
              class="w-24 border-black"
              value={sensorCalibrationFactor}
              onChange={handleSensorCalibrationFactorChange}
            />
            <span>{sensorMeasurement.value}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SensorSetupIsland;
