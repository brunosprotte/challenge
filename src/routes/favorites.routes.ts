import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CustomersRespository from '../repositories/CustomerRepository';
import FavoriteRepository from '../repositories/FavoriteRepository';
import FavoriteService from '../services/FavoriteService';

const customersRouter = Router();
const customersRespository = new CustomersRespository();
const favoriteRepository = new FavoriteRepository();

customersRouter.use(ensureAuthenticated);

customersRouter.post('/', (request, response) => {
  try {
    const customerId = request.customer.id;

    const { productId } = request.body;

    const favoriteService = new FavoriteService(
      customersRespository,
      favoriteRepository,
    );

    const favorite = favoriteService.create({ customerId, productId });

    return response.json(favorite);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default customersRouter;
