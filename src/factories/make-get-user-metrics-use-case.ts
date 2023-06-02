import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repositories";
import { GetUserMetricsUseCase } from "@/use-cases/get-user-metrics/get-user-metrics-use-case";

export const makeGetUserMetricsUseCase = () => {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new GetUserMetricsUseCase(checkInsRepository);

  return useCase;
};
