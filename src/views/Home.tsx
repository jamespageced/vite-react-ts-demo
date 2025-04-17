import React, { useState } from 'react';
import { reactLogo, viteLogo } from '@/assets/images';
import { MainView } from '@/components';

export default function Home(): ReactComponent {
  // variables
  const [count, setCount] = useState(0);

  // render
  return (
    <MainView className="view-shared view-home">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="react" alt="React logo" />
        </a>
      </div>
      <h1>Welcome to the Vite+React Demo</h1>
      <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
      <p>
        Begin coding in <code>src/</code>
      </p>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </MainView>
  );
}
