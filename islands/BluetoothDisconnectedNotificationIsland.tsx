import { FunctionComponent } from "preact/src/index.d.ts";

const BluetoothDisconnectedNotificationIsland: FunctionComponent = () => {
  const handleOnClick: { (): void } = (): void => {
    alert(
      "The bluetooth connection was lost! Please go back to the bluetooth setup and reconnect.",
    );
  };

  return (
    <>
      <button
        class="border-dotted border-black border-2 p-1 rounded-xl"
        type="button"
        onClick={handleOnClick}
      >
        <div class="flex flex-row items-center">
          <span class="inline-block align-middle leading-none font-interactive mr-2 ml-2">
            No Bluetooth!
          </span>
        </div>
      </button>
    </>
  );
};

export default BluetoothDisconnectedNotificationIsland;
