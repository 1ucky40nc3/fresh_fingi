// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { signal } from "@preact/signals";
import BleConnectIsland from "../islands/BleConnect.tsx"; // Corrected import path for BleConnectIsland
import StageNavigatorIsland from "../islands/StageNavigator.tsx"; // Corrected import path for StageNavigatorIsland

/**
 * The main page component for the Fresh application.
 * This component will render the appropriate "island" (stage) based on the application's state.
 */
export default function Home(_props: PageProps) {
  // State to manage the current active stage (1, 2, or 3)
  // const [currentStage, setCurrentStage] = useState<number>(1);
  const currentStage = signal<number>(1);

  // State to track the highest stage successfully completed.
  // This is crucial for enabling/disabling navigation.
  // const [completedStages, setCompletedStages] = useSignal<number>(0); // 0 means no stage completed yet
  const completedStages = signal<number>(2);
  completedStages;
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

  // Function to handle stage changes from the navigator
  const handleStageChange = (stage: number) => {
    // Only allow changing to a stage if it's the current stage,
    // or if it's a completed stage, or if it's the next logical stage.
    if (stage <= completedStages.value + 1) {
      currentStage.value = stage;
      console.log(`Navigating to Stage ${stage}`);
    } else {
      console.log(
        `Cannot navigate to Stage ${stage}. Complete previous stages first.`,
      );
    }
  };

  return (
    <>
      <Head>
        <title>BLE Sensor App</title>
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div class="min-h-screen flex flex-col bg-blue-500">
        {/* Stage Navigator at the top */}
        <StageNavigatorIsland
          currentStage={currentStage.value}
          completedStages={completedStages.value}
          onStageChange={handleStageChange}
        />

        {/* Main content area, conditionally rendering the current stage island */}
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
      </div>
    </>
  );
}
