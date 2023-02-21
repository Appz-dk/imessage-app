import Auth from "@/components/Auth/Auth";
import Chat from "@/components/Chat/Chat";
import { Box } from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  // console.log("session data", session);
  return (
    <Box minHeight="100vh">
      {/* Chat component */}
      {session?.user.username && <Chat />}
      {/* Auth component */}
      {!session?.user.username && <Auth session={session} />}
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
