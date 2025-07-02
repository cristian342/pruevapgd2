import type { Document } from 'domain/models/Document';
import type { DocumentRepository } from 'domain/repositories/DocumentRepository';

export const createDocument = (repo: DocumentRepository) => {
  return async (data: Omit<Document, 'id' | 'status'>) => { // Corrected type here
    const newDoc: Document = {
      ...data,
      id: crypto.randomUUID(),
      status: 'active' // Default status
    };
    await repo.save(newDoc);
  };
};
