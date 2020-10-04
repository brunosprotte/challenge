import { uuid } from 'uuidv4';

import Favorite from '../../model/Favorite';
import IFavoriteDTO from './dto/IFavoriteDTO';
import IFavoriteRepository from './IFavoriteRepository';
import IFindFavoriteDTO from './dto/IFindFavoriteDTO';
import IPaginatedFavorites from './dto/IPaginatedFavorites';
import IPage from './dto/IPageDTO';

class FakeCustomerRespository implements IFavoriteRepository {
  private favorites: Favorite[] = [];

  public async create({
    product_id,
    customer_id,
    image,
    price,
    title,
    review_score,
  }: IFavoriteDTO): Promise<Favorite> {
    const favorite = new Favorite();

    Object.assign(favorite, {
      id: uuid(),
      product_id,
      customer_id,
      image,
      price,
      title,
      review_score,
    });

    this.favorites.push(favorite);

    return favorite;
  }

  public async findByCustomerIdAndProductId({
    customer_id,
    product_id,
  }: IFindFavoriteDTO): Promise<Favorite | undefined> {
    const foundFavorite = this.favorites.find(
      favorite =>
        favorite.customer_id === customer_id &&
        favorite.product_id === product_id,
    );
    return foundFavorite;
  }

  public async getByCustomerId(
    customer_id: string,
    { page, size }: IPage,
  ): Promise<IPaginatedFavorites | undefined> {
    const foundFavorites = this.favorites.filter(
      favorite => favorite.customer_id === customer_id,
    );

    const paged = foundFavorites.slice((page - 1) * size, page * size);

    return { favorites: paged, total: foundFavorites.length };
  }

  public async remove(favorite: Favorite): Promise<void> {
    const favorites = this.favorites.filter(fav => fav.id !== favorite.id);
    this.favorites = favorites;
  }
}

export default FakeCustomerRespository;
