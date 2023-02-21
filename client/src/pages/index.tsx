import { Inter } from "@next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session, status } = useSession();

  console.log("session data", session);
  return (
    <div>
      {!session?.user && <button onClick={() => signIn("google")}>Sign In</button>}
      {session?.user && <button onClick={() => signOut()}>Sign Out</button>}
    </div>
  );
}
