import express, { Request } from 'express';
import bodyParser from 'body-parser';
import routes from './routes'
import './config/mongo';

const APP_PORT = 4000;
const APP_NAME = "SPONSORS"

const app = express();
app.use(function(_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/sponsors', routes());

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
