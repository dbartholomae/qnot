import { Presence } from "./Presence";
import { Types } from "ably";
import { MockPresenceMessage } from "./MockPresenceMessage";

interface Member {
  clientId: string;
  data: any;
}

type Listener = (message: Types.PresenceMessage) => void;

export class MockPresence implements Presence {
  private listenerMap: { [event: string]: Listener[] } = {
    enter: [],
    leave: [],
    present: [],
  };
  private presentMembers: Member[] = [];

  enterClient = jest.fn().mockImplementation(
    (clientId: string, data: any): Promise<void> => {
      this.presentMembers.push({ clientId, data });
      this.listenerMap["enter"].forEach((listener) =>
        listener(
          new MockPresenceMessage({
            action: "enter",
            clientId,
            data,
          })
        )
      );
      return Promise.resolve();
    }
  );

  leaveClient = jest.fn().mockImplementation((clientId: string) => {
    this.presentMembers = this.presentMembers.filter(
      (member) => member.clientId !== clientId
    );
    this.listenerMap["leave"].forEach((listener) =>
      listener(
        new MockPresenceMessage({
          action: "leave",
          clientId,
        })
      )
    );
  });

  subscribe = jest
    .fn()
    .mockImplementation(
      (
        presenceOrListener:
          | Types.PresenceAction
          | Types.messageCallback<Types.PresenceMessage>
          | Array<Types.PresenceAction>,
        listener: Types.messageCallback<Types.PresenceMessage> | undefined
      ): void => {
        const presences = Array.isArray(presenceOrListener)
          ? presenceOrListener
          : [presenceOrListener as Types.PresenceAction];
        for (let presence of presences) {
          if (presence === "present") {
            this.presentMembers.forEach((member) => {
              listener!(
                new MockPresenceMessage({
                  ...member,
                  action: "present",
                })
              );
            });
            return;
          }
          this.listenerMap[presence].push(
            listener as Types.messageCallback<Types.PresenceMessage>
          );
        }
      }
    );

  unsubscribe = jest
    .fn()
    .mockImplementation(
      (
        presenceOrListener:
          | Types.PresenceAction
          | Types.messageCallback<Types.PresenceMessage>
          | Array<Types.PresenceAction>,
        listener: Types.messageCallback<Types.PresenceMessage> | undefined
      ): void => {
        const presences = Array.isArray(presenceOrListener)
          ? presenceOrListener
          : [presenceOrListener as Types.PresenceAction];
        for (let presence of presences) {
          this.listenerMap[presence] = this.listenerMap[presence].filter(
            (existingListener) => existingListener !== listener
          );
        }
      }
    );
}
