import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryProvider } from './providers/QueryProvider';
import App from 'app/App';
import { store } from 'app/store/store';

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
  <HashRouter>
    <QueryProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryProvider>
  </HashRouter>
);
