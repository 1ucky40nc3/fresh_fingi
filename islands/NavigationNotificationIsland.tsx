import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";

import BluetoothDisconnectedNotificationIsland from "./BluetoothNotificationIsland.tsx";
import PreviousTransitionIsland from "./PreviousTransitionIsland.tsx";
import { AppStateTransitionDirectionsFactory } from "../utils/transitions.ts";

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

  const transitions = AppStateTransitionDirectionsFactory.for(
    appState.value,
  );
  setPrevTransitionAvailable(transitions.prev.available);
  function transitionHandler(): void {
    if (transitions.prev !== undefined) {
      transitions.prev.handler(appState);
    }
  }
  const text: string = transitions.prev.text;

  return (
    <>
      <div class="flex flow-row justify-between">
        <div class="h-20">
          {prevTransitionAvailable && (
            <PreviousTransitionIsland
              transitionHandler={transitionHandler}
              text={text}
            >
            </PreviousTransitionIsland>
          )}
        </div>
        <div class="h-20">
          {bluetoothConnected.value && (
            <BluetoothDisconnectedNotificationIsland>
            </BluetoothDisconnectedNotificationIsland>
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationNotificationIsland;
