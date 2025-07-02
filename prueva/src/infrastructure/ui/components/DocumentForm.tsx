import { useState, useEffect } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import type { Document } from '../../../domain/models/Document';
import type { DocumentType } from '../../../domain/models/DocumentType';

interface Props {
  onSubmit: (doc: Omit<Document, 'id' | 'status'>) => void;
  documentTypes: DocumentType[];
  initialData?: Omit<Document, 'id' | 'status'>;
}

export function DocumentForm({ onSubmit, documentTypes, initialData }: Props) {
  const [form, setForm] = useState<Omit<Document, 'id' | 'status'>>(() => initialData || {
    name: '',
    documentTypeId: '',
    creationDate: new Date().toISOString().split('T')[0], // Default to current date
    fileContent: '',
    fileName: '',
    fileType: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setForm(prevForm => ({
          ...prevForm,
          fileContent: base64,
          fileName: file.name,
          fileType: file.type,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!form.name || !form.documentTypeId || !form.creationDate || !form.description || (!initialData && !form.fileContent)) {
      alert('Please fill all required fields and attach a file for new documents.');
      return;
    }
    onSubmit(form);
    if (!initialData) { // Only reset form if it's a new document creation
      setForm({
        name: '',
        documentTypeId: '',
        creationDate: new Date().toISOString().split('T')[0],
        fileContent: '',
        fileName: '',
        fileType: '',
        description: '',
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Document Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <FormControl fullWidth required>
        <InputLabel id="document-type-label">Document Type</InputLabel>
        <Select
          labelId="document-type-label"
          id="documentTypeId"
          name="documentTypeId"
          value={form.documentTypeId}
          label="Document Type"
          onChange={handleChange}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Creation Date"
        name="creationDate"
        type="date"
        value={form.creationDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        required
      />
      {!initialData && ( // File input only for new documents
        <TextField
          label="Attach File (PDF, JPG, PNG)"
          name="file"
          type="file"
          onChange={handleFileChange}
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: '.pdf,.jpg,.png' }}
          required
        />
      )}
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        multiline
        rows={4}
        required
      />
      <Button type="submit" variant="contained">
        {initialData ? 'Update Document' : 'Upload Document'}
      </Button>
    </Box>
  );
}
