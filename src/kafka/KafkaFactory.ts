import { Kafka } from "kafkajs";
import { SchemaRegistry } from "@kafkajs/confluent-schema-registry";

import { KafkaAdminService } from "./KafkaAdminService";
import { KafkaSchemaService } from "./KafkaSchemaService";
import { KafkaProducer } from "./KafkaProducer";
import { KafkaConsumer } from "./KafkaConsumer";

import { IKafkaFactory } from "../interface/IKafkaFactory";

export class KafkaFactory implements IKafkaFactory {
  private kafka: Kafka;
  private registry: SchemaRegistry;

  constructor(private config: KafkaConfig) {
    this.kafka = new Kafka({
      clientId: config.clientId,
      brokers: config.brokers,
      ssl: true,
      connectionTimeout: 6000,
      sasl: {
        mechanism: "plain",
        username: config.kafkaAuth.username,
        password: config.kafkaAuth.password,
      },
    });

    this.registry = new SchemaRegistry({
      host: config.registryConfig.host,
      auth: {
        username: config.registryConfig.username,
        password: config.registryConfig.password,
      },
    });
  }

  createAdminService(): KafkaAdminService {
    return new KafkaAdminService(this.kafka.admin(), this.config.topic);
  }

  createSchemaService(): KafkaSchemaService {
    return new KafkaSchemaService(
      this.registry,
      this.config.topic,
      this.config.schemaPath
    );
  }

  createProducer(): KafkaProducer {
    return new KafkaProducer(this.kafka.producer(), this.config.topic);
  }

  createConsumer(): KafkaConsumer {
    return new KafkaConsumer(
      this.kafka.consumer({ groupId: "nodejs-client" }),
      this.config.topic,
      this.registry
    );
  }
}
