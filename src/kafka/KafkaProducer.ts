import { Producer } from "kafkajs";
import { IKafkaProducer } from "../interface/IKafkaProducer";

export class KafkaProducer implements IKafkaProducer {
  constructor(private producer: Producer, private topic: string) {}

  async connect(): Promise<void> {
    await this.producer.connect();
  }

  async send<T>(message: T, key?: string): Promise<void> {
    await this.producer.send({
      topic: this.topic,
      messages: [
        {
          key: key,
          value: message as unknown as Buffer,
        },
      ],
    });
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }
}
