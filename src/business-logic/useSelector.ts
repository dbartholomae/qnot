import {
  TypedUseSelectorHook,
  useSelector as useUntypedSelector,
} from "react-redux";
import { RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useUntypedSelector;
