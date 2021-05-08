import { call, fork, getContext, select, take } from "redux-saga/effects";
import { selectId, selectName } from "../me/meSlice";
import { ChannelCreator } from "../../services/channel/ChannelCreator";
import { joinRoom, leaveRoom } from "./gameSlice";
import { Channel } from "../../services/channel/Channel";
import { connectToChannel } from "../players/connectToChannel";

export function* gameSaga() {
  yield call(presenceSaga);
}

function* presenceSaga() {
  while (true) {
    const { payload: roomCode } = yield take(joinRoom);
    const createChannel: ChannelCreator = yield getContext("createChannel");
    const channel = createChannel(roomCode);
    yield fork(enterRoomSaga, channel);
    yield take(leaveRoom);
    yield fork(leaveRoomSaga, channel);
  }
}

function* enterRoomSaga(channel: Channel) {
  const id: string = yield select(selectId);
  const name: string = yield select(selectName);
  yield fork(connectToChannel, channel);
  channel.presence.enterClient(id, { name });
}

function* leaveRoomSaga(channel: Channel) {
  const id: string = yield select(selectId);
  channel.presence.leaveClient(id);
}
