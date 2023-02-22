import UserOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Center, Stack } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import CreateUsername from "./CreateUsername";
import SignIn from "./SignIn";

type AuthProps = {
  session: Session | null;
  reloadSession: () => void;
};

const Auth: React.FC<AuthProps> = ({ session }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { loading, error, data }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    try {
      // createUsername mutation
      await createUsername({ variables: { username } });
    } catch (error) {
      console.log("onSubmit error", error);
      // TODO: Show UI error component
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={5}>
        {/* Sign in */}
        {!session?.user && <SignIn signIn={signIn} />}
        {/* Create username */}
        {session?.user && (
          <CreateUsername username={username} setUsername={setUsername} onSubmit={onSubmit} />
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
