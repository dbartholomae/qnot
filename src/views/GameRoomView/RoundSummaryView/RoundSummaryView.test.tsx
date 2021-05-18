import { render, screen } from "@testing-library/react";
import { createStore, Store } from "../../../business-logic/store";
import { MockChannel } from "../../../services/channel/MockChannel";
import { RoundSummaryView } from "./RoundSummaryView";
import { createTestProviders } from "../../../testUtils/createTestProviders";
import React from "react";
import userEvent from "@testing-library/user-event";
import { selectStatus } from "../../../business-logic/game/gameSlice";
import { Status } from "../../../business-logic/game";

describe("RoundSummaryView", () => {
  let store: Store;

  beforeEach(() => {
    store = createStore(() => new MockChannel());
  });

  it("when I click start new round it starts a new round", () => {
    render(<RoundSummaryView />, { wrapper: createTestProviders({ store }) });

    userEvent.click(screen.getByText("Nächste Runde"));
    expect(selectStatus(store.getState())).toBe(
      Status.ChoosingFirstDescription
    );
  });
});
