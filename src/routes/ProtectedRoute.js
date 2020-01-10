import React from 'react';
import { Route } from 'react-router-dom';
import graphService from '../services/graph';
import TeamsContext from '../TeamsContext';

export default class ProtectedRoute extends React.Component {
  static contextType = TeamsContext;

  componentDidMount() {
    console.log('this.context.state', this.context.state);
    console.log('ProtectedRoute this.context', this.context);
    console.log('graphService.isUserLogged(): ', graphService.isUserLogged());
    if (!graphService.isUserLogged()) {
      window.location.href = window.location.origin + '/login';
    }
  }

  render() {
    const { component: Component, ...props } = this.props;

    return <Route {...props} render={props => <Component {...props} />} />;
  }
}
