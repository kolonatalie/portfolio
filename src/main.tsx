import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

import './styles/main.scss';

const basename = import.meta.env.BASE_URL;

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <HelmetProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}
