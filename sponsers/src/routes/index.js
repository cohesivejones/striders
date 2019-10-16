const express = require('express');
const controller = require('../controllers');

const routes = () => {
  const router = express.Router();
  router.get('/', controller.all);
  router.post('/create', controller.create);
  router.delete('/:id/delete', controller.delete);
  return router;
}

module.exports = routes;
