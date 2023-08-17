import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { AuthenticatorScreenWrapper } from "./AuthenticatorScreenWrapper";
import {
  confirmSignUp,
  resendSignUpCode,
  AuthCodeDeliveryDetails,
} from "aws-amplify/auth";
import { handleSignUpStep } from "../../utils/helpers";

type ConfirmSignUpFormData = {
  username: string;
  confirmationCode: string;
};
export const ConfirmSignUpComponent = ({
  codeDeliveryDetails,
  username,
}: {
  codeDeliveryDetails?: AuthCodeDeliveryDetails;
  username: string;
}) => {
  const [data, setData] = useState<ConfirmSignUpFormData>({
    username,
    confirmationCode: "",
  });
  const [authCodeDeliveryDetails, setAuthCodeDeliveryDetails] = useState<
    AuthCodeDeliveryDetails | undefined
  >(codeDeliveryDetails);
  const { dispatch } = useAuthenticator();
  async function handleConfirmSignUp() {
    try {
      const { nextStep } = await confirmSignUp({
        username: data.username,
        confirmationCode: data.confirmationCode,
      });
      handleSignUpStep(nextStep, dispatch);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleResendSignUpCode() {
    try {
      const res = await resendSignUpCode({
        username: data.username,
      });
      setAuthCodeDeliveryDetails(res);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <AuthenticatorScreenWrapper width="280px">
      <FormControl>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          id="username"
          name="username"
          onChange={handleChange}
          value={data.username}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="username">Confirmation Code</InputLabel>
        <Input
          id="confirmationCode"
          name="confirmationCode"
          onChange={handleChange}
          value={data.confirmationCode}
        />
      </FormControl>
      <>
        {" "}
        {authCodeDeliveryDetails && (
          <Typography variant="caption">
            Your confirmation code was sent via{" "}
            {authCodeDeliveryDetails.deliveryMedium?.toLowerCase()}
          </Typography>
        )}{" "}
      </>

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          sx={{ background: "#f90", color: "white", fontSize: "0.8rem" }}
          variant="contained"
          onClick={() => handleConfirmSignUp()}
        >
          Confirm Sign Up
        </Button>
        <Button
          variant="text"
          onClick={() => dispatch({ type: "display-sign-in-component" })}
          sx={{ fontSize: "0.5rem" }}
        >
          Go back to sign in
        </Button>
      </Box>
      <Button
        sx={{ fontSize: "0.7rem" }}
        onClick={() => handleResendSignUpCode()}
      >
        resend confirmation code
      </Button>
    </AuthenticatorScreenWrapper>
  );
};
