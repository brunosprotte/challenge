import { getRepository } from 'typeorm';

import Favorite from '../../model/Favorite';

import IFavoriteDTO from './dto/IFavoriteDTO';
import IFindFavoriteDTO from './dto/IFindFavoriteDTO';
import IPaginatedFavorites from './dto/IPaginatedFavorites';

import IPage from './dto/IPageDTO';

class FavoriteRepository {
  public async create({
    product_id,
    customer_id,
    image,
    price,
    title,
    review_score,
  }: IFavoriteDTO): Promise<Favorite> {
    const favoriteRepository = getRepository(Favorite);
    const favorite = favoriteRepository.create({
      product_id,
      customer_id,
      image,
      price,
      title,
      review_score,
    });

    await favoriteRepository.save(favorite);

    return favorite;
  }

  public async findByCustomerIdAndProductId({
    customer_id,
    product_id,
  }: IFindFavoriteDTO): Promise<Favorite | undefined> {
    const favoriteRepository = getRepository(Favorite);
    const favorite = await favoriteRepository.findOne({
      where: { customer_id, product_id },
    });
    return favorite;
  }

  public async getByCustomerId(
    customer_id: string,
    { page, size }: IPage,
  ): Promise<IPaginatedFavorites | undefined> {
    const favoriteRepository = getRepository(Favorite);
    const [favorites, total] = await favoriteRepository.findAndCount({
      where: {
        customer_id,
      },
      order: {
        title: 'ASC',
      },
      take: size,
      skip: (page - 1) * size,
    });

    return { favorites, total };
  }

  public async remove(favorite: Favorite): Promise<void> {
    const favoriteRepository = getRepository(Favorite);
    await favoriteRepository.remove(favorite);
  }
}

export default FavoriteRepository;
