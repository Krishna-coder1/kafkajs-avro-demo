import { Consumer, EachMessagePayload } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";
import { IKafkaConsumer } from "../interface/IKafkaConsumer";

export class KafkaConsumer implements IKafkaConsumer {
  constructor(
    private consumer: Consumer,
    private topic: string,
    private registry: SchemaRegistry
  ) {}

  async connect(): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: this.topic, fromBeginning: true });
  }

  async subscribe(): Promise<void> {
    await this.connect();

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        if (!message.value) return;

        const decoded = await this.registry.decode(message.value);

        console.log("📥 Consumed message:", decoded);
      },
    });
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
}
