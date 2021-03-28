import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import React from "react";
import { App } from "./App";

describe("App", () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
  });

  it("renders the main view on root path", async () => {
    history.push("/");
    expect(await screen.findByText("Hi there!")).toBeInTheDocument();
  });

  it("renders the room lobby on lobby path", async () => {
    history.push("/r/test-room-code");
    expect(await screen.findByText("Room")).toBeInTheDocument();
  });

  it("shows the room code", async () => {
    const roomCode = "test-room-code";
    history.push(`/r/${roomCode}`);
    expect(await screen.findByText(roomCode)).toBeInTheDocument();
  });
});
