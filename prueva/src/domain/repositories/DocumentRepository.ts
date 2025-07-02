import type { Document } from '../models/Document';

export interface DocumentRepository {
  save(document: Document): Promise<void>;
  getAll(): Promise<Document[]>;
  findById(id: string): Promise<Document | null>;
  delete(id: string): Promise<void>; // Soft delete
}
