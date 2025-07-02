import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { HomePage } from './pages/Homepage';
import { DocumentTypeManagementPage } from './pages/DocumentTypeManagementPage';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Document Management SPA
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Documents
          </Button>
          <Button color="inherit" component={Link} to="/document-types">
            Manage Document Types
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 2 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/document-types" element={<DocumentTypeManagementPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default App;
