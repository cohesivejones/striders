const express = require('express')
const axios = require('axios')

const APP_PORT = 4000;
const APP_NAME = "BAMBOO"
const APP_VERSION = "1.0.0"
const appInfo = { appName: APP_NAME, version: APP_VERSION };
const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res, next) => {
  res.send(appInfo);
  return next();
});

const getBambooStaff = () => axios.get(
  `https://${process.env.BAMBOO_API_KEY}:x@api.bamboohr.com/api/gateway.php/${process.env.BAMBOO_SUBDOMAIN}/v1/employees/directory`,
  { headers: { 'Accept': 'application/json' } }
);

const transform = ({employees}) => employees.map(({id, firstName, lastName}) => ({id, firstName, lastName}))

app.get('/people', (req, res, next) => {
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
