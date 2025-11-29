import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Book extends Document {
  @Field(() => ID)
  declare readonly _id: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field({ nullable: true })
  @Prop()
  description?: string;

  @Field()
  @Prop({ required: true })
  author: string;

  @Field()
  declare readonly createdAt: Date;

  @Field()
  declare readonly updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
