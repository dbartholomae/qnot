import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory, MemoryHistory } from "history";
import { MainView } from "./MainView";
import { en } from "../../services/locale";
import { createTestProviders } from "../../testUtils/createTestProviders";

const locale = en.MainView;

describe("MainView", () => {
  let history: MemoryHistory;
  const name = "Daniel";

  beforeEach(() => {
    localStorage.clear();
    history = createMemoryHistory({ initialEntries: ["/"] });
    render(<MainView />, { wrapper: createTestProviders({ history }) });
  });

  it("shows the choose room view after you set the name", async () => {
    await userEvent.type(screen.getByLabelText(locale.nameLabel), name);
    userEvent.click(screen.getByText(locale.saveName));

    expect(await screen.findByText(locale.createRoom)).toBeInTheDocument();
  });

  it("does not show the choose room view", () => {
    expect(screen.queryByText(locale.createRoom)).not.toBeInTheDocument();
  });
});
