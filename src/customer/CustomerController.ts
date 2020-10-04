import { Request, Response } from 'express';

import CustomersRespository from './CustomerRepository';
import CustomerService from './CustomerService';

class CustomerController {
  public async create(request: Request, response: Response): Promise<Response> {
    const customersRespository = new CustomersRespository();

    const { name, email } = request.body;

    const customerService = new CustomerService(customersRespository);

    const customer = await customerService.create({ name, email });

    return response.json(customer);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const customersRespository = new CustomersRespository();
    const { customer_id } = request.params;

    const customerService = new CustomerService(customersRespository);

    const customer = await customerService.getById(customer_id);

    return response.json(customer);
  }

  public async put(request: Request, response: Response): Promise<Response> {
    const customersRespository = new CustomersRespository();
    const { name, email } = request.body;
    const { customer_id } = request.params;

    const customerService = new CustomerService(customersRespository);

    const customer = await customerService.put({
      id: customer_id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const customersRespository = new CustomersRespository();
    const { customer_id } = request.params;

    const customerService = new CustomerService(customersRespository);

    await customerService.delete(customer_id);

    return response.status(204).json();
  }
}

export default CustomerController;
