// TODO: add sticky sessions for load balancing purposes before deploying
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Client, Server } from 'socket.io';
import { UserEntity } from '../auth/models/user.entity';

@WebSocketGateway()
export class AuthSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server: Server;
  clients: { [id: string]: Client } = {};

  handleConnection(client: Client) {
    this.clients[client.id] = client;
  }

  handleDisconnect(client: Client) {
    delete this.clients[client.id];
  }

  @SubscribeMessage('getAuthId')
  onGetAuthId(client: Client, message: undefined) {
    this.server.emit('setAuthId', client.id);
  }

  sendProfileInfo(clientId: string, user: UserEntity) {
    this.clients[clientId].server.emit('receiveUserInfo', user);
  }
}
