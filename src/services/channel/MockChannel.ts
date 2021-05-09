import { Channel } from "./Channel";
import { MockPresence } from "./MockPresence";

type Callback = (message: unknown) => void;

export class MockChannel implements Channel {
  subscribers: Callback[] = [];
  publish = jest.fn().mockImplementation((type, event) => {
    this.subscribers.map((subscriber) =>
      subscriber({ data: event, name: type })
    );
  });
  subscribe = jest.fn().mockImplementation((callback: Callback) => {
    this.subscribers.push(callback);
  });
  unsubscribe = jest.fn().mockImplementation((callback: Callback) => {
    this.subscribers = this.subscribers.filter(
      (existingSubscriber) => existingSubscriber !== callback
    );
  });
  presence = new MockPresence();
}
