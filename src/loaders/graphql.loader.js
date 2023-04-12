const { createYoga } = require('graphql-yoga');
const schema = require('../services/graphql/schema.graphql');

const graphqlLoader = async ( app ) => {
    app.use('/graphql', createYoga({ schema }) )

    return app;
}

module.exports = graphqlLoader;