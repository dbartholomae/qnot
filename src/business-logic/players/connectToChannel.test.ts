import { addOrUpdatePlayer } from "./playersSlice";
import { handleEvent, handlePresenceMessage } from "./connectToChannel";
import { expectSaga } from "redux-saga-test-plan";
import { Player } from "../game";
import { MockPresenceMessage } from "../../services/channel/MockPresenceMessage";
import { MockMessage } from "../../services/channel/MockMessage";
import { select } from "redux-saga-test-plan/matchers";
import { selectId } from "../me/meSlice";

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
      .put(
        addOrUpdatePlayer(
          new Player({
            id,
            name,
            isOnline: true,
          })
        )
      )
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
      .put(
        addOrUpdatePlayer(
          new Player({
            id,
            name,
            isOnline: true,
          })
        )
      )
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
      .put(
        addOrUpdatePlayer(
          new Player({
            id,
            name,
            isOnline: true,
          })
        )
      )
      .silentRun();
  });
});

describe("handleEvent", () => {
  it("passes an event with a different clientId from the event bus to the store", async () => {
    const action = {
      type: "TEST-MESSAGE",
      payload: "Payload",
      meta: {
        clientId: "a-different-id",
      },
    };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "gameEvent",
        data: action,
      })
    )
      .provide([[select(selectId), "my-id"]])
      .put({ ...action, received: true })
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
