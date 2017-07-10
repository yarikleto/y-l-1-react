import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components';
import { Provider } from 'mobx-react';
import store from './stores/store';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
