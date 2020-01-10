import React from 'react';
import { Provider } from "react-redux";
import Routes from "../../routes";
import store from "../../store";
import TeamsContext from '../../TeamsContext';
import { provider } from '../../services/graph';

export default function App() {
    return (
      <div className="App">
        <TeamsContext.Provider value={provider}>
          <Provider store={store}>
            <Routes />
          </Provider>
        </TeamsContext.Provider>
      </div>
    );
}
