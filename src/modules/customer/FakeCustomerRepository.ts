import { uuid } from 'uuidv4';

import ICustomerDTO from './ICustomerDTO';
import Customer from '../../model/Customer';
import ICustomerRepository from './ICustomerRepository';

class FakeCustomerRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async findById(id: string): Promise<Customer | undefined> {
    const foundCustomer = this.customers.find(customer => customer.id === id);
    return foundCustomer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const foundCustomer = this.customers.find(
      customer => customer.email === email,
    );
    return foundCustomer;
  }

  public async save({ name, email }: ICustomerDTO): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, { id: uuid(), name, email });

    this.customers.push(customer);
    return customer;
  }

  public async put(
    foundCustomer: Customer,
    { name, email }: ICustomerDTO,
  ): Promise<Customer> {
    Object.assign(foundCustomer, { name, email });

    const customers = this.customers.filter(
      customer => customer.id !== foundCustomer.id,
    );

    customers.push(foundCustomer);

    this.customers = customers;

    return foundCustomer;
  }

  public async remove(customer: Customer): Promise<void> {
    const customers = this.customers.filter(cust => cust.id !== customer.id);

    this.customers = customers;
  }
}

export default FakeCustomerRepository;
