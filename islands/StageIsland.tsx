// islands/StageNavigatorIsland.tsx
import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import BleConnectIsland from "./BleConnectIsland.tsx";

// Define the props for the StageNavigatorIsland component.
interface StageIslandProps {
  currentStage: Signal<number>; // The currently active stage (1, 2, or 3)
  completedStages: Signal<number>; // The highest stage successfully completed (e.g., 0, 1, 2)
}

/**
 * StageNavigatorIsland component provides a visual progress indicator and navigation
 * for the different stages of the application (BLE Connect, Calibration, Data Read).
 */
const StageNavigatorIsland: FunctionComponent<StageIslandProps> = (
  props: StageIslandProps,
) => {
  let { currentStage, completedStages } = props;

  // Callback for when the BLE connection is successful
  const handleConnectionSuccess = () => {
    completedStages.value = Math.max(completedStages.value, 1); // Mark stage 1 as completed
    currentStage.value = 2; // Automatically move to Stage 2 (Calibration)
    console.log("BLE Connection Success. Moving to Stage 2.");
  };

  // Placeholder for calibration success (will be implemented in Stage 2 island)
  const handleCalibrationSuccess = () => {
    completedStages.value = Math.max(completedStages.value, 2); // Mark stage 2 as completed
    currentStage.value = 3; // Automatically move to Stage 3 (Read Data)
    console.log("Calibration Success. Moving to Stage 3.");
  };

  // Placeholder for resetting or going back to stage 1 from stage 3
  const handleResetToStage1 = () => {
    currentStage.value = 1;
    // Optionally, reset completedStages if you want to force re-completion
    completedStages.value = 0;
    console.log("Resetting to Stage 1.");
  };

  // Placeholder for going back to stage 2 from stage 3
  const handleBackToStage2 = () => {
    currentStage.value = 2;
    console.log("Going back to Stage 2.");
  };

  return (
    <>
      <div class="flex-grow flex items-center justify-center">
        {currentStage.value === 1 && (
          <BleConnectIsland onConnectionSuccess={handleConnectionSuccess} />
        )}
        {
          /*
            Add your SensorCalibrationIsland and SensorDataDisplayIsland here
            when you create them, similar to the BleConnectIsland.
          */
        }
        {currentStage.value === 2 && (
          <div class="text-white text-3xl flex flex-col items-center">
            Sensor Calibration Stage (Coming Soon!)
            {/* You would replace this with your SensorCalibrationIsland */}
            {/* For demonstration, a button to simulate calibration success */}
            <button
              onClick={handleCalibrationSuccess}
              class="mt-4 bg-white text-blue-600 px-6 py-3 rounded-md shadow-md hover:bg-blue-100"
            >
              Simulate Calibration Success
            </button>
          </div>
        )}
        {currentStage.value === 3 && (
          <div class="text-white text-3xl flex flex-col items-center">
            Sensor Data Reading Stage (Coming Soon!)
            {/* You would replace this with your SensorDataDisplayIsland */}
            {/* For demonstration, buttons to go back */}
            <div class="flex flex-col gap-4 mt-4">
              <button
                onClick={handleResetToStage1}
                class="bg-white text-blue-600 px-6 py-3 rounded-md shadow-md hover:bg-blue-100"
              >
                Go to Stage 1
              </button>
              <button
                onClick={handleBackToStage2}
                class="bg-white text-blue-600 px-6 py-3 rounded-md shadow-md hover:bg-blue-100"
              >
                Go to Stage 2
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StageNavigatorIsland;
