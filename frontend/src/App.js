import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main.js'
import Store from './Store.js'

function App() {
  return (
      <Store>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Store>
    
  );
}

export default App;
