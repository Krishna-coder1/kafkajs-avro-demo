// KafkaAdminService.ts
import { Admin } from "kafkajs";
import { IKafkaAdminService } from "../interface/IKafkaAdminService";

export class KafkaAdminService implements IKafkaAdminService {
  constructor(private admin: Admin, private topic: string) {}

  async ensureTopicExists(): Promise<void> {
    await this.admin.connect();
    const topics = await this.admin.listTopics();

    if (!topics.includes(this.topic)) {
      await this.admin.createTopics({
        topics: [{ topic: this.topic, numPartitions: 1, replicationFactor: 3 }],
      });
      console.log(`🆕 Created topic: ${this.topic}`);
    } else {
      console.log(`ℹ️ Topic already exists: ${this.topic}`);
    }

    await this.admin.disconnect();
  }
}
