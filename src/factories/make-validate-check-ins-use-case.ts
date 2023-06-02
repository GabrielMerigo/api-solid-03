import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositories";
import { ValidateCheckInUseCase } from "@/use-cases/validate-check-in/validate-check-in";

export const makeValidateCheckInUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new ValidateCheckInUseCase(checkInsRepository);

  return useCase;
};
