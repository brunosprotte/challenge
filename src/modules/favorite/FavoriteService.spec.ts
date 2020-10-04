import AppError from '../../errors/AppError';

import FavoriteService from './FavoriteService';
import FakeFavoriteRepository from './FakeFavoriteRepository';
import FakeProductServive from '../product/FakeProductService';

let fakeFavoriteRepository: FakeFavoriteRepository;
let fakeProductServive: FakeProductServive;
let favoriteService: FavoriteService;

describe('Create Favorites', () => {
  beforeEach(() => {
    fakeFavoriteRepository = new FakeFavoriteRepository();
    fakeProductServive = new FakeProductServive();
    favoriteService = new FavoriteService(
      fakeFavoriteRepository,
      fakeProductServive,
    );
  });

  it('should be able to crate a favorite', async () => {
    const favorite = await favoriteService.create({
      customer_id: '123',
      product_id: '123',
    });

    expect(favorite).toHaveProperty('id');
    expect(favorite.id).toBeDefined();
  });

  it('should not be able to crate a favorite with invalid product id', async () => {
    await expect(
      favoriteService.create({
        customer_id: '123',
        product_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to crate a duplicated favorite', async () => {
    await favoriteService.create({
      customer_id: '123',
      product_id: '123',
    });

    await expect(
      favoriteService.create({
        customer_id: '123',
        product_id: '123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

describe('List Favorites', () => {
  beforeEach(() => {
    fakeFavoriteRepository = new FakeFavoriteRepository();
    fakeProductServive = new FakeProductServive();
    favoriteService = new FavoriteService(
      fakeFavoriteRepository,
      fakeProductServive,
    );
  });

  it("should be able to list the customer's favorites", async () => {
    await favoriteService.create({
      customer_id: '123',
      product_id: '123',
    });

    const favorites = await favoriteService.get('123', { page: 1, size: 25 });

    expect(favorites).toHaveProperty('favorites');
    expect(favorites).toHaveProperty('total');
  });

  it("should be able to list the customer's favorites paginated", async () => {
    await favoriteService.create({
      customer_id: '123',
      product_id: '123',
    });

    const favorites = await favoriteService.get('123', { page: 1, size: 1 });

    expect(favorites?.favorites.length).toEqual(1);
  });
});

describe('Remove Favorites', () => {
  beforeEach(() => {
    fakeFavoriteRepository = new FakeFavoriteRepository();
    fakeProductServive = new FakeProductServive();
    favoriteService = new FavoriteService(
      fakeFavoriteRepository,
      fakeProductServive,
    );
  });

  it('should be able to remove a favorite', async () => {
    const favorite = await favoriteService.create({
      customer_id: '123',
      product_id: '123',
    });

    await expect(
      favoriteService.delete({
        customer_id: '123',
        product_id: favorite.product_id,
      }),
    ).resolves.toBeUndefined();

    const favorites = await favoriteService.get('123', { page: 1, size: 25 });

    expect(favorites?.favorites.length).toEqual(0);
  });

  it('should not be able to remove a favorite with invalid id', async () => {
    await expect(
      favoriteService.delete({
        customer_id: '123',
        product_id: 'invalid id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
