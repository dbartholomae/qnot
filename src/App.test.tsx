import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";

describe("App", () => {
  let history: MemoryHistory;
  const name = "Daniel";
  const roomCode = "code";

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

  it("greets you if no name is set", () => {
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  it("greets you with your name if you set it", async () => {
    userEvent.type(screen.getByLabelText("Name"), name);
    userEvent.click(screen.getByText("Save name"));

    expect(await screen.findByText("Hi Daniel!")).toBeInTheDocument();
  });

  it("shows the choose room view after you set the name", async () => {
    userEvent.type(screen.getByLabelText("Name"), name);
    userEvent.click(screen.getByText("Save name"));

    expect(await screen.findByText("Join")).toBeInTheDocument();
  });

  it("does not show the choose room view", () => {
    expect(screen.queryByText("Join")).not.toBeInTheDocument();
  });

  it("redirects to the room page when joining a room", async () => {
    userEvent.type(screen.getByLabelText("Name"), name);
    userEvent.click(screen.getByText("Save name"));

    userEvent.type(screen.getByLabelText("Room code"), roomCode);
    userEvent.click(await screen.findByText("Join"));

    expect(history.location.pathname).toContain(roomCode);
  });
});
