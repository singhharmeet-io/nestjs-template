import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InfraModule } from 'src/@infra/infra.module';

@Module({
  controllers: [UserController, InfraModule],
  providers: [UserService],
})
export class UserModule {}
