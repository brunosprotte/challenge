import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import CustomerController from './CustomerController';

const customersRouter = Router();

const customerController = new CustomerController();

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
);
customersRouter.get(
  '/:customer_id',
  celebrate({
    [Segments.PARAMS]: {
      customer_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  customerController.get,
);
customersRouter.put(
  '/:customer_id',
  celebrate({
    [Segments.PARAMS]: {
      customer_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  ensureAuthenticated,
  customerController.put,
);
customersRouter.delete(
  '/:customer_id',
  celebrate({
    [Segments.PARAMS]: {
      customer_id: Joi.string().uuid().required(),
    },
  }),
  ensureAuthenticated,
  customerController.delete,
);

export default customersRouter;
