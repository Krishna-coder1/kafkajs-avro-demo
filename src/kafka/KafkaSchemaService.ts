import {
  SchemaRegistry,
  readAVSCAsync,
} from "@kafkajs/confluent-schema-registry";
import { IKafkaSchemaService } from "../interface/IKafkaSchemaService";

export class KafkaSchemaService implements IKafkaSchemaService {
  private registryId?: number;

  constructor(
    private registry: SchemaRegistry,
    private topic: string,
    private schemaPath: string
  ) {}

  async register(): Promise<number> {
    if (!this.registryId) {
      const schema = await readAVSCAsync(this.schemaPath);
      const subject = `${this.topic}-value`;
      const { id } = await this.registry.register(schema, { subject });
      this.registryId = id;
      console.log("✅ Registered schema with ID:", id);
    }

    return this.registryId!;
  }

  async encode<T>(schemaId: number, message: T): Promise<Buffer> {
    return this.registry.encode(schemaId, message);
  }
}
