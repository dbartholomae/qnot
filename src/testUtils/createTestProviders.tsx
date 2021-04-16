import { Router } from "../router";
import { Provider } from "react-redux";
import { createStore } from "../store/store";
import React, { FunctionComponent } from "react";
import { createMemoryHistory } from "history";
import { MockChannel } from "../channel/MockChannel";
import { ChannelCreatorProvider } from "../channel/ChannelCreatorProvider";
import { Channel } from "../channel/Channel";

export function createTestProviders({
  channel = new MockChannel() as Channel,
  history = createMemoryHistory(),
  store = createStore(),
} = {}): FunctionComponent {
  return ({ children }) => (
    <ChannelCreatorProvider channelCreator={() => channel}>
      <Router history={history}>
        <Provider store={store}>{children}</Provider>
      </Router>
    </ChannelCreatorProvider>
  );
}
