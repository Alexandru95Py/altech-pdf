import { Routes, Route, Navigate } from 'react-router-dom';

// Layout principal
import MainLayout from '../layout/MainLayout';

// Pagini standard
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import SupportPage from '../pages/SupportPage';
import NotificationsPage from '../pages/NotificationsPage';
import ToolsPage from '../pages/ToolsPage';
import MyFilesPage from '../pages/myfilesPage';

// Tools (Plan Gratuit)
import ViewPDF from '../pages/tools/ViewPDF';
import DeletePDF from '../pages/tools/DeletePDF';
import ReorderPDF from '../pages/tools/ReorderPDF';
import SplitPDF from '../pages/tools/SplitPDF';
import MergePDF from '../pages/tools/MergePDF';
import ConvertPDF from '../pages/tools/ConvertPDF';
import Create from '../pages/create';
import Attach from '../pages/ai/aiChat';
import FillAndSignPDF from '../pages/tools/FillandSignPDF';

// Plan Pro - rute protejate
import ProtectRoutes from './ProtectRoutes';
import CVGeneratorPage from '../pages/CVGeneratorPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Layout principal - rute protejate cu meniu */}
      <Route element={<MainLayout />}>
        {/* Pagini standard */}
        <Route path="/" element={<HomePage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/myfiles" element={<MyFilesPage />} />
        <Route path="/ai-chat" element={<Attach />} />

        {/* Unelte PDF - Plan Gratuit */}
        <Route path="/tools/view" element={<ViewPDF />} />
        <Route path="/tools/delete" element={<DeletePDF />} />
        <Route path="/tools/reorder" element={<ReorderPDF />} />
        <Route path="/tools/split" element={<SplitPDF />} />
        <Route path="/tools/merge" element={<MergePDF />} />
        <Route path="/tools/convert" element={<ConvertPDF />} />
        <Route path="/tools/fillandsign" element={<FillAndSignPDF />} />
        <Route path="/page/cv" element={<CVGeneratorPage />} />

        {/* Rute Plan Pro */}
        <Route path="/ProtectDocument/*" element={<ProtectRoutes />} />
      </Route>

      {/* Rute publice (fără layout) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Redirect fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;