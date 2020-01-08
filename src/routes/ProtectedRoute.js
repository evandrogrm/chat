import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class OutsideRoute extends Component {
  // isUserLogged = () => {
  //   const keys = Object.keys(localStorage);
  //   let keyValue = null;
  //   for (const k of keys) {
  //     if (k.includes(process.env.REACT_APP_APP_ID)) {
  //       keyValue = JSON.parse(localStorage.getItem(k));
  //     }
  //   }
  //   return !!keyValue && provider.state === 0;
  // }
  isUserLogged = () => {
    console.log('process.env.REACT_APP_PROVIDER_STATUS: ', process.env.REACT_APP_PROVIDER_STATUS);
    return process.env.REACT_APP_PROVIDER_STATUS === 0;
  }

  componentDidMount() {
    if (!this.isUserLogged()) {
      window.location.href = window.location.origin + "/login";
    }
  }
  
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route {...props} render={props => <Component {...props} />} />
    );
  }
}
