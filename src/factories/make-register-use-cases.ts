import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories";
import { RegisterUseCase } from "@/use-cases/register/register";

export const makeRegisterUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  const registerUseCase = new RegisterUseCase(usersRepository);

  return registerUseCase;
};
