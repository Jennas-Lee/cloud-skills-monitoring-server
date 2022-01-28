import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { CookiesProvider } from 'react-cookie';
import axios from 'axios';

import App from './App';
import './index.css';

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    {/*<CookiesProvider>*/}
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    {/*</CookiesProvider>*/}
  </React.StrictMode>,
  document.getElementById('root')
);
