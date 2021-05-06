import { BrowserRouter } from "./services/router";
import { Provider } from "react-redux";
import { createStore } from "./business-logic/store";
import { App } from "./App";
import React from "react";
import { ChannelCreatorProvider } from "./services/channel/ChannelCreatorProvider";
import { ablyChannelCreator } from "./services/channel/ablyChannelCreator";

export const ConnectedApp = () => (
  <ChannelCreatorProvider channelCreator={ablyChannelCreator}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={createStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChannelCreatorProvider>
);
