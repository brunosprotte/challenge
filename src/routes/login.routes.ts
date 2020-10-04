import { Router } from 'express';

import CustomersRespository from '../customer/CustomerRepository';
import LoginService from '../services/LoginService';

const loginRouter = Router();

const customersRespository = new CustomersRespository();

loginRouter.post('/', async (request, response) => {
  const { email } = request.body;

  const loginService = new LoginService(customersRespository);

  const costumer = await loginService.execute({ email });

  return response.json(costumer);
});

export default loginRouter;
