import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../shared/user.decorator';
import { UserEntity } from '../../entities/user.entity';
import { CreatePostDTO } from '../../models/post.model';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {
  }

  @Get()
  @UseGuards(AuthGuard())
  async findByUser(@User() user: UserEntity) {
    return await this.postService.findByUser(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard())
  async createPost(@User() user: UserEntity, @Body(ValidationPipe) data: CreatePostDTO) {
    return await this.postService.createPost(user, data);
  }
}
