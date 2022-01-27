import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import passport from 'passport';

import passportReady from './passport/index';

import sequelize from './models';
import migrate from './config/migration';

import api from './routers/apiController';

interface ErrorWithStatus extends Error {
  status: number;
}

const app: express.Application = express();
const NODE_ENV: string = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3001);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: NODE_ENV == 'development' ? 'http://localhost:3000' : '', // TODO: CORS setting with domain
  credentials: true,
}));
app.use(morgan(NODE_ENV == 'development' ? 'dev' : 'combined'));
app.use(passport.initialize());

passportReady();

app.use('/api', api);

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
    .catch((error) => {
      console.error('Database Connection Failed!', error);
    });
});
