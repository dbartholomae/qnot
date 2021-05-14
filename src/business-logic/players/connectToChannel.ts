import { Channel } from "../../services/channel/Channel";
import { Player } from "../game";
import { Types } from "ably";
import { addOrUpdatePlayer, markPlayerOffline } from "./playersSlice";
import { all, call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { Action } from "@reduxjs/toolkit";
import { selectId } from "../me/meSlice";

function* presenceSaga(channel: Channel) {
  const presence = eventChannel((emitter) => {
    const actions: Types.PresenceAction[] = ["enter", "present", "leave"];
    channel.presence.subscribe(actions, emitter);
    return () => channel.presence.unsubscribe(actions, emitter);
  });

  while (true) {
    const message: Types.PresenceMessage = yield take(presence);
    yield call(handlePresenceMessage, message);
  }
}

function* receivingEventsSaga(channel: Channel) {
  const events = eventChannel((emitter) => {
    channel.subscribe(emitter);
    return () => channel.unsubscribe(emitter);
  });

  while (true) {
    const message: Types.Message = yield take(events);
    yield call(handleEvent, message);
  }
}

export function* connectToChannel(channel: Channel) {
  yield all([
    receivingEventsSaga(channel),
    presenceSaga(channel),
    sendingEventsSaga(channel),
  ]);
}

export function* handleAction(
  action: Action<any> & { received?: boolean },
  channel: Channel
) {
  if (!action.received) {
    channel.publish({
      name: "gameEvent",
      data: action,
    });
  }
}

export function* sendingEventsSaga(channel: Channel) {
  while (true) {
    const action: Action & { received?: boolean } = yield take();
    yield handleAction(action, channel);
  }
}

export function* handlePresenceMessage(message: Types.PresenceMessage) {
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

export function* handleEvent(event: Types.Message) {
  const myId: string = yield select(selectId);
  if (event.data?.meta?.clientId !== myId) {
    yield put({ ...event.data, received: true });
  }
}
