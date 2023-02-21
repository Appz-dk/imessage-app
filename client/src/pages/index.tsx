import { NextPageContext } from "next";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();
  console.log("session data", session);
  return (
    <div>
      {!session?.user && <button onClick={() => signIn("google")}>Sign In</button>}
      {session?.user && <button onClick={() => signOut()}>Sign Out</button>}
    </div>
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
