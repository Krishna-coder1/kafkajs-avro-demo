import { IKafkaFactory } from "./interface/IKafkaFactory";
import { KafkaFactory } from "./kafka/KafkaFactory";

export const kafkaFactory: IKafkaFactory = new KafkaFactory({
  brokers: [process.env.KAFKA_BROKER!],
  clientId: process.env.KAFKA_CLIENT_ID!,
  topic: process.env.KAFKA_TOPIC!,
  schemaPath: "./avro/schema.avsc",
  kafkaAuth: {
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  registryConfig: {
    host: process.env.SCHEMA_REGISTRY_HOST!,
    username: process.env.SCHEMA_REGISTRY_USERNAME!,
    password: process.env.SCHEMA_REGISTRY_PASSWORD!,
  },
});
