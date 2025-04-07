// IKafkaAdminService.ts
export interface IKafkaAdminService {
  ensureTopicExists(): Promise<void>;
}
