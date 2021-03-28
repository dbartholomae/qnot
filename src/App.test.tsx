import { createMemoryHistory, MemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { MainView } from "./MainView/MainView";
import React from "react";

describe("App", () => {
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <Router history={history}>
        <Provider store={store}>
          <MainView />
        </Provider>
      </Router>
    );
  });

  it("renders the main view on root path", () => {
    history.push("/");
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });
});
