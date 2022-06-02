import { Component, createMemo, createSignal, For, Show } from "solid-js";

import styles from './text.module.css';

interface IStepsProps {
  current: number;
  count: number;
  onClick: (i: number) => void;
};

const Step: Component<{ children?: any, active?: boolean, onClick: () => void; }> = (props) => {
  return (
    <div class={styles.step}>
      <button
        class={styles.stepButton}
        classList={{ [styles.stepButtonActive]: props.active }}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </div>
  );
};

const Steps: Component<IStepsProps> = (props) => {
  let sliderRef;

  return (
    <div class={styles.steps}>
      <div ref={sliderRef} class={styles.stepsSlider}>
        <For each={[...Array(props.count)]}>{(_, index) =>
          <Step onClick={() => props.onClick(index())} active={props.current === index()}>{index() + 1}</Step>
        }</For>
      </div>
    </div>
  );
};

interface ITextProps {
  children: string;
};

const Text: Component<ITextProps> = (props) => {
  const quote = createMemo(() => {
    const re = /[^\.!?\n]+[\.!?]/g;
    const quotes: string[] = [];

    let quote = "";

    for (const [sentence] of props.children.matchAll(re)) {
      if (quote.length + sentence.length > 400) {
        quotes.push(quote.trim());
        quote = sentence.trim();
      } else {
        quote += " " + sentence.trim();
      }
    }

    quotes.push(quote.trim());

    return quotes;
  });

  const [stage, setStage] = createSignal(0);

  return (
    <div>
      {quote()}
    </div>
  );
};

export default Text;