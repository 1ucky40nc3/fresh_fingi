// // islands/SensorDataDisplayIsland.tsx

import { IS_BROWSER } from "$fresh/runtime.ts";
import { ChartJs } from "https://deno.land/x/fresh_charts@0.3.1/deps.ts";
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

/**
 * Create an integer range up to a max value.
 *
 * @description This function creates an integer range up to a max value.
 * The integer range is sorted in a ascending order.
 *
 * @param {number} length The length of the integer range.
 * @param {number} maxValue The maximim value of the integer range (inclusive).
 * @returns {number[]} A integer range in ascending order up the maximum value.
 */
export function numRangeUpToMax(
  length: number,
  maxValue: number = 0,
): number[] {
  return [...Array(length).keys()].map((i: number): number => {
    return maxValue - i;
  }).reverse();
}

export default function SensorDataDisplayIsland() {
  if (IS_BROWSER) {
    console.log("import chartjs plugins");
    import("npm:chartjs-plugin-zoom@2.0.1").then((plugin) => {
      // @ts-expect-error ignore plugin default typing issues
      ChartJs.Chart.register(plugin.default);
      console.log("imported zoom plugin", plugin);
    });
  }

  const data: number[] = [65, 59, 80, 81, 56, 55, 40];
  const labels: number[] = numRangeUpToMax(data.length);

  return (
    <>
      <h1>Chart Example</h1>
      <Chart
        type="line"
        options={{
          plugins: {
            legend: {
              display: true,
            },
            // @ts-expect-error ignore zoom not in options
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        }}
        data={{
          labels: labels,
          datasets: [{
            label: "Measurements",
            data: data,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          }],
        }}
      />
    </>
  );
}
