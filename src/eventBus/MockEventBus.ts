import { EventBus } from "./EventBus";

type Callback = (message: unknown) => void;

export class MockEventBus implements EventBus {
  subscribers: { [key: string]: Callback[] } = {};
  publish = jest.fn().mockImplementation((type, event) => {
    (this.subscribers[type] ?? []).map((subscriber) =>
      subscriber({ data: event })
    );
  });
  subscribe = jest
    .fn()
    .mockImplementation((type: string, callback: Callback) => {
      if (this.subscribers[type] === undefined) {
        this.subscribers[type] = [];
      }
      this.subscribers[type].push(callback);
    });
}
