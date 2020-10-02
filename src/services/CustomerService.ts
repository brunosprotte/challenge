import Customer from '../model/Customer';

import CustomersRepository from '../repositories/CustomerRepository';

interface CreateRequest {
  name: string;
  email: string;
}

interface EditRequest {
  id: string;
  name: string;
  email: string;
}

class CustomerService {
  private customersRepository: CustomersRepository;

  constructor(customersRepository: CustomersRepository) {
    this.customersRepository = customersRepository;
  }

  public create({ name, email }: CreateRequest): Customer {
    const foundCustomer = this.customersRepository.findByEmail(email);

    if (foundCustomer) {
      throw Error('Email already in use!');
    }

    const customer = this.customersRepository.create({ name, email });

    return customer;
  }

  public getById(id: string): Customer {
    const foundCustomer = this.customersRepository.findById(id);

    if (!foundCustomer) {
      throw Error('Customer not found!');
    }

    return foundCustomer;
  }

  public put({ id, name, email }: EditRequest): Customer {
    const foundCustomer = this.customersRepository.findById(id);

    if (!foundCustomer) {
      throw Error('Customer not found!');
    }

    const customer = this.customersRepository.put({ id, name, email });

    return customer;
  }

  public delete(id: string): void {
    this.customersRepository.delete(id);
  }
}
export default CustomerService;
