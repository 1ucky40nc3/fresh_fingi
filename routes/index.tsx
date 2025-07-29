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
  const sensorMeasurement: Signal<number> = useSignal<number>(0);
  return (
    <>
      <Head>
        <title>fresh_fingi</title>
        {/* Viewport meta tag for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <script type="module">
          import
          'https://cdn.jsdelivr.net/npm/@pwabuilder/pwaupdate/dist/pwa-update.js';
          const el = document.createElement('pwa-update');
          document.body.appendChild(el);
        </script>
      </Head>
      <div class="p-5">
        <StageIsland
          appState={appState}
          bluetoothConnected={bluetoothConnected}
          sensorMeasurement={sensorMeasurement}
        >
        </StageIsland>
      </div>
    </>
  );
}
