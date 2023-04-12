const { createSchema } = require('graphql-yoga');
const { ProductsFactory } = require('../../dao/factory');
const { UsersFactory } = require('../../dao/factory');

const productFactory = ProductsFactory.get("MEM");
const userFactory = UsersFactory.get("MEM");

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Product {
      id: ID!
      name: String!
      description: String
      price: Float!
      stock: Int!
    }
 
    type User {
      id: ID!
      fullName: String!
      username: String!
      address: String!
      age: Int!
      phone: String!
      avatar: String!
      cart: [Product!]!
      password: String!
      privileges: UserType!
    }

    enum UserType {
      ADMIN
      NORMAL
    }
 
    type Query {
      user(id: ID!): User
      users: [User!]
      product(id: ID!): Product
      products: [Product!]
    }
 
    type Mutation {
      addProduct(title: String!): Product
    }
 
    schema {
      query: Query
      mutation: Mutation
    }
  `,
  resolvers: {
    Query: {
      user(id) {
        return userFactory.getById(id)
      },
      users() {
        return userFactory.getAll()
      },
      product(id) {
        return productFactory.getById(id)
      },
      products() {
        return productFactory.getAll()
      }
    },
    Mutation: {
      addProduct(title) {
        const product = productFactory.save(title)
        return product
      }
    }
  }
})

module.exports = schema;