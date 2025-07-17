import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal, useSignal } from "@preact/signals";
import BluetoothDisconnectedNotificationIsland from "./BluetoothNotificationIsland.tsx";
import PreviousTransitionIsland from "./PreviousTransitionIsland.tsx";
import { AppStateTransitionDirectionsFactory } from "../utils/transitions.ts";

/**
 * Properties of the {@link NavigationNotificationIsland} island.
 */
interface NavigationNotificationProps {
  /** The current application context. */
  appContext: Signal<TAppContext>;
}

/**
 * Create a dummy transition that does nothing.
 */
export function createDummyTransitionHandle(): TAppStateTransition<
  Signal<TAppContext>
> {
  return {
    // deno-lint-ignore no-unused-vars
    handler: (context: Signal<TAppContext>) => {
      console.warn("A dummy transition handler was called!");
    },
  };
}

const NavigationNotificationIsland: FunctionComponent<
  NavigationNotificationProps
> = (
  props: NavigationNotificationProps,
) => {
  const transitions = AppStateTransitionDirectionsFactory.for(
    props.appContext.value.state,
  );
  const prevTransitionAvailable: boolean = Boolean(transitions.prev);
  const prevTransition = transitions.prev || createDummyTransitionHandle();

  return (
    <>
      <div class="flex flow-row justify-between">
        <div class="h-20">
          {prevTransitionAvailable && (
            <PreviousTransitionIsland
              appContext={props.appContext}
              transition={prevTransition}
            >
            </PreviousTransitionIsland>
          )}
        </div>
        <div class="h-20">
          <BluetoothDisconnectedNotificationIsland
            appContext={props.appContext}
          >
          </BluetoothDisconnectedNotificationIsland>
        </div>
      </div>
    </>
  );
};

export default NavigationNotificationIsland;
