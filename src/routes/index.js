import React from "react";
import { Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../store";

import LoginRoute from './LoginRoute';
import ProtectedRoute from './ProtectedRoute';

import LoginPage from '../components/LoginPage';
import Messenger from '../components/Messenger';

const MainRouter = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <LoginRoute exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Messenger} />
    </Switch>
  </ConnectedRouter>
);

export default MainRouter;