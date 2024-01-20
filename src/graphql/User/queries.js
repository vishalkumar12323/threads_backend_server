import { gql } from "graphql-tag";
export const queries = `
    createToken(email: String! password: String!): String
    getCurrentLoggedInUser: User
`;
