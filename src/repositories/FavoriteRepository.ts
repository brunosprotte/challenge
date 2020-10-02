import Favorite from '../model/Favorite';

interface FavoriteDTO {
  productId: string;
  customerId: string;
  title: string;
  image: string;
  price: number;
}

class FavoriteRepository {
  private favorites: Favorite[];

  constructor() {
    this.favorites = [];
  }

  public create({
    productId,
    customerId,
    image,
    title,
    price,
  }: FavoriteDTO): Favorite {
    const favorite = new Favorite({
      productId,
      customerId,
      image,
      title,
      price,
    });

    this.favorites.push(favorite);

    return favorite;
  }
}

export default FavoriteRepository;
