import React from "react";
import { render, screen } from "@testing-library/react";
import { NameForm } from "./NameForm";
import { createStore, Store } from "../store/store";
import { createTestProviders } from "../testUtils/createTestProviders";

describe("NameForm", () => {
  const name = "Daniel";
  let store: Store;

  describe("with a name already set", () => {
    beforeEach(() => {
      store = createStore({ preloadedState: { name } });
      render(<NameForm />, { wrapper: createTestProviders({ store }) });
    });

    it("shows the preset name", () => {
      expect(screen.getByDisplayValue(name)).toBeInTheDocument();
    });
  });
});
