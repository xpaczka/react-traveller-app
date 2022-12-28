import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import AppProvider from './context/AppProvider';
import { BrowserRouter } from 'react-router-dom';

/* TODO
 -> [IMPORTANT] Map.jsx
 -> [IMPORTANT] replace CountriesContext with react-redux
 -> add loading states where necessary
 -> add logout timeout
 -> refactor where possible
 -> responsive web design
 -> add logo (app and login pages)
 -> add already exisiting email error
 -> clear all button (set user's visitedCountries to empty)
 -> fix scrolling issue on DashboardCountries
 -> fix issue with rendering searchbar while changing to summary
 -> [EXTRA] choose better color palette
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
