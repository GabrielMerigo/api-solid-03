import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: "-25.9702536",
      longitude: "-50.2041492",
    });

    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: "-30.0012655",
      longitude: "-51.1475463",
    });

    const { gyms } = await sut.execute({
      userLatitude: "-30.0024424",
      userLongitude: "-51.1474229",
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
