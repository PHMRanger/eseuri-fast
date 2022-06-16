import { Component, createSignal, Show } from "solid-js";
import { Caret, Paragraph, wordEquality } from "./word";
import { IText } from "../../types";

import styles from "./text.module.css";
import { updateText } from "../../storage";
import * as scheduler from "../../scheduler";

const TextInput: Component<any> = (props) => {
  return (
    <input
      ref={props.ref}
      class={styles.textInput}
      onInput={(e) => {
        const { value } = e.currentTarget;

        if (/\s/.test(value.slice(-1))) {
          e.currentTarget.value = "";
          return props.next(value.trim());
        }

        props.onInput(value.trim());
      }}
      onFocusIn={props.onFocusIn}
      onFocusOut={props.onFocusOut}
      onPaste={(e) => e.preventDefault()}
    />
  );
};

function updateWordIntervals(text: IText, mask: string[], index: number) {
  const n_text: IText = structuredClone(text);

  for (let i = 0; i < n_text.paragraphs[index].words.length; ++i) {
    const word = n_text.paragraphs[index].words[i];
    const correct = wordEquality(word.content, mask[i]);
    n_text.paragraphs[index].words[i] = {
      ...word,
      schedulerInfo: scheduler.updateInfo(word.schedulerInfo, correct),
    };
  }

  console.log(n_text.paragraphs[index].words);

  return n_text;
}


const TextView: Component<{ text: IText, onChange?: (text: IText) => void }> = (props) => {
  let inputRef: HTMLInputElement | undefined;

  const [index, setIndex] = createSignal(0);

  const completedWordSpan = (startIndex: number): string[] => {
    const span = [];
    let i = startIndex, word;

    while (word = props.text.paragraphs[index()].words[i], word && scheduler.isLearned(word.schedulerInfo)) {
      span.push(word.content);
      ++i;
    }

    return span;
  };

  const [wordMask, setWordMask] = createSignal<string[]>(completedWordSpan(0));
  const [wordInput, setWordInput] = createSignal<string>("");

  const [caret, setCaret] = createSignal<[number, number]>([0, 0]);
  const [focused, setFocused] = createSignal(false);

  const reset = () => {
    setWordMask(completedWordSpan(0));
    setWordInput("");
    if (inputRef) inputRef.value = "";
  }

  document.addEventListener('keydown', (key) => {
    if (key.code === "ArrowUp") { setIndex(Math.max(0, index() - 1)); reset(); }
    else if (key.code === "ArrowDown") { setIndex(Math.min(index() + 1, props.text.paragraphs.length - 1)); reset(); }
    
    inputRef?.focus();

    if (key.code === "Tab") reset();
  });

  return (
    <div class={styles.text}>
      <TextInput
        ref={inputRef}
        onInput={setWordInput}
        onFocusIn={() => setFocused(true)}
        onFocusOut={() => setFocused(false)}
        next={(word: string) => {
          console.log(wordMask().length);
          setWordMask([...wordMask(), word, ...completedWordSpan(wordMask().length + 1)]);
          setWordInput("");

          if (props.text.paragraphs[index()].words.length === wordMask().length) {
            const new_text = updateWordIntervals(props.text, wordMask(), index());
            props.onChange && props.onChange(new_text);
            updateText(new_text);
            console.log("--------- ended ---------");
          }
        }}
      />

      <div>{index() + 1}/{props.text.paragraphs.length}</div>
      <div>
        <Paragraph
          onClick={() => inputRef?.focus()}
          {...props.text.paragraphs[index()]}
          wordMask={[...wordMask(), wordInput()]}
          updateCursor={(left, top) => setCaret([left, top])}
        />

        <Show when={focused()}><Caret left={caret()[0]} top={caret()[1]} /></Show>
      </div>
      <div />
    </div>
  );
}

export default TextView;