import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CustomersRespository from '../repositories/CustomerRepository';
import CustomerService from '../services/CustomerService';

const customersRouter = Router();
const customersRespository = new CustomersRespository();

customersRouter.use(ensureAuthenticated);

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

customersRouter.get('/:customer_id', (request, response) => {
  try {
    const { customer_id } = request.params;

    const customerService = new CustomerService(customersRespository);

    const customer = customerService.getById(customer_id);

    return response.json(customer);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

customersRouter.put('/:customer_id', (request, response) => {
  try {
    const { name, email } = request.body;
    const { customer_id } = request.params;

    const customerService = new CustomerService(customersRespository);

    const customer = customerService.put({ id: customer_id, name, email });

    return response.json(customer);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

customersRouter.delete('/:customer_id', (request, response) => {
  try {
    const { customer_id } = request.params;

    const customerService = new CustomerService(customersRespository);

    const customer = customerService.delete(customer_id);

    return response.json(customer);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default customersRouter;
