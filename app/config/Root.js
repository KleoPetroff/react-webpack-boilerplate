import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../components/App';

const Root = () => (
  <Router>
    <Switch>
      <Route path="/" component={App} exact />
    </Switch>
  </Router>
);

export default Root;
