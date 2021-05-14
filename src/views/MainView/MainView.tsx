import React from "react";
import { RoomCodeForm } from "./RoomCodeForm";
import { NameForm } from "./NameForm";
import { useName } from "../../business-logic/me";
import { Page } from "../../components/Page";
import { en } from "../../services/locale";

export function MainView() {
  const [name] = useName();
  return (
    <Page title={en.MainView.title}>
      <NameForm />
      {name && <RoomCodeForm />}
    </Page>
  );
}
