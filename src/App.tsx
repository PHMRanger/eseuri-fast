import { Component, createSignal, Show } from 'solid-js';
import styles from './App.module.css';

import TextView from './components/text';
import { Menu } from './components/menu';
import { getText } from './storage';

import { IText } from './types';

const App: Component = () => {
  const [text, setText] = createSignal<IText | undefined>();

  return (
    <div class={styles.App}>
      <Show
        when={text()}
        fallback={<Menu onTextClick={(name) => setText(getText(name))} />}
      >
        <TextView text={text() as IText} onChange={(text) => setText(text)} />
      </Show>
    </div>
  );
};

export default App;
