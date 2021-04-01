import React from "react";
import { Container, Typography } from "@material-ui/core";
import { TextFieldForm } from "../components/TextFieldForm";
import { en } from "../locale";
import { selectName, setName as setNameAction } from "../name/nameSlice";
import { useDispatch } from "../store/useDispatch";
import { useSelector } from "../store/useSelector";
import { RoomCodeForm } from "./RoomCodeForm";

export function MainView() {
  const name = useSelector(selectName);
  const dispatch = useDispatch();
  const setName = (newName: string) => dispatch(setNameAction(newName));
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
        {name && <RoomCodeForm />}
      </div>
    </Container>
  );
}
