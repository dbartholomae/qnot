import { BrowserRouter } from "./router";
import { Provider } from "react-redux";
import { createStore } from "./store/store";
import { App } from "./App";
import React from "react";
import { ChannelCreatorProvider } from "./channel/ChannelCreatorProvider";
import { ablyChannelCreator } from "./channel/ablyChannelCreator";

export const ConnectedApp = () => (
  <ChannelCreatorProvider channelCreator={ablyChannelCreator}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={createStore()}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChannelCreatorProvider>
);