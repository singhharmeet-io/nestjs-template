import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/shared/constants';

@Injectable()
export class StringRedisService implements OnModuleInit {
  private client: Redis;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) { }

  onModuleInit() {
    this.client = this.redis;
  }

  async setString(
    key: string,
    value: string | number | Buffer,
    db: number,
    expiresIn: number,
  ): Promise<void> {
    if (db !== 0) await this.client.select(db);
    await this.client.set(key, value);
    /** expire document if expiresIn is defined */
    if (expiresIn !== 0) {
      const expires: number = expiresIn * 60;
      await this.client.expire(key, expires);
    }
  }

  async getString(key: string, db: number): Promise<any> {
    if (db !== 0) await this.client.select(db);
    const data = await this.client.get(key);
    return data;
  }

  async deleteString(key: string): Promise<void> {
    await this.client.del(key);
  }
}
