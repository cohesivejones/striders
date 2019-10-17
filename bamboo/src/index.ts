import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';

const APP_PORT = 4000;
const APP_NAME = "BAMBOO"
const APP_VERSION = "1.0.0"
const appInfo = { appName: APP_NAME, version: APP_VERSION };
const app = express();

interface Employee {
  id: string
  firstName: string
  lastName: string
  jobTitle: string
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (_req: Request, res: Response, next: NextFunction) => {
  res.send(appInfo);
  return next();
});

const getBambooStaff = () => axios.get(
  `https://${process.env.BAMBOO_API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.BAMBOO_SUBDOMAIN}/v1/employees/directory`,
  { headers: { 'Accept': 'application/json' } }
);

const transform = ({employees}: {employees: Employee[]}) => employees.map(({id, firstName, lastName, jobTitle}) => ({id, firstName, lastName, jobTitle}))

app.get('/people', (_req, res, next) => {
  getBambooStaff().then((staff) => {
    res.send(
      transform(staff.data)
    );
    next();
  }).catch(error => {
    next(error);
  });
});

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
