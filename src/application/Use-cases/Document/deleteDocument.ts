import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository';

export const deleteDocument = (repo: DocumentRepository) => {
  return async (id: string) => {
    await repo.delete(id); // This will mark the document as 'deleted'
  };
};
