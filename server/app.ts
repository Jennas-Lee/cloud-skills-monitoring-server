// @ts-ignore
import express from 'express';
// @ts-ignore
import cors from 'cors';

import api from './routers/apiController';

const app: express.Application = express();

app.set('port', process.env.PORT || 3001);

app.use(cors({
  origin: process.env.NODE_ENV == 'development' ? '*' : '', // TODO: CORS setting with domain
  credentials: true,
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log('Server is listening on port :', app.get('port'));
});

// @ts-ignore