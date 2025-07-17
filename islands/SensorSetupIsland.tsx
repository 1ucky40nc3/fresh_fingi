import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface SensorSetupProps {
  appContext: Signal<TAppContext>;
}

const SensorSetupIsland: FunctionComponent<SensorSetupProps> = (
  props: SensorSetupProps,
) => {
  function handleOnClick() {
    console.debug("Handle tare sensor button click.");
    console.debug(props.appContext.value);
    props.appContext.value.state = "training";
    console.debug(props.appContext.value);
  }
  return (
    <>
      <div class="flex flex-col">
        <h1>Sensor Setup</h1>
        <button type="button" onClick={handleOnClick}>
          <span>Tare sensor.</span>
        </button>
      </div>
    </>
  );
};

export default SensorSetupIsland;
