import { gql } from "apollo-server-core"

// GraphQL string
const typeDefs = gql`
  type SearchedUser {
    id: String
    username: String
  }

  # Query = Reading Data
  type Query {
    searchUsers(username: String): [SearchedUser]
  }
 
  # Mutation = Writing Data
  type Mutation {
    createUsername(username: String): CreateUsernameResponse
  }

  type CreateUsernameResponse {
    success: Boolean
    error: String
  }
`

export default typeDefs