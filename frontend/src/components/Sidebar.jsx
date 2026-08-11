import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const icons = {
  dashboard: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  accounts: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  ),
  transactions: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  transfer: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <polyline points="17 1 21 5 17 9" />
      <path d="M3 11V9a4 4 0 014-4h14" />
      <polyline points="7 23 3 19 7 15" />
      <path d="M21 13v2a4 4 0 01-4 4H3" />
    </svg>
  ),
  deposit: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  ),
  profile: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  users: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  loan: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  monitor: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  logout: (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

const userNavItems = [
  { label: 'Dashboard', icon: 'dashboard', path: '/user/dashboard' },
  { label: 'Account Summary', icon: 'accounts', path: '/user/account-summary' },
  { label: 'Transactions', icon: 'transactions', path: '/user/transactions' },
  { label: 'Transfer Money', icon: 'transfer', path: '/user/transfer' },
  { label: 'Deposit / Withdraw', icon: 'deposit', path: '/user/deposit-withdraw' },
  { label: 'Profile', icon: 'profile', path: '/user/profile' },
];

const adminNavItems = [
  { label: 'Admin Dashboard', icon: 'dashboard', path: '/admin/dashboard' },
  { label: 'Manage Users', icon: 'users', path: '/admin/users' },
  { label: 'Manage Accounts', icon: 'accounts', path: '/admin/accounts' },
  { label: 'Transactions Monitor', icon: 'monitor', path: '/admin/transactions' },
  { label: 'Loan Approval', icon: 'loan', path: '/admin/loans' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = user?.role === 'ADMIN' ? adminNavItems : userNavItems;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>
        Vault<span style={{ color: '#38bdf8' }}>X</span>
      </div>

      <div style={styles.roleTag}>
        {user?.role === 'ADMIN' ? '⚡ Admin Panel' : '👤 User Portal'}
      </div>

      <nav style={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {}),
            })}
          >
            <span style={styles.navIcon}>{icons[item.icon]}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div style={styles.sidebarBottom}>
        <div style={styles.userInfo}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={styles.userName}>{user?.name || 'User'}</div>
            <div style={styles.userEmail}>{user?.email || ''}</div>
          </div>
        </div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          {icons.logout} Logout
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '220px',
    background: '#0f172a',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 14px',
    zIndex: 100,
    overflowY: 'auto',
  },
  logo: {
    fontFamily: "'Playfair Display', serif",
    color: '#f8fafc',
    fontSize: '22px',
    fontWeight: 600,
    marginBottom: '8px',
    paddingLeft: '8px',
  },
  roleTag: {
    fontSize: '10px',
    color: '#475569',
    paddingLeft: '8px',
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 12px',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#94a3b8',
    transition: 'all 0.2s',
    fontFamily: "'DM Sans', sans-serif",
  },
  navItemActive: {
    background: '#1e293b',
    color: '#f8fafc',
  },
  navIcon: {
    flexShrink: 0,
    opacity: 0.85,
  },
  sidebarBottom: {
    borderTop: '0.5px solid #1e293b',
    paddingTop: '16px',
    marginTop: '16px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '12px',
    padding: '8px',
    borderRadius: '8px',
    background: '#1e293b',
  },
  avatar: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    fontWeight: 600,
    color: '#fff',
    flexShrink: 0,
  },
  userName: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#e2e8f0',
  },
  userEmail: {
    fontSize: '10px',
    color: '#64748b',
    marginTop: '1px',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    width: '100%',
    padding: '9px 12px',
    borderRadius: '8px',
    background: 'transparent',
    border: 'none',
    color: '#ef4444',
    fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
};
