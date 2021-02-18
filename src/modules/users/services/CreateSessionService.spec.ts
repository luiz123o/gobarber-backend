import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import CreateUserService from '@modules/users/services/CreateUserService';

import FakeHashProvider from '@modules/users/providers/fakes/FakeHashProvider';

import CreateSessionService from '@modules/users/services/CreateSessionService';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: CreateSessionService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able authenticaded', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '12345678',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able authenticade with non existing user', async () => {
    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should no be able tho athenticade with wrong password', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    });

    expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
