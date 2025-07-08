// islands/StageNavigatorIsland.tsx
import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";

// Define the props for the StageNavigatorIsland component.
interface StageNavigatorIslandProps {
  currentStage: Signal<number>; // The currently active stage (1, 2, or 3)
  completedStages: Signal<number>; // The highest stage successfully completed (e.g., 0, 1, 2)
}

/**
 * StageNavigatorIsland component provides a visual progress indicator and navigation
 * for the different stages of the application (BLE Connect, Calibration, Data Read).
 */
const StageNavigatorIsland: FunctionComponent<StageNavigatorIslandProps> = (
  props: StageNavigatorIslandProps,
) => {
  let { currentStage, completedStages } = props;

  // Function to handle stage changes from the navigator
  const onStageChange = (stage: number): void => {
    // Only allow changing to a stage if it's the current stage,
    // or if it's a completed stage, or if it's the next logical stage.
    if (stage <= completedStages.value + 1) {
      currentStage.value = stage;
      completedStages.value = stage - 1;
      console.log(
        `Navigating to Stage ${stage}; Completed States ${completedStages}`,
      );
    } else {
      console.log(
        `Cannot navigate to Stage ${stage}. Complete previous stages first.`,
      );
    }
  };

  // Define the stages with their respective icons and titles.
  const stages = [
    {
      id: 1,
      name: "Connect BLE",
      icon: (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          class="w-6 h-6" // Added w-6 h-6 here
        >
          <path
            d="M7 17L17 7L12 2V22L17 17L7 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
          </path>
        </svg>
      ),
    },
    {
      id: 2,
      name: "Calibrate Sensor",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          class="w-6 h-6" // Added w-6 h-6 here
        >
          {/* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
          <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Read Data",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          fill="currentColor"
          class="w-6 h-6" // Added w-6 h-6 here
        >
          {/*Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.*/}
          <path d="M160 80c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 352c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-352zM0 272c0-26.5 21.5-48 48-48l32 0c26.5 0 48 21.5 48 48l0 160c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48L0 272zM368 96l32 0c26.5 0 48 21.5 48 48l0 288c0 26.5-21.5 48-48 48l-32 0c-26.5 0-48-21.5-48-48l0-288c0-26.5 21.5-48 48-48z" />
        </svg>
      ),
    },
  ];

  const iconWidth = 56; // w-14 in Tailwind is 56px

  const getLineClass = (lineLeadsToStage: number) => {
    const baseClass =
      "absolute top-1/2 h-1 -translate-y-1/2 z-0 transition-all duration-300 ease-in-out";
    if (currentStage.value >= lineLeadsToStage) {
      return `${baseClass} bg-green-500`;
    } else if (currentStage.value === lineLeadsToStage) {
      return `${baseClass} bg-blue-400`;
    } else {
      return `${baseClass} bg-gray-600`;
    }
  };

  return (
    <div class="w-full bg-gray-800 text-white p-4 shadow-lg">
      <div class="max-w-3xl mx-auto flex justify-between items-center relative h-14">
        {/* Line 1: Between Stage 1 and Stage 2 */}
        <div
          class={getLineClass(2)}
          style={{
            left: `${iconWidth}px`,
            width: `calc(50% - ${iconWidth * 3 / 2}px)`,
          }}
        >
        </div>

        {/* Line 2: Between Stage 2 and Stage 3 */}
        <div
          class={getLineClass(3)}
          style={{
            left: `calc(50% + ${iconWidth / 2}px)`,
            width: `calc(50% - ${iconWidth * 3 / 2}px)`,
          }}
        >
        </div>

        {stages.map((stage) => {
          const isActive = currentStage.value === stage.id;
          const isCompleted = completedStages.value >= stage.id;
          const isDisabled = !isCompleted && !isActive;

          return (
            <div
              key={stage.id}
              class="relative z-20 flex flex-col items-center"
            >
              <button
                onClick={() =>
                  !isDisabled && !isActive && onStageChange(stage.id)}
                disabled={isDisabled}
                class={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${
                  isActive
                    ? "cursor-not-allowed bg-blue-500 text-white ring-4 ring-blue-300"
                    : ""
                }
                  ${
                  isCompleted && !isActive
                    ? "transition-all duration-300 ease-in-out cursor-pointer hover:scale-110 bg-green-500 text-white hover:bg-green-600"
                    : ""
                }
                  ${
                  !isCompleted && !isActive ? "bg-gray-600 text-gray-300" : ""
                }
                  ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                  shadow-md
                `}
                aria-label={`Go to ${stage.name} stage`}
              >
                {stage.icon}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StageNavigatorIsland;
