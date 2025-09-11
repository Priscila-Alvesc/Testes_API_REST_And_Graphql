const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    name: String!
    email: String!
  }
  type AuthPayload {
    user: User!
    token: String!
  }
  type CheckoutResult {
    userId: ID!
    valorFinal: Float!
    paymentMethod: String!
    freight: Float!
    items: [CheckoutItem!]!
  }
  type CheckoutItem {
    productId: Int!
    quantity: Int!
  }
  type Query {
    users: [User!]!
  }
  type Mutation {
    register(name: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): AuthPayload!
    checkout(items: [CheckoutItemInput!]!, freight: Float!, paymentMethod: String!, cardData: CardDataInput): CheckoutResult!
  }
  input CheckoutItemInput {
    productId: Int!
    quantity: Int!
  }
  input CardDataInput {
    number: String!
    name: String!
    expiry: String!
    cvv: String!
  }
`;
