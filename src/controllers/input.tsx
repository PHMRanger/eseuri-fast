import { Component, createMemo, createSignal, createEffect, Show, For } from "solid-js";

import styles from './input.module.css';

const Input: Component<any> = (props) => {
  return (
    <input
      ref={props.ref}
      class={styles.input}
      onInput={(e) => {
        const { value } = e.currentTarget;

        if (/\s/.test(value.slice(-1))) {
          e.currentTarget.value = "";
          return props.next(value.trim());
        }

        props.onInput(value.trim());
      }}
      onPaste={(e) => e.preventDefault()}
    />
  );
};

interface IWordProps {
  word: string;
  typed?: string;
  active?: boolean;
  onChange?: (x: number) => void;
};

const Word: Component<IWordProps> = (props) => {
  function letterClass(index: number) {
    if (!props.typed || !props.typed[index]) return styles.letterBackground;
    if (props.typed[index] === props.word[index]) return styles.letterCorrect;
    if (props.typed[index] !== props.word[index]) return styles.letterError;
  }

  let letterRefs = [];

  createEffect(() => {
    if (!props.active) return;

    const index = Math.min(props.typed.length, props.word.length - 1);
    const ref = letterRefs[index];

    const top = ref.offsetTop + 4;
    let left = ref.offsetLeft;

    if (props.typed.length >= props.word.length) {
      left += ref.offsetWidth;
    }

    props.onChange(left, top);
  });

  return (
    <div class={styles.word}>
      {/* <Show when={props.active}>{"->"}</Show> */}
      <For each={[...props.word].map(c => props.hidden ? "_" : c)}>{(letter, index) =>
        <span ref={letterRefs[index()]} class={letterClass(index())}>{letter}</span>
      }</For>
      {/* <Show when={props.active}>{"<-"}</Show> */}
    </div>
  );
};

interface IWordsProps {
  words: string[];
  typed: string[];
  hidden?: boolean[];
  onClick?: () => void;
}

const Words: Component<IWordsProps> = (props) => {
  return (
    <div class={styles.words} onClick={props.onClick}>
      <For each={props.words}>{(word, index) =>
        <Word
          word={word}
          typed={props.typed[index()]}
          hidden={(props.hidden || [])[index()]}
          active={index() === props.typed.length - 1}
          onChange={props.onChange}
        />
      }</For>
    </div>
  );
};

const Caret: Component = (props) => {
  return <div class={styles.caret} style={{ "left": `${props.x}px`, "top": `${props.y}px` }} />;
}

const WordsController: Component<{ quote?: string }> = (props) => {
  let inputRef: HTMLInputElement | undefined;

  setTimeout(() => inputRef?.focus(), 0);

  const words = createMemo(() => props.quote?.split(" ").map(x => x.trim()));

  const [typed, setTyped] = createSignal<string[]>([]);
  const [currentWord, setCurrentWord] = createSignal<string>("");
  const [carot, setCarot] = createSignal<[number, number]>([0, 0]);

  function next(word: string) {
    if (word === "") return;
    setTyped([...typed(), word]);
    setCurrentWord("");

    if (typed().length === words().length) console.log("ended ");

    console.log(typed(), currentWord());
  }

  return (
    <div class={styles.wordsController}>
      <Input ref={inputRef} onInput={setCurrentWord} next={next} />
      <Words
        words={words() || []}
        typed={[...typed(), currentWord()]}
        hidden={[]}
        onClick={() => inputRef?.focus()}
        onChange={(x, y) => {  setCarot([x, y]) }}
      />
      <Caret x={carot()[0]} y={carot()[1]} />
    </div>
  );
};

export default WordsController;
