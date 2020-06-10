import { Body, Controller, Get, Logger, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../shared/user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { UpdateUserDTO } from '../../models/user.model';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
  }

  /**
   * Get user logged in
   * @param username
   */
  @Get()
  @UseGuards(AuthGuard())
  findCurrentUser(@User() { email }: UserEntity) {
    return this.userService.findByEmail(email);
  }

  /**
   * Change user information
   * @param email
   * @param data
   */
  @Put()
  @UseGuards(AuthGuard())
  update(@User() { email }: UserEntity, @Body(new ValidationPipe({
    transform: true, whitelist: true
  })) data: UpdateUserDTO) {
    Logger.log(`${email}`);
    return;
    return this.userService.updateUser(email, data);
  }
}
