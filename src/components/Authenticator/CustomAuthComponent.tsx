import React, { useState } from "react";
import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { confirmSignIn } from "aws-amplify/auth";
import { handleSignInStep } from "../../utils/helpers";

export const CustomAuthComponent = () => {
  const [challengeResponse, setChallengeResponse] = useState("");
  const { dispatch } = useAuthenticator();
  async function handleCustomeAuthChallenge() {
    try {
      const { nextStep } = await confirmSignIn({ challengeResponse });
      handleSignInStep(nextStep, dispatch);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setChallengeResponse(value);
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "300px",
        padding: 2,
        border: "1px solid gray",
        borderRadius: "8px",
      }}
    >
      <FormControl>
        <InputLabel htmlFor="challenge">Auth Challenge</InputLabel>
        <Input
          id="challenge"
          name="challenge"
          onChange={handleChange}
          value={challengeResponse}
        />
      </FormControl>

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Button variant="contained" onClick={handleCustomeAuthChallenge}>
          send challenge
        </Button>
      </Box>
    </Box>
  );
};
