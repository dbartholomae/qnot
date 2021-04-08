import { BrowserRouter } from "./router";
import { Provider } from "react-redux";
import { createStore } from "./store/store";
import { App } from "./App";
import React from "react";

export const ConnectedApp = () => (
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </BrowserRouter>
);
