import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { expect, describe, it, beforeEach } from 'vitest';
import { CreateGymUseCase } from './create-gym';

// Unit test

// sut = System Under Test - the thing we are testing

let gymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe('Create Gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(gymsRepository);
  });

  it('it should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Academia',
      description: 'Academia de musculação',
      phone: '123456789',
      latitude: 1.215366,
      longitude: 32.267337,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
