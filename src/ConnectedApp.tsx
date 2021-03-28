import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "./store/store";
import { App } from "./App";
import React from "react";

export const ConnectedApp = () => (
  <BrowserRouter>
    <Provider store={createStore()}>
      <App />
    </Provider>
  </BrowserRouter>
);
