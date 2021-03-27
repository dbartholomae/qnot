import React from "react";
import "./App.css";
import { Button, Container, Typography } from "@material-ui/core";

function App() {
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Hi there!
      </Typography>

      <Button variant="contained" color="secondary">
        Open room
      </Button>
    </Container>
  );
}

export default App;
