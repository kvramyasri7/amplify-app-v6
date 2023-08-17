import { Box, Button, TextField, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import { useState } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import { confirmSignIn } from "aws-amplify/auth";
import { handleSignInStep } from "../../utils/helpers";

export const SetupTOTPComponent = ({
  setupDetails,
}: {
  setupDetails: {
    sharedSecret: string;
    getSetupUri: (appName: string, accountName?: string) => URL;
  };
}) => {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const { dispatch } = useAuthenticator();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setVerificationCode(e.target.value);
  }

  const link = setupDetails.getSetupUri("demo-app");

  async function handleVerify() {
    if (!verificationCode)
      return console.warn("verification code can't be empty");

    try {
      const { nextStep } = await confirmSignIn({
        challengeResponse: verificationCode,
      });
      handleSignInStep(nextStep, dispatch);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Box>
      <Box
        sx={{
          padding: 2,
          border: "1px solid #DCDCDC",
          borderRadius: 2,
          display: setupDetails.sharedSecret ? "flex" : "none",
          flexDirection: "column",
          gap: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography >
          Please scan this QR code with your authenticator app
        </Typography>
        
        {/* 
        show QR code and verify button as long as 
        the secretCode is not null 
       */}
        {<QRCode value={link.href} />}
        <TextField value={verificationCode} onChange={handleChange} />
        {<Button onClick={() => handleVerify()}>Verify</Button>}
      </Box>
    </Box>
  );
};
