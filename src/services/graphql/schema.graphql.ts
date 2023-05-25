import { createSchema } from 'graphql-yoga';
import ProductsGraphQlController from '../../controllers/products/products.graphql.controller';
import UserFactory from '../../dao/cart.factory';

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
        return userFactory.getByCondition('_id', args._id)
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
      addProduct(req, res) {
        const product = productGraphQlController.append(req, res)
        return product
      }
    }
  }
})

export default schema;