import React from "react";
import { Container, Typography } from "@material-ui/core";
import { RoomCodeForm } from "./RoomCodeForm";
import { NameForm } from "./NameForm";
import { useName } from "../../business-logic/me";

export function MainView() {
  const [name] = useName();
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Hi {name ?? "there"}!
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <NameForm />
        {name && <RoomCodeForm />}
      </div>
    </Container>
  );
}
