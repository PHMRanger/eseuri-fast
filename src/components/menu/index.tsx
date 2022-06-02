import { Component, createResource, createSignal, For } from "solid-js";
import * as scheduler from "../../scheduler";
import { getTexts, storeText } from "../../storage";
import { IParagraph, IText } from "../../types";

import styles from "./menu.module.css";

const MAX_PARAGRAH_CHARACTERS = 402;

const createParagraph = (raw: string): IParagraph => {
  const words = raw.split(" ").map((content) => ({ content, schedulerInfo: scheduler.initInfo() }));
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

export interface IMenuProps {
  onTextClick?: (name: string) => void;
};

export const Menu: Component<IMenuProps> = (props) => {
  return (
    <div class={styles.menu}>
      <CreateTextInput />
      <div class={styles.texts}>
        <For each={getTexts()}>{(name) =>
          <button onClick={() => props.onTextClick && props.onTextClick(name)}>{name}</button>
        }</For>
      </div>
    </div>
  );
};