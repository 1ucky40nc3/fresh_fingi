import { Signal } from "@preact/signals";

/**
 * Implement a dummy handler.
 */
export function dummyHandler<T>(_: Signal<T>) {
  console.warn("A dummy transition handler was called!");
}

/**
 * Implement a dummy function that returns if a transition is available.
 *
 * @returns {boolean} Wether the transition is available. This function always returns `false`;
 */
export function dummyIsAvailable(
  _: boolean,
): boolean {
  return false;
}

/**
 * Create a dummy transition that does nothing.
 *
 * @param handler A transition handler. By default we use {@link dummyHandler}.
 * @param text A text that describes the transition to the user. The default is an empty string (no description).
 */
export function createTransition(
  handleTransition: (appState: Signal<TAppState>) => void = dummyHandler,
  text: string = "",
  isAvailable: (blueeothConnected: boolean) => boolean = dummyIsAvailable,
): TAppStateTransition<
  Signal<TAppState>
> {
  return {
    handleTransition,
    text,
    isAvailable,
  };
}

/**
 * Implement all transitions for the application.
 */
const TRANSITIONS: TAppStateTransitions<Signal<TAppState>> = {
  bluetoothSetup: {
    prev: createTransition(),
    next: createTransition(
      (state: Signal<TAppState>) => {
        const nextState: TAppState = "sensorSetup";
        state.value = nextState;
        console.debug(
          `Transitioning from 'bluetoothSetup' to next '${nextState}' stage.`,
        );
        console.debug(
          `Current state value: '${state.value}'`,
        );
      },
      "Calibration",
      (blueeoothConnected: boolean) => blueeoothConnected,
    ),
  },
  sensorSetup: {
    prev: createTransition(
      (state: Signal<TAppState>) => {
        const prevState: TAppState = "bluetoothSetup";
        state.value = prevState;
        console.debug(
          `Transitioning from 'sensorSetup' to previous '${prevState}' stage.`,
        );
        console.debug(
          `Current state value: '${state.value}'`,
        );
      },
      "Bluetooth",
      (_: boolean) => true,
    ),
    next: createTransition(
      (state: Signal<TAppState>) => {
        const nextState: TAppState = "training";
        state.value = nextState;
        console.debug(
          `Transitioning from 'sensorSetup' to next '${nextState}' stage.`,
        );
        console.debug(
          `Current state value: '${state.value}'`,
        );
      },
      "Train",
      (_: boolean) => true,
    ),
  },
  training: {
    prev: createTransition(
      (state: Signal<TAppState>) => {
        const prevState: TAppState = "sensorSetup";
        state.value = prevState;
        console.debug(
          `Transitioning from 'training' to previous '${prevState}' stage.`,
        );
        console.debug(
          `Current state value: '${state.value}'`,
        );
      },
      "Calibration",
      (_: boolean) => true,
    ),
    next: createTransition(),
  },
};

/**
 * Implement a factory to access app transitions.
 */
export class AppStateTransitionDirectionsFactory {
  /**
   * Get the app direction transitions for a state.
   */
  static for(
    state: TAppState,
  ): TAppStateTransitionDirections<Signal<TAppState>> {
    return TRANSITIONS[state];
  }
}
