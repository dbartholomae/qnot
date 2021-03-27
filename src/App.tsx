import React, { FunctionComponent, useState } from "react";
import "./App.css";
import { Button, Container, TextField, Typography } from "@material-ui/core";
import { NameForm } from "./Name/NameForm";
import { useHistory } from "react-router-dom";

const RoomForm: FunctionComponent<{
  onChooseRoomCode: (roomCode: string) => void;
}> = ({ onChooseRoomCode }) => {
  const [roomCode, setRoomCode] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onChooseRoomCode(roomCode);
      }}
    >
      <TextField
        id="roomCode"
        label="Room code"
        value={roomCode}
        onChange={(event) => setRoomCode(event.target.value)}
      />
      <Button type="submit">Join</Button>
    </form>
  );
};

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
        <RoomForm onChooseRoomCode={(roomCode) => push(`/r/${roomCode}`)} />
      )}
    </Container>
  );
}
