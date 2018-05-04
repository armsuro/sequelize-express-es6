import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import Constants from './config/constants';
import busboy from 'connect-busboy';

const app = express();

// Helmet helps you secure your Express apps by setting various HTTP headers
// https://github.com/helmetjs/helmet
app.use(helmet());

// Enable CORS with various options
// https://github.com/expressjs/cors
app.use(cors());
app.use(busboy());

// Request logger
// https://github.com/expressjs/morgan
if (!Constants.envs.test) {
    app.use(morgan('dev'));
}

// Parse incoming request bodies
// https://github.com/expressjs/body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
// Lets you use HTTP verbs such as PUT or DELETE
// https://github.com/expressjs/method-override
app.use(methodOverride());

// Mount public routes
app.use('/public', express.static(`${__dirname}/public`));

// Mount API routes
app.use(Constants.apiPrefix, routes);

app.listen(Constants.port);

export default app;
