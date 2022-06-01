import { Component, createEffect, createMemo, For } from "solid-js";
import styles from "../controllers/quote.module.css";
import { IParagraph, IWord } from "../types";

type FUpdateCursor = (left: number, top: number) => void;

interface IWordProps extends IWord {
  input?: string;
  state: "active" | "touched" | "untouched";
  updateCursor?: FUpdateCursor;
};

const letterEquality = (a: string, b: string) => {
  const m: { [key: string]: string } = { ă: "a", â: "a", î: "i", ș: "s", ț: "t" };
  return (m[a] || a) === (m[b] || b);
}

export const Word: Component<IWordProps> = (props) => {
  let ref: HTMLDivElement | undefined;
  
  const letters = createMemo(() => [...props.content].map((c, index) => {
    const input_c = props.input && props.input[index];
    if (props.state === "active" && input_c) return input_c;
    return c;
  }));

  const letterClass = (index: number) => {
    switch(props.state) {
      case "touched":
        return props.content === props.input ? styles.letterCorrect
                                             : styles.letterError;
      case "untouched":
        return props.learned ? styles.letterCorrect
                             : styles.letterHidden;
      case "active":
        if (!props.input || !props.input[index]) {
          return props.learned ? styles.letterCorrect
                               : styles.letterHidden
        }

        const are_equal = letterEquality(props.input[index], props.content[index]);
        return are_equal ? styles.letterCorrect : styles.letterError;
    }
  };
  
  createEffect(() => {
    if (props.state !== "active") return;

    const typedLength = props.input?.length || 0;
    
    const index = Math.min(typedLength, props.content.length - 1);
    const letter = ref?.children[index] as HTMLSpanElement;

    const top = letter.offsetTop + 4;
    let left = letter.offsetLeft;

    if (typedLength >= props.content.length) {
      left += letter.offsetWidth;
    }

    props.updateCursor && props.updateCursor(left, top);
  });

  return (
    <div ref={ref} class={styles.word}>
      <For each={letters()}>{(letter, index) =>
        <span class={letterClass(index())}>{letter}</span>
      }</For>
    </div>
  );
};

interface IParagraphProps extends IParagraph {
  updateCursor?: FUpdateCursor;
  onClick?: () => void;
};

export const Paragraph: Component<IParagraphProps> = (props) => {
  return (
    <div class={styles.word} onClick={props.onClick}>
      <For each={props.words}>{(word, index) =>
        <Word
          state="untouched"
          content={word.content}
          learned={word.learned}
          updateCursor={props.updateCursor}
        />
      }</For>
    </div>
  );
};