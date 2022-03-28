import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClothesDto } from './dto/clothes..dto';
import { UpdateClothesDto } from './dto/update-clothes.dto';
import { Clothes } from './schema/clothes.schema';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  async create(@Body() createClothesDto: CreateClothesDto) {
    await this.clothesService.create(createClothesDto);
  }

  @Get()
  async getAll(): Promise<Clothes[]> {
    return this.clothesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Clothes> {
    return this.clothesService.findOne(id);
  }

  @Get(':category')
  async findByCategory(@Param('category') cat): Promise<Clothes[]> {
    return this.clothesService.findByCategory(cat);
  }

  @Get(':brand')
  async findByBrand(@Param('brand') brand): Promise<Clothes[]> {
    return this.clothesService.findByBrand(brand);
  }

  @Get(':condition')
  async findByCondition(@Param('condition') state): Promise<Clothes[]> {
    return this.clothesService.findByCondition(state);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.clothesService.delete(id);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() updateClothesDto: UpdateClothesDto) {
    return this.clothesService.update(id, updateClothesDto);
  }
}
