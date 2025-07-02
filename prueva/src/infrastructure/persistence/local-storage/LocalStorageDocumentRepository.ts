import type { Document } from '../../../domain/models/Document.ts';
import type { DocumentRepository } from '../../../domain/repositories/DocumentRepository.ts';

const STORAGE_KEY = 'documents';

export class LocalStorageDocumentRepository implements DocumentRepository {
  private async getRawAll(): Promise<Document[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  async save(document: Document): Promise<void> {
    const docs = await this.getRawAll();
    const index = docs.findIndex(d => d.id === document.id);
    if (index !== -1) {
      docs[index] = document;
    } else {
      docs.push(document);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  }

  async getAll(): Promise<Document[]> {
    const docs = await this.getRawAll();
    return docs.filter(doc => doc.status === 'active');
  }

  async findById(id: string): Promise<Document | null> {
    const docs = await this.getRawAll();
    return docs.find(doc => doc.id === id) || null;
  }

  async delete(id: string): Promise<void> {
    const docs = await this.getRawAll();
    const index = docs.findIndex(d => d.id === id);
    if (index !== -1) {
      docs[index].status = 'deleted';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    }
  }
}
