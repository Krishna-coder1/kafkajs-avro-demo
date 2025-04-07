import { IMessageHandler } from "../interface/IMessageHandler";

export class MessageHandler implements IMessageHandler {
  async handle(message: any): Promise<void> {
    console.log("📩 Received message:", message);
    // You can add transformation, validation, etc. here
  }
}
