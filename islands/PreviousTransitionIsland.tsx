import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";

interface PreviousTransitionProps {
  appContext: Signal<TAppContext>;
  transition: TAppStateTransition<Signal<TAppContext>>;
}

const PreviousTransitionIsland: FunctionComponent<PreviousTransitionProps> = (
  props: PreviousTransitionProps,
) => {
  function onClickHandler() {
    return props.transition.handler(props.appContext);
  }
  return (
    <>
      <div class="flex flex-row">
        <button type="button" onClick={onClickHandler}>
          <span>{props.transition.text}</span>
        </button>
      </div>
    </>
  );
};

export default PreviousTransitionIsland;
