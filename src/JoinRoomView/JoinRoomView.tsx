import { Button, Container, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { NameForm } from "../MainView/NameForm";
import { en } from "../locale";
import { useName } from "../me";
import { Link } from "../router";
import { getWaitingRoomPath } from "../WaitingRoomView/getWaitingRoomPath";

const locale = en.JoinRoomView;

interface Props {
  roomCode: string;
}

export const JoinRoomView: FunctionComponent<Props> = ({ roomCode }) => {
  const [name] = useName();
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {locale.heading}
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <NameForm />
        {name && (
          <Button
            color="primary"
            variant="contained"
            component={Link}
            to={getWaitingRoomPath(roomCode)}
          >
            {locale.joinGame}
          </Button>
        )}
      </div>
    </Container>
  );
};