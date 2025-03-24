import React from 'react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import RomanNumeralConverter from './RomanNumeralConverter';

function App() {
  return (
    <Provider theme={defaultTheme}>
      <RomanNumeralConverter />
    </Provider>
  );
}

export default App;