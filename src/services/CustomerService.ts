import Customer from '../model/Customer';

import CustomersRepository from '../repositories/CustomerRepository';

interface Request {
  name: string;
  email: string;
}

class CustomerService {
  private customersRepository: CustomersRepository;

  constructor(customersRepository: CustomersRepository) {
    this.customersRepository = customersRepository;
  }

  public create({ name, email }: Request): Customer {
    const foundCustomer = this.customersRepository.findByEmail(email);

    if (foundCustomer) {
      throw Error('Email already in use!');
    }

    const customer = this.customersRepository.create({ name, email });

    return customer;
  }
}
export default CustomerService;
