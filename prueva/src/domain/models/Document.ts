export interface Document {
  id: string;
  name: string;
  documentTypeId: string; // Reference to DocumentType
  creationDate: string; // ISO date string
  fileContent: string; // Base64 or Blob URL of the file
  fileName: string; // Original file name
  fileType: string; // Mime type of the file
  description: string;
  status: 'active' | 'deleted'; // For soft delete
}
