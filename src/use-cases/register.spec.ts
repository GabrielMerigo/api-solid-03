import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repositoty";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";

describe("Register Use Case", () => {
  it("should hash user password upon registrations", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      name: "John Doe",
      email: "john@doe.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      user.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "john@doe.com";

    await registerUseCase.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    expect(() =>
      registerUseCase.execute({
        name: "Bob O'Connor",
        email,
        password: "927832",
      })
    );
  });
});