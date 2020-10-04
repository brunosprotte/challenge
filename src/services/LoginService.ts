import { sign } from 'jsonwebtoken';

import CustomerRepository from '../customer/CustomerRepository';

import AppError from '../errors/AppError';
import authConfig from '../config/authConfig';

interface IRequest {
  email: string;
}

interface IResponse {
  customer: { name: string; email: string };
  token: string;
}

class LoginService {
  private customerRepository: CustomerRepository;

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository;
  }

  public async execute({ email }: IRequest): Promise<IResponse> {
    const customer = await this.customerRepository.findByEmail(email);

    if (!customer) {
      throw new AppError('Customer not found!', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: customer.id,
      expiresIn,
    });

    const { name } = customer;

    return { customer: { name, email }, token };
  }
}
export default LoginService;
