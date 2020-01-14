import React from 'react';
import { Route } from 'react-router-dom';
import graphService from '../services/graph';

export default class ProtectedRoute extends React.Component {
  componentDidMount() {
    if (!graphService.isUserLogged()) {
      window.location.href = window.location.origin + '/login';
    }
  }

  render() {
    const { component: Component, ...props } = this.props;

    return <Route {...props} render={props => <Component {...props} />} />;
  }
}
