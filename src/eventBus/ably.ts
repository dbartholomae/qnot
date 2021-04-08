import Ably from "ably";

const API_KEY: unknown = process.env.REACT_APP_ABLY_API_KEY;

if (typeof API_KEY !== "string" || API_KEY === "") {
  throw new TypeError("No Ably API key set in env var REACT_APP_ABLY_API_KEY");
}

export const ably = new Ably.Realtime(API_KEY);
const channelName = "qnot";
export const ablyEventBus = ably.channels.get(channelName);