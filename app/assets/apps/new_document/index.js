import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components';
import appStore from './store';

const render = Component => {
  document.body.className = 'bg-light-grey';
  ReactDOM.render(
    <Provider store={appStore}>
      <Component />
    </Provider>,
    document.getElementById('root')
  );
}

render(App);
