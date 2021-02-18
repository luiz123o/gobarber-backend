// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;

let listProviders: ListProvidersService;

let fakeCacheProviders: FakeCacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProviders = new FakeCacheProvider();
    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProviders,
    );
  });
  it('should be able to list providers', async () => {
    const loggedUser = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });
    const user1 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '12345678',
    });
    const user2 = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '12345678',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });
    expect(providers).toEqual([user1, user2]);
  });
});
