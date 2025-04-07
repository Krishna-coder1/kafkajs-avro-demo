export interface IKafkaSchemaService {
  register(): Promise<number>;
  encode<T>(schemaId: number, message: T): Promise<Buffer>;
}
