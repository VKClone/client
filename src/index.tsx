import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

import {
  AdaptivityProvider,
  ConfigProvider,
  AppRoot
} from '@vkontakte/vkui';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Router>
            <App />
          </Router>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  </Provider>
);