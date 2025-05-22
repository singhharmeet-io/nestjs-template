import { Inject, Injectable, ConflictException } from '@nestjs/common';
import { MODELS_REPOSITORIES, TIME } from 'src/shared/constants';
import { IRegisterDto } from './user.dtos';
import { CryptoService } from 'src/shared/utils/crypto.service';
import { ModelCtor } from 'sequelize-typescript';
import User from 'src/@infra/databases/postgre/entities/users.entity';
import ERROR_MSGS from 'src/shared/constants/error.constants';
import { Transaction } from 'sequelize';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
  constructor(
    @Inject(MODELS_REPOSITORIES.USER) private readonly users: ModelCtor<User>,
    private readonly cryptoService: CryptoService,
    private readonly tokenService: TokenService,
  ) {}

  async register(
    payload: IRegisterDto,
    tx: Transaction,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = payload;
    let user = await this.users.findOne({ where: { email } });
    if (user) throw new ConflictException(ERROR_MSGS.USER_ALREADY_EXISTS);
    const hashedPassword = await this.cryptoService.encryptBcrypt(password);
    user = await this.users.create(
      { email, password: hashedPassword },
      { transaction: tx },
    );

    const tokens = this.tokenService.getTokens(
      { userId: user.id },
      TIME.JWT.FIFTEEN_MINUTES,
    );

    return tokens;
  }
}
