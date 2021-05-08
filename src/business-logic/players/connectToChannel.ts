import { Channel } from "../../services/channel/Channel";
import { Player } from "../game";
import { Types } from "ably";
import { addOrUpdatePlayer, markPlayerOffline } from "./playersSlice";
import { call, put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";

export function* connectToChannel(channel: Channel) {
  const presence = eventChannel((emitter) => {
    const actions: Types.PresenceAction[] = ["enter", "present", "leave"];
    channel.presence.subscribe(actions, emitter);
    return () => channel.presence.unsubscribe(actions, emitter);
  });

  while (true) {
    const message: Types.PresenceMessage = yield take(presence);
    yield call(handleMessage, message);
  }
}

export function* handleMessage(message: Types.PresenceMessage) {
  if (["enter", "present"].includes(message.action)) {
    yield put(
      addOrUpdatePlayer(
        new Player({
          id: message.clientId,
          name: message.data.name,
          isOnline: true,
        })
      )
    );
  }
  if (["leave"].includes(message.action)) {
    yield put(markPlayerOffline(message.clientId));
  }
}
