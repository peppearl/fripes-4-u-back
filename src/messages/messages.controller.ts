import {
  Controller,
  Get,
  Body,
  Request,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateMessagesDto } from './dto/messages.dto';
import { Messages } from './schema/messages.schema';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post()
  async create(@Body() createMessagesDto: CreateMessagesDto, @Request() req) {
    console.log(req.user);
    await this.messageService.create(createMessagesDto, req.user.userId);
  }

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
