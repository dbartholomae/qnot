import { createContext } from "react";
import { ChannelCreator } from "./ChannelCreator";

export const ChannelCreatorContext = createContext<ChannelCreator>(
  (undefined as unknown) as ChannelCreator
);
