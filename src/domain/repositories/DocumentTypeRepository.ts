import type { DocumentType } from '../models/DocumentType';

export interface DocumentTypeRepository {
  getAll(): Promise<DocumentType[]>;
  getById(id: string): Promise<DocumentType | undefined>;
  save(documentType: DocumentType): Promise<void>;
  delete(id: string): Promise<void>;
}
