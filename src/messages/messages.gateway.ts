import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Messages } from './schema/messages.schema';
@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/messages',
})
export class MessagesGateway {
  @WebSocketServer() wss: Server;

  sendUpdateMessage(message: Messages): void {
    this.wss.emit('updateMessage', message);
  }

  sendNewMessage(message: Messages): void {
    this.wss.emit('addMessage', message);
  }
}
