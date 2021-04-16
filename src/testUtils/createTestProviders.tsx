import { Router } from "../router";
import { Provider } from "react-redux";
import { createStore } from "../store/store";
import React, { FunctionComponent } from "react";
import { createMemoryHistory } from "history";
import { MockEventBus } from "../eventBus/MockEventBus";
import { ChannelCreatorProvider } from "../eventBus/ChannelCreatorProvider";
import { EventBus } from "../eventBus/EventBus";

export function createTestProviders({
  eventBus = new MockEventBus() as EventBus,
  history = createMemoryHistory(),
  store = createStore(),
} = {}): FunctionComponent {
  return ({ children }) => (
    <ChannelCreatorProvider channelCreator={() => eventBus}>
      <Router history={history}>
        <Provider store={store}>{children}</Provider>
      </Router>
    </ChannelCreatorProvider>
  );
}
