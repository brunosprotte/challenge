import axios from 'axios';

interface IProductDTO {
  id: string;
  image: string;
  price: number;
  title: string;
  reviewScore: number;
}

class ProductService {
  public async getByProductId(id: string): Promise<IProductDTO | void> {
    const { data } = await axios.get<IProductDTO>(
      `http://challenge-api.luizalabs.com/api/product/${id}/`,
    );

    return data;
  }
}
export default ProductService;
