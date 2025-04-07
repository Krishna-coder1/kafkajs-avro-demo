"use strict";
// KafkaFactory.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaFactory = void 0;
var kafkajs_1 = require("kafkajs");
var confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
var KafkaFactory = /** @class */ (function () {
    function KafkaFactory(config) {
        this.config = config;
        this.kafka = new kafkajs_1.Kafka({
            clientId: config.clientId,
            brokers: config.brokers,
            ssl: true,
            connectionTimeout: 2400,
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
        this.producer = this.kafka.producer();
        this.admin = this.kafka.admin();
        this.topic = config.topic;
        this.schemaPath = config.schemaPath;
    }
    KafkaFactory.prototype.createTopicIfNotExists = function () {
        return __awaiter(this, void 0, void 0, function () {
            var topics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.admin.connect()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.admin.listTopics()];
                    case 2:
                        topics = _a.sent();
                        if (!!topics.includes(this.topic)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.admin.createTopics({
                                topics: [{ topic: this.topic, numPartitions: 1, replicationFactor: 3 }],
                            })];
                    case 3:
                        _a.sent();
                        console.log("\uD83C\uDD95 Created topic: " + this.topic);
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("\u2139\uFE0F Topic already exists: " + this.topic);
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.admin.disconnect()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    KafkaFactory.prototype.registerSchema = function () {
        return __awaiter(this, void 0, void 0, function () {
            var schema, subject, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.registryId) return [3 /*break*/, 3];
                        return [4 /*yield*/, confluent_schema_registry_1.readAVSCAsync(this.schemaPath)];
                    case 1:
                        schema = _a.sent();
                        subject = this.topic + "-value";
                        return [4 /*yield*/, this.registry.register(schema, { subject: subject })];
                    case 2:
                        id = (_a.sent()).id;
                        this.registryId = id;
                        console.log("✅ Registered schema with ID:", id);
                        _a.label = 3;
                    case 3: return [2 /*return*/, this.registryId];
                }
            });
        });
    };
    KafkaFactory.prototype.produce = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var schemaId, outgoingMessage;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.createTopicIfNotExists()];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this.registerSchema()];
                    case 2:
                        schemaId = _b.sent();
                        return [4 /*yield*/, this.producer.connect()];
                    case 3:
                        _b.sent();
                        _a = {
                            key: message["id"] || undefined
                        };
                        return [4 /*yield*/, this.registry.encode(schemaId, message)];
                    case 4:
                        outgoingMessage = (_a.value = _b.sent(),
                            _a);
                        return [4 /*yield*/, this.producer.send({
                                topic: this.topic,
                                messages: [outgoingMessage],
                            })];
                    case 5:
                        _b.sent();
                        console.log("\u2705 Produced message: " + JSON.stringify(message));
                        return [4 /*yield*/, this.producer.disconnect()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return KafkaFactory;
}());
exports.KafkaFactory = KafkaFactory;
