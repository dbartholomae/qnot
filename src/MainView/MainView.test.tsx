import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { MainView } from "./MainView";
import { en } from "../locale";
import { createTestProviders } from "../testUtils/createTestProviders";

const locale = en.MainView;

describe("MainView", () => {
  let history: MemoryHistory;
  const name = "Daniel";

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ["/"] });
    render(<MainView />, { wrapper: createTestProviders({ history }) });
  });

  it("greets you if no name is set", () => {
    expect(screen.getByText("Hi there!")).toBeInTheDocument();
  });

  it("greets you with your name if you set it", async () => {
    await userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(en.MainView.saveName));

    expect(await screen.findByText("Hi Daniel!")).toBeInTheDocument();
  });

  it("shows the choose room view after you set the name", async () => {
    await userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(en.MainView.saveName));

    expect(await screen.findByText(en.MainView.joinRoom)).toBeInTheDocument();
  });

  it("does not show the choose room view", () => {
    expect(screen.queryByText(en.MainView.joinRoom)).not.toBeInTheDocument();
  });
});
