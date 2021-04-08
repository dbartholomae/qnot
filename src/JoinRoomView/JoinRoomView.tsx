import { Button, Container, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { NameForm } from "../MainView/NameForm";
import { en } from "../locale";
import { useName } from "../name";

const locale = en.JoinRoomView;

export const JoinRoomView: FunctionComponent = () => {
  const [name] = useName();
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {locale.heading}
      </Typography>
      <NameForm />
      {name && <Button>{locale.joinGame}</Button>}
    </Container>
  );
};
