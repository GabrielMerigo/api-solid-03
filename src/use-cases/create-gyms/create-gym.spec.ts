import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateGymUseCaseCase } from "./create-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCaseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCaseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Js Gym",
      description: null,
      phone: null,
      latitude: "-30.0187552",
      longitude: "-51.1969692",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
