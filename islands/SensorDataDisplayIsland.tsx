// islands/SensorDataDisplayIsland.tsx
import { FunctionComponent } from "preact";
import { Chart } from "https://deno.land/x/fresh_charts/mod.ts";
import {
  ChartColors,
  transparentize,
} from "https://deno.land/x/fresh_charts/utils.ts";

interface SensorDataDisplayIslandProps {
}

const SensorDataDisplayIsland: FunctionComponent<SensorDataDisplayIslandProps> =
  (props) => {
    return (
      // The main container for the island, setting the blue background and full screen size
      <div class="min-h-screen flex items-center justify-center bg-blue-500 p-4">
        <div class="p-4 mx-auto max-w-screen-md">
          <Chart
            type="line"
            options={{
              devicePixelRatio: 1,
              scales: { y: { beginAtZero: true } },
            }}
            data={{
              labels: ["1", "2", "3"],
              datasets: [
                {
                  label: "Sessions",
                  data: [123, 234, 234],
                  borderColor: ChartColors.Red,
                  backgroundColor: transparentize(ChartColors.Red, 0.5),
                  borderWidth: 1,
                },
                {
                  label: "Users",
                  data: [346, 233, 123],
                  borderColor: ChartColors.Blue,
                  backgroundColor: transparentize(ChartColors.Blue, 0.5),
                  borderWidth: 1,
                },
              ],
            }}
          />
        </div>
      </div>
    );
  };

export default SensorDataDisplayIsland;
