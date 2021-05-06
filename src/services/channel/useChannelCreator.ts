import { useContext } from "react";
import { ChannelCreatorContext } from "./ChannelCreatorContext";

export function useChannelCreator() {
  return useContext(ChannelCreatorContext);
}
