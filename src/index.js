import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

/* TODO
 -> choose better color palette
 -> add purge css
 -> create context
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
