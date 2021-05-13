import Ably from "ably";
import { ChannelCreator } from "./ChannelCreator";

const API_KEY: unknown = process.env.REACT_APP_ABLY_API_KEY;

if (typeof API_KEY !== "string" || API_KEY === "") {
  throw new TypeError("No Ably API key set in env var REACT_APP_ABLY_API_KEY");
}

const channels = new Ably.Realtime(API_KEY).channels;
export const ablyChannelCreator: ChannelCreator = channels.get.bind(channels);
