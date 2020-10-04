import Favorite from '../../model/Favorite';

import IFavoriteRepository from './IFavoriteRepository';

import FavoriteRepository from './FavoriteRepository';
import ProductService from '../product/ProductService';
import IProductService from '../product/IProductService';

import AppError from '../../errors/AppError';

import IPaginatedFavorites from './dto/IPaginatedFavorites';
import IFindFavoriteDTO from './dto/IFindFavoriteDTO';

import IPage from './dto/IPageDTO';

interface IRequest {
  product_id: string;
  customer_id: string;
}

class FavoriteService {
  private productService: ProductService;

  private favoriteRepository: FavoriteRepository;

  constructor(
    favoritesRepository: IFavoriteRepository,
    productService: IProductService,
  ) {
    this.favoriteRepository = favoritesRepository;
    this.productService = productService;
  }

  public async create({
    customer_id,
    product_id,
  }: IRequest): Promise<Favorite> {
    const product = await this.productService.getByProductId(product_id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    const { id, image, price, title, reviewScore } = product;

    const favoriteAlreadyExists = await this.favoriteRepository.findByCustomerIdAndProductId(
      {
        customer_id,
        product_id,
      },
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
      image,
      price,
      title,
      review_score: reviewScore,
    });

    return favorite;
  }

  public async get(
    customer_id: string,
    { page, size }: IPage,
  ): Promise<IPaginatedFavorites | undefined> {
    const favorites = await this.favoriteRepository.getByCustomerId(
      customer_id,
      { page, size },
    );

    return favorites;
  }

  public async delete({
    customer_id,
    product_id,
  }: IFindFavoriteDTO): Promise<void> {
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
