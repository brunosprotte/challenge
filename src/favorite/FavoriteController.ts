import { Request, Response } from 'express';

import FavoriteRepository from './FavoriteRepository';
import FavoriteService from './FavoriteService';

class FavoriteController {
  public async create(request: Request, response: Response): Promise<Response> {
    const favoriteRepository = new FavoriteRepository();

    const customer_id = request.customer.id;

    const { product_id } = request.params;

    const favoriteService = new FavoriteService(favoriteRepository);

    const favorite = await favoriteService.create({ customer_id, product_id });

    return response.json(favorite);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const favoriteRepository = new FavoriteRepository();

    const customer_id = request.customer.id;

    const favoriteService = new FavoriteService(favoriteRepository);

    const favorites = await favoriteService.get(customer_id);

    return response.json(favorites);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const favoriteRepository = new FavoriteRepository();
    const { product_id } = request.params;
    const customer_id = request.customer.id;

    const favoriteService = new FavoriteService(favoriteRepository);

    await favoriteService.delete({ customer_id, product_id });

    return response.status(204).json();
  }
}
export default FavoriteController;
