import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

// Unit test

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe('Fetch Nearby Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Academia Perto',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 1.215366,
      longitude: 32.267337,
    });

    await gymsRepository.create({
      title: 'Academia Longe',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: -22.713603,
      longitude: -42.628454,
    });

    const { gyms } = await sut.execute({
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    expect(gyms).toHaveLength(1);
  });

  // it("should be able to search for gyms with pagination", async () => {
  //   for (let i = 1; i <= 22; i++) {
  //     await gymsRepository.create({
  //       title: `Academia TI ${i}`,
  //       description: `Academia de Tecnologia ${i}`,
  //       phone: "123456789",
  //       latitude: 1.215366,
  //       longitude: 32.267337,
  //     });
  //   }

  //   const { gyms } = await sut.execute({
  //     query: "TI",
  //     page: 2,
  //   });

  //   expect(gyms).toHaveLength(2);
  //   expect(gyms).toEqual([
  //     expect.objectContaining({
  //       title: "Academia TI 21",
  //     }),
  //     expect.objectContaining({
  //       title: "Academia TI 22",
  //     }),
  //   ]);
  // });
});
