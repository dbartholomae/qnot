import React, { useState } from "react";
import "./App.css";
import { Container, Typography } from "@material-ui/core";
import { NameForm } from "./Name/NameForm";

export function App() {
  const [name, setName] = useState<string | null>(null);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Hi {name ?? "there"}!
      </Typography>
      <NameForm onChooseName={setName} />
    </Container>
  );
}
