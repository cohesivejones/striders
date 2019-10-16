import { Router } from 'express';
import * as controller from '../controllers';

const routes = () => {
  const router = Router();
  router.get('/', controller.all);
  router.post('/create', controller.create);
  router.delete('/:id/delete', controller.remove);
  return router;
}
export default routes;
