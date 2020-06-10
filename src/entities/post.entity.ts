import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractBaseEntity } from '../shared/abstract-base.entity';
import { IsEmail } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity extends AbstractBaseEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(
    type => UserEntity,
    user => user.posts,
    { eager: true },
  )
  @JoinColumn({
    name: 'user_id',
  })
  author: UserEntity;

  toJSON() {
    return classToPlain(this);
  }
}
