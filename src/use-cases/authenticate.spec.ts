import { expect, describe, it, beforeEach } from "vitest";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

// Unit test

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("it should be able to authenticate", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "mane@qualquer.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "mane@qualquer.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("it should not be able to authenticate with wrong email", async () => {
    expect(async () =>
      sut.execute({
        email: "nao@existe.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("it should not be able to authenticate with wrong password", async () => {
    await usersRepository.create({
      name: "John Doe",
      email: "mane@qualquer.com",
      password_hash: await hash("123456", 6),
    });

    expect(async () =>
      sut.execute({
        email: "mane@qualquer.com",
        password: "1234",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
