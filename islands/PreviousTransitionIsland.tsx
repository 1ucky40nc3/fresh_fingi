import { FunctionComponent } from "preact/src/index.d.ts";

interface PreviousTransitionProps {
  transitionHandler: { (): void };
  text: string;
}

const PreviousTransitionIsland: FunctionComponent<PreviousTransitionProps> = (
  { text, transitionHandler }: PreviousTransitionProps,
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

export default PreviousTransitionIsland;
