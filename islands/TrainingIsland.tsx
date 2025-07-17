import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface TrainingProps {
  appState: Signal<TAppState>;
}

const TrainingIsland: FunctionComponent<TrainingProps> = (
  { appState }: TrainingProps,
) => {
  return (
    <>
      <span>Training Island</span>
    </>
  );
};

export default TrainingIsland;
