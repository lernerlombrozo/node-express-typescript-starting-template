import path from 'path';
import fs from 'fs';
import https from 'https';

import express from 'express';
import { json } from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { get404, get500 } from './controllers/error';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

app.use(helmet()); // sets secure headers
app.use(compression()); // sets secure headers // hosting provider usually manages compression
app.use(morgan('combined', { stream: accessLogStream })); // logging // hosting provider usually manages logging
app.use(express.static(path.join(__dirname, 'public')));

app.use('/505', get500);

app.use(get404);

const appPort = process.env.PORT || 3000;
if (process.env.USE_SSL_PROTECTION) {
  // hosting provider usually manages SSL
  // generate the following files with openssl req -nodes -new -x509 -keyout server.key -out server.cert
  const privateKey = fs.readFileSync('server.key');
  const certificate = fs.readFileSync('server.cert');
  https.createServer({ key: privateKey, cert: certificate }).listen(appPort);
  console.log(`app listnening on https://localhost:${appPort}`);
} else {
  app.listen(appPort);
  console.log(`app listnening on http://localhost:${appPort}`);
}
