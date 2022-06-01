import { Component, createMemo, createSignal, createEffect, For, Show } from "solid-js";
import styles from './quote.module.css';

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
      onFocusIn={props.onFocusIn}
      onFocusOut={props.onFocusOut}
      onPaste={(e) => e.preventDefault()}
    />
  );
};

interface IWordProps {
  word: string;
  typed?: string;
  active?: boolean;
  hidden: boolean;
  onChange?: (x: number, y: number) => void;
};

const Word: Component<IWordProps> = (props) => {
  function lettersAreEqual(a: string, b: string) {
    const m: { [key: string]: string } = { ă: "a", â: "a", î: "i", ș: "s", ț: "t" };
    return (m[a] || a) === (m[b] || b);
  }

  function letterClass(index: number) {
    const touched = props.typed && props.typed[index];

    if (!touched && !props.hidden) return styles.letterBackground;
    if (!touched && props.hidden) return styles.letterHidden;

    const isCorrect = lettersAreEqual((props.typed as string)[index], props.word[index]);
    if (touched && isCorrect) return styles.letterCorrect;
    if (touched && !isCorrect) return styles.letterError;
  }

  let ref: HTMLDivElement | undefined;

  createEffect(() => {
    if (!props.active) return;

    const typedLength = props.typed?.length || 0;

    const index = Math.min(typedLength, props.word.length - 1);
    const letter = ref?.children[index] as HTMLSpanElement;

    const top = letter.offsetTop + 4;
    let left = letter.offsetLeft;

    if (typedLength >= props.word.length) {
      left += letter.offsetWidth;
    }

    props.onChange && props.onChange(left, top);
  });

  const letters = createMemo(() =>
    [...props.word].map((c, index) =>
      props.typed ? props.typed[index] || c : c
    ));

  return (
    <div ref={ref} class={styles.word} classList={{ [styles.wordHidden]: props.hidden }}>
      <For each={letters()}>{(letter, index) =>
        <span class={letterClass(index())}>{letter}</span>
      }</For>
    </div >
  );
};

interface IWordsProps {
  words: string[];
  typed: string[];
  hidden?: boolean[];
  onClick?: () => void;
  onChange: (x: number, y: number) => void;
}

export const Words: Component<IWordsProps> = (props) => {
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

const Caret: Component<{ left: number, top: number }> = (props) => {
  return <div class={styles.caret} style={{ "left": `${props.left}px`, "top": `${props.top}px` }} />;
}

const Quote: Component<{ quote?: string, difficulty?: number; onEnd?: (d: number) => void }> = (props) => {
  let inputRef: HTMLInputElement | undefined;

  setTimeout(() => inputRef?.focus(), 0);

  const words = createMemo(() => props.quote?.split(" ").map(x => x.trim()));
  const hidden = createMemo(() => {
    const len = (words() || []).length;
    const arr = [...Array(len)].map((_) => false);
    const f = (): number => { const index = Math.floor(Math.random() * len); if (arr[index]) return f(); return index; };
    for (let i = 0; i < (props.difficulty || 0); ++i) {
      arr[f()] = true;
    }
    return arr;
  });

  const [focused, setFocused] = createSignal(true);
  const [typed, setTyped] = createSignal<string[]>([]);
  const [currentWord, setCurrentWord] = createSignal<string>("");
  const [carot, setCarot] = createSignal<[number, number]>([0, 0]);

  function reset() {
    setCurrentWord("");
    setTyped([]);
  }

  createEffect((previous) => {
    if (previous === props.quote) return;
    reset();
    return props.quote;
  });

  createEffect((previous) => {
    if (previous === props.difficulty) return;
    reset();
    return props.difficulty;
  });

  function next(word: string) {
    if(!words()) return;

    if (word === "") return;
    setTyped([...typed(), word]);
    setCurrentWord("");
    
    console.log(typed().length, words().length);

    if (typed().length === words().length) {
      const new_difficulty = Math.min((props.difficulty || 0) + 5, words().length);
      console.log(new_difficulty);
      return props.onEnd && props.onEnd(new_difficulty);
    }
  }

  return (
    <div class={styles.wordsController}>
      <Input ref={inputRef} onInput={setCurrentWord} onFocusIn={() => setFocused(true)} onFocusOut={() => setFocused(false)} next={next} />
      <Words
        words={words() || []}
        typed={[...typed(), currentWord()]}
        hidden={hidden()}
        onClick={() => inputRef?.focus()}
        onChange={(x, y) => { setCarot([x, y]) }}
      />
      <Show when={focused()}><Caret left={carot()[0]} top={carot()[1]} /></Show>
    </div>
  );
};

export default Quote;
