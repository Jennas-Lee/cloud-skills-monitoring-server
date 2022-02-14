import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { localPassportReady } from './src/passport/local';
import { jwtPassportReady } from './src/passport/jwt';

import sequelize from './src/models';
import migrate from './src/config/migration';

import options from './src/config/swagger';

import api from './src/routers/apiController';

interface ErrorWithStatus extends Error {
  status: number;
}

const app: express.Application = express();
const specs: object = swaggerJSDoc(options);
const NODE_ENV: string = process.env.NODE_ENV || 'development';
const COOKIE_SIGNATURE_KEY: string = process.env.EXPRESS_APP_COOKIE_SIGNITURE_KEY || 'cookie-signature-key';

app.set('port', process.env.PORT || 3001);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIE_SIGNATURE_KEY))
app.use(cors({
  credentials: true,
  exposedHeaders: ['Authorization'],
  origin: NODE_ENV === 'development' ? true : '', // TODO: CORS setting with domain

}));
app.use(morgan(NODE_ENV == 'development' ? 'dev' : 'combined'));
app.use(passport.initialize());

localPassportReady();
jwtPassportReady();

app.use('/api', api);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  let err = new Error() as ErrorWithStatus;
  err.status = 404;
  next(err);
});

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  res.locals.error = NODE_ENV === 'development' ? err : {};
  res.status(err.status || 500).send();
  next();
});

app.listen(app.get('port'), async () => {
  console.log('Server is listening on port :', app.get('port'));

  await sequelize.authenticate()
    .then(async () => {
      console.log('Database Connection Successful!');
      await migrate;
    })
    .catch((error: any) => {
      console.error('Database Connection Failed!', error);
    });
});
