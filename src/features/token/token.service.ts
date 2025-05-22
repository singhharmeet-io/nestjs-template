import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TIME } from 'src/shared/constants';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async refresh(userId: string) {
    const tokens = await this.getTokens({ userId }, TIME.JWT.FIFTEEN_MINUTES);
    return tokens;
  }

  async getTokens(
    data: Record<string, unknown>,
    expiresIn: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { ...data },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn,
        },
      ),

      this.jwtService.signAsync(
        { ...data },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: TIME.JWT.TWO_MINUTES,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
