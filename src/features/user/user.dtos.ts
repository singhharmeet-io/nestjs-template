import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { SWAGGER_PROPERTIES } from 'src/shared/constants';
import ERROR_MSGS from 'src/shared/constants/error.constants';

export class IRegisterDto {
  @ApiProperty(SWAGGER_PROPERTIES.USER.EMAIL)
  @IsNotEmpty({ message: ERROR_MSGS.REQUIRED_EMAIL })
  @IsEmail({}, { message: ERROR_MSGS.INVALID_EMAIL })
  email: string;

  @ApiProperty(SWAGGER_PROPERTIES.USER.PASSWORD)
  @IsString()
  @IsNotEmpty({ message: ERROR_MSGS.REQUIRED_PASSWORD })
  @MinLength(6, { message: ERROR_MSGS.INVALID_PASSWORD })
  password: string;
}
