"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafkaFactory = void 0;
var KafkaFactory_1 = require("./kafka/KafkaFactory");
exports.kafkaFactory = new KafkaFactory_1.KafkaFactory({
    brokers: [process.env.KAFKA_BROKER],
    clientId: process.env.KAFKA_CLIENT_ID,
    topic: process.env.KAFKA_TOPIC,
    schemaPath: "./avro/schema.avsc",
    kafkaAuth: {
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD,
    },
    registryConfig: {
        host: process.env.SCHEMA_REGISTRY_HOST,
        username: process.env.SCHEMA_REGISTRY_USERNAME,
        password: process.env.SCHEMA_REGISTRY_PASSWORD,
    },
});
