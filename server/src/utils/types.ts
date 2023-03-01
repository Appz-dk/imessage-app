import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient
  // pubsub
}

/**
 * Users types
 */
export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}