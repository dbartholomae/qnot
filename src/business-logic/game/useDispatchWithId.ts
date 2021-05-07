import { Player } from "./Player";
import { PayloadAction } from "@reduxjs/toolkit";
import { useId } from "../me/useId";
import { useDispatch } from "../useDispatch";

export function useDispatchWithId<Value>(
  actionCreator: (id: Player["id"], value: Value) => PayloadAction<unknown>
) {
  const id = useId();
  const dispatch = useDispatch();

  function dispatchAction(value: Value) {
    dispatch(actionCreator(id, value));
  }

  return dispatchAction;
}
