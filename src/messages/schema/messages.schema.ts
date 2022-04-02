import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schema/users.schema';

export type MessagesDocument = Messages & Document;

@Schema()
export class Messages {
  @Prop()
  id: number;

  @Prop()
  date: Date;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const MessagesSchema = SchemaFactory.createForClass(Messages);
