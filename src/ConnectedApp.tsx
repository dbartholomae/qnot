import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "./store/store";
import { App } from "./App";
import React from "react";

const basename = window.location.pathname;

export const ConnectedApp = () => (
  <BrowserRouter basename={basename}>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </BrowserRouter>
);
