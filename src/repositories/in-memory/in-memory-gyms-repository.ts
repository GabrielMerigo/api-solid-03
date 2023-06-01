import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Gym, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { GymsRepository, IFindManyNearbyParams } from "../gyms-repository";

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async findById(gymId: string): Promise<Gym> {
    const gym = this.items.find((item) => item.id === gymId);

    if (!gym) return null;

    return gym;
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(params: IFindManyNearbyParams) {
    return this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: Number(params.latitude),
          longitude: Number(params.longitude),
        },
        {
          latitude: Number(item.latitude),
          longitude: Number(item.longitude),
        }
      );

      return distance < 10;
    });
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
