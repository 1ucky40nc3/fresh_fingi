import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

interface SensorCalibrationIslandProps {
  // Placeholder for any props needed, e.g., a callback to indicate connection success
  onCalibrationSuccess?: () => void;
}

const SensorCalibrationIsland: FunctionComponent<SensorCalibrationIslandProps> =
  (
    { onCalibrationSuccess: onCalibrationSuccess },
  ) => {
    // State to manage the button's loading/connection status
    const [calibrationStatus, setCalibrationStatus] = useState<string | null>(
      null,
    );

    /**
     * Handles the click event for the Bluetooth connect button.
     * This function would contain the actual Web Bluetooth API logic in a real application.
     */
    const handleCalibrationClick = async () => {
      setCalibrationStatus("Calibrating sensor...");

      // Simulate a connection delay for demonstration purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // After simulated connection, update status
      setCalibrationStatus("Calibration completed.");
      console.log("Simulated BLE device connected.");
      onCalibrationSuccess?.(); // Trigger the success callback
    };

    return (
      // The main container for the island, setting the blue background and full screen size
      <div class="min-h-screen flex items-center justify-center bg-blue-500 p-4">
        <div class="text-center">
          {/* Bluetooth Connection Button */}
          <button
            type="button"
            onClick={handleCalibrationClick}
            class="
            bg-white text-blue-600
            hover:bg-blue-100 focus:ring-4 focus:ring-blue-300
            font-bold py-8 px-12 rounded-full shadow-lg
            transition duration-300 ease-in-out transform hover:scale-105
            flex items-center justify-center space-x-4
            text-2xl md:text-3xl lg:text-4xl
            w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80
            relative overflow-hidden
          "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              fill="currentColor"
            >
              {/* Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. */}
              <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
            </svg>
            <span class="sr-only">Connect to Bluetooth Device</span>
          </button>

          {/* Connection Status Message */}
          {calibrationStatus && (
            <p class="mt-8 text-white text-xl md:text-2xl font-semibold">
              {calibrationStatus}
            </p>
          )}
        </div>
      </div>
    );
  };

export default SensorCalibrationIsland;
