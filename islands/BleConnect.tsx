// islands/BleConnectIsland.tsx
import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";

// Define the props for the BleConnectIsland component.
// In a real application, you might pass state management functions
// or callbacks to transition between stages.
interface BleConnectIslandProps {
  // Placeholder for any props needed, e.g., a callback to indicate connection success
  onConnectionSuccess?: () => void;
}

/**
 * BleConnectIsland component handles the Bluetooth Low Energy (BLE) connection stage.
 * It displays a large button with a Bluetooth icon to initiate the scan and connection process.
 */
const BleConnectIsland: FunctionComponent<BleConnectIslandProps> = (
  { onConnectionSuccess },
) => {
  // State to manage the button's loading/connection status
  const [connectionStatus, setConnectionStatus] = useState<string | null>(null);

  /**
   * Handles the click event for the Bluetooth connect button.
   * This function would contain the actual Web Bluetooth API logic in a real application.
   */
  const handleConnectClick = async () => {
    setConnectionStatus("Scanning for devices...");

    // --- Placeholder for actual Web Bluetooth API logic ---
    // In a real application, you would use navigator.bluetooth.requestDevice() here.
    // Example:
    // try {
    //   const device = await navigator.bluetooth.requestDevice({
    //     acceptAllDevices: true, // Or specify filters for your device
    //     optionalServices: ['your-service-uuid'] // Specify services if known
    //   });
    //   setConnectionStatus(`Connecting to ${device.name || 'unknown device'}...`);
    //   const server = await device.gatt?.connect();
    //   if (server) {
    //     setConnectionStatus("Connected successfully!");
    //     console.log("Connected to BLE device:", device.name);
    //     // Call the success callback to inform the parent component/state manager
    //     onConnectionSuccess?.();
    //   } else {
    //     setConnectionStatus("Failed to connect to GATT server.");
    //   }
    // } catch (error) {
    //   console.error("BLE Connection Error:", error);
    //   setConnectionStatus(`Connection failed: ${error.message}`);
    // } finally {
    //   setIsConnecting(false);
    // }
    // --- End of Placeholder ---

    // Simulate a connection delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // After simulated connection, update status
    setConnectionStatus("Connected successfully!");
    console.log("Simulated BLE device connected.");
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

export default BleConnectIsland;
