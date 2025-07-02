import { useState } from 'react';
import { DocumentForm } from '../components/DocumentForm';
import { DocumentList } from '../components/DocumentList'; // Import DocumentList
import { useDocuments } from '../hooks/useDocuments';
import { useDocumentTypes } from '../hooks/useDocumentTypes';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import type { Document } from '../../../domain/models/Document';

export function HomePage() {
  const { documents, addDocument, updateDocument, deleteDocument } = useDocuments();
  const { documentTypes } = useDocumentTypes();
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [viewingDocument, setViewingDocument] = useState<Document | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const handleEdit = (doc: Document) => {
    setEditingDocument(doc);
    setOpenEditDialog(true);
  };

  const handleView = (doc: Document) => {
    setViewingDocument(doc);
    setOpenViewDialog(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      await deleteDocument(id);
    }
  };

  const handleUpdateSubmit = async (docData: Omit<Document, 'id' | 'status'>) => {
    if (editingDocument) {
      const updatedDoc: Document = { ...editingDocument, ...docData };
      await updateDocument(updatedDoc);
      setOpenEditDialog(false);
      setEditingDocument(null);
    }
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingDocument(null);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setViewingDocument(null);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Document Management SPA</Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>Upload New Document</Typography>
      <DocumentForm onSubmit={addDocument} documentTypes={documentTypes} />

      <DocumentList
        documents={documents}
        documentTypes={documentTypes}
        onEdit={handleEdit}
        onView={handleView}
        onDelete={handleDelete}
      />

      {/* Edit Document Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="md">
        <DialogTitle>Edit Document</DialogTitle>
        <DialogContent>
          {editingDocument && (
            <DocumentForm
              onSubmit={handleUpdateSubmit}
              documentTypes={documentTypes}
              initialData={editingDocument}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* View Document Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} fullWidth maxWidth="md">
        <DialogTitle>View Document: {viewingDocument?.name}</DialogTitle>
        <DialogContent>
          {viewingDocument && (
            <Box>
              <Typography variant="subtitle1"><strong>Name:</strong> {viewingDocument.name}</Typography>
              <Typography variant="subtitle1"><strong>Type:</strong> {documentTypes.find(dt => dt.id === viewingDocument.documentTypeId)?.name || 'Unknown'}</Typography>
              <Typography variant="subtitle1"><strong>Creation Date:</strong> {new Date(viewingDocument.creationDate).toLocaleDateString()}</Typography>
              <Typography variant="subtitle1"><strong>Description:</strong> {viewingDocument.description}</Typography>
              <Typography variant="subtitle1"><strong>Status:</strong> {viewingDocument.status}</Typography>
              <Box sx={{ mt: 2 }}>
                {viewingDocument.fileType.startsWith('image/') && (
                  <img src={viewingDocument.fileContent} alt={viewingDocument.fileName} style={{ maxWidth: '100%', height: 'auto' }} />
                )}
                {viewingDocument.fileType === 'application/pdf' && (
                  <iframe src={viewingDocument.fileContent} width="100%" height="500px" style={{ border: 'none' }}></iframe>
                )}
                {!viewingDocument.fileType.startsWith('image/') && viewingDocument.fileType !== 'application/pdf' && (
                  <Typography>File type not directly viewable. <a href={viewingDocument.fileContent} download={viewingDocument.fileName}>Download File</a></Typography>
                )}
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
