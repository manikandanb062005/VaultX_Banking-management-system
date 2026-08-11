import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllUsers } from '../../services/adminService';
import { getAllTransactions } from '../../services/transactionService';

const StatCard = ({ icon, label, value, sub, color }) => (
  <div style={{ background: '#fff', borderRadius: '14px', padding: '20px', border: '0.5px solid #e2e8f0' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <span style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
      <span style={{ fontSize: '20px' }}>{icon}</span>
    </div>
    <div style={{ fontSize: '26px', fontWeight: 600, color: color || '#0f172a', marginBottom: '4px' }}>{value}</div>
    {sub && <div style={{ fontSize: '12px', color: '#94a3b8' }}>{sub}</div>}
  </div>
);

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  const activeUsers = users.filter(u => u.status === 'active').length;

  const recentActivity = [
    { action: 'New user registered', user: 'Arjun Jain', time: '5 min ago', icon: '👤', color: '#dbeafe' },
    { action: 'Loan application submitted', user: 'Sneha Mani', time: '22 min ago', icon: '📋', color: '#fef3c7' },
    { action: 'Large transfer flagged', user: 'Ravi Kumar', time: '1 hr ago', icon: '⚠', color: '#fee2e2' },
    { action: 'Account KYC verified', user: 'Manikandan K', time: '2 hr ago', icon: '✔', color: '#dcfce7' },
    { action: 'Password reset requested', user: 'Priya Kumar', time: '3 hr ago', icon: '🔑', color: '#f0f9ff' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Admin Dashboard" subtitle="System overview and monitoring" />

      <div style={styles.grid4}>
        <StatCard icon="👥" label="Total Users" value={users.length} sub={`${activeUsers} active`} />
        <StatCard icon="💰" label="Total Deposits" value="₹48.2L" sub="This month" color="#16a34a" />
        <StatCard icon="📤" label="Total Withdrawals" value="₹12.6L" sub="This month" color="#dc2626" />
        <StatCard icon="📋" label="Pending Loans" value="2" sub="Awaiting approval" color="#d97706" />
      </div>

      <div style={styles.grid2}>
        {/* Recent Activity */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Recent Activity</h3>
          {recentActivity.map((item, i) => (
            <div key={i} style={styles.actRow}>
              <div style={{ ...styles.actIcon, background: item.color }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={styles.actAction}>{item.action}</div>
                <div style={styles.actUser}>{item.user}</div>
              </div>
              <div style={styles.actTime}>{item.time}</div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Recent Users</h3>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>Loading...</div>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Accounts</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 5).map((u) => (
                  <tr key={u.id}>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '30px', height: '30px', borderRadius: '50%',
                          background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '11px', fontWeight: 600, color: '#fff', flexShrink: 0,
                        }}>
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{u.name}</div>
                          <div style={{ fontSize: '11px', color: '#94a3b8' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>{u.accounts}</td>
                    <td style={styles.td}>
                      <span style={{
                        fontSize: '11px', padding: '3px 9px', borderRadius: '20px',
                        background: u.status === 'active' ? '#dcfce7' : '#fee2e2',
                        color: u.status === 'active' ? '#166534' : '#991b1b',
                        fontWeight: 500,
                      }}>
                        {u.status === 'active' ? '● Active' : '● Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* System Health */}
      <div style={styles.panel}>
        <h3 style={styles.panelTitle}>System Health</h3>
        <div style={styles.healthGrid}>
          {[
            { label: 'API Server', status: 'Online', pct: 99.9, color: '#16a34a', bg: '#dcfce7' },
            { label: 'Database', status: 'Online', pct: 100, color: '#16a34a', bg: '#dcfce7' },
            { label: 'Payment Gateway', status: 'Online', pct: 98.7, color: '#16a34a', bg: '#dcfce7' },
            { label: 'SMS Service', status: 'Degraded', pct: 82, color: '#d97706', bg: '#fef3c7' },
          ].map((s) => (
            <div key={s.label} style={styles.healthCard}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}>{s.label}</span>
                <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '20px', background: s.bg, color: s.color, fontWeight: 500 }}>
                  {s.status}
                </span>
              </div>
              <div style={{ background: '#e2e8f0', borderRadius: '10px', height: '5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${s.pct}%`, background: s.color, borderRadius: '10px' }}></div>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{s.pct}% uptime</div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '20px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' },
  panel: { background: '#fff', borderRadius: '14px', padding: '22px', border: '0.5px solid #e2e8f0', marginBottom: '0' },
  panelTitle: { fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '16px' },
  actRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '0.5px solid #f1f5f9' },
  actIcon: { width: '34px', height: '34px', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 },
  actAction: { fontSize: '13px', fontWeight: 500, color: '#1e293b' },
  actUser: { fontSize: '11px', color: '#94a3b8', marginTop: '1px' },
  actTime: { fontSize: '11px', color: '#94a3b8', flexShrink: 0 },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '8px 10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', borderBottom: '0.5px solid #e2e8f0' },
  td: { padding: '11px 10px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#334155' },
  healthGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px' },
  healthCard: { background: '#f8fafc', borderRadius: '10px', padding: '14px' },
};
