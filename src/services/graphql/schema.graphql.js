const { createSchema } = require('graphql-yoga');

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      productos: String
    }
  `,
  resolvers: {
    Query: {
      hello: () => 'world'
    }
  }
})

module.exports = schema