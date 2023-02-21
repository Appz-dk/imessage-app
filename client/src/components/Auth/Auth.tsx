import { Center } from "@chakra-ui/react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";
import SignIn from "./SignIn";

type AuthProps = {
  session: Session | null;
  // reloadSession: () => void
};

// Sign in
// Add custom username
const Auth: React.FC<AuthProps> = ({ session }) => {
  return (
    <Center height="100vh" border="1px solid green">
      {/* Sign in */}
      {!session?.user && <SignIn signIn={signIn} />}
      {/* Create username */}
      {/* {session?.user && <CreateUsername />} */}
    </Center>
  );
};

export default Auth;
