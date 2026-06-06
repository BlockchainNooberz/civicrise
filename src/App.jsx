import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster as Sonner } from 'sonner';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Pages
import Landing from '@/pages/Landing';
import DemoAccess from '@/pages/DemoAccess';
import DemoPortal from '@/pages/DemoPortal';
import AppLayout from '@/components/layout/AppLayout';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import CampsPage from '@/pages/admin/CampsPage';
import ResidentsPage from '@/pages/admin/ResidentsPage';
import ResidentIntake from '@/pages/admin/ResidentIntake';
import ResidentDetail from '@/pages/admin/ResidentDetail';
import CoursesPage from '@/pages/admin/CoursesPage';
import ReintegrationPage from '@/pages/admin/ReintegrationPage';
import PartnersPage from '@/pages/admin/PartnersPage';
import CityMap from '@/pages/admin/CityMap';
import SupplyTracker from '@/pages/admin/SupplyTracker';
import InvestorPitch from '@/pages/admin/InvestorPitch';

// Resident pages
import ResidentDashboard from '@/pages/resident/ResidentDashboard';
import ResidentCourses from '@/pages/resident/ResidentCourses';
import ResidentWallet from '@/pages/resident/ResidentWallet';
import ResidentCertifications from '@/pages/resident/ResidentCertifications';
import ResidentMarketplace from '@/pages/resident/ResidentMarketplace';
import ResidentPath from '@/pages/resident/ResidentPath';

const AdminLayout = () => <AppLayout role="admin" />;
const ResidentLayout = () => <AppLayout role="resident" />;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />
      <Route path="/demo-access" element={<DemoAccess />} />
      <Route path="/demo" element={<DemoPortal />} />

      {/* Admin portal */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/camps" element={<CampsPage />} />
        <Route path="/admin/residents" element={<ResidentsPage />} />
        <Route path="/admin/residents/new" element={<ResidentIntake />} />
        <Route path="/admin/residents/:id" element={<ResidentDetail />} />
        <Route path="/admin/courses" element={<CoursesPage />} />
        <Route path="/admin/reintegration" element={<ReintegrationPage />} />
        <Route path="/admin/partners" element={<PartnersPage />} />
        <Route path="/admin/citymap" element={<CityMap />} />
        <Route path="/admin/supplies" element={<SupplyTracker />} />
        <Route path="/admin/pitch" element={<InvestorPitch />} />
        <Route path="/admin/marketplace" element={<Navigate to="/admin" replace />} />
        <Route path="/admin/timelogs" element={<ResidentsPage />} />
      </Route>

      {/* Resident portal */}
      <Route element={<ResidentLayout />}>
        <Route path="/resident" element={<ResidentDashboard />} />
        <Route path="/resident/wallet" element={<ResidentWallet />} />
        <Route path="/resident/courses" element={<ResidentCourses />} />
        <Route path="/resident/certifications" element={<ResidentCertifications />} />
        <Route path="/resident/marketplace" element={<ResidentMarketplace />} />
        <Route path="/resident/path" element={<ResidentPath />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
        <Sonner theme="dark" position="top-right" />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App