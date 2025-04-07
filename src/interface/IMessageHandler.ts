export interface IMessageHandler<T = any> {
  handle(message: T): Promise<void>;
}
