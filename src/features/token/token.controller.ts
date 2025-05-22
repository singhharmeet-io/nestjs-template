import { Controller, Get, UseGuards } from '@nestjs/common';
import { TokenService } from './token.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../core/decorators';
import { RefreshTokenGuard } from '../../core/guards/refreshToken.guard';
import { ResponseService } from 'src/shared/services/response.service';

@ApiTags('TOKENS')
@Controller('tokens')
export class TokenController {
  constructor(
    private readonly tokensService: TokenService,
    private readonly responseService: ResponseService,
  ) {}

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@User() user: Record<string, unknown>) {
    try {
      const userId = user['userId'] as string;
      const result = await this.tokensService.refresh(userId);
      return this.responseService.success('Success', result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return this.responseService.error400(error.message, error);
      }
    }
  }
}
