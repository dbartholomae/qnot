import React from "react";
import { Container, Typography } from "@material-ui/core";
import { selectName } from "../name/nameSlice";
import { useSelector } from "../store/useSelector";
import { RoomCodeForm } from "./RoomCodeForm";
import { NameForm } from "./NameForm";

export function MainView() {
  const name = useSelector(selectName);
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
