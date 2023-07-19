import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((item) => item.id === id);

    return gym || null;
  }

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20);

    return gyms;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = this.items.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude, longitude },
        { latitude: Number(item.latitude), longitude: Number(item.longitude) },
      );

      return distance < 10; // 10km
    });

    return gyms;
  }
}
