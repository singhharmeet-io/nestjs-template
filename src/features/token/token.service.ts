import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { TIME } from '../../constants';
// import RefreshTokens from 'src/common/database÷s/postgre/entities/refresh_tokens.entity';
// import { MODELS_REPOSITORIES } from 'src/common/constants';

@Injectable()
export class TokenService {
  constructor(
    // @Inject(MODELS_REPOSITORIES.REFRESH_TOKENS)
    // private readonly refreshTokens: typeof RefreshTokens,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async refresh(userId: string, deviceId: string, refreshToken: string) {
    // const token: RefreshTokens = await this.refreshTokens.findOne({
    //   where: {
    //     user_id: userId,
    //     device_id: deviceId,
    //     refresh_token: refreshToken,
    //   },
    // });

    // if (!token) throw new UnauthorizedException(MSG.ERROR.ACCESS_DENIED);
    // if (token.refresh_token !== refreshToken)
    //   throw new UnauthorizedException(MSG.ERROR.ACCESS_DENIED);

    // const tokens = await this.getTokens(
    //   { userId, deviceId },
    //   TIME.JWT.FIVE_DAYS,
    // );

    // return tokens;
  }

  async getTokens(
    data: Record<string, any>,
    expiresIn: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // const [accessToken, refreshToken] = await Promise.all([
    //   this.jwtService.signAsync(
    //     { ...data },
    //     {
    //       secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
    //       expiresIn,
    //     },
    //   ),

    //   this.jwtService.signAsync(
    //     { ...data },
    //     {
    //       secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    //       expiresIn: TIME.JWT.THIRTY_DAYS,
    //     },
    //   ),
    // ]);

    // this.updateTokenOfUser(data.userId, data.deviceId, refreshToken);
    return { accessToken: '', refreshToken: '' };
  }

  async updateTokenOfUser(
    userId: string,
    deviceId: string,
    refreshToken: string,
  ) {
    // const token = await this.refreshTokens.findOne({
    //   where: {
    //     user_id: userId,
    //     device_id: deviceId,
    //   },
    // });

    // if (token) {
    //   token.refresh_token = refreshToken;
    //   return await token.save();
    // }

    // return await this.refreshTokens.create({
    //   id: userId,
    //   role: rold
    //   refresh_token: refreshToken,
    // });
  }
}
