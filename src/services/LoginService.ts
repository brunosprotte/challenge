import { sign } from 'jsonwebtoken';

import Customer from '../model/Customer';
import CustomerRepository from '../repositories/CustomerRepository';

import authConfig from '../config/authConfig';

interface Request {
  email: string;
}

interface Response {
  customer: Customer;
  token: string;
}

class LoginService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute({ email }: Request): Promise<Response> {
    const customer = this.customerRepository.findByEmail(email);

    if (!customer) {
      throw Error('Customer not found!');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    return { customer, token };
  }
}
export default LoginService;
