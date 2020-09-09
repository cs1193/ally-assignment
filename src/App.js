import React from 'react';
import { Provider } from 'react-redux';

import './App.scss';

import store from './store';
import OKR from './components/OKR/OKR';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <OKR />
      </div>
    </Provider>
  );
}

export default App;
