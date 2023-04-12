const { createHandler } = require('graphql-http');
const schema = require('../services/graphql/schema.graphql');

const graphqlLoader = async ( app ) => {
    app.use('/graphql', createHandler( {schema} ))

    return app;
}

module.exports = graphqlLoader;