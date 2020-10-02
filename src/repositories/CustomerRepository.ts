import Customer from '../model/Customer';

interface CustomerDTO {
  name: string;
  email: string;
}

class CustomerRepository {
  private customers: Customer[];

  constructor() {
    this.customers = [];
  }

  public findByEmail(email: string): Customer | null {
    const foundCustomer = this.customers.find(
      customer => customer.email === email,
    );
    return foundCustomer || null;
  }

  public create({ name, email }: CustomerDTO): Customer {
    const customer = new Customer({ name, email });

    this.customers.push(customer);

    return customer;
  }
}

export default CustomerRepository;
