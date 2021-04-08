import { BrowserRouter } from "./router";
import { Provider } from "react-redux";
import { createStore } from "./store/store";
import { App } from "./App";
import React from "react";
import { EventBusProvider } from "./eventBus/EventBusProvider";

export const ConnectedApp = () => (
  <EventBusProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={createStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </EventBusProvider>
);
