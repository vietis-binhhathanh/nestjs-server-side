import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../../entities/post.entity';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { User } from '../../shared/user.decorator';
import { CreatePostDTO } from '../../models/post.model';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
  }

  private ensureOwnership(user: UserEntity, post: PostEntity): boolean {
    return post.author.id === user.id;
  }

  async findByUser(user: UserEntity) {
    const postAuthor = user.id;
    return  await this.postRepository.find({where: {author: postAuthor}});
  }

  async createPost(user: UserEntity, data: CreatePostDTO) {
    if (data.title == undefined || data.content == undefined) {
      throw new BadRequestException();
    }
    const post = this.postRepository.create(data);
    post.author = user;
    await post.save();

    return post;
  }
}
