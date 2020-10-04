import IProductDTO from './IProductDTO';

class FakeProductService {
  private products: IProductDTO[] = [
    {
      id: '123',
      image: 'link',
      price: 100.0,
      title: 'product',
      reviewScore: 4.999,
    },
  ];

  public async getByProductId(id: string): Promise<IProductDTO | void> {
    const foundProduct = this.products.find(product => product.id === id);
    return foundProduct;
  }
}

export default FakeProductService;
