import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async encryptBcrypt(data: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(data, salt);
  }

  async compareBcrypt(hashedString: string, data: string): Promise<boolean> {
    return await bcrypt.compare(data, hashedString);
  }
}
