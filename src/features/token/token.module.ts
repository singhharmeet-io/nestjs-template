import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { JwtModule } from '@nestjs/jwt';
import { tokenProvider } from './token.provider';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [JwtModule.register({}), SharedModule],
  controllers: [TokenController],
  providers: [
    TokenService,
    ...tokenProvider,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [TokenService],
})
export class TokenModule {}
