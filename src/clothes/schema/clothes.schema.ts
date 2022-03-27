import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClothesDocument = Clothes & Document;

@Schema()
export class Clothes {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  quantity: number;

  @Prop()
  description: string;
}

export const ClothesSchema = SchemaFactory.createForClass(Clothes);
