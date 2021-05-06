import { ChannelCreator } from "./ChannelCreator";
import { MockChannel } from "./MockChannel";

export const MockChannelCreator: ChannelCreator = () => new MockChannel();
