import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { SearchGymUseCase } from './search-gym';

// Unit test

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymUseCase;

describe('Search Gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia NodeJs',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 1.215366,
      longitude: 32.267337,
    });

    await gymsRepository.create({
      title: 'Academia React Native',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 1.215366,
      longitude: 32.267337,
    });

    const { gyms } = await sut.execute({
      query: 'NodeJs',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia NodeJs',
      }),
    ]);
  });

  it('should be able to search for gyms with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia TI ${i}`,
        description: `Academia de Tecnologia ${i}`,
        phone: '123456789',
        latitude: 1.215366,
        longitude: 32.267337,
      });
    }

    const { gyms } = await sut.execute({
      query: 'TI',
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'Academia TI 21',
      }),
      expect.objectContaining({
        title: 'Academia TI 22',
      }),
    ]);
  });
});
