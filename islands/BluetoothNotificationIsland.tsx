import { FunctionComponent } from "preact/src/index.d.ts";

const BluetoothDisconnectedNotificationIsland: FunctionComponent = () => {
  const handleOnClick: { (): void } = (): void => {
    alert(
      "The bluetooth connection was lost! Please go back to the bluetooth setup and reconnect.",
    );
  };

  return (
    <>
      <button type="button" onClick={handleOnClick}>
        <span>Bluetooth disconnected!</span>
      </button>
    </>
  );
};

export default BluetoothDisconnectedNotificationIsland;
