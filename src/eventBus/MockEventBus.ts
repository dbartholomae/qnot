import { EventBus } from "./EventBus";
import { Types } from "ably";

type Callback = (message: unknown) => void;

export class MockEventBus implements EventBus {
  subscribers: Callback[] = [];
  publish = jest.fn().mockImplementation((type, event) => {
    this.subscribers.map((subscriber) =>
      subscriber({ data: event, name: type })
    );
  });
  subscribe = jest.fn().mockImplementation((callback: Callback) => {
    this.subscribers.push(callback);
  });
  presence = {} as any;
}
