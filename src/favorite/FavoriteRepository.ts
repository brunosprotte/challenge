import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Favorite from '../model/Favorite';

interface IFavoriteDTO {
  product_id: string;
  customer_id: string;
}

class FavoriteRepository {
  public async create({
    product_id,
    customer_id,
  }: IFavoriteDTO): Promise<Favorite> {
    const favoriteRepository = getRepository(Favorite);

    const favorite = favoriteRepository.create({
      product_id,
      customer_id,
    });

    await favoriteRepository.save(favorite);

    return favorite;
  }

  public async findByCustomerIdAndProductId({
    customer_id,
    product_id,
  }: IFavoriteDTO): Promise<Favorite | undefined> {
    const favoriteRepository = getRepository(Favorite);

    const favorite = await favoriteRepository.findOne({
      where: { customer_id, product_id },
    });
    return favorite;
  }

  public async getByCustomerId(
    customer_id: string,
  ): Promise<Favorite[] | undefined> {
    const favoriteRepository = getRepository(Favorite);

    const favorite = await favoriteRepository.find({
      where: {
        customer_id,
      },
    });
    return favorite;
  }

  public async remove(favorite: Favorite): Promise<void> {
    const favoriteRepository = getRepository(Favorite);
    await favoriteRepository.remove(favorite);
  }
}

export default FavoriteRepository;
