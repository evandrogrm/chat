import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";

import createRootReducer from "./ducks";
import sagas from "./sagas";

export const history = createBrowserHistory();

const middlewares = [];

const sagaMonitor = console.tron ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

middlewares.push(sagaMiddleware);
middlewares.push(routerMiddleware(history));

const createAppropriateStore = console.tron
  ? console.tron.createStore
  : createStore;

const store = createAppropriateStore(
  createRootReducer(history),
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(sagas);

export default store;
