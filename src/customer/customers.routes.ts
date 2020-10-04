import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CustomerController from './CustomerController';

const customersRouter = Router();

const customerController = new CustomerController();

customersRouter.post('/', customerController.create);
customersRouter.get(
  '/:customer_id',
  ensureAuthenticated,
  customerController.get,
);
customersRouter.put(
  '/:customer_id',
  ensureAuthenticated,
  customerController.put,
);
customersRouter.delete(
  '/:customer_id',
  ensureAuthenticated,
  customerController.delete,
);

export default customersRouter;
