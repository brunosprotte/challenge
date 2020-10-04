import Customer from '../model/Customer';
import AppError from '../errors/AppError';

import CustomersRepository from './CustomerRepository';

interface ICreateRequest {
  name: string;
  email: string;
}

interface IEditRequest {
  id: string;
  name: string;
  email: string;
}

class CustomerService {
  private customersRepository: CustomersRepository;

  constructor(customersRepository: CustomersRepository) {
    this.customersRepository = customersRepository;
  }

  public async create({ name, email }: ICreateRequest): Promise<Customer> {
    const foundCustomer = await this.customersRepository.findByEmail(email);

    if (foundCustomer) {
      throw new AppError('Email already in use!');
    }

    const customer = await this.customersRepository.save({ name, email });

    return customer;
  }

  public async getById(id: string): Promise<Customer | undefined> {
    const foundCustomer = await this.customersRepository.findById(id);

    if (!foundCustomer) {
      throw new AppError('Customer not found!', 404);
    }

    return foundCustomer;
  }

  public async put({
    id,
    name,
    email,
  }: IEditRequest): Promise<Customer | undefined> {
    const foundCustomer = await this.customersRepository.findById(id);

    if (!foundCustomer) {
      throw new AppError('Customer not found!', 404);
    }

    const foundEmail = await this.customersRepository.findByEmail(email);

    if (foundEmail && foundCustomer.id !== id) {
      throw new AppError('Email already in use!');
    }

    const customer = this.customersRepository.put(foundCustomer, {
      name,
      email,
    });

    return customer;
  }

  public async delete(id: string): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found!', 404);
    }
    await this.customersRepository.remove(customer);
  }
}
export default CustomerService;
