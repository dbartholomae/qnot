import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { createStore } from "./business-logic/store";
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
    render(<App />, { wrapper: createTestProviders({ history }) });
  });

  it("renders the main view on root path", async () => {
    history.push("/");
    expect(await screen.findByText(en.MainView.title)).toBeInTheDocument();
  });

  describe("with a name set", () => {
    const name = "Daniel";

    beforeEach(() => {
      history = createMemoryHistory();
      const store = createStore(() => new MockChannel());
      store.dispatch(setName(name));
      render(<App />, { wrapper: createTestProviders({ history, store }) });
    });

    it("renders the room lobby on lobby path", async () => {
      history.push(getRoomPath("test-room-code"));
      expect(
        await screen.findByText(en.WaitingRoomView.title)
      ).toBeInTheDocument();
    });
  });
});
