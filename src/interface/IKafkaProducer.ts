export interface IKafkaProducer {
  connect(): Promise<void>;
  send<T>(message: T, key?: string): Promise<void>;
  disconnect(): Promise<void>;
}
