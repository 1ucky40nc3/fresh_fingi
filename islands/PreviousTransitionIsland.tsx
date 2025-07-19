import { FunctionComponent } from "preact/src/index.d.ts";

interface PreviousTransitionProps {
  transitionHandler: { (): void };
  text: string;
}

const NextTransitionIsland: FunctionComponent<PreviousTransitionProps> = (
  { text, transitionHandler }: PreviousTransitionProps,
) => {
  return (
    <>
      <div class="flex flex-row items-center align-middle">
        <button type="button" onClick={transitionHandler}>
          <div class="flex flow-row">
            <span class="inline-block align-middle leading-none font-interactive">
              {"<"}
            </span>
            <span class="inline-block align-middle leading-none font-interactive ml-2">
              {text}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default NextTransitionIsland;
