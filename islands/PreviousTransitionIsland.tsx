import { FunctionComponent } from "preact/src/index.d.ts";

interface PreviousTransitionProps {
  transitionHandler: { (): void };
  text: string;
}

const NextTransitionIsland: FunctionComponent<PreviousTransitionProps> = (
  { transitionHandler }: PreviousTransitionProps,
) => {
  return (
    <>
      <button type="button" onClick={transitionHandler}>
        <div class="flex flex-row items-center align-middle">
          <svg
            class="w-gr-1 h-gr-1 block flex-none align-middle"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <desc property="dc:creator">
              Vlad Cristea
            </desc>
            <path
              d="M14.9991 19L9.83911 14C9.56672 13.7429 9.34974 13.433 9.20142 13.0891C9.0531 12.7452 8.97656 12.3745 8.97656 12C8.97656 11.6255 9.0531 11.2548 9.20142 10.9109C9.34974 10.567 9.56672 10.2571 9.83911 10L14.9991 5"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          {/*<span class="inline-block align-middle leading-none">{text}</span>*/}
        </div>
      </button>
    </>
  );
};

export default NextTransitionIsland;
