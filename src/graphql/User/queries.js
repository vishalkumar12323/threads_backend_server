export const queries = `#graphql
    Token:createToken(email: String! password: String!): String
    user:getCurrentLoggedInUser: User
`;
