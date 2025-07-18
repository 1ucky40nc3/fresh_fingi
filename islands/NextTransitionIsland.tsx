import { FunctionComponent } from "preact/src/index.d.ts";

interface NextTransitionProps {
  transitionHandler: { (): void };
  text: string;
}

const NextTransitionIsland: FunctionComponent<NextTransitionProps> = (
  { text, transitionHandler }: NextTransitionProps,
) => {
  return (
    <>
      <div class="flex flex-row items-center align-middle">
        <span class="inline-block align-middle leading-none">{text}</span>
        <button type="button" onClick={transitionHandler}>
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
              d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19"
              stroke="#000000"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default NextTransitionIsland;
