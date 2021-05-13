import { useName } from "../../business-logic/me";
import { Redirect } from "../../services/router";
import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  redirectPath: string;
}

export function NameGuard({ children, redirectPath }: Props) {
  const [myName] = useName();

  if (myName === null) {
    return <Redirect to={redirectPath} />;
  }

  return <>{children}</>;
}
