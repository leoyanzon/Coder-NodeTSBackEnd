const { createSchema } = require('graphql-yoga');
const ProductsGraphQlController = require('../../controllers/products/products.graphql.controller')
const { UserFactory } = require('../../dao/factory');

const productGraphQlController = ProductsGraphQlController.getInstance();
const userFactory = UserFactory.getInstance();

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Product {
      _id: String!
      name: String!
      description: String
      price: Float!
      stock: Int!
    }
 
    type User {
      _id: String!
      fullName: String!
      username: String!
      address: String!
      age: Int!
      email: String!
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
      user(_id: String!): User
      users: [User!]
      product(_id: String!): Product
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
      user(parent,args,ctx,info) {
        return userFactory.getById(args._id)
      },
      users() {
        return userFactory.getAll()
      },
      product(parent,args,ctx,info) {
        return productGraphQlController.getById(args._id)
      },
      products() {
        return productGraphQlController.getAll()
      }
    },
    Mutation: {
      addProduct(title) {
        const product = productGraphQlController.append(title)
        return product
      }
    }
  }
})

module.exports = schema;