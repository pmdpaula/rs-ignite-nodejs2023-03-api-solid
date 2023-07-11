import { expect, describe, it, beforeEach, vi, afterEach } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "./check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { randomUUID } from "crypto";
import { Decimal } from "@prisma/client/runtime/library";

// Unit test

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("CheckIns Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    gymsRepository.items.push({
      id: "gym-id",
      title: "Gym Name",
      description: "Gym Description",
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: "",
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    //,

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in twice at the same day", async () => {
    vi.setSystemTime(new Date("2022-01-01 10:00:00"));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    await expect(() =>
      sut.execute({
        gymId: "gym-id",
        userId: "user-id",
        userLatitude: 1.215366,
        userLongitude: 32.267337,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice in different days", async () => {
    vi.setSystemTime(new Date("2022-01-01 10:00:00"));

    await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    vi.setSystemTime(new Date("2022-01-02 10:00:00"));

    const { checkIn } = await sut.execute({
      gymId: "gym-id",
      userId: "user-id",
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
