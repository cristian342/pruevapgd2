import { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import type { Document } from '../../../domain/models/Document';
import type { DocumentType } from '../../../domain/models/DocumentType';

interface Props {
  documents: Document[];
  documentTypes: DocumentType[];
  onEdit: (document: Document) => void;
  onView: (document: Document) => void;
  onDelete: (id: string) => void;
}

export function DocumentList({ documents, documentTypes, onEdit, onView, onDelete }: Props) {
  const [filterName, setFilterName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  const filteredDocuments = documents.filter((doc) => {
    const matchesName = doc.name.toLowerCase().includes(filterName.toLowerCase());
    const matchesType = filterType === '' || doc.documentTypeId === filterType;
    const docDate = new Date(doc.creationDate);
    const startDate = filterStartDate ? new Date(filterStartDate) : null;
    const endDate = filterEndDate ? new Date(filterEndDate) : null;

    const matchesStartDate = !startDate || docDate >= startDate;
    const matchesEndDate = !endDate || docDate <= endDate;

    return matchesName && matchesType && matchesStartDate && matchesEndDate;
  });

  const getDocumentTypeName = (documentTypeId: string) => {
    const type = documentTypes.find(dt => dt.id === documentTypeId);
    return type ? type.name : 'Unknown Type';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>Document List</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          label="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          sx={{ minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="filter-type-label">Filter by Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            label="Filter by Type"
            onChange={(e) => setFilterType(e.target.value as string)}
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            {documentTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          type="date"
          value={filterStartDate}
          onChange={(e) => setFilterStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
        <TextField
          label="End Date"
          type="date"
          value={filterEndDate}
          onChange={(e) => setFilterEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ minWidth: 180 }}
        />
        <Button
          variant="outlined"
          onClick={() => {
            setFilterName('');
            setFilterType('');
            setFilterStartDate('');
            setFilterEndDate('');
          }}
        >
          Clear Filters
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="document table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDocuments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">No documents found.</TableCell>
              </TableRow>
            ) : (
              filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell component="th" scope="row">
                    {doc.name}
                  </TableCell>
                  <TableCell>{getDocumentTypeName(doc.documentTypeId)}</TableCell>
                  <TableCell>{new Date(doc.creationDate).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.status}</TableCell>
                  <TableCell align="right">
                    <IconButton aria-label="view" onClick={() => onView(doc)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => onEdit(doc)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => onDelete(doc.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
