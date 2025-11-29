import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreateBookDto } from './create-books-dto';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBookDto extends PartialType(CreateBookDto) {
  @Field(() => ID)
  @IsNotEmpty()
  _id: string;

  @Field()
  @IsNotEmpty()
  createdAt: string;
}
