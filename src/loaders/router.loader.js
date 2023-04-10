const Router = require('../routes/index');
const router = new Router();

const routerLoader = async ( app ) => {
    app.use("/", router);

    return app;
}

module.exports = routerLoader;
