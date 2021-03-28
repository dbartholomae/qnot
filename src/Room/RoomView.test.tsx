import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "../app/store";
import React from "react";
import { RoomView } from "./RoomView";
import { getRoomPath } from "./getRoomPath";

describe("RoomView", () => {
  let history: MemoryHistory;
  let store: ReturnType<typeof createStore>;
  const roomCode = "test-room-code";
  const initialPathname = getRoomPath(roomCode);

  describe("with a name set", () => {
    const myName = "Daniel";

    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore({ preloadedState: { name: myName } });
      render(
        <Router history={history}>
          <Provider store={store}>
            <RoomView roomCode={roomCode} />
          </Provider>
        </Router>
      );
    });

    it("shows the room code", async () => {
      expect(await screen.findByText(roomCode)).toBeInTheDocument();
    });

    it("shows my name", async () => {
      expect(await screen.findByText(myName)).toBeInTheDocument();
    });
  });

  describe("without a name set", () => {
    beforeEach(() => {
      history = createMemoryHistory({ initialEntries: [initialPathname] });
      store = createStore();
      render(
        <Router history={history}>
          <Provider store={store}>
            <RoomView roomCode={roomCode} />
          </Provider>
        </Router>
      );
    });

    it("redirects to the main page", () => {
      expect(history.location.pathname).toBe("/");
    });

    it("keeps the roomCode in the search", () => {
      expect(history.location.search).toContain(`roomCode=${roomCode}`);
    });
  });
});
