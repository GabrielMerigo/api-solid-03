import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymsUseCase } from "@/use-cases/fetch-nearby-gyms/fetch-nearby-gyms";

export const makeFetchNearbyGymsUseCase = () => {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymsUseCase(gymsRepository);

  return useCase;
};
