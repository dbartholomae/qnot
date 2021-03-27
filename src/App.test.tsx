import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { App } from "./App";
import userEvent from "@testing-library/user-event";

describe("App", () => {
  it("greets you if no name is set", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  it("greets you with your name if you set it", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const name = "Daniel";
    userEvent.type(screen.getByLabelText("Name"), name);
    userEvent.click(screen.getByText("Save name"));

    expect(await screen.findByText("Hi Daniel!")).toBeInTheDocument();
  });

  it("shows the choose room view after you set the name", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const name = "Daniel";
    userEvent.type(screen.getByLabelText("Name"), name);
    userEvent.click(screen.getByText("Save name"));

    expect(await screen.findByText("Join")).toBeInTheDocument();
  });

  it("does not show the choose room view", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.queryByText("Join")).not.toBeInTheDocument();
  });
});
