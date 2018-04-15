import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Root from './config/Root';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Root);

const newApp = require('./config/Root').default;

if (module.hot) {
  module.hot.accept('./config/Root', () => {
    render(newApp);
  });
}
