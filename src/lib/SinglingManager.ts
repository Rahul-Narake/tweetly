import { io, Socket } from 'socket.io-client';

export const BASE_URL = 'ws://localhost:5001';

export class SignalingManager {
  private ws: Socket;
  private static instance: SignalingManager;
  private callbacks: any = {};
  private id: number;
  private initialized: boolean = false;
  private onlineUsers: string[] = [];

  private constructor(id: number) {
    this.id = id;
    this.ws = io('ws://localhost:5001', {
      query: {
        userId: this.id,
      },
    });
    this.init();
  }

  public static getInstance(id: number) {
    if (!this.instance) {
      this.instance = new SignalingManager(id);
    }
    return this.instance;
  }

  init() {
    this.ws.io.open(() => {
      this.initialized = true;
    });

    this.ws.on('OnlineUsers', (os) => {
      this.onlineUsers = JSON.parse(os);
      console.log(this.onlineUsers);
    });

    this.ws.on('newMessage', (msg) => {
      console.log(msg);
    });
  }

  sendMessage(message: any) {
    const messageToSend = {
      ...message,
    };
    this.ws.send(JSON.stringify(messageToSend));
  }
}
