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
        <button type="button" onClick={transitionHandler}>
          <div class="flex flow-row">
            <span class="inline-block align-middle leading-none font-interactive mr-2">
              {text}
            </span>
            <span class="inline-block align-middle leading-none font-interactive">
              {">"}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default NextTransitionIsland;
