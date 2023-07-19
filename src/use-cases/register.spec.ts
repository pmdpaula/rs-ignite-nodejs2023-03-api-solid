import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

// Unit test

// sut = System Under Test - the thing we are testing

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it('it should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'mane@qualquer.com',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'mane@qualquer.com',
      password: '123456',
    });

    const isPasswordCorrectly = await compare('123456', user.password_hash);

    expect(isPasswordCorrectly).toBe(true);
  });

  it('should not be able to register with same email twice.', async () => {
    const email = 'mane@qualquer.com';

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    });

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
