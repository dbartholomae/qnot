import { BrowserRouter } from "./services/router";
import { Provider } from "react-redux";
import { createStore } from "./business-logic/store";
import React, { ReactNode } from "react";
import { ChannelCreatorProvider } from "./services/channel/ChannelCreatorProvider";
import { ablyChannelCreator } from "./services/channel/ablyChannelCreator";

interface Props {
  children: ReactNode;
}

export const Connection = ({ children }: Props) => (
  <ChannelCreatorProvider channelCreator={ablyChannelCreator}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={createStore()}>{children}</Provider>
    </BrowserRouter>
  </ChannelCreatorProvider>
);
