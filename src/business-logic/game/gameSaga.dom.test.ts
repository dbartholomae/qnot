import { gameSaga } from "./gameSaga";
import { expectSaga } from "redux-saga-test-plan";
import { MockChannel } from "../../services/channel/MockChannel";
import { getContext, select } from "redux-saga-test-plan/matchers";
import { selectId, selectName } from "../me/meSlice";
import { joinRoom, leaveRoom } from "./gameSlice";
import waitForExpect from "wait-for-expect";

describe("gameSaga", () => {
  describe("on joinRoom", () => {
    const id = "id";
    const name = "name";
    const roomCode = "my-room-code";

    it("connects to the room's channel", async () => {
      const channel = new MockChannel();
      const channelCreator = jest.fn(() => channel);
      await expectSaga(gameSaga)
        .provide([
          [select(selectId), id],
          [select(selectName), name],
          [getContext("createChannel"), channelCreator],
        ])
        .dispatch(joinRoom(roomCode))
        .silentRun();

      expect(channelCreator).toHaveBeenCalledWith(roomCode);
    });

    it("announces my presence in the room", async () => {
      const channel = new MockChannel();
      const channelCreator = jest.fn(() => channel);
      await expectSaga(gameSaga)
        .provide([
          [select(selectId), id],
          [select(selectName), name],
          [getContext("createChannel"), channelCreator],
        ])
        .dispatch(joinRoom(roomCode))
        .silentRun();

      expect(channel.presence.enterClient).toHaveBeenCalledWith(id, { name });
    });
  });

  describe("on leaveRoom", () => {
    const id = "id";
    const name = "name";
    const roomCode = "my-room-code";

    it("announces me leaving in the room", async () => {
      const channel = new MockChannel();
      const channelCreator = jest.fn(() => channel);
      await expectSaga(gameSaga)
        .provide([
          [select(selectId), id],
          [select(selectName), name],
          [getContext("createChannel"), channelCreator],
        ])
        .dispatch(joinRoom(roomCode))
        .dispatch(leaveRoom())
        .silentRun();

      await waitForExpect(() =>
        expect(channel.presence.leaveClient).toHaveBeenCalledWith(id)
      );
    });
  });
});
