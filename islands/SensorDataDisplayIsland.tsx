// // islands/SensorDataDisplayIsland.tsx
// import { FunctionComponent } from "preact";
// import { Chart } from "https://deno.land/x/fresh_charts/mod.ts";
// import {
//   ChartColors,
//   transparentize,
// } from "https://deno.land/x/fresh_charts/utils.ts";

// interface SensorDataDisplayIslandProps {
// }

// const SensorDataDisplayIsland: FunctionComponent<SensorDataDisplayIslandProps> =
//   (props) => {
//     return (
//       // The main container for the island, setting the blue background and full screen size
//       <div class="min-h-screen flex items-center justify-center bg-blue-500 p-4">
//         <div class="p-4 mx-auto max-w-screen-md">
//           <Chart
//             type="line"
//             options={{
//               devicePixelRatio: 1,
//               scales: { y: { beginAtZero: true } },
//             }}
//             data={{
//               labels: ["1", "2", "3"],
//               datasets: [
//                 {
//                   label: "Sessions",
//                   data: [123, 234, 234],
//                   borderColor: ChartColors.Red,
//                   backgroundColor: transparentize(ChartColors.Red, 0.5),
//                   borderWidth: 1,
//                 },
//                 {
//                   label: "Users",
//                   data: [346, 233, 123],
//                   borderColor: ChartColors.Blue,
//                   backgroundColor: transparentize(ChartColors.Blue, 0.5),
//                   borderWidth: 1,
//                 },
//               ],
//             }}
//           />
//         </div>
//       </div>
//     );
//   };

// export default SensorDataDisplayIsland;

// islands/MyChart.tsx
// import { Chart } from "$fresh_charts/mod.ts";
// // import { Chart as ChartJs } from "npm:chart.js"; // Import Chart.js if you need to register plugins or modify global options
// import { useEffect } from "preact/hooks";

// // If you need to register Chart.js plugins or adaptors for client-side rendering,
// // you'll do it here. For example, for time series charts:
// // import 'npm:chartjs-adapter-date-fns'; // Or 'npm:chartjs-adapter-moment';

// export default function SensorDataDisplayIsland() {
//   // You can use a signal or state to manage chart data if it changes dynamically
//   // For this example, we'll use static data.

//   const data = {
//     labels: ["January", "February", "March", "April", "May", "June"],
//     datasets: [
//       {
//         label: "My First Dataset",
//         data: [65, 59, 80, 81, 56, 55],
//         fill: false,
//         borderColor: "rgb(75, 192, 192)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Client-Side Fresh Chart Example",
//       },
//     },
//   };

//   // If you need to register plugins or adapters that Fresh_charts might not expose directly,
//   // you'll do it here. Use `useEffect` to ensure it runs only in the browser.
//   useEffect(() => {
//     // Example: Registering a plugin (replace with your actual plugin if needed)
//     // import { Zoom } from "npm:chartjs-plugin-zoom";
//     // ChartJs.register(Zoom);
//   }, []);

//   return (
//     <div>
//       <h2>Client-Side Chart</h2>
//       <Chart type="line" data={data} options={options} />
//     </div>
//   );
// }

import { Chart } from "https://deno.land/x/fresh_charts/mod.ts";
import {
  ChartColors,
  transparentize,
} from "https://deno.land/x/fresh_charts/utils.ts";

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
