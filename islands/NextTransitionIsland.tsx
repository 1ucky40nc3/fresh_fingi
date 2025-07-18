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
      <div class="flex flex-row">
        <button type="button" onClick={transitionHandler}>
          <span>{text}</span>
        </button>
      </div>
    </>
  );
};

export default NextTransitionIsland;
