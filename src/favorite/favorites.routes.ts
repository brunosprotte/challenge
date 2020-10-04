import { Router } from 'express';

import FavoriteController from './FavoriteController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const favoritesRouter = Router();

const favoriteController = new FavoriteController();

favoritesRouter.use(ensureAuthenticated);

favoritesRouter.post('/:product_id', favoriteController.create);
favoritesRouter.get('/', favoriteController.get);
favoritesRouter.delete('/:product_id', favoriteController.delete);

export default favoritesRouter;
