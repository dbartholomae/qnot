import React, { useState } from "react";
import "./App.css";
import { Container, Typography } from "@material-ui/core";
import { NameForm } from "./Name/NameForm";
import { useHistory } from "react-router-dom";
import { ChooseRoomForm } from "./ChooseRoomForm";

export function App() {
  const { push } = useHistory();
  const [name, setName] = useState<string | null>(null);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Hi {name ?? "there"}!
      </Typography>
      <NameForm onChooseName={setName} />
      {name && (
        <ChooseRoomForm
          onChooseRoomCode={(roomCode) => push(`/r/${roomCode}`)}
        />
      )}
    </Container>
  );
}
