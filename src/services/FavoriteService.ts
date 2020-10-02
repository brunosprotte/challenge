import Favorite from '../model/Favorite';

import CustomersRepository from '../repositories/CustomerRepository';
import FavoriteRepository from '../repositories/FavoriteRepository';
import ProductService from './ProductService';

interface Request {
  customerId: string;
  productId: string;
}

class FavoriteService {
  private productService = new ProductService();

  private customersRepository: CustomersRepository;
  private favoriteRepository: FavoriteRepository;

  constructor(
    customersRepository: CustomersRepository,
    favoritesRepository: FavoriteRepository,
  ) {
    this.customersRepository = customersRepository;
    this.favoriteRepository = favoritesRepository;
  }

  public async create({
    customerId,
    productId,
  }: Request): Promise<void | Favorite> {
    const product = await this.productService.getByProductId(productId);

    if (!product) {
      throw Error('Product not found!');
    }

    const { id, image, title, price } = product;

    const favorite = this.favoriteRepository.create({
      productId: id,
      customerId,
      image,
      title,
      price,
    });

    return favorite;
  }
}
export default FavoriteService;
