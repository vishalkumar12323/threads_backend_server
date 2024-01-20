import { gql } from "graphql-tag";
export const mutations = gql`
  #graphql
  mutation CreateUser(
    $fristName: String!
    $lastName: String
    $email: String!
    $password: String!
    $salt: String
  ) {
    createUser(
      fristName: $fristName
      lastName: $lastName
      email: $email
      password: $password
      salt: $salt
    ) {
      fristName
      email
    }
  }
  mutation CreatePost($title: String!, $description: String!) {
    createPost(title: $title, description: $description) {
      title
      description
    }
  }
`;
