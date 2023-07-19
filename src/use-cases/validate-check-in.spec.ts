import { expect, describe, it, beforeEach, afterEach, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from './validate-check-in';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

// Unit test

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe('Validate CheckIns Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to validate check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user-01',
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it('should not be able to validate a non-existing check-in', async () => {
    await expect(() =>
      sut.execute({
        checkInId: 'non-existing-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date('2023-07-01 10:00:00'));

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user-01',
    });

    const twentyOneMinutesInMiliseconds = 21 * 60 * 1000;

    vi.advanceTimersByTime(twentyOneMinutesInMiliseconds);

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
