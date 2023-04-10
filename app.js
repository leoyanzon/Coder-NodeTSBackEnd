const express = require('express');
const app = express();

const indexLoader = require('./src/loaders/index.loaders');

async function initLoaders(){
    await indexLoader( app );
}
initLoaders();

module.exports = app;