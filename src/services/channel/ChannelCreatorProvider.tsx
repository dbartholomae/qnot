import { FunctionComponent } from "react";
import { ChannelCreatorContext } from "./ChannelCreatorContext";
import { ChannelCreator } from "./ChannelCreator";

interface Props {
  channelCreator: ChannelCreator;
}

export const ChannelCreatorProvider: FunctionComponent<Props> = ({
  children,
  channelCreator,
}) => (
  <ChannelCreatorContext.Provider value={channelCreator}>
    {children}
  </ChannelCreatorContext.Provider>
);
