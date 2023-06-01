import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { GymsRepository } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym> {
    const gym = this.items.find((item) => item.id === gymId);

    if (!gym) return null;

    return gym;
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      phone: data.phone ?? null,
      description: data.description ?? null,
      latitude: data.latitude.toString(),
      longitude: data.longitude,
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }
}
