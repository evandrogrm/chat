import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class OutsideRoute extends Component {
  isUserLogged = () => {
    const keys = Object.keys(localStorage);
    let keyValue = null;
    for (const k of keys) {
      if (k.includes(process.env.REACT_APP_APP_ID)) {
        keyValue = JSON.parse(localStorage.getItem(k));
      }
    }
    return !!keyValue;
  }

  componentDidMount() {
    if (this.isUserLogged()) {
      window.location.href = window.location.origin + "/";
    }
  }
  
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route {...props} render={props => <Component {...props} />} />
    );
  }
}
