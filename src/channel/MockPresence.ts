import { Presence } from "./Presence";
import { Types } from "ably";

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

  enterClient = jest
    .fn()
    .mockImplementation((clientId: string, data: any): void => {
      this.presentMembers.push({ clientId, data });
      this.listenerMap["enter"].forEach((listener) =>
        listener({
          clientId,
          data,
        } as Types.PresenceMessage)
      );
    });

  leaveClient = jest.fn().mockImplementation((clientId: string) => {
    this.presentMembers = this.presentMembers.filter(
      (member) => member.clientId !== clientId
    );
    this.listenerMap["leave"].forEach((listener) =>
      listener({
        clientId,
      } as Types.PresenceMessage)
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
        if (presenceOrListener === "present") {
          this.presentMembers.forEach((member) => {
            listener!(member as Types.PresenceMessage);
          });
          return;
        }
        this.listenerMap[presenceOrListener as Types.PresenceAction].push(
          listener as Types.messageCallback<Types.PresenceMessage>
        );
      }
    );
}
