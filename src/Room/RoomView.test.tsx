import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "../app/store";
import React from "react";
import { RoomView } from "./RoomView";

describe("RoomView", () => {
  let history: MemoryHistory;
  let store: ReturnType<typeof createStore>;
  const roomCode = "test-room-code";

  describe("with a name set", () => {
    const myName = "Daniel";

    beforeEach(() => {
      history = createMemoryHistory();
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
});
