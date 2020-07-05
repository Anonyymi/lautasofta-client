import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  ToastProvider
} from 'react-toast-notifications';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <ToastProvider autoDismiss="true" autoDismissTimeout="5000" placement="bottom-right">
      <App />
    </ToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
