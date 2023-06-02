import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repositories";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile/get-user-profile";

export const makeGetUserProfileUseCase = () => {
  const usersRepository = new PrismaUsersRepository();
  const useCase = new GetUserProfileUseCase(usersRepository);

  return useCase;
};
