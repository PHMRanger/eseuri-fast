import { Component, createEffect, createMemo, createRoot, For, getOwner } from "solid-js";
import { isLearned } from "../../scheduler";
import { IParagraph, IWord } from "../../types";
import styles from "./text.module.css";

type FUpdateCursor = (left: number, top: number) => void;

interface IWordProps extends IWord {
  input?: string;
  state: "active" | "touched" | "untouched";
  updateCursor?: FUpdateCursor;
};

const m: { [key: string]: string } = {
  ă: "a", â: "a", î: "i", ș: "s", ț: "t", "”": "\"", "„": "\"",
  Ă: "A", Â: "A", Î: "I", Ș: "S", Ț: "T",
};

const letterEquality = (a: string, b: string) => {
  return (m[a] || a) === (m[b] || b);
}

export const wordEquality = (a: string, b: string) => {
  return ![...a].find((c, index) => (m[c] || c) !== (m[b[index]] || b[index]));
};

export const Word: Component<IWordProps> = (props) => {
  let ref: HTMLDivElement | undefined;
  
  const learned = createMemo(() => isLearned(props.schedulerInfo));

  const letters = createMemo(() => [...props.content].map((c, index) => {
    const input_c = props.input && props.input[index];
    if (props.state === "active" && input_c) return input_c;
    return c;
  }));

  const letterClass = (index: number) => {
    switch (props.state) {
      case "touched":
        return wordEquality(props.content, props.input as string)
          ? styles.letterCorrect : styles.letterError;
      case "untouched":
        return learned() ? styles.letterCorrect
          : styles.letterHidden;
      case "active":
        if (!props.input || !props.input[index]) {
          return learned() ? styles.letterCorrect
            : styles.letterHidden
        }

        const are_equal = letterEquality(props.input[index], props.content[index]);
        return are_equal ? styles.letterCorrect : styles.letterError;
    }
  };

  createEffect(async () => {
    if (props.state !== "active") return;

    const owner = getOwner() || undefined;

    await Promise.resolve();

    createRoot(() => {
      const typedLength = (props.input || "").length;

      const index = Math.min(typedLength, props.content.length - 1);
      const letter = ref?.children[index] as HTMLSpanElement;

      const top = letter.offsetTop + 4;
      let left = letter.offsetLeft;

      if (typedLength >= props.content.length) {
        left += letter.offsetWidth;
      }

      props.updateCursor && props.updateCursor(left, top);
    }, owner);
  }, [() => props.state, props.input]);

  return (
    <div
      ref={ref}
      class={styles.word}
      classList={{ [styles.wordHidden]: !learned() }}
    >
      <For each={letters()}>{(letter, index) =>
        <span class={letterClass(index())}>{letter}</span>
      }</For>
    </div>
  );
};

export const Caret: Component<{ left: number, top: number }> = (props) => {
  return <div class={styles.caret} style={{ "left": `${props.left}px`, "top": `${props.top}px` }} />;
}

interface IParagraphProps extends IParagraph {
  class?: string;
  wordMask?: string[];
  updateCursor?: FUpdateCursor;
  onClick?: () => void;
};

export const Paragraph: Component<IParagraphProps> = (props) => {
  const state = (index: number) => {
    if (!props.wordMask) return "untouched";
    if (props.wordMask.length === index + 1) return "active";
    if (props.wordMask.length > index + 1) return "touched";
    return "untouched";
  };

  return (
    <div class={`${styles.words} ${props.class}`} onClick={props.onClick}>
      <For each={props.words}>{(word, index) =>
        <Word
          state={state(index())}
          input={props.wordMask && props.wordMask[index()]}
          content={word.content}
          schedulerInfo={word.schedulerInfo}
          updateCursor={props.updateCursor}
        />
      }</For>
    </div>
  );
};