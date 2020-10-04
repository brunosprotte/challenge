import Favorite from '../model/Favorite';

import FavoriteRepository from './FavoriteRepository';
import ProductService from '../services/ProductService';

import AppError from '../errors/AppError';

interface IRequest {
  customer_id: string;
  product_id: string;
}

interface IProductDTO {
  id: string;
  image: string;
  price: number;
  title: string;
  reviewScore: number;
}

class FavoriteService {
  private productService = new ProductService();

  private favoriteRepository: FavoriteRepository;

  constructor(favoritesRepository: FavoriteRepository) {
    this.favoriteRepository = favoritesRepository;
  }

  public async create({
    customer_id,
    product_id,
  }: IRequest): Promise<Favorite> {
    const product = await this.productService.getByProductId(product_id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    const { id } = product;

    const favoriteAlreadyExists = await this.favoriteRepository.findByCustomerIdAndProductId(
      { customer_id, product_id },
    );

    if (favoriteAlreadyExists) {
      throw new AppError(
        `The product ${product.title} is alredy in your favorites!`,
        422,
      );
    }

    const favorite = await this.favoriteRepository.create({
      product_id: id,
      customer_id,
    });

    return favorite;
  }

  public async get(customer_id: string): Promise<IProductDTO[] | undefined> {
    const favorites = await this.favoriteRepository.getByCustomerId(
      customer_id,
    );

    const products = [];

    for (let i = 0; i < favorites?.length; i++) {
      const data = await this.productService.getByProductId(
        favorites[i].product_id,
      );
      if (!data) {
        throw new AppError(
          `Error reading data from product ${favorites[i].product_id}`,
        );
      }
      const { id, image, price, title, reviewScore } = data;
      products.push({ id, image, price, title, reviewScore });
    }

    return products;
  }

  public async delete({ customer_id, product_id }: IRequest): Promise<void> {
    const favorite = await this.favoriteRepository.findByCustomerIdAndProductId(
      {
        customer_id,
        product_id,
      },
    );

    if (!favorite) {
      throw new AppError(`Product not found`, 404);
    }
    await this.favoriteRepository.remove(favorite);
  }
}
export default FavoriteService;
