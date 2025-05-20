import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Sequelize } from 'sequelize';
import { ResponseService } from 'src/shared/services/response.service';

@ApiTags('USER')
@Controller('user')
export class UserController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly sequelize: Sequelize,
  ) {}

   @ApiBearerAuth()
    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    async refreshTokens(@User() user: Record<string, unknown>) {
      try {
        const userId = user['userId'] as string;
        const refreshToken = user['refreshToken'] as string;
        const result = await this.tokensService.refresh(
          userId,
          'deviceId',
          refreshToken,
        );
  
        return this.responseService.success('Success', result!);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return this.responseService.error400(error.message, error);
        }
      }
    }
  }
  
}
