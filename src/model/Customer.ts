import { uuid } from 'uuidv4';

class Customer {
  id: string;

  name: string;

  email: string;

  constructor({ name, email }: Omit<Customer, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.email = email;
  }
}
export default Customer;
