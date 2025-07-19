import { FunctionComponent } from "preact/src/index.d.ts";
import { Signal, useSignal } from "@preact/signals";
import BluetoothSetupIsland from "./BluetoothSetupIsland.tsx";
import SensorSetupIsland from "./SensorSetupIsland.tsx";
import TrainingIsland, { TrainingChartData } from "./TrainingIsland.tsx";
import NavigationNotificationIsland from "./NavigationNotificationIsland.tsx";
import {
  TIME_SERIES_CHARACTERISTIC_UUID,
  TIME_SERIES_SERVICE_UUID,
} from "../utils/config.ts";

interface StageProps {
  appState: Signal<TAppState>;
  bluetoothConnected: Signal<boolean>;
  sensorMeasurement: Signal<number>;
}

const StageIsland: FunctionComponent<StageProps> = (
  { appState, bluetoothConnected }: StageProps,
) => {
  let data: TimeSeriesDataType[] = [];

  const handleConnectToBluetooth: Signal<{ (): void }> = useSignal<
    () => Promise<void>
  >(
    async (): Promise<void> => {
      try {
        const serviceUUID = TIME_SERIES_SERVICE_UUID;
        const characteristicUUID = TIME_SERIES_CHARACTERISTIC_UUID;

        // @ts-expect-error Property 'bluetooth' does not exist on type 'Navigator'.deno-ts(2339)
        const bluetoothDevice = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: [serviceUUID],
        });
        const server = await bluetoothDevice.gatt.connect();
        if (!server) {
          throw new Error("Could not connect to GATT server.");
        }

        const service = await server.getPrimaryService(serviceUUID);
        const characteristic = await service.getCharacteristic(
          characteristicUUID,
        );

        characteristic.addEventListener(
          "characteristicvaluechanged",
          (event: any) => {
            const receivedValue = event.target.value;
            const textValue = new TextDecoder().decode(
              receivedValue?.buffer || new ArrayBuffer(0),
            );
            const numberValue = Number(textValue);
            data.push({
              x: new Date().toISOString(),
              y: numberValue,
            });
          },
        );
        await characteristic.startNotifications();
        bluetoothConnected.value = true;
      } catch (error) {
        console.error(error);
      }
    },
  );

  const chartData = useSignal<TrainingChartData>({
    datasets: [{
      type: "line",
      label: "Sensor Data (in kg)",
      data: [],
      tension: 0.3,
      pointRadius: 0,
    }],
  });

  const onRefresh: Signal<{ (): void }> = useSignal((): void => {
    chartData.value.datasets[0].data.push(...data);
    data = [];
  });

  return (
    <>
      <div class="min-h-screen flex flex-col">
        <NavigationNotificationIsland
          appState={appState}
          bluetoothConnected={bluetoothConnected}
        >
        </NavigationNotificationIsland>
        {appState.value === "bluetoothSetup" && (
          <BluetoothSetupIsland
            appState={appState}
            bluetoothConnected={bluetoothConnected}
            handleConnectToBluetooth={handleConnectToBluetooth}
          >
          </BluetoothSetupIsland>
        )}
        {appState.value === "sensorSetup" && (
          <SensorSetupIsland
            appState={appState}
          >
          </SensorSetupIsland>
        )}
        {appState.value === "training" && (
          <TrainingIsland chartData={chartData} onRefresh={onRefresh}>
          </TrainingIsland>
        )}
      </div>
    </>
  );
};

export default StageIsland;
