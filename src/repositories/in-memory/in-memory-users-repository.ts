import { Prisma, User } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      password_hash: data.password_hash,
      id: randomUUID(),
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email);

    return user || null;
  }
}
