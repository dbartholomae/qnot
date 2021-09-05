import { addOrUpdatePlayer } from "./playersSlice";
import {
  handleAction,
  handleEvent,
  handlePresenceMessage,
} from "./connectToChannel";
import { expectSaga } from "redux-saga-test-plan";
import { Player, Status } from "../game";
import { MockPresenceMessage } from "../../services/channel/MockPresenceMessage";
import { MockMessage } from "../../services/channel/MockMessage";
import { select } from "redux-saga-test-plan/matchers";
import { selectId } from "../me/meSlice";
import { MockChannel } from "../../services/channel/MockChannel";
import { Channel } from "../../services/channel/Channel";
import {
  selectGameState,
  selectWaitingForSync,
  syncState,
} from "../game/gameSlice";

describe("handlePresenceMessage", () => {
  let channel: Channel;

  beforeEach(() => {
    channel = new MockChannel();
  });

  it("adds a player who joins to the players list", async () => {
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    await expectSaga(
      handlePresenceMessage,
      new MockPresenceMessage({
        action: "enter",
        clientId: id,
        data: { name },
      }),
      channel
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
      }),
      channel
    )
      .provide([
        [select(selectId), id],
        [select(selectWaitingForSync), false],
      ])
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

  it("asks a player who already was in the room for the game state", async () => {
    const name = "Daniel";
    const clientId = "550e8400-e29b-11d4-a716-446655440000";
    const myId = "my-id";
    await expectSaga(
      handlePresenceMessage,
      new MockPresenceMessage({
        action: "present",
        clientId,
        data: { name },
      }),
      channel
    )
      .provide([
        [select(selectId), myId],
        [select(selectWaitingForSync), false],
      ])
      .silentRun();
    expect(channel.publish).toHaveBeenCalledWith({
      name: "requestGameState",
      data: {
        from: clientId,
        for: myId,
      },
    });
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
      }),
      channel
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
  let channel: Channel;

  beforeEach(() => {
    channel = new MockChannel();
  });

  it("ignores an event that is not a gameEvent", async () => {
    const clientId = "a-different-id";
    const action = { type: "not-an-action", meta: { clientId } };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "notAGameEvent",
        data: action,
      }),
      channel
    )
      .provide([[select(selectId), "my-id"]])
      .not.put({ ...action, meta: { clientId, received: true } })
      .silentRun();
  });

  it("syncs the game state if it is for me", async () => {
    const state = {
      players: [],
      status: Status.WaitingForGameStart,
      connectedToChannel: true,
    };
    const myId = "my-id";
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "syncGameState",
        data: { state, for: myId },
      }),
      channel
    )
      .provide([[select(selectId), myId]])
      .put({ ...syncState(state), meta: { received: true } })
      .silentRun();
  });

  it("does not sync the game state if it is for someone else", async () => {
    const state = {
      players: [],
      status: Status.WaitingForGameStart,
      connectedToChannel: true,
    };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "syncGameState",
        data: { state, for: "another-id" },
      }),
      channel
    )
      .provide([[select(selectId), "my-id"]])
      .not.put({ ...syncState(state), meta: { received: true } })
      .silentRun();
  });

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
      }),
      channel
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
      }),
      channel
    )
      .provide([[select(selectId), myId]])
      .not.put({ ...action, received: true })
      .silentRun();
  });

  it("publishes the game state on a requestGameState event with my id", async () => {
    const myId = "my-id";
    const otherId = "other-id";
    const data = {
      from: myId,
      for: otherId,
    };
    const mockState = { players: [] };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "requestGameState",
        data: data,
      }),
      channel
    )
      .provide([
        [select(selectId), myId],
        { call: () => null },
        [select(selectGameState), mockState],
      ])
      .silentRun();

    expect(channel.publish).toHaveBeenCalledWith({
      name: "syncGameState",
      data: { state: mockState, for: otherId },
    });
  });

  it("does not publish the game state on a requestGameState event with a different id", async () => {
    const data = {
      from: "a-different-id",
      for: "a-third-id",
    };
    const mockState = { players: [] };
    await expectSaga(
      handleEvent,
      new MockMessage({
        name: "requestGameState",
        data: data,
      }),
      channel
    )
      .provide([
        [select(selectId), "my-id"],
        [select(selectGameState), mockState],
      ])
      .silentRun();

    expect(channel.publish).not.toHaveBeenCalled();
  });
});
