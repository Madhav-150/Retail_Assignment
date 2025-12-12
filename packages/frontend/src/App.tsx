import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Team from './pages/Team';
import Settings from './pages/Settings';
import {
  FaHome as FiHome,
  FaThLarge as FiLayers,
  FaCog as FiSettings,
  FaUsers as FiUsers,
  FaSignOutAlt as FiLogOut,
  FaBars as FiMenu,
  FaTimes as FiX
} from 'react-icons/fa';
import { useState } from 'react';
import './App.css';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const DashboardLayout = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FiHome size={18} /> },
    { name: 'Projects', path: '/projects', icon: <FiLayers size={18} /> },
    { name: 'Team', path: '/team', icon: <FiUsers size={18} /> },
    { name: 'Settings', path: '/settings', icon: <FiSettings size={18} /> },
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile menu button */}

      {/* Desktop Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="sidebar-logo">
            <span>Retail Media</span>
          </Link>
          <button
            className="md:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="user-info">
              <div className="user-name">{currentUser?.name || 'User'}</div>
              <div className="user-email">{currentUser?.email || ''}</div>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 ml-2"
              title="Sign out"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      <div
        className={`overlay ${mobileMenuOpen ? 'active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile menu button */}
        <header className="main-header">
          <button
            className="mobile-menu-btn md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu className="h-6 w-6" />
          </button>

          <h1 className="page-title">
            {navItems.find(item => isActive(item.path))?.name || 'Dashboard'}
          </h1>

          <div className="flex items-center gap-4">
            <div className="user-profile">
              <div className="user-avatar">
                {currentUser?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="user-info hidden md:block">
                <div className="user-name">{currentUser?.name || 'User'}</div>
                <div className="user-email">{currentUser?.email || ''}</div>
              </div>
            </div>
          </div>
        </header>

        <div className="main-container">
          <div className="fade-in">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* Public routes */}
          <Route path="/login" element={
            <PublicRoute>
              <div className="auth-body">
                <LoginForm />
              </div>
            </PublicRoute>
          } />
          <Route path="/signup" element={
            <PublicRoute>
              <div className="auth-body">
                <SignupForm />
              </div>
            </PublicRoute>
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />
          <Route path="/reset-password" element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          } />

          {/* Protected routes */}
          <Route element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* 404 route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
