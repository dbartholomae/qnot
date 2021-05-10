import React from "react";
import { RoomCodeForm } from "./RoomCodeForm";
import { NameForm } from "./NameForm";
import { useName } from "../../business-logic/me";
import { Page } from "../../components/Page";

export function MainView() {
  const [name] = useName();
  return (
    <Page title={`Hi ${name ?? "there"}!`}>
      <NameForm />
      {name && <RoomCodeForm />}
    </Page>
  );
}
