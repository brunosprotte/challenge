import Customer from '../../model/Customer';
import ICustomerDTO from './ICustomerDTO';

export default interface ICustomerRepository {
  findById(id: string): Promise<Customer | undefined>;
  findByEmail(email: string): Promise<Customer | undefined>;
  save({ name, email }: ICustomerDTO): Promise<Customer>;
  put(foundCustomer: Customer, { name, email }: ICustomerDTO): Promise<void>;

  remove(customer: Customer): Promise<void>;
}
