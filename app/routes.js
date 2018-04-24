import {
    Router,
} from 'express';

import errorHandler from './middleware/error-handler';
import fileController from './controllers/file.controller';
const routes = new Router();
// File
routes.post('/upload', fileController.upload);
routes.get('/download/:code', fileController.download);

routes.use(errorHandler);

export default routes;
