import { Module } from '@nestjs/common';
import { ClothesController } from './clothes.controller';
import { ClothesService } from './clothes.service';
import { Clothes, ClothesSchema } from './schema/clothes.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Clothes.name, schema: ClothesSchema }]),
  ],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
