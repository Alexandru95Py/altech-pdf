import { Routes, Route } from 'react-router-dom';

import ProtectDocumentMain from '../pages/ProtectDocument/ProtectDocumentMain';
import ProtectFromUpload from '../pages/ProtectDocument/ProtectFromUpload';
import ProtectFromMyFiles from '../pages/ProtectDocument/ProtectFromMyFiles';

const ProtectRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<ProtectDocumentMain />} />
      <Route path="upload" element={<ProtectFromUpload />} />
      <Route path="myfiles" element={<ProtectFromMyFiles />} />
    </Routes>
  );
};

export default ProtectRoutes;