import { Router } from 'express';

import loginRouter from './login.routes';
import customerRouter from '../customer/customers.routes';
import favoritesRouter from '../favorite/favorites.routes';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/customers', customerRouter);
routes.use('/favorites', favoritesRouter);

export default routes;
