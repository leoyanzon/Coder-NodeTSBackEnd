import { Express } from 'express';
import { createYoga } from 'graphql-yoga';
import schema from '../services/graphql/schema.graphql';
import { useSofaWithSwaggerUI } from '@graphql-yoga/plugin-sofa';

const graphqlLoader = ( app : Express ) : Express => {
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

export default graphqlLoader;