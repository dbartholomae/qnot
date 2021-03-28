import { useHistory } from "react-router-dom";
import React from "react";
import { Container, Typography } from "@material-ui/core";
import { getRoomPath } from "../Room/getRoomPath";
import { TextFieldForm } from "../components/TextFieldForm";
import en from "../locale/en.json";
import { useRandomRoomCode } from "./useRandomRoomCode";
import { useDispatch, useSelector } from "react-redux";
import { selectName, setName as setNameAction } from "./nameSlice";

export function MainView() {
  const { push } = useHistory();
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const setName = (newName: string) => dispatch(setNameAction(newName));
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
