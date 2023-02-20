import React from 'react';
// import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import App from 'app/App';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import './global.css';
import './custom.scss';
import { store } from 'store/store';

import reportWebVitals from './reportWebVitals';

// import { configureAppStore } from './store/configureStore';

// export const store = configureAppStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
