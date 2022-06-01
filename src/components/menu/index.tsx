import { Component, For } from "solid-js";
import { IParagraph, IText } from "../../types";

import styles from "./menu.module.css";

const MAX_PARAGRAH_CHARACTERS = 402;

const createParagraph = (raw: string): IParagraph => {
  const words = raw.split(" ").map((content) => ({ content, learned: false }));
  return { words };
}

const createText = (name: string, raw: string): IText => {
  const re = /[^\.!?\n]+[\.!?]/g;

  const paragraphs: IParagraph[] = [];

  let paragraph_raw = "";

  for (const [sentence] of raw.matchAll(re)) {
    if (paragraph_raw.length + sentence.length > MAX_PARAGRAH_CHARACTERS) {
      paragraphs.push(createParagraph(paragraph_raw.trim()));
      paragraph_raw = sentence.trim();
    } else {
      paragraph_raw += " " + sentence.trim();
    }
  }

  paragraphs.push(createParagraph(paragraph_raw.trim()));

  return { paragraphs, name };
};

const storeText = (text: IText) => {
  const texts = getTexts();

  localStorage.setItem("eseuri:texts", JSON.stringify([...texts, text.name]));
  localStorage.setItem(`eseuri:${text.name}`, JSON.stringify(text));
};

const getTexts = (): string[] => {
  const texts_raw = localStorage.getItem("eseuri:texts");
  return texts_raw ? JSON.parse(texts_raw) : [];
};

const CreateTextInput: Component = (props) => {
  let nameRef: HTMLInputElement | undefined;
  let contentRef: HTMLInputElement | undefined;

  return (
    <div class={styles.createText}>
      <input ref={nameRef} required placeholder="insert name..." />
      <input ref={contentRef} required placeholder="insert content..." />
      <button onClick={() => {
        if (!nameRef || !nameRef.value) return;
        if (!contentRef || !contentRef.value) return;

        const text = createText(nameRef.value, contentRef.value);
        storeText(text);
      }}>save</button>
    </div>
  );
};

export const Menu = () => {
  return (
    <div class={styles.menu}>
      {/* <input ref={nameRef} placeholder="name" onPaste={onPaste}/>
      <input placeholder="paste to create new text" onPaste={onPaste}/> */}
      <CreateTextInput />
      <div class={styles.texts}>
        <For each={getTexts()}>{(name) =>
          <button>{name}</button>
        }</For>
      </div>
    </div>
  );
};