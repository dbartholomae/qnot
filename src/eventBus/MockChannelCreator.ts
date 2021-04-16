import { ChannelCreator } from "./Channel";
import { MockEventBus } from "./MockEventBus";

export const MockChannelCreator: ChannelCreator = () => new MockEventBus();
