import { Router } from 'express';

import customerRouter from './customers.routes';

const routes = Router();

routes.use('/customers', customerRouter);

export default routes;
