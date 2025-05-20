import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';

import ToolsPage from '../pages/ToolsPage';
import SupportPage from '../pages/SupportPage';
import NotificationsPage from '../pages/NotificationsPage';

import ViewPDF from '../pages/tools/ViewPDF';
import DeletePDF from '../pages/tools/DeletePDF';
import ReorderPDF from '../pages/tools/ReorderPDF';
import SplitPDF from '../pages/tools/SplitPDF';
import MergePDF from '../pages/tools/MergePDF'; // <- nou adăugat

import MainLayout from '../layout/MainLayout';
import MyfilesPage from '../pages/myfilesPage'; // <- nou adăugat

import Create from '../pages/create'; // <- nou adăugat
import ConvertPDF from '../pages/tools/ConvertPDF'; // <- nou adăugat
import AiChat from '../pages/ai/aiChat';

import FillAndSignPDF from '../pages/tools/FillandSignPDF';


const AppRouter = () => {
  return (
    <Routes>
      {/* Layout principal - rute private (cu meniu) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/create" element={<Create />} /> {/* <- nou adăugat */}
        <Route path="/tools/convert" element={<ConvertPDF />} /> {/* <- nou adăugat */}
        <Route path="/tools/FillandSignPDF" element={<FillAndSignPDF />} /> {/* <- nou adăugat */}

        {/* Rute pentru utilizatori autentificați */}

        {/* Unelte PDF - Plan Gratuit */}
        <Route path="/tools/view" element={<ViewPDF />} />
        <Route path="/tools/delete" element={<DeletePDF />} />
        <Route path="/tools/reorder" element={<ReorderPDF />} />
        <Route path="/tools/split" element={<SplitPDF />} />
        <Route path="/tools/merge" element={<MergePDF />} /> 
        <Route path="/myfiles" element={<MyfilesPage />} /> {/* <- nou adăugat */}
        <Route path="/ai-chat" element={<AiChat />} /> {/* <- nou adăugat */}

        {/* Rute pentru utilizatori neautentificați */}
      </Route>

      {/* Rute publice (fără layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redirect pentru rute inexistente */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;