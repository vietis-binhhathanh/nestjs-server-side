import { IsString } from 'class-validator';

class PostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
}

export class CreatePostDTO extends PostDTO {
}
