import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useAuthenticator } from "../../hooks/useAuthenticator";
import {  confirmSignIn } from "aws-amplify/auth";
import { handleSignInStep } from "../../utils/helpers";


export const SelectMFAComponent = () => {
  const [mfaType, setMfaType] = useState("SMS");

  const { dispatch } = useAuthenticator();

  async function handleChange(event: SelectChangeEvent) {
    const mfa = event.target.value 

    setMfaType(mfa);
  }

  async function handleSubmit() {
    try {
      const { nextStep } = await confirmSignIn({ challengeResponse:mfaType });

      handleSignInStep(nextStep, dispatch);
    } catch (error) {

        
        console.log({
          // @ts-ignore
          name: error.name,
          // @ts-ignore
          message: error.message,
          // @ts-ignore
          recovery: error.recoverySuggestion,
        });
      
    }
  }

  return (
    <Box>
      <Select
        id="auth-flow"
        value={mfaType}
        label="auth-flow"
        onChange={handleChange}
      >
        <MenuItem value={"SMS"}>{"SMS"}</MenuItem>
        <MenuItem value={"TOTP"}>{"TOTP"}</MenuItem>
      </Select>
      <Button onClick={() => handleSubmit()}>submit</Button>
    </Box>
  );
};
