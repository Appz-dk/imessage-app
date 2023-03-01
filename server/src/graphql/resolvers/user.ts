import { CreateUsernameResponse, GraphQLContext } from "../../utils/types"

const resolvers = {
  Query: {
    searchUsers: () => { }
  },
  Mutation: {
    createUsername: async (_: any, args: { username: string }, context: GraphQLContext): Promise<CreateUsernameResponse> => {
      const { username } = args
      const { prisma, session } = context
      // No user is logged in
      if (!session?.user) {
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