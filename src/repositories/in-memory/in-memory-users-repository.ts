import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { GetResult } from "@prisma/client/runtime";

export class InMemoryUsersRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      ...data,
      password_hash: data.password_hash,
      id: "any_id",
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
