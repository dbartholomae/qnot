import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { createStore, Store } from "./business-logic/store";
import React from "react";
import { App } from "./App";
import { createTestProviders } from "./testUtils/createTestProviders";
import { en } from "./services/locale";
import { getRoomPath } from "./views/GameRoomView/getRoomPath";
import { setName } from "./business-logic/me/meSlice";
import { MockChannel } from "./services/channel/MockChannel";

describe("App", () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
  });

  it("renders the main view on root path", async () => {
    history.push("/");
    render(<App />, { wrapper: createTestProviders({ history }) });
    expect(await screen.findByText(en.MainView.title)).toBeInTheDocument();
  });

  describe("with a name set", () => {
    let store: Store;
    const name = "Daniel";

    beforeEach(() => {
      history = createMemoryHistory();
      store = createStore(() => new MockChannel());
      store.dispatch(setName(name));
    });

    it("renders the room lobby on lobby path", async () => {
      history.push(getRoomPath("test-room-code"));
      render(<App />, { wrapper: createTestProviders({ history, store }) });
      expect(
        await screen.findByText(en.WaitingRoomView.title)
      ).toBeInTheDocument();
    });
  });
});
