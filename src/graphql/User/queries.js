export const queries = `#graphql
    Authentication(email: String!, password: String!): String
    getCurrentLoggedInUser: User
    allPost: [Post]
    updatePost(id: String!, title:String!, description: String!): [Post]
    deletePost(id: String): String
`;
