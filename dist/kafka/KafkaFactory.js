"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaFactory = void 0;
var kafkajs_1 = require("kafkajs");
var confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
var KafkaAdminService_1 = require("./KafkaAdminService");
var KafkaSchemaService_1 = require("./KafkaSchemaService");
var KafkaProducer_1 = require("./KafkaProducer");
var KafkaConsumer_1 = require("./KafkaConsumer");
var KafkaFactory = /** @class */ (function () {
    function KafkaFactory(config) {
        this.config = config;
        this.kafka = new kafkajs_1.Kafka({
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
        this.registry = new confluent_schema_registry_1.SchemaRegistry({
            host: config.registryConfig.host,
            auth: {
                username: config.registryConfig.username,
                password: config.registryConfig.password,
            },
        });
    }
    KafkaFactory.prototype.createAdminService = function () {
        return new KafkaAdminService_1.KafkaAdminService(this.kafka.admin(), this.config.topic);
    };
    KafkaFactory.prototype.createSchemaService = function () {
        return new KafkaSchemaService_1.KafkaSchemaService(this.registry, this.config.topic, this.config.schemaPath);
    };
    KafkaFactory.prototype.createProducer = function () {
        return new KafkaProducer_1.KafkaProducer(this.kafka.producer(), this.config.topic);
    };
    KafkaFactory.prototype.createConsumer = function () {
        return new KafkaConsumer_1.KafkaConsumer(this.kafka.consumer({ groupId: "nodejs-client" }), this.config.topic, this.registry);
    };
    return KafkaFactory;
}());
exports.KafkaFactory = KafkaFactory;
