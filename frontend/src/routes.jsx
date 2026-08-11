import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// User pages
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import AccountSummary from './pages/user/AccountSummary';
import TransferMoney from './pages/user/TransferMoney';
import DepositWithdraw from './pages/user/DepositWithdraw';
import Transactions from './pages/user/Transactions';

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ManageAccounts from './pages/admin/ManageAccounts';
import TransactionsMonitor from './pages/admin/TransactionsMonitor';
import LoanApproval from './pages/admin/LoanApproval';

// Layout wrapper with Sidebar
import Sidebar from './components/Sidebar';

function ProtectedLayout({ children, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: "'DM Sans', sans-serif", color: '#94a3b8' }}>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/login" replace />;
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: '220px' }}>{children}</div>
    </div>
  );
}

export const routes = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },

  // User routes
  {
    path: '/user/dashboard',
    element: <ProtectedLayout><Dashboard /></ProtectedLayout>,
  },
  {
    path: '/user/account-summary',
    element: <ProtectedLayout><AccountSummary /></ProtectedLayout>,
  },
  {
    path: '/user/transactions',
    element: <ProtectedLayout><Transactions /></ProtectedLayout>,
  },
  {
    path: '/user/transfer',
    element: <ProtectedLayout><TransferMoney /></ProtectedLayout>,
  },
  {
    path: '/user/deposit-withdraw',
    element: <ProtectedLayout><DepositWithdraw /></ProtectedLayout>,
  },
  {
    path: '/user/profile',
    element: <ProtectedLayout><Profile /></ProtectedLayout>,
  },

  // Admin routes
  {
    path: '/admin/dashboard',
    element: <ProtectedLayout requiredRole="ADMIN"><AdminDashboard /></ProtectedLayout>,
  },
  {
    path: '/admin/users',
    element: <ProtectedLayout requiredRole="ADMIN"><ManageUsers /></ProtectedLayout>,
  },
  {
    path: '/admin/accounts',
    element: <ProtectedLayout requiredRole="ADMIN"><ManageAccounts /></ProtectedLayout>,
  },
  {
    path: '/admin/transactions',
    element: <ProtectedLayout requiredRole="ADMIN"><TransactionsMonitor /></ProtectedLayout>,
  },
  {
    path: '/admin/loans',
    element: <ProtectedLayout requiredRole="ADMIN"><LoanApproval /></ProtectedLayout>,
  },
];
