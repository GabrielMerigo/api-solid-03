import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositories";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CheckInUseCase } from "@/use-cases/check-in/check-in";

export const makeCheckInsUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
};
