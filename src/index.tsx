import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import './styles/globals.css';
import './styles/backgrounds.css';
import 'react-indiana-drag-scroll/dist/style.css';
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';

// React PDF
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
