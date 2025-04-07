import dotenv from "dotenv";
dotenv.config();

import readline from "readline";
import { IKafkaAdminService } from "./interface/IKafkaAdminService";
import { IKafkaSchemaService } from "./interface/IKafkaSchemaService";
import { IKafkaProducer } from "./interface/IKafkaProducer";
import { IKafkaConsumer } from "./interface/IKafkaConsumer";
import { kafkaFactory } from "./factory";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve));

const bootstrap = async () => {
  const adminService: IKafkaAdminService = kafkaFactory.createAdminService();
  const schemaService: IKafkaSchemaService = kafkaFactory.createSchemaService();
  const producer: IKafkaProducer = kafkaFactory.createProducer();
  const consumer: IKafkaConsumer = kafkaFactory.createConsumer();

  await adminService.ensureTopicExists();
  const schemaId = await schemaService.register(); // should use your given schema

  await producer.connect();
  await consumer.subscribe();

  console.log("\n✅ Kafka Producer is ready.");
  console.log("You can now enter user data.");
  console.log("Type 'exit' at any prompt to quit.\n");

  while (true) {
    const name = await prompt("Enter name: ");
    if (name.toLowerCase() === "exit") break;

    const email = await prompt("Enter email: ");
    if (email.toLowerCase() === "exit") break;

    const message = { name, email };

    try {
      const encoded = await schemaService.encode(schemaId, message);
      await producer.send(encoded, email);
      await new Promise((res) => setTimeout(res, 1000));
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }
  }

  rl.close();
  await producer.disconnect();
  console.log("👋 Kafka producer shut down.");
};

bootstrap().catch((err) => {
  console.error("❌ Kafka bootstrap error:", err);
  process.exit(1);
});
