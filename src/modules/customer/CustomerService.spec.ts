import AppError from '../../errors/AppError';

import FakeCustomerRepository from './FakeCustomerRepository';
import CustomerService from './CustomerService';

let fakeCustomerRepository: FakeCustomerRepository;
let customerService: CustomerService;

describe('Create Customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    customerService = new CustomerService(fakeCustomerRepository);
  });

  it('should be able to create a customer', async () => {
    const customer = await customerService.create({
      email: 'customer@customer.com',
      name: 'customer',
    });
    expect(customer).toHaveProperty('id');
    expect(customer.id).toBeDefined();
  });

  it('should not be able to create a customer with an existent email', async () => {
    await customerService.create({
      email: 'customer@customer.com',
      name: 'customer',
    });

    await expect(
      customerService.create({
        email: 'customer@customer.com',
        name: 'customer with already used email',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to get a customer', async () => {
    const createdCustomer = await customerService.create({
      email: 'customer@customer.com',
      name: 'customer',
    });

    const foundCustomer = await customerService.getById(createdCustomer.id);
    expect(foundCustomer).not.toBeUndefined();
  });

  it('should not be able to get a customer with invalid id', async () => {
    await expect(customerService.getById('invalid id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

describe('Edit Customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    customerService = new CustomerService(fakeCustomerRepository);
  });

  it('should be able to edit a customer', async () => {
    const customer = await customerService.create({
      email: 'customer@customer.com',
      name: 'customer',
    });

    const editedData = {
      id: customer.id,
      name: 'Edited name',
      email: 'editedEmail@customer.com',
    };

    await expect(customerService.put(editedData)).resolves.toBeUndefined();
  });

  it('should not be able to edit a customer with invalid id', async () => {
    const invalidData = {
      id: 'invalid id',
      name: 'invalid data',
      email: 'invalid data',
    };
    await expect(customerService.put(invalidData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to edit a customer with an existent email', async () => {
    const customer = await customerService.create({
      name: 'customer',
      email: 'customer@customer.com',
    });

    await customerService.create({
      name: 'customer 2',
      email: 'customer2@customer.com',
    });

    const duplicatedData = {
      id: customer.id,
      name: 'duplicatedData',
      email: 'customer2@customer.com',
    };

    await expect(customerService.put(duplicatedData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});

describe('Remove Customer', () => {
  beforeEach(() => {
    fakeCustomerRepository = new FakeCustomerRepository();
    customerService = new CustomerService(fakeCustomerRepository);
  });
  it('should be able to delete a customer', async () => {
    const customer = await customerService.create({
      email: 'customer@customer.com',
      name: 'customer',
    });

    await expect(customerService.delete(customer.id)).resolves.toBeUndefined();
    await expect(customerService.getById(customer.id)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to delete a customer with invalid id', async () => {
    await expect(customerService.delete('invalid id')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
