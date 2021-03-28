import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { createStore } from "./app/store";
import React from "react";
import { App } from "./App";
import { getRoomPath } from "./Room/getRoomPath";
import { createTestProviders } from "./testUtils/createTestProviders";

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

  describe("with a name set", () => {
    const name = "Daniel";

    beforeEach(() => {
      history = createMemoryHistory();
      const store = createStore({ preloadedState: { name } });
      render(<App />, { wrapper: createTestProviders({ history, store }) });
    });

    it("renders the room lobby on lobby path", async () => {
      history.push(getRoomPath("test-room-code"));
      expect(await screen.findByText("Room")).toBeInTheDocument();
    });

    it("shows the room code", async () => {
      const roomCode = "test-room-code";
      history.push(getRoomPath(roomCode));
      expect(await screen.findByText(roomCode)).toBeInTheDocument();
    });
  });
});
