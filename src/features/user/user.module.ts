import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { InfraModule } from 'src/@infra/infra.module';
import { userProviders } from './user.provider';
import { SharedModule } from 'src/shared/shared.module';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [InfraModule, SharedModule, TokenModule],
  controllers: [UserController],
  providers: [UserService, ...userProviders],
})
export class UserModule {}
