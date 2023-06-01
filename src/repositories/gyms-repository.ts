import { Gym, Prisma } from "@prisma/client";

export interface IFindManyNearbyParams {
  latitude: string;
  longitude: string;
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>;
  searchMany(query: string, page: number): Promise<Gym[]>;
  findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
}
