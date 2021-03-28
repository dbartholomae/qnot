import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Container, Typography } from "@material-ui/core";
import { getRoomPath } from "../Room/getRoomPath";
import { TextFieldForm } from "../components/TextFieldForm";
import en from "../locale/en.json";
import { useRandomRoomCode } from "./useRandomRoomCode";

export function MainView() {
  const { push } = useHistory();
  const [name, setName] = useState<string | null>(null);
  const randomRoomCode = useRandomRoomCode();
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
        <TextFieldForm
          onConfirmValue={setName}
          id="name"
          label={en.MainView.nameLabel}
          confirmLabel={en.MainView.saveName}
        />
        {name && (
          <TextFieldForm
            onConfirmValue={(roomCode) => push(getRoomPath(roomCode))}
            id="roomCode"
            initialValue={randomRoomCode}
            label={en.MainView.roomCodeLabel}
            confirmLabel={en.MainView.joinRoom}
          />
        )}
      </div>
    </Container>
  );
}
