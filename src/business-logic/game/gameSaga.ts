import { call, fork, getContext, select, take } from "redux-saga/effects";
import { selectId, selectName } from "../me/meSlice";
import { ChannelCreator } from "../../services/channel/ChannelCreator";
import { joinRoom, joinRoomComplete, leaveRoom } from "./gameSlice";
import { Channel } from "../../services/channel/Channel";
import { connectToChannel } from "../players/connectToChannel";
import { put } from "redux-saga-test-plan/matchers";

export function* gameSaga() {
  yield call(presenceSaga);
}

function* presenceSaga() {
  while (true) {
    const { payload: roomCode } = yield take(joinRoom);
    const createChannel: ChannelCreator = yield getContext("createChannel");
    const channel = createChannel(roomCode);
    yield fork(enterRoomSaga, channel, roomCode);
    yield take(leaveRoom);
    yield fork(leaveRoomSaga, channel);
  }
}

function* enterRoomSaga(channel: Channel, roomCode: string) {
  const id: string = yield select(selectId);
  const name: string = yield select(selectName);
  yield fork(connectToChannel, channel);
  yield channel.presence.enterClient(id, { name });
  yield put(joinRoomComplete(roomCode));
}

function* leaveRoomSaga(channel: Channel) {
  const id: string = yield select(selectId);
  channel.presence.leaveClient(id);
}
