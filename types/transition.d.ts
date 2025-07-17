/**
 * A type for all possible directions to transition to other states.
 *
 * @description We have the following transition types:
 *  - `next`: Transition to the next stage.
 *  - `prev`: Transition to the previous stage.
 */
type TTransitionDirection = "next" | "prev";

/**
 * Implement a type for app transition handlers.
 */
type TAppTransitionHandler<C> = (context: C) => void;

/**
 * Implement a type for app transitions.
 *
 * @template C A type for the context that can be read and written to.
 */
type TAppStateTransition<C> = {
  /** A function that handles the state transition. */
  handler: TAppTransitionHandler<C>;
  /** An optional text we display as part of the transition. */
  text?: string;
};

/**
 * Implement a type for app transitions by directions.
 *
 * @template C A type for the context that can be read and written to.
 */
type TAppStateTransitionDirections<C> = Record<
  TTransitionDirection,
  TAppStateTransition<C> | undefined
>;

/**
 * Implement a type for app transitions based on the current state.
 *
 * @template C A type for the context that can be read and written to.
 */
type TAppStateTransitions<C> = Record<
  TAppState,
  TAppStateTransitionDirections<C>
>;
