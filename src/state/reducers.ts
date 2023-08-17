import { AuthCodeDeliveryDetails } from "aws-amplify/auth";

export type AuthenticatorComponent =
  | { component: "sign-in"; props?: any }
  | { component: "sign-up"; props?: any }
  | {
      component: "confirm-sign-up";
      props?: {
        codeDeliveryDetails?: AuthCodeDeliveryDetails;
        username?: string;
      };
    }
  | { component: "sms"; props?: any }
  | { component: "totp"; props?: any }
  | { component: "setup-totp"; props?: any }
  | { component: "select-mfa"; props?: any }
  | { component: "custom"; props?: any }
  | { component: "new-password"; props?: any }
  | { component: "authenticated" };

export type AuthenticatorState = AuthenticatorComponent;
export type AuthenticatiorAction =
  | { type: "display-sign-in-component"; value?: any }
  | {
      type: "display-sign-up-component";
      value?: any;
    }
  | {
      type: "display-confirm-sign-up-component";
      value?: {
        codeDeliveryDetails?: AuthCodeDeliveryDetails;
        username?: string;
      };
    }
  | { type: "display-select-mfa-component"; value?: any }
  | { type: "display-totp-component"; value?: any }
  | { type: "display-sms-component"; value?: any }
  | { type: "display-setup-totp-component"; value?: any }
  | { type: "display-custom-component"; value?: any }
  | { type: "display-new-password-component"; value?: any }
  | { type: "display-authenticated-component" };
type Reducer<State, Action> = (state: State, action: Action) => State;

export const authenticatorReducer: Reducer<
  AuthenticatorState,
  AuthenticatiorAction
> = (state, action) => {
  switch (action.type) {
    case "display-confirm-sign-up-component":
      return { component: "confirm-sign-up", props: action.value };
    case "display-select-mfa-component":
      return { component: "select-mfa", props: action.value };
    case "display-sign-up-component":
      return { component: "sign-up", props: action.value };
    case "display-sms-component":
      return { component: "sms", props: action.value };
    case "display-setup-totp-component":
      return { component: "setup-totp", props: action.value };
    case "display-authenticated-component":
      return { component: "authenticated" };
    case "display-custom-component":
      return { component: "custom", props: action.value };
    case "display-new-password-component":
      return { component: "new-password", props: action.value };
    case "display-sign-in-component":
      return { component: "sign-in" };
    case "display-totp-component":
      return { component: "totp", props: action.value };
    default:
      return state;
  }
};
