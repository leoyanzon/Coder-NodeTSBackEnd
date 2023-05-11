const Router = require('../routes/index');

const routerLoader = async ( app ) => {
    const router = Router.getInstance();
    app.use("/", router);

    return app;
}

module.exports = routerLoader;
