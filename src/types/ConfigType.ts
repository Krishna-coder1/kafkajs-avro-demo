type KafkaConfig = {
  brokers: string[];
  clientId: string;
  topic: string;
  schemaPath: string;
  kafkaAuth: {
    username: string;
    password: string;
  };
  registryConfig: {
    host: string;
    username: string;
    password: string;
  };
};
