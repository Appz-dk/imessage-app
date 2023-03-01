import "next-auth"

declare module "next-auth" {
  interface User {
    id: string,
    username: string,
    emailVerified: boolean,
  }

  interface Session {
    user: User
  }
}
