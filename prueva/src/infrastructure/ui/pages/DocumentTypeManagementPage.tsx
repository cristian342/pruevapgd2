import { useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDocumentTypes } from '../hooks/useDocumentTypes';
import type { DocumentType } from '../../../domain/models/DocumentType';

export function DocumentTypeManagementPage() {
  const { documentTypes, addDocumentType, updateDocumentType, deleteDocumentType } = useDocumentTypes();
  const [newTypeName, setNewTypeName] = useState('');
  const [editingType, setEditingType] = useState<DocumentType | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddType = async () => {
    if (newTypeName.trim()) {
      await addDocumentType(newTypeName.trim());
      setNewTypeName('');
    }
  };

  const handleEditClick = (type: DocumentType) => {
    setEditingType(type);
    setNewTypeName(type.name);
    setOpenDialog(true);
  };

  const handleUpdateType = async () => {
    if (editingType && newTypeName.trim()) {
      await updateDocumentType(editingType.id, newTypeName.trim());
      setOpenDialog(false);
      setEditingType(null);
      setNewTypeName('');
    }
  };

  const handleDeleteType = async (id: string) => {
    if (confirm('Are you sure you want to delete this document type?')) {
      await deleteDocumentType(id);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingType(null);
    setNewTypeName('');
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Manage Document Types</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="New Document Type Name"
          value={newTypeName}
          onChange={(e) => setNewTypeName(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddType}>Add Type</Button>
      </Box>

      <Typography variant="h6">Existing Document Types</Typography>
      <List>
        {documentTypes.map((type) => (
          <ListItem
            key={type.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(type)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteType(type.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={type.name} />
          </ListItem>
        ))}
      </List>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editingType ? 'Edit Document Type' : 'Add Document Type'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Document Type Name"
            type="text"
            fullWidth
            value={newTypeName}
            onChange={(e) => setNewTypeName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateType}>{editingType ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
