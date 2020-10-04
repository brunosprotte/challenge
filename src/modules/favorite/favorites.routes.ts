import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import FavoriteController from './FavoriteController';

import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const favoritesRouter = Router();

const favoriteController = new FavoriteController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.post(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  favoriteController.create,
);
favoritesRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
      size: Joi.string().required(),
    },
  }),
  favoriteController.get,
);
favoritesRouter.delete(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  favoriteController.delete,
);

export default favoritesRouter;
