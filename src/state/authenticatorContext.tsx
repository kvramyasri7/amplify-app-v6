import React from "react";
import { AuthenticatiorAction, authenticatorReducer } from "./reducers";

type GetParams<T> = T extends (a: infer A, b: infer B) => any ? [A, B] : never;

export const AuthenticatorStateContext = React.createContext<
  GetParams<typeof authenticatorReducer>[0]
>({ component: "sign-in" });
export const DispatchAuthenticatorContext = React.createContext<
  React.Dispatch<AuthenticatiorAction>
>(null as any);


