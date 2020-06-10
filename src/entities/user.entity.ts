import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { AbstractBaseEntity } from '../shared/abstract-base.entity';
import { IsEmail } from 'class-validator';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity extends AbstractBaseEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  username: string;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(
    type => PostEntity,
    post => post.author,
  )
  posts: PostEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
