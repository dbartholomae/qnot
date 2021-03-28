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
    >
      <TextField
        autoComplete="off"
        id={id}
        label={label}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button type="submit">{confirmLabel}</Button>
    </form>
  );
};
