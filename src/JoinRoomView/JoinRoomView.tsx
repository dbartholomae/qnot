import { Container, Typography } from "@material-ui/core";
import React, { FunctionComponent } from "react";
import { NameForm } from "../MainView/NameForm";
import { en } from "../locale";

const locale = en.JoinRoomView;

export const JoinRoomView: FunctionComponent = () => {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        {locale.heading}
      </Typography>
      <NameForm />
    </Container>
  );
};
