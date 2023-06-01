import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Fetch User Check-in History Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to search for gyms", async () => {
    await gymsRepository.create({
      title: "JS Gym",
      description: null,
      phone: null,
      latitude: "-30.0187552",
      longitude: "-51.1969692",
    });

    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: "-30.0187552",
      longitude: "-51.1969692",
    });

    const { gyms } = await sut.execute({
      query: "JS",
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "JS Gym" })]);
  });

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JS Gym ${i}`,
        description: null,
        phone: null,
        latitude: "-30.0187552",
        longitude: "-51.1969692",
      });
    }

    const { gyms } = await sut.execute({
      query: "JS",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JS Gym 21" }),
      expect.objectContaining({ title: "JS Gym 22" }),
    ]);
  });
});
