import { useContext } from "react";
import {
  AuthenticatorStateContext,
  DispatchAuthenticatorContext,
} from "../state/authenticatorContext";

export const useAuthenticator = () => {
  const state = useContext(AuthenticatorStateContext);
  const dispatch = useContext(DispatchAuthenticatorContext);
  return {
    state,
    dispatch,
  };
};
