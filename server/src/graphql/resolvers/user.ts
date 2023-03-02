import { User } from "@prisma/client"
import { ApolloError } from "apollo-server-core"
import { CreateUsernameResponse, GraphQLContext } from "../../utils/types"

const resolvers = {
  Query: {
    searchUsers: async (_: any, args: { username: string }, context: GraphQLContext): Promise<Array<User> | void> => {
      const { username: searchedUsername } = args
      const { prisma, session } = context

      // No user is logged in
      if (!session?.user) {
        // One way of error handling (alternative in createUsername)
        throw new ApolloError("Not authorized")
      }

      const { username: loggedInUsername } = session.user

      try {
        const users = await prisma.user.findMany({
          where: {
            username: {
              contains: searchedUsername,
              not: loggedInUsername,
              mode: "insensitive"
            }
          },
        })

        return users
      } catch (error) {
        console.log("searchUsers Error", error)
        if (error instanceof Error) {
          throw new ApolloError(error.message)
        }
      }
    }
  },
  Mutation: {
    createUsername: async (_: any, args: { username: string }, context: GraphQLContext): Promise<CreateUsernameResponse> => {
      const { username } = args
      const { prisma, session } = context
      // No user is logged in
      if (!session?.user) {
        // Alternative way of error handling
        return {
          error: "Unauthorized"
        }
      }

      const { id } = session.user

      try {
        // Check if username already exists
        const existingUsername = await prisma.user.findUnique({
          where: {
            username
          }
        })

        if (existingUsername) {
          return {
            error: "Username already taken. Try another one"
          }
        }

        // Update username for logged in user
        await prisma.user.update({
          where: {
            id,
          },
          data: {
            username
          }
        })

        return { success: true }
      } catch (error: unknown) {
        console.log("createUsername Error", error)
        if (error instanceof Error) {
          return {
            error: error.message
          }
        } else {
          return {
            error: "Error during createUsername"
          }
        }
      }

    }
  },
  // Subscription: {}
}

export default resolvers