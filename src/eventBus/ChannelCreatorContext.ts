import { createContext } from "react";
import { ChannelCreator } from "./Channel";

export const ChannelCreatorContext = createContext<ChannelCreator>(
  (undefined as unknown) as ChannelCreator
);
