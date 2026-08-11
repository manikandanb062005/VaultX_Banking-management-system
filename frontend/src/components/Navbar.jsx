import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatDate';

export default function Navbar({ title, subtitle }) {
  const { user } = useAuth();
  const today = formatDate(new Date());

  return (
    <header style={styles.navbar}>
      <div>
        <h1 style={styles.title}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>
      <div style={styles.right}>
        <div style={styles.dateChip}>{today}</div>
        <div style={styles.userChip}>
          <div style={styles.avatar}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <div style={styles.name}>{user?.name || 'User'}</div>
            <div style={styles.role}>{user?.role === 'ADMIN' ? 'Administrator' : 'Account Holder'}</div>
          </div>
        </div>
        <div style={styles.notifBtn}>
          <svg width="18" height="18" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 01-3.46 0" />
          </svg>
          <span style={styles.notifDot}></span>
        </div>
      </div>
    </header>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '22px',
    color: '#0f172a',
    fontWeight: 600,
    marginBottom: '2px',
  },
  subtitle: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  dateChip: {
    fontSize: '12px',
    color: '#64748b',
    background: '#fff',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '0.5px solid #e2e8f0',
  },
  userChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    background: '#fff',
    padding: '6px 14px 6px 8px',
    borderRadius: '24px',
    border: '0.5px solid #e2e8f0',
  },
  avatar: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 600,
    color: '#fff',
  },
  name: {
    fontSize: '12px',
    fontWeight: 500,
    color: '#1e293b',
  },
  role: {
    fontSize: '10px',
    color: '#94a3b8',
  },
  notifBtn: {
    position: 'relative',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: '#fff',
    border: '0.5px solid #e2e8f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  notifDot: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: '#ef4444',
    border: '1.5px solid #fff',
  },
};
