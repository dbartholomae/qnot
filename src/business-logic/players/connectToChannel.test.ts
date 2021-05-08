import { addOrUpdatePlayer } from "./playersSlice";
import { handleMessage } from "./connectToChannel";
import { expectSaga } from "redux-saga-test-plan";
import { Player } from "../game";
import { MockPresenceMessage } from "../../services/channel/MockPresenceMessage";

describe("handleMessage", () => {
  it("adds a player who joins to the players list", async () => {
    const name = "Daniel";
    const id = "550e8400-e29b-11d4-a716-446655440000";
    await expectSaga(
      handleMessage,
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
      handleMessage,
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
      handleMessage,
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
