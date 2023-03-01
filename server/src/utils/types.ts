import { Session } from "next-auth";

export interface GraphQLContext {
  session: Session | null;
  // Prisma client
  // pubsub
}