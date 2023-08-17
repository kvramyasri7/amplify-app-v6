import { useCallback, useReducer, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import {
  AuthenticatorStateContext,
  DispatchAuthenticatorContext,
} from "../state/authenticatorContext";
import {
  SMSComponent,
  SetupTOTPComponent,
  SelectMFAComponent,
  TOTPComponent,
  SignInComponent,
  SignUpComponent,
  CustomAuthComponent,
  NewPasswordRequiredComponent,
} from "../components/Authenticator";
import { authenticatorReducer } from "../state/reducers";
import { ConfirmSignUpComponent } from "../components/Authenticator/ConfirmSignUp";
import { fetchAuthSession } from "aws-amplify/auth";

export const Authenticator = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(authenticatorReducer, {
    component: "sign-in",
  });

  useEffect(() => {
    async function getSession() {
      try {
        const session = await fetchAuthSession({ forceRefresh: false });
        if (session) {
          dispatch({ type: "display-authenticated-component" });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "display-sign-in-component" });
      }
    }
    getSession();
  }, []);
  const getAuthenticatorChild = useCallback(
    (authenticatorState: typeof state): JSX.Element => {
      switch (authenticatorState.component) {
        case "authenticated":
          return children;
        case "sign-in":
          return <SignInComponent />;
        case "select-mfa":
          return <SelectMFAComponent />;
        case "sign-up":
          return <SignUpComponent />;
        case "sms":
          return <SMSComponent />;
        case "setup-totp":
          return <SetupTOTPComponent setupDetails={authenticatorState.props} />;
        case "totp":
          return <TOTPComponent />;
        case "custom":
          return <CustomAuthComponent />;
        case "new-password":
          return (
            <NewPasswordRequiredComponent
              requiredAttributes={authenticatorState.props}
            />
          );
        case "confirm-sign-up":
          return (
            <ConfirmSignUpComponent
              codeDeliveryDetails={
                authenticatorState?.props?.codeDeliveryDetails
              }
              username={authenticatorState?.props?.username ?? ""}
            />
          );
        default:
          return <CircularProgress />;
      }
    },
    []
  );
  return (
    <AuthenticatorStateContext.Provider value={state}>
      <DispatchAuthenticatorContext.Provider value={dispatch}>
        {getAuthenticatorChild(state)}
      </DispatchAuthenticatorContext.Provider>
    </AuthenticatorStateContext.Provider>
  );
};
