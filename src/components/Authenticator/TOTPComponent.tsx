import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { confirmSignIn } from "aws-amplify/auth";
import { handleSignInStep } from "../../utils/helpers";

export const TOTPComponent = () => {
  const [verificationCode, setVerificationCode] = useState<string>("");
const {dispatch} = useAuthenticator()
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVerificationCode(e.target.value);
  }

  async function handleVerify() {
    if (!verificationCode)
      return console.warn("verification code can't be empty");

    try {
      const {nextStep}= await confirmSignIn({ challengeResponse: verificationCode });
      handleSignInStep(nextStep, dispatch)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid #DCDCDC",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" component="h2">
        OTP CODE
      </Typography>

      <TextField value={verificationCode} onChange={handleChange} />
      <Button onClick={() => handleVerify()}>Verify</Button>
    </Box>
  );
};
