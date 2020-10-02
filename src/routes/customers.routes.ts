import { Router } from 'express';

import CustomersRespository from '../repositories/CustomerRepository';
import CustomerService from '../services/CustomerService';

const customersRouter = Router();
const customersRespository = new CustomersRespository();

customersRouter.post('/', (request, response) => {
  try {
    const { name, email } = request.body;

    const customerService = new CustomerService(customersRespository);

    const customer = customerService.create({ name, email });

    return response.json(customer);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default customersRouter;
