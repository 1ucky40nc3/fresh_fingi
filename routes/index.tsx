// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import BleConnectIsland from "../islands/BleConnect.tsx"; // Adjust path if needed

/**
 * The main page component for the Fresh application.
 * This component will render the appropriate "island" (stage) based on the application's state.
 * For now, it directly renders the BleConnectIsland.
 */
export default function Home(_props: PageProps) {
  // In a multi-stage application, you would manage the current stage here
  // using state (e.g., a signal or a global state management solution)
  // and conditionally render the correct island.
  // Example:
  // const [currentStage, setCurrentStage] = useState<number>(1);
  // {currentStage === 1 && <BleConnectIsland onConnectionSuccess={() => setCurrentStage(2)} />}
  // {currentStage === 2 && <SensorCalibrationIsland onCalibrationSuccess={() => setCurrentStage(3)} />}
  // {currentStage === 3 && <SensorDataDisplayIsland onReset={() => setCurrentStage(1)} />}

  return (
    <>
      <Head>
        <title>BLE Sensor App</title>
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Tailwind CSS CDN for styling */}
        {/* Configure Tailwind to use the Inter font */}
      </Head>
      {
        /*
        Render the BleConnectIsland.
        In a full application, you would pass a callback to `onConnectionSuccess`
        to transition to the next stage (e.g., calibration).
      */
      }
      <BleConnectIsland
        onConnectionSuccess={() => console.log("Transition to Stage 2")}
      />
    </>
  );
}
