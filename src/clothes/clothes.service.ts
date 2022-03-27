import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Clothes, ClothesDocument } from './schema/clothes.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClothesDto } from './dto/clothes..dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';

@Injectable()
export class ClothesService {
  constructor(
    @InjectModel(Clothes.name) private clothesModel: Model<ClothesDocument>,
  ) {}

  private clothes: Clothes[] = [];

  async create(createClothesDto: CreateClothesDto): Promise<Clothes> {
    const clothes = new this.clothesModel(createClothesDto);
    return clothes.save();
  }

  async findAll(): Promise<Clothes[]> {
    return this.clothesModel.find().exec();
  }

  async findOne(id: string): Promise<Clothes> {
    return this.clothesModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedClothes = await this.clothesModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedClothes;
  }

  async update(id: number, updateClothesDto: UpdateClothesDto) {
    const clothes = await this.clothesModel
      .findByIdAndUpdate(id, updateClothesDto)
      .setOptions({ overwrite: true, new: true });
    if (!clothes) {
      throw new NotFoundException();
    }
    return clothes;
  }
}
