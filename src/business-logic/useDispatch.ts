import { useDispatch as useUntypedDispatch } from "react-redux";
import { Store } from "./store";

export const useDispatch = () => useUntypedDispatch<Store["dispatch"]>();
