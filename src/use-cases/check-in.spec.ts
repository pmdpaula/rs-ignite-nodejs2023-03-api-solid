import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { Decimal } from '@prisma/client/runtime/library';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

// Unit test

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe('CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Gym Name',
      description: 'Gym Description',
      latitude: 1.215366,
      longitude: 32.267337,
      phone: '',
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice at the same day.', async () => {
    vi.setSystemTime(new Date('2022-01-01 10:00:00'));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-id',
        userLatitude: 1.215366,
        userLongitude: 32.267337,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date('2022-01-01 10:00:00'));

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    vi.setSystemTime(new Date('2022-01-02 10:00:00'));

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-id',
      userLatitude: 1.215366,
      userLongitude: 32.267337,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Gym Name',
      description: 'Gym Description',
      latitude: new Decimal(-22.713603),
      longitude: new Decimal(-42.628454),
      phone: '',
    });

    await expect(() =>
      sut.execute({
        gymId: 'gym-02',
        userId: 'user-id',
        userLatitude: 1.215366,
        userLongitude: 32.267337,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
