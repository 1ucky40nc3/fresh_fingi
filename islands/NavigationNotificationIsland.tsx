import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";

import BluetoothDisconnectedNotificationIsland from "./BluetoothDisconnectedNotificationIsland.tsx";
import PreviousTransitionIsland from "./PreviousTransitionIsland.tsx";
import { AppStateTransitionDirectionsFactory } from "../utils/transitions.ts";
import NextTransitionIsland from "./NextTransitionIsland.tsx";

/**
 * Properties of the {@link NavigationNotificationIsland} island.
 */
interface NavigationNotificationProps {
  /** The current application context. */
  appState: Signal<TAppState>;
  bluetoothConnected: Signal<boolean>;
}

const NavigationNotificationIsland: FunctionComponent<
  NavigationNotificationProps
> = (
  { appState, bluetoothConnected }: NavigationNotificationProps,
) => {
  const [prevTransitionAvailable, setPrevTransitionAvailable] = useState(false);
  const [nextTransitionAvailable, setNextTransitionAvailable] = useState(false);

  const transitions = AppStateTransitionDirectionsFactory.for(
    appState.value,
  );
  setPrevTransitionAvailable(
    transitions.prev.isAvailable(bluetoothConnected.value),
  );
  setNextTransitionAvailable(
    transitions.next.isAvailable(bluetoothConnected.value),
  );

  function prevTransitionHandler(): void {
    if (transitions.prev !== undefined) {
      transitions.prev.handleTransition(appState);
    }
  }
  const prevText: string = transitions.prev.text;

  function nextTransitionHandler(): void {
    if (transitions.next !== undefined) {
      transitions.next.handleTransition(appState);
    }
  }
  const nextText: string = transitions.next.text;

  return (
    <>
      <div class="flex flex-row justify-between items-center w-screen h-gr-1 gap-x-4">
        <div>
          {prevTransitionAvailable && (
            <PreviousTransitionIsland
              transitionHandler={prevTransitionHandler}
              text={prevText}
            >
            </PreviousTransitionIsland>
          )}
        </div>

        {!bluetoothConnected.value && (
          <div>
            <BluetoothDisconnectedNotificationIsland>
            </BluetoothDisconnectedNotificationIsland>
          </div>
        )}

        <div>
          {nextTransitionAvailable && (
            <NextTransitionIsland
              transitionHandler={nextTransitionHandler}
              text={nextText}
            >
            </NextTransitionIsland>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationNotificationIsland;
