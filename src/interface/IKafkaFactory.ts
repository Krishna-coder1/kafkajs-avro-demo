import { KafkaAdminService } from "../kafka/KafkaAdminService";
import { KafkaSchemaService } from "../kafka/KafkaSchemaService";
import { KafkaProducer } from "../kafka/KafkaProducer";
import { KafkaConsumer } from "../kafka/KafkaConsumer";

export interface IKafkaFactory {
  createAdminService(): KafkaAdminService;
  createSchemaService(): KafkaSchemaService;
  createProducer(): KafkaProducer;
  createConsumer(): KafkaConsumer;
}
