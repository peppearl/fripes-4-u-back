import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClothesModule } from './clothes/clothes.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/fripes-4-u'), ClothesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
