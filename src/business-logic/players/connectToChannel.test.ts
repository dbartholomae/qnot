import { addOrUpdatePlayer } from "./playersSlice";
import {
  handleAction,
  handleEvent,
  handlePresenceMessage,
} from "./connectToChannel";
import { expectSaga } from "redux-saga-test-plan";
import { Player } from "../game";
import { MockPresenceMessage } from "../../services/channel/MockPresenceMessage";
import { MockMessage } from "../../services/channel/MockMessage";
import { select } from "redux-saga-test-plan/matchers";
import { selectId } from "../me/meSlice";
import { MockChannel } from "../../services/channel/MockChannel";

describe("handlePresenceMessage", () => {
  it("adds a player who joins to the players list", async () => {
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    await expectSaga(
      handlePresenceMessage,
      new MockPresenceMessage({
        action: "enter",
        clientId: id,
        data: { name },
      })
    )
      .put({
        ...addOrUpdatePlayer(
          new Player({
            id,
            name,
            isOnline: true,
          })
        ),
        meta: { received: true },
      })
      .silentRun();
  });

  it("adds a player who already was in the room", async () => {
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    await expectSaga(
      handlePresenceMessage,
      new MockPresenceMessage({
        action: "present",
        clientId: id,
        data: { name },
      })
    )
      .put({
        ...addOrUpdatePlayer(
          new Player({
            id,
            name,
            isOnline: true,
          })
        ),
        meta: { received: true },
      })
      .silentRun();
  });

  it("marks a player who leaves as offline", async () => {
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    await expectSaga(
      handlePresenceMessage,
      new MockPresenceMessage({
        action: "enter",
        clientId: id,
        data: { name },
      })
    )
      .put({
        ...addOrUpdatePlayer(
          new Player({
            id,
            name,
            isOnline: true,
          })
        ),
        meta: { received: true },
      })
      .silentRun();
  });
});

describe("handleAction", () => {
  it("sends an event with the action and my id to the event bus", async () => {
    const channel = new MockChannel();
    const action = {
      type: "TEST-MESSAGE",
      payload: "Payload",
    };
    const myId = "my-id";
    await expectSaga(handleAction, action, channel)
      .provide([[select(selectId), myId]])
      .silentRun();
    expect(channel.publish).toHaveBeenCalledWith({
      name: "gameEvent",
      data: { ...action, meta: { clientId: myId } },
    });
  });
});

describe("handleEvent", () => {
  it("passes an event with a different clientId from the event bus to the store", async () => {
    const clientId = "a-different-id";
    const action = {
      type: "TEST-MESSAGE",
      payload: "Payload",
      meta: { clientId },
    };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "gameEvent",
        data: action,
      })
    )
      .provide([[select(selectId), "my-id"]])
      .put({ ...action, meta: { clientId, received: true } })
      .silentRun();
  });

  it("does not pass an event with my clientId from the event bus to the store", async () => {
    const myId = "my-id";
    const action = {
      type: "TEST-MESSAGE",
      payload: "Payload",
      meta: {
        clientId: myId,
      },
    };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "gameEvent",
        data: action,
      })
    )
      .provide([[select(selectId), myId]])
      .not.put({ ...action, received: true })
      .silentRun();
  });
});
