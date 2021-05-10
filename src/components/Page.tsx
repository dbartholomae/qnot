import React, { FunctionComponent } from "react";
import { Container, Typography } from "@material-ui/core";

interface Props {
  title: string;
}

export const Page: FunctionComponent<Props> = ({ children, title }) => (
  <Container>
    <Typography variant="h3" gutterBottom>
      {title}
    </Typography>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {children}
    </div>
  </Container>
);
