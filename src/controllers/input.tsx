import { Component, createMemo, createSignal, For } from "solid-js";

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

const Word: Component<{ word: string, typed?: string }> = (props) => {
  function letterClass(index: number) {
    console.log(props.typed);
    if (!props.typed || !props.typed[index]) return styles.letterBackground;
    if (props.typed[index] === props.word[index]) return styles.letterCorrect;
    if (props.typed[index] !== props.word[index]) return styles.letterError;
  }

  return (
    <div class={styles.word}>
      <For each={[...props.word]}>{(letter, index) =>
        <span class={letterClass(index())}>{letter}</span>
      }</For>
    </div>
  );
};

interface IWordsProps {
  words: string[];
  typed: string[];
  onClick?: () => void;
}

const Words: Component<IWordsProps> = (props) => {
  return (
    <div class={styles.words} onClick={props.onClick}>
      <For each={props.words}>{(word, index) =>
        <Word word={word} typed={props.typed[index()]} />
      }</For>
    </div>
  );
};

const Caret: Component = () => {
  return <div class={styles.caret} />;
}

const WordsController: Component<{ quote?: string }> = (props) => {
  let inputRef: HTMLInputElement | undefined;

  setTimeout(() => inputRef?.focus(), 0);

  const words = createMemo(() => props.quote?.split(" ").map(x => x.trim()));

  const [typed, setTyped] = createSignal<string[]>([]);
  const [currentWord, setCurrentWord] = createSignal<string>("");

  function next(word: string) {
    if (word === "") return;
    setTyped([...typed(), word]);
    setCurrentWord("");

    console.log(typed(), currentWord())
  }

  return (
    <div class={styles.wordsController}>
      <Input ref={inputRef} onInput={setCurrentWord} next={next} />
      <Words
        words={words() || []}
        typed={[...typed(), currentWord()]}
        onClick={() => inputRef?.focus()}
      />
      <Caret />
    </div>
  );
};

export default WordsController;