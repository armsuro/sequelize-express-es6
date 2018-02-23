import { Router } from 'express';

import AuthController from './controllers/auth.controller';
import UsersController from './controllers/users.controller';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';

const routes = new Router();

// Authentication
routes.post('/auth/login', AuthController.login);

// Users
routes.post('/users', UsersController.create);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);

routes.use(errorHandler);

export default routes;
