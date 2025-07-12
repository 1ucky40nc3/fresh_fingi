// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { signal } from "@preact/signals";
import StageNavigatorIsland from "../islands/StageNavigatorIsland.tsx";
import StageIsland from "../islands/StageIsland.tsx";

/**
 * The main page component for the Fresh application.
 * This component will render the appropriate "island" (stage) based on the application's state.
 */
export default function Home(_props: PageProps) {
  // State to manage the current active stage (1, 2, or 3)
  const currentStage = signal<number>(3);
  // State to track the highest stage successfully completed.
  // This is crucial for enabling/disabling navigation.
  const completedStages = signal<number>(2);

  console.log(
    "Home Component Rendering - currentStage.value:",
    currentStage.value,
  );

  return (
    <>
      <Head>
        <title>BLE Sensor App</title>
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div class="min-h-screen flex flex-col bg-blue-500">
        {/* Stage Navigator at the top */}
        <StageNavigatorIsland
          currentStage={currentStage}
          completedStages={completedStages}
        />
        {/* Main content area, conditionally rendering the current stage island */}
        <StageIsland
          currentStage={currentStage}
          completedStages={completedStages}
        />
      </div>
    </>
  );
}
