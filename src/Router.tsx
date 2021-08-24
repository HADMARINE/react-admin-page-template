import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Example from '@pages/Example';
import PageNotFound from '@pages/PageNotFound';
import Login from './pages/Login';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';
import store from './store';
import Root from './pages/Root';
import Main from './pages/Main';

const browserHistory = createBrowserHistory();

const history = syncHistoryWithStore(browserHistory, store.Routings);

const ClientRouter = (
  <>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route exact path="/example" component={Example} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/main" component={Main} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  </>
);

export default ClientRouter;
