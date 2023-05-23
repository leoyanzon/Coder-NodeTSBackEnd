import RouterClass from '../routes/index';
import { Router, Express } from 'express';

const routerLoader = async ( app : Express ) : Promise<Express> => {
    const router : Router = RouterClass.getInstance();
    app.use("/", router);
    return app;
}

export default routerLoader;
