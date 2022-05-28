import type { Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';

import Input from './controllers/input';

const QUOTE = `
Prestigios critic literar și scriitor al perioadei interbelice, 
George Călinescu a respins proustianismul promovat de Camil Petrescu, 
optând pentru realismul clasic, de tip balzacian, pe care l-a depășit 
prin elementele de modernitate, un exemplu elocvent fiind Enigma Otiliei, 
roman social și citadin, publicat în anul 1938. 
`;

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Input quote={QUOTE.trim()} />
    </div>
  );
};

export default App;
