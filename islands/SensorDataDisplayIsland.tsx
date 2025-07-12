// // islands/SensorDataDisplayIsland.tsx

import Chart from "./integrations/Chart.tsx";
import { default as colorLib } from "https://esm.sh/stable/@kurkle/color@0.3.1";

/** A set of CSS RGB colors which can be used with charts. */
export enum ChartColors {
  Red = "rgb(255, 99, 132)",
  Orange = "rgb(255, 159, 64)",
  Yellow = "rgb(255, 205, 86)",
  Green = "rgb(75, 192, 192)",
  Blue = "rgb(54, 162, 235)",
  Purple = "rgb(153, 102, 255)",
  Grey = "rgb(201, 203, 207)",
}

/** A utility function which takes a CSS string color value and applies the
 * percentage of opacity to it and returns a new CSS string color value.
 *
 * If the opacity is not provided, it defaults to 50%.
 */
export function transparentize(value: string, opacity?: number) {
  const alpha = opacity === undefined ? 0.5 : 1 - opacity;
  return colorLib(value).alpha(alpha).rgbString();
}

export default function SensorDataDisplayIsland() {
  return (
    <>
      <h1>Chart Example</h1>
      <Chart
        type="line"
        options={{}}
        data={{
          labels: ["1", "2", "3"],
          datasets: [{
            label: "Sessions",
            data: [123, 234, 234],
            borderColor: ChartColors.Red,
            backgroundColor: transparentize(ChartColors.Red, 0.5),
            borderWidth: 1,
          }, {
            label: "Users",
            data: [346, 233, 123],
            borderColor: ChartColors.Blue,
            backgroundColor: transparentize(ChartColors.Blue, 0.5),
            borderWidth: 1,
          }],
        }}
      />
    </>
  );
}
