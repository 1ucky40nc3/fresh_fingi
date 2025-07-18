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
        <div class="flex flex-row items-center">
          <svg
            class="w-icon-square h-icon-square"
            viewBox="-0.5 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <desc property="dc:creator">
              Vlad Cristea
            </desc>
            <path
              d="M12 17.1599V22.9199"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 2.91992V12.9199"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 2.91992L17 7.91992L12 12.9199"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.12 15.04L17 17.92L12 22.92"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 12.9199L7 17.9199"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 12.9199L7 7.91992"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M22 2.91992L12 12.9199L2 22.9199"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span>Bluetooth disconnected!</span>
        </div>
      </button>
    </>
  );
};

export default BluetoothDisconnectedNotificationIsland;
