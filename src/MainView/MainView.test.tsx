import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "../app/store";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { Router } from "react-router-dom";
import { MainView } from "./MainView";
import en from "../locale/en.json";
import { getRoomPath } from "../Room/getRoomPath";

describe("MainView", () => {
  let history: MemoryHistory;
  const name = "Daniel";
  const roomCode = "a-room-code";

  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={createStore()}>
          <MainView />
        </Provider>
      </Router>
    );
  });

  it("greets you if no name is set", () => {
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  const locale = en.MainView;
  it("greets you with your name if you set it", async () => {
    userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(en.MainView.saveName));

    expect(await screen.findByText("Hi Daniel!")).toBeInTheDocument();
  });

  it("shows the choose room view after you set the name", async () => {
    userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(en.MainView.saveName));

    expect(await screen.findByText(en.MainView.joinRoom)).toBeInTheDocument();
  });

  it("shows a random three-word room code on start", async () => {
    userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(en.MainView.saveName));

    expect(
      ((await screen.findByLabelText(
        en.MainView.roomCodeLabel
      )) as HTMLInputElement).value
    ).toMatch(/\w+-\w+-\w+/);
  });

  it("does not show the choose room view", () => {
    expect(screen.queryByText(en.MainView.joinRoom)).not.toBeInTheDocument();
  });

  it("redirects to the room page when joining a room", async () => {
    userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(en.MainView.saveName));

    userEvent.type(screen.getByLabelText(en.MainView.roomCodeLabel), roomCode);
    userEvent.click(await screen.findByText(en.MainView.joinRoom));

    expect(history.location.pathname).toEqual(getRoomPath(roomCode));
  });
});
