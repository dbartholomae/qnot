import React, { useState } from "react";
import "./App.css";
import { Button, Container, TextField, Typography } from "@material-ui/core";

const NameForm = ({
  onChooseName,
}: {
  onChooseName: (name: string) => void;
}) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onChooseName(name);
      }}
    >
      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button type="submit">Save name</Button>
    </form>
  );
};

function App() {
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

export default App;
