import {
    Router,
} from 'express';

import errorHandler from './middleware/error-handler';
const routes = new Router();
// Users
routes.get('/test', (req, res) => {
    res.json(true);
});

routes.use(errorHandler);

export default routes;
