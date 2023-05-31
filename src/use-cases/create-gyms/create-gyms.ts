import { GymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseCaseParams {
  title: string;
  description: string | null; // You create without description
  phone: string | null;
  latitude: string;
  longitude: string;
}

interface CreateGymUseCaseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCaseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    phone,
    latitude,
    longitude,
    title,
  }: CreateGymUseCaseCaseParams): Promise<CreateGymUseCaseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      phone,
      latitude,
      longitude,
      title,
    });

    return { gym };
  }
}
