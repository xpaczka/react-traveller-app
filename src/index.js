import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import AppProvider from './context/AppProvider';
import { BrowserRouter } from 'react-router-dom';

/* TODO
 -> choose better color palette
 -> move countries list do databse / develope own api (exclude 'non-countries', should be left with 197 countries)
 -> think about deleting CountriesContext (seems to be not needed)
 -> move VARIABLES to seperate folder
 -> add loading states where necessary
 -> add error handling to register
 -> add better error handling to login
 -> Map.jsx
 -> improve behavior on register (on displaying map dashboard)
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);
