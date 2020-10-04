import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import CustomersRespository from '../customer/CustomerRepository';
import LoginService from '../services/LoginService';

const loginRouter = Router();

const customersRespository = new CustomersRespository();

loginRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  async (request, response) => {
    const { email } = request.body;

    const loginService = new LoginService(customersRespository);

    const costumer = await loginService.execute({ email });

    return response.json(costumer);
  },
);

export default loginRouter;
