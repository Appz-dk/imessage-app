const resolvers = {
  Query: {
    searchUsers: () => { }
  },
  Mutation: {
    createUsername: (_: any, args: { username: string }, context: any) => {
      const { username } = args
    }
  },
  // Subscription: {}
}

export default resolvers