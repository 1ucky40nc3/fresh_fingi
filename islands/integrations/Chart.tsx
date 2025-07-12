import "chartjs-adapter-date-fns"; // Import the adapter
import {
  Chart,
  ChartProps,
} from "https://deno.land/x/fresh_charts@0.3.1/island.tsx";
import { ChartJs } from "https://deno.land/x/fresh_charts@0.3.1/deps.ts";

// islands/ChartIsland.tsx

export default function ChartIsland<Type extends ChartJs.ChartType>(
  props: ChartProps<Type>,
) {
  return <Chart {...props} />;
}
