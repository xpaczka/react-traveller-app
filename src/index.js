import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import AppProvider from './context/AppProvider';
import { BrowserRouter } from 'react-router-dom';

/* TODO
 -> [IMPORTANT] Map.jsx
 -> choose better color palette
 -> move VARIABLES to seperate folder
 -> add loading states where necessary
 -> add logout timeout
 -> search for refactoring opportunities
 -> replace vanilla fetch with custom 'useFetch' hook
 -> transfer login / register login to Login.jsx component
 -> responsive web design
 -> improve components folder structure
 -> add logo (app and login pages)
 -> add already exisiting email error
 -> clear all button (set user's visitedCountries to empty)
 -> [EXTRA] create admin panel for handling database issues programatically (cleaning databse, removing users, etc.)
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
