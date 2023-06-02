import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { CreateGymUseCaseCase } from "@/use-cases/create-gyms/create-gyms";

export const makeCreateGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new CreateGymUseCaseCase(gymsRepository);

  return useCase;
};
