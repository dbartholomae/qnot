import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { createStore } from "./business-logic/store";
import React from "react";
import { App } from "./App";
import { createTestProviders } from "./testUtils/createTestProviders";
import { getInvitePath } from "./views/JoinRoomView/getInvitePath";
import { en } from "./services/locale";
import { getRoomPath } from "./views/WaitingRoomView/getRoomPath";
import { setName } from "./business-logic/me/meSlice";

describe("App", () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    render(<App />, { wrapper: createTestProviders({ history }) });
  });

  it("renders the main view on root path", async () => {
    history.push("/");
    expect(await screen.findByText("Hi there!")).toBeInTheDocument();
  });

  it("renders the join room view on the invite path", async () => {
    const roomCode = "a-room-code";
    history.push(getInvitePath(roomCode));
    expect(
      await screen.findByText(en.JoinRoomView.heading)
    ).toBeInTheDocument();
  });

  describe("with a name set", () => {
    const name = "Daniel";

    beforeEach(() => {
      history = createMemoryHistory();
      const store = createStore();
      store.dispatch(setName(name));
      render(<App />, { wrapper: createTestProviders({ history, store }) });
    });

    it("renders the room lobby on lobby path", async () => {
      history.push(getRoomPath("test-room-code"));
      expect(await screen.findByText("Room")).toBeInTheDocument();
    });
  });
});
