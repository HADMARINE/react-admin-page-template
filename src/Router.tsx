import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Example from '@pages/Example';
import PageNotFound from '@pages/PageNotFound';
import Login from './pages/Login';

const ClientRouter = (
  <>
    <Router>
      <Switch>
        <Route exact path="/" component={Example} />
        <Route exact path="/login" component={Login} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </>
);

export default ClientRouter;
