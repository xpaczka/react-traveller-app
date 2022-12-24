import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import CountriesProvider from './context/CountriesProvider';
import { BrowserRouter } from 'react-router-dom';

/* TODO
 -> choose better color palette
 -> move countries list do databse / develope own api
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CountriesProvider>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </CountriesProvider>
);
