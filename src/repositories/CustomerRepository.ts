import Customer from '../model/Customer';

interface CreateCustomerDTO {
  name: string;
  email: string;
}

interface EditCustomerDTO {
  id: string;
  name: string;
  email: string;
}

class CustomerRepository {
  private customers: Customer[];

  constructor() {
    this.customers = [];
  }

  public findById(id: string): Customer | null {
    const foundCustomer = this.customers.find(customer => customer.id === id);
    return foundCustomer || null;
  }

  public findByEmail(email: string): Customer | null {
    const foundCustomer = this.customers.find(
      customer => customer.email === email,
    );
    return foundCustomer || null;
  }

  public create({ name, email }: CreateCustomerDTO): Customer {
    const customer = new Customer({ name, email });

    this.customers.push(customer);

    return customer;
  }

  public put({ id, name, email }: EditCustomerDTO): Customer {
    this.customers = this.customers.filter(customer => customer.id !== id);

    const customer = {
      id,
      name,
      email,
    };

    this.customers.push(customer);

    return customer;
  }

  public delete(id: string) {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }
}

export default CustomerRepository;
