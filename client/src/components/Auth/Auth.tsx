import UserOperations from "@/graphql/operations/user";
import { CreateUsernameData, CreateUsernameVariables } from "@/utils/types";
import { useMutation } from "@apollo/client";
import { Center, Stack } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import CreateUsername from "./CreateUsername";
import SignIn from "./SignIn";

type AuthProps = {
  session: Session | null;
  reloadSession: () => void;
};

const Auth: React.FC<AuthProps> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(UserOperations.Mutations.createUsername);

  const onSubmit = async () => {
    try {
      // createUsername mutation
      const { data } = await createUsername({ variables: { username } });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        throw new Error(data.createUsername.error);
      }

      if (data?.createUsername.success) {
        // Reload session to hold the newly created username
        reloadSession();
      }

      toast.success("Successfully created username! 🚀");
    } catch (error: any) {
      console.log("onSubmit error", error);
      toast.error(error instanceof Error ? error.message : "An error occurred. Please try again");
    }
  };

  return (
    <Center height="100vh">
      <Stack align="center" spacing={5}>
        {/* Sign in */}
        {!session?.user && <SignIn signIn={signIn} />}
        {/* Create username */}
        {session?.user && (
          <CreateUsername
            username={username}
            setUsername={setUsername}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </Stack>
    </Center>
  );
};

export default Auth;
