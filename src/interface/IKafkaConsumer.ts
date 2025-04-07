export interface IKafkaConsumer {
  connect(): Promise<void>;
  subscribe(): Promise<void>;
  disconnect(): Promise<void>;
}
