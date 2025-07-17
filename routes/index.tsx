// routes/index.tsx
import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Signal, useSignal } from "@preact/signals";
import StageIsland from "../islands/StageIsland.tsx";

/**
 * The main page component for the Fresh application.
 * This component will render the appropriate "island" (stage) based on the application's state.
 */
export default function Home(_props: PageProps) {
  const appState: Signal<TAppState> = useSignal<TAppState>("bluetoothSetup");
  const bluetoothConnected: Signal<boolean> = useSignal<boolean>(false);
  return (
    <>
      <Head>
        <title>fresh_fingi</title>
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <StageIsland appState={appState} bluetoothConnected={bluetoothConnected}>
      </StageIsland>
    </>
  );
}
