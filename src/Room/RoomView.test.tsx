import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import React from "react";
import { RoomView } from "./RoomView";

describe("RoomView", () => {
  let history: MemoryHistory;
  const roomCode = "test-room-code";

  beforeEach(() => {
    history = createMemoryHistory();
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
});
