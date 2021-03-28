import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

interface Props {
  onConfirmValue: (name: string) => void;
  id: string;
  label: string;
  confirmLabel: string;
  initialValue?: string;
}

export const TextFieldForm = ({
  onConfirmValue,
  id,
  initialValue = "",
  label,
  confirmLabel,
}: Props) => {
  const [value, setValue] = useState(initialValue);
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onConfirmValue(value);
      }}
      style={{
        display: "flex",
        gap: 12,
      }}
    >
      <TextField
        autoComplete="off"
        id={id}
        label={label}
        value={value}
        variant="filled"
        onChange={(event) => setValue(event.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        {confirmLabel}
      </Button>
    </form>
  );
};
