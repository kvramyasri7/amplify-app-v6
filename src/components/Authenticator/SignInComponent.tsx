import React, { useState } from "react";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { signIn } from "aws-amplify/auth";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { AuthenticatorScreenWrapper } from "./AuthenticatorScreenWrapper";
import { handleSignInStep } from "../../utils/helpers";

type SignInFormData = {
  username: string;
  password: string;
};
export const SignInComponent = () => {
  const { dispatch } = useAuthenticator();

  const [{ username, password }, setData] = useState<SignInFormData>({
    username: "",
    password: "",
  });

  async function handleSignIn() {
    try {
      const { nextStep } = await signIn({
        username,
        password,
      });

      handleSignInStep(nextStep, dispatch, username);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <AuthenticatorScreenWrapper>
      <FormControl>
        <InputLabel htmlFor="username">Email address</InputLabel>
        <Input
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />
      </FormControl>

      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
          type="password"
        />
      </FormControl>
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button
          sx={{ background: "#f90", color: "white" }}
          variant="contained"
          onClick={handleSignIn}
        >
          Sign In
        </Button>

        <Button
          variant="text"
          onClick={() => dispatch({ type: "display-sign-up-component" })}
        >
          Sign up
        </Button>
      </Box>
    </AuthenticatorScreenWrapper>
  );
};
