import { Router } from 'express';

import CustomersRespository from '../repositories/CustomerRepository';
import LoginService from '../services/LoginService';

const loginRouter = Router();

const customersRespository = new CustomersRespository();

loginRouter.post('/', (request, response) => {
  try {
    const { email } = request.body;

    const loginService = new LoginService(customersRespository);

    const constumer = loginService.execute(email);

    return response.json(constumer);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default loginRouter;
