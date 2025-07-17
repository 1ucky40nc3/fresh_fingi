import { Signal } from "@preact/signals";

/**
 * Implement all transitions for the application.
 */
const TRANSITIONS: TAppStateTransitions<Signal<TAppContext>> = {
  "bluetoothSetup": {
    "prev": undefined,
    next: {
      handler: (context: Signal<TAppContext>) => {
        const nextState: TAppState = "sensorSetup";
        context.value.state = nextState;
        console.debug(
          `Transitioning from 'bluetoothSetup' to next '${nextState}' stage.`,
        );
        console.debug(
          `Current state value: '${context.value.state}'`,
        );
        console.debug(context);
      },
    },
  },
  "sensorSetup": {
    "prev": {
      text: "Bluetooth Setup",
      handler: (context: Signal<TAppContext>) => {
        const prevState: TAppState = "bluetoothSetup";
        context.value.state = prevState;
        console.debug(
          `Transitioning from 'sensorSetup' to previous '${prevState}' stage.`,
        );
        console.debug(
          `Current state value: '${context.value.state}'`,
        );
        console.debug(context);
      },
    },
    next: {
      handler: (context: Signal<TAppContext>) => {
        const nextState: TAppState = "sensorSetup";
        context.value.state = nextState;
        console.debug(
          `Transitioning from 'sensorSetup' to next '${nextState}' stage.`,
        );
        console.debug(
          `Current state value: '${context.value.state}'`,
        );
        console.debug(context);
      },
    },
  },
  "training": {
    "prev": {
      text: "Sensor Setup",
      handler: (context: Signal<TAppContext>) => {
        const prevState: TAppState = "sensorSetup";
        context.value.state = prevState;
        console.debug(
          `Transitioning from 'training' to previous '${prevState}' stage.`,
        );
        console.debug(
          `Current state value: '${context.value.state}'`,
        );
        console.debug(context);
      },
    },
    "next": undefined,
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
  ): TAppStateTransitionDirections<Signal<TAppContext>> {
    return TRANSITIONS[state];
  }
}
