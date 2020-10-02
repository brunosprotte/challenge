import axios from 'axios';

interface ProductDTO {
  id: string;
  image: string;
  price: number;
  title: string;
}

class ProductService {
  public async getByProductId(id: string): Promise<void | ProductDTO> {
    const { data } = await axios.get<ProductDTO>(
      `http://challenge-api.luizalabs.com/api/product/${id}/`,
    );

    return data;
  }
}
export default ProductService;
