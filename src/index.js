import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { CountriesProvider } from './context/countries-context';

/* TODO
 -> choose better color palette
 -> add purge css
 -> move countries list do databse / develope own api
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CountriesProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CountriesProvider>
);
