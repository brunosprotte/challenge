import IProductDTO from './IProductDTO';

export default interface IProductService {
  getByProductId(id: string): Promise<IProductDTO | void>;
}
