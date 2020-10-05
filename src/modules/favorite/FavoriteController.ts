import { Request, Response } from 'express';
import ProductService from 'modules/product/ProductService';

import FavoriteRepository from './FavoriteRepository';
import FavoriteService from './FavoriteService';

class FavoriteController {
  public async create(request: Request, response: Response): Promise<Response> {
    const favoriteRepository = new FavoriteRepository();
    const productService = new ProductService();

    const customer_id = request.customer.id;

    const { product_id } = request.params;

    const favoriteService = new FavoriteService(
      favoriteRepository,
      productService,
    );

    const favorite = await favoriteService.create({ customer_id, product_id });

    return response.json(favorite).status(201);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const favoriteRepository = new FavoriteRepository();
    const productService = new ProductService();

    const customer_id = request.customer.id;

    let { page = 1, size = 25 } = request?.query;

    page = +page || 1;
    size = +size || 25;

    const favoriteService = new FavoriteService(
      favoriteRepository,
      productService,
    );

    const favorites = await favoriteService.get(customer_id, { page, size });

    return response.json(favorites);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const favoriteRepository = new FavoriteRepository();
    const productService = new ProductService();

    const { product_id } = request.params;
    const customer_id = request.customer.id;

    const favoriteService = new FavoriteService(
      favoriteRepository,
      productService,
    );

    await favoriteService.delete({ customer_id, product_id });

    return response.status(204).json();
  }
}
export default FavoriteController;
