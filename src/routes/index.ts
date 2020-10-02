import { Router } from 'express';

import loginRouter from './login.routes';
import customerRouter from './customers.routes';
import favoritesRouter from './favorites.routes';

const routes = Router();

routes.use('/customers', loginRouter);
routes.use('/customers', customerRouter);
routes.use('/favorites', favoritesRouter);

export default routes;
