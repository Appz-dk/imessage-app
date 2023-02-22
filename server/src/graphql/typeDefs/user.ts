import { gql } from "apollo-server-core"

// GraphQL string
const typeDefs = gql`
  type User {
    id: String
    username: String
  }

  # Query = Reading Data
  type Query {
    searchUsers(username: String): [User]
  }

  # Mutation = Writing Data
  type Mutation {
    createUsername(username: string): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`

export default typeDefs