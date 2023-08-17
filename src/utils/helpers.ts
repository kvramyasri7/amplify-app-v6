import {
  AuthSignUpStep,
  AuthSignInStep,
  AuthSignUpResult,
  AuthSignInResult,
} from "aws-amplify/auth";
import { AuthenticatiorAction } from "../state/reducers";

export function handleSignInStep(
  step: AuthSignInResult["nextStep"],
  dispatch: (value: AuthenticatiorAction) => void,
  username?: string
) {
  console.log(step);
  switch (step.signInStep) {
    case AuthSignInStep.CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE:
      return dispatch({ type: "display-custom-component" });
    case AuthSignInStep.CONTINUE_SIGN_IN_WITH_TOTP_SETUP:
      return dispatch({
        type: "display-setup-totp-component",
        value: step.totpSetupDetails,
      });
    case AuthSignInStep.CONFIRM_SIGN_IN_WITH_TOTP_CODE:
      return dispatch({ type: "display-totp-component" });
    case AuthSignInStep.CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED:
      return dispatch({
        type: "display-new-password-component",
        value: step.missingAttributes,
      });
    case AuthSignInStep.CONFIRM_SIGN_IN_WITH_SMS_CODE:
      return dispatch({ type: "display-sms-component" });
    case AuthSignInStep.CONTINUE_SIGN_IN_WITH_MFA_SELECTION:
      return dispatch({
        type: "display-select-mfa-component",
        value: step.allowedMFATypes,
      });
    case AuthSignInStep.CONFIRM_SIGN_UP:
      return dispatch({
        type: "display-confirm-sign-up-component",
        value: { username },
      });
    case AuthSignInStep.DONE:
      return dispatch({ type: "display-authenticated-component" });
  }
}

export function handleSignUpStep(
  step: AuthSignUpResult["nextStep"],
  dispatch: (value: AuthenticatiorAction) => void,
  username?: string
) {
  console.log(step);
  switch (step.signUpStep) {
    case AuthSignUpStep.CONFIRM_SIGN_UP:
      return dispatch({
        type: "display-confirm-sign-up-component",
        value: { codeDeliveryDetails: step.codeDeliveryDetails, username },
      });
    case AuthSignUpStep.DONE:
      return dispatch({ type: "display-sign-in-component" });
  }
}
