import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface TrainingProps {
  appContext: Signal<TAppContext>;
}

const TrainingIsland: FunctionComponent<TrainingProps> = (
  props: TrainingProps,
) => {
  return (
    <>
      <span>Training Island</span>
    </>
  );
};

export default TrainingIsland;
