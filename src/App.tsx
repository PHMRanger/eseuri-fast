import { Component, createSignal, Show } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import Text from "./controllers/text";
import { Menu } from './components/menu';
import { getText } from './storage';
import { IText } from './types';

const App: Component = () => {
  // const [quote, setQuote] = createSignal(FULL.split("\n")[0]);

  // setTimeout(() => setQuote(FULL.split("\n")[3]), 1e4);
  // 

  const [text, setText] = createSignal<IText | undefined>();

  return (
    <div class={styles.App}>
      <Show when={text()} fallback={<Menu onTextClick={(name) => setText(getText(name))} />}>
        {text()?.name}
      </Show>
    </div>
  );
};

export default App;
