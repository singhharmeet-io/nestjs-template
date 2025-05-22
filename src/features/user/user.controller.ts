import { Controller, Body, Post, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import SUCCESS_MSGS from 'src/shared/constants/success.constants';
import { ResponseService } from 'src/shared/services/response.service';
import { IRegisterDto } from './user.dtos';
import { UserService } from './user.service';
import { SEQUELIZE, SWAGGER_OPERATIONS } from 'src/shared/constants';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(
    private readonly responseService: ResponseService,
    @Inject(SEQUELIZE) private readonly sequelize: Sequelize,
    private readonly userService: UserService,
  ) {}

  @ApiOperation(SWAGGER_OPERATIONS.REGISTER)
  @Post('register')
  async register(@Body() payload: IRegisterDto) {
    const tx = await this.sequelize.transaction();

    try {
      const result = await this.userService.register(payload, tx);
      await tx.commit();
      return this.responseService.success(SUCCESS_MSGS.USER_REGISTERED, result);
    } catch (error) {
      await tx.rollback();
      if (error instanceof Error) {
        return this.responseService.error400(error.message, error);
      }
    }
  }
}
