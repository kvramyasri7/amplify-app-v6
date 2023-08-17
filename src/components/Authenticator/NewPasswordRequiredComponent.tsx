import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import { useState } from "react";
import { confirmSignIn } from "aws-amplify/auth";
import React from "react";
import { handleSignInStep } from "../../utils/helpers";
import { useAuthenticator } from "../../hooks/useAuthenticator";

export const NewPasswordRequiredComponent = ({
  requiredAttributes,
}: {
  requiredAttributes: string[];
}) => {
  const [attributes, setAttributes] = useState<Record<string, string>>({});
  const [password, setPassword] = useState<string>("");
  const {dispatch} = useAuthenticator()
  async function handleConfirm() {
    try {
      const {nextStep} = await confirmSignIn({
        challengeResponse: password,
        options: {
          serviceOptions: {
            // @ts-ignore
            userAttributes: attributes,
          },
        },
      });
      handleSignInStep(nextStep, dispatch)
    } catch (error) {
      console.log(error);
    }
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;

    if (name === "password") return setPassword(value);
    setAttributes((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "350px",
        padding: 2,
        border: "1px solid gray",
        borderRadius: "8px",
      }}
    >
      <FormControl key="password">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
      </FormControl>
      {requiredAttributes &&
        requiredAttributes.map((attribute) => (
          <FormControl key={attribute}>
            <InputLabel htmlFor={attribute}>{attribute}</InputLabel>
            <Input
              id={attribute}
              name={attribute}
              onChange={handleChange}
              value={attributes[attribute]}
            />
          </FormControl>
        ))}

      <Button onClick={() => handleConfirm()}>Confirm</Button>
    </Box>
  );
};
