import { Route } from 'react-router-dom';
import ProtectDocumentMain from '../pages/ProtectDocument/ProtectDocumentMain';
import ProtectFromUpload from '../pages/ProtectDocument/ProtectFromUpload';
import ProtectFromMyFiles from '../pages/ProtectDocument/ProtectFromMyFiles';

<>
  <Route path="/ProtectDocument" element={<ProtectDocumentMain />} />
  <Route path="/ProtectDocument" element={<ProtectFromUpload />} />
  <Route path="/ProtectDocument" element={<ProtectFromMyFiles />} />
</>