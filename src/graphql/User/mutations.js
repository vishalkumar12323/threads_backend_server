import { gql } from "graphql-tag";
export const mutations = `
    user:createUser(fristName: String!, lastName: String, email: String!, password: String!, salt: String): String
`;
