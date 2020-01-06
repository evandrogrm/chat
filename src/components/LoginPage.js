import React, { Fragment, Component } from "react";

export default class LoginPage extends Component {
  render() {
    return (
      <Fragment>
        <mgt-teams-provider
          client-id={process.env.REACT_APP_APP_ID}
          auth-popup-url={process.env.REACT_APP_REDIRECT_URI}
        ></mgt-teams-provider>
        <mgt-msal-provider
          client-id={process.env.REACT_APP_APP_ID}
          depends-on="mgt-teams-provider"
        ></mgt-msal-provider>
        <mgt-login />
      </Fragment>
    );
  }
}
