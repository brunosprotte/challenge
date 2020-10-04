import IFavoriteDTO from './IFavoriteDTO';

export default interface IPaginatedFavorites {
  favorites: IFavoriteDTO[];
  total: number;
}
