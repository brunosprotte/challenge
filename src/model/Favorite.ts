import { uuid } from 'uuidv4';

class Favorite {
  id: string;

  productId: string;

  title: string;

  image: string;

  price: number;

  customerId: string;

  constructor({
    productId,
    title,
    image,
    price,
    customerId,
  }: Omit<Favorite, 'id'>) {
    this.id = uuid();
    this.productId = productId;
    this.title = title;
    this.image = image;
    this.price = price;
    this.customerId = customerId;
  }
}
export default Favorite;
