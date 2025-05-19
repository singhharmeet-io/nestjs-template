import { Module } from '@nestjs/common';
import { ResponseService } from '../shared/services/response.service';
import { CryptoService } from './utils/crypto.service';

@Module({
  providers: [ResponseService, CryptoService],
  exports: [ResponseService, CryptoService],
})
export class SharedModule {}
