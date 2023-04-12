const { createYoga } = require('graphql-yoga');
const schema = require('../services/graphql/schema.graphql');
const { useSofaWithSwaggerUI } = require('@graphql-yoga/plugin-sofa');

const graphqlLoader = async ( app ) => {
    app.use('/graphql', createYoga({ 
        schema,
        plugins: [
            useSofaWithSwaggerUI({
                basePath: '/rest',
                swaggerUIEndpoint: '/swagger',
                servers: [
                  {
                    url: '/', // Specify Server's URL.
                    description: 'Development server'
                  }
                ],
                info: {
                  title: 'Example API',
                  version: '1.0.0'
                }
              })
            ]
     }) )

    return app;
}

module.exports = graphqlLoader;