import type { Document } from '../../../domain/models/Document';
import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository';

export const updateDocument = (repo: DocumentRepository) => {
  return async (document: Document) => {
    await repo.save(document); // save method handles both create and update
  };
};
