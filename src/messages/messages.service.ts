import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
//import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { MessagesGateway } from './messages.gateway';
import { Messages, MessagesDocument } from './schema/messages.schema';
import { CreateMessagesDto } from './dto/messages.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Messages.name) private messageModel: Model<MessagesDocument>,
    private messagesGateway: MessagesGateway,
    private UsersService: UsersService,
  ) {}
  private messages: Messages[] = [];

  async create(createMessageDto: CreateMessagesDto, userId): Promise<Messages> {
    const message = new this.messageModel(createMessageDto);
    message.date = new Date();
    message.author = userId;
    this.messagesGateway.sendNewMessage(message);
    return message.save();
  }

  async findAll(): Promise<Messages[]> {
    return this.messageModel.find().populate('author').exec();
  }

  async findOne(id: string): Promise<Messages> {
    return this.messageModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedMessage = await this.messageModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedMessage;
  }

  /*
  private readonly logger = new Logger(MessageService.name);

  @Cron(CronExpression.EVERY_5_SECONDS)
  async cron() {
    const userRandom = this.UsersService.randomUser();
    //console.log(users);

    //const randomUserName = random("otot")

    //let randomUserName = users[Math.floor(Math.random()*users.length)];
    console.log(userRandom);
  }
  
 */
  /*
    async createCron(createMessageDto: CreateMessageDto, userId): Promise<Messages> {

        const randomUserName = random("otot")

        const message = new this.messageModel(createMessageDto);
        message.date = new Date();
        message.author = randomUserName
        this.messagesGateway.sendNewMessage(message)
        return message.save();
    }

     */
}
