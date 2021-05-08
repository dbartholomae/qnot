import { Router } from "../services/router";
import { Provider } from "react-redux";
import { createStore } from "../business-logic/store";
import React, { FunctionComponent } from "react";
import { createMemoryHistory } from "history";
import { MockChannel } from "../services/channel/MockChannel";
import { ChannelCreatorProvider } from "../services/channel/ChannelCreatorProvider";
import { Channel } from "../services/channel/Channel";

export function createTestProviders({
  channel = new MockChannel() as Channel,
  history = createMemoryHistory(),
  store = createStore(() => channel),
} = {}): FunctionComponent {
  return ({ children }) => (
    <ChannelCreatorProvider channelCreator={() => channel}>
      <Router history={history}>
        <Provider store={store}>{children}</Provider>
      </Router>
    </ChannelCreatorProvider>
  );
}
