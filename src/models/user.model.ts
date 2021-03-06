import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class UpdateUserDTO extends RegisterDTO {}

export interface AuthPayload {
  email: string;
}
