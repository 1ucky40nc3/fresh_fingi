// islands/StageNavigatorIsland.tsx
import { FunctionComponent } from "preact";
import { Signal, useSignal } from "@preact/signals";
import BleConnectionIsland from "./BleConnectionIsland.tsx";
import SensorCalibrationIsland from "./SensorCalibrationIsland.tsx";
import SensorDataDisplayIsland, {
  SensorDataDisplayChartData,
} from "./SensorDataDisplayIsland.tsx";
import { addExampleTimeSeriesData } from "../utils/data.ts";

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
  const { currentStage, completedStages } = props;

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

  const data: TimeSeriesDataType[] = [];

  // Example data (adjust as needed)
  const chartData = useSignal<SensorDataDisplayChartData>({
    datasets: [{
      label: "My First dataset",
      pointBorderWidth: 1,
      data: data,
      tension: 0.3,
      datalabels: {
        align: "start",
        anchor: "start",
      },
    }],
  });

  const onRefresh: Signal<{ (): void }> = useSignal((): void => {
    addExampleTimeSeriesData(chartData.value.datasets[0].data, {
      count: 100,
      min: -200,
      max: 200,
    });
  });
  return (
    <>
      <div class="flex-grow flex items-center justify-center">
        {currentStage.value === 1 && (
          <BleConnectionIsland onConnectionSuccess={handleConnectionSuccess} />
        )}
        {currentStage.value === 2 && (
          <SensorCalibrationIsland
            onCalibrationSuccess={handleCalibrationSuccess}
          />
        )}
        {currentStage.value === 3 && (
          <SensorDataDisplayIsland
            chartData={chartData}
            onRefresh={onRefresh}
          />
        )}
      </div>
    </>
  );
};

export default StageNavigatorIsland;
