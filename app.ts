import express, { Express } from 'express';
const app : Express = express();

import indexLoader from './src/loaders/index.loaders';

async function initLoaders(){
    await indexLoader( app );
}
initLoaders();

export default app;