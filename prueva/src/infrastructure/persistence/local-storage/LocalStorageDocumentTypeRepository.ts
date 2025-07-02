import type { DocumentType } from '../../../domain/models/DocumentType';
import type { DocumentTypeRepository } from '../../../domain/repositories/DocumentTypeRepository';

const LOCAL_STORAGE_KEY = 'documentTypes';

export class LocalStorageDocumentTypeRepository implements DocumentTypeRepository {
  async getAll(): Promise<DocumentType[]> {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async getById(id: string): Promise<DocumentType | undefined> {
    const documentTypes = await this.getAll();
    return documentTypes.find(dt => dt.id === id);
  }

  async save(documentType: DocumentType): Promise<void> {
    const documentTypes = await this.getAll();
    const index = documentTypes.findIndex(dt => dt.id === documentType.id);
    if (index > -1) {
      documentTypes[index] = documentType;
    } else {
      documentTypes.push(documentType);
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documentTypes));
  }

  async delete(id: string): Promise<void> {
    let documentTypes = await this.getAll();
    documentTypes = documentTypes.filter(dt => dt.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(documentTypes));
  }
}
