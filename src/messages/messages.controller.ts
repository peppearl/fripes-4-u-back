import {
  Controller,
  Get,
  Body,
  Request,
  Post,
  Param,
  Delete,
  Put,
  SetMetadata,
  Logger,
} from '@nestjs/common';
import { CreateMessagesDto } from './dto/messages.dto';
import { Messages } from './schema/messages.schema';
import { MessagesService } from './messages.service';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post()
  async create(@Body() createMessagesDto: CreateMessagesDto, @Request() req) {
    console.log(req.user);
    await this.messageService.create(createMessagesDto, req.user.userId);
  }

  @Public()
  @Get()
  async getAll(): Promise<Messages[]> {
    return this.messageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<Messages> {
    return this.messageService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.messageService.delete(id);
  }
}
