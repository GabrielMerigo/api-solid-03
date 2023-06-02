import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositories";
import { FetchUserCheckInsHistoryUseCase } from "@/use-cases/fetch-user-check-ins-history/fetch-user-check-ins-history";

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
};
