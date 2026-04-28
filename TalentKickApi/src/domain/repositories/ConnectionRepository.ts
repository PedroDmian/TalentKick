export interface ConnectionRepository {
  requestConnection(requesterId: string, requestedId: string): Promise<void>;
  updateStatus(id: string, status: 'accepted' | 'rejected'): Promise<void>;
  findById(id: string): Promise<any | null>;
  findPendingByUserId(userId: string): Promise<any[]>;
  exist(requesterId: string, requestedId: string): Promise<boolean>;
}
