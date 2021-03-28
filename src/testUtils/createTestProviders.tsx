import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "../app/store";
import React, { FunctionComponent } from "react";
import { createMemoryHistory } from "history";

export function createTestProviders({
  history = createMemoryHistory(),
  store = createStore(),
}): FunctionComponent {
  return ({ children }) => (
    <Router history={history}>
      <Provider store={store}>{children}</Provider>
    </Router>
  );
}
