import Favorite from '../../model/Favorite';

import IFavoriteDTO from './dto/IFavoriteDTO';
import IFindFavoriteDTO from './dto/IFindFavoriteDTO';
import IPaginatedFavorites from './dto/IPaginatedFavorites';

import IPage from './dto/IPageDTO';

export default interface IFavoriteRepository {
  create({
    product_id,
    customer_id,
    image,
    price,
    title,
    review_score,
  }: IFavoriteDTO): Promise<Favorite>;

  findByCustomerIdAndProductId({
    customer_id,
    product_id,
  }: IFindFavoriteDTO): Promise<Favorite | undefined>;

  getByCustomerId(
    customer_id: string,
    { page, size }: IPage,
  ): Promise<IPaginatedFavorites | undefined>;

  remove(favorite: Favorite): Promise<void>;
}
