import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CheckInUseCase } from "./check-in";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-in Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      description: "",
      latitude: "-30.0187552",
      longitude: "-51.1969692",
      phone: "51 98232-3243",
      title: "Javascript Gyms",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check-in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: "-30.0187552",
      userLongitude: "-51.1969692",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check-in twice in the same day", async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: "-30.0187552",
      userLongitude: "-51.1969692",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: "-30.0187552",
        userLongitude: "-51.1969692",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check-in twice in diffrent days", async () => {
    vi.setSystemTime(new Date(2020, 0, 20, 8, 0, 0));

    await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: "-30.0187552",
      userLongitude: "-51.1969692",
    });

    vi.setSystemTime(new Date(2020, 0, 21, 8, 0, 0));

    const { checkIn } = await sut.execute({
      gymId: "gym-01",
      userId: "user-01",
      userLatitude: "-30.0187552",
      userLongitude: "-51.1969692",
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check-in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-01",
      description: "",
      phone: "51 98232-3243",
      title: "Javascript Gyms",
      latitude: "-30.0078756",
      longitude: "-51.1835999",
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: "-30.0187552",
        userLongitude: "-51.1969692",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
