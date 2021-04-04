import { en } from "../locale";
import React, { useState } from "react";
import { useName } from "../name/useName";
import { Button, TextField } from "@material-ui/core";

export function NameForm() {
  const [name, saveName] = useName();
  const [nameDraft, setNameDraft] = useState(name ?? "");
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        saveName(nameDraft);
      }}
      style={{
        display: "flex",
        gap: 12,
      }}
    >
      <TextField
        autoComplete="off"
        id={"name"}
        label={en.MainView.nameLabel}
        value={nameDraft}
        variant="filled"
        onChange={(event) => setNameDraft(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        {en.MainView.saveName}
      </Button>
    </form>
  );
}
