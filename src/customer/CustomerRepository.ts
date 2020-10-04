import { getRepository } from 'typeorm';

import Customer from '../model/Customer';

interface ICustomerDTO {
  name: string;
  email: string;
}

class CustomerRepository {
  public async findById(id: string): Promise<Customer | undefined> {
    const customerRepository = getRepository(Customer);
    const foundCustomer = await customerRepository.findOne(id);

    return foundCustomer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    try {
      const customerRepository = getRepository(Customer);
      const foundCustomer = await customerRepository.findOne({
        where: { email },
      });
      return foundCustomer;
    } catch (err) {
      throw Error(err);
    }
  }

  public async save({ name, email }: ICustomerDTO): Promise<Customer> {
    try {
      const customerRepository = getRepository(Customer);
      const customer = customerRepository.create({ name, email });
      await customerRepository.save(customer);

      return customer;
    } catch (err) {
      throw Error(err);
    }
  }

  public async put(
    foundCustomer: Customer,
    { name, email }: ICustomerDTO,
  ): Promise<Customer> {
    const customerRepository = getRepository(Customer);

    customerRepository.merge(foundCustomer, { name, email });
    const updated = await customerRepository.save(foundCustomer);

    return updated;
  }

  public async remove(customer: Customer): Promise<void> {
    const customerRepository = getRepository(Customer);
    await customerRepository.remove(customer);
  }
}

export default CustomerRepository;
