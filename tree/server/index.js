const express = require('express')
const app = express()
const APP_PORT = 4000;
const APP_NAME = "TREE"

app.use('/', express.static('./dist', {
  index: "index.html"
}))

app.listen(APP_PORT, () => console.log(`${APP_NAME} listening on port ${APP_PORT}!`));
