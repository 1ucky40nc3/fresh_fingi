// islands/BleConneciontIsland.tsx
import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

// Define the props for the BleConneciontIsland component.
// In a real application, you might pass state management functions
// or callbacks to transition between stages.
interface BleConnectionIslandProps {
  // Placeholder for any props needed, e.g., a callback to indicate connection success
  onConnectionSuccess?: () => void;
}

/**
 * BleConneciontIsland component handles the Bluetooth Low Energy (BLE) connection stage.
 * It displays a large button with a Bluetooth icon to initiate the scan and connection process.
 */
const BleConnectionIsland: FunctionComponent<BleConnectionIslandProps> = (
  { onConnectionSuccess },
) => {
  // State to manage the button's loading/connection status
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  /**
   * Handles the click event for the Bluetooth connect button.
   * This function would contain the actual Web Bluetooth API logic in a real application.
   */
  const handleConnectClick = async () => {
    setConnectionStatus("Scanning for BLE devices...");

    // Simulate a connection delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After simulated connection, update status
    setConnectionStatus("Successfully connected to BLE device!");
    console.log("Successfully connected to BLE device!");
    onConnectionSuccess?.(); // Trigger the success callback
  };

  return (
    // The main container for the island, setting the blue background and full screen size
    <div class="min-h-screen flex items-center justify-center bg-blue-500 p-4">
      <div class="text-center">
        {/* Bluetooth Connection Button */}
        <button
          type="button"
          onClick={handleConnectClick}
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
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="#000000"
            class="text-blue-600"
          >
            <path
              d="M7 17L17 7L12 2V22L17 17L7 7"
              stroke="#2563eb"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
            </path>
          </svg>
          <span class="sr-only">Connect to Bluetooth Device</span>
        </button>

        {/* Connection Status Message */}
        {connectionStatus && (
          <p class="mt-8 text-white text-xl md:text-2xl font-semibold">
            {connectionStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default BleConnectionIsland;
