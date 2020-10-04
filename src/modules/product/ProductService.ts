import axios from 'axios';

import IProductDTO from './IProductDTO';

class ProductService {
  public async getByProductId(id: string): Promise<IProductDTO | void> {
    const { data } = await axios.get<IProductDTO>(
      `http://challenge-api.luizalabs.com/api/product/${id}/`,
    );

    return data;
  }
}
export default ProductService;
