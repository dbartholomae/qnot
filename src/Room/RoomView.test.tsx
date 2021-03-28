import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "../app/store";
import React from "react";
import { RoomView } from "./RoomView";
import { setName } from "../name/nameSlice";

describe("RoomView", () => {
  let history: MemoryHistory;
  let store: ReturnType<typeof createStore>;
  const roomCode = "test-room-code";

  beforeEach(() => {
    history = createMemoryHistory();
    store = createStore();
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
    const myName = "Daniel";
    store.dispatch(setName(myName));
    expect(await screen.findByText(myName)).toBeInTheDocument();
  });
});
