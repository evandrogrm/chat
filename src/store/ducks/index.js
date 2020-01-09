import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import graph from "./graph";
import error from "./error";

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    graph,
    error,
  });

export default createRootReducer;
