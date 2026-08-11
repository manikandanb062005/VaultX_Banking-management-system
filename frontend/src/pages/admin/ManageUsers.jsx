import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getAllUsers, toggleUserStatus } from '../../services/adminService';
import { formatDate } from '../../utils/formatDate';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers().then(setUsers).finally(() => setLoading(false));
  }, []);

  const handleToggle = async (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Manage Users" subtitle="View, activate or deactivate customer accounts" />

      <div style={styles.toolbar}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          style={styles.searchInput}
        />
        <div style={styles.count}>{filtered.length} user{filtered.length !== 1 ? 's' : ''}</div>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['User', 'Phone', 'Accounts', 'Joined', 'Status', 'Actions'].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading users...</td></tr>
            ) : filtered.map((u) => (
              <tr key={u.id}>
                <td style={styles.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '13px', fontWeight: 600, color: '#fff', flexShrink: 0,
                    }}>
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{u.name}</div>
                      <div style={{ fontSize: '11px', color: '#94a3b8' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={styles.td}>{u.phone}</td>
                <td style={styles.td}>
                  <span style={{ background: '#f1f5f9', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', color: '#475569' }}>
                    {u.accounts} account{u.accounts !== 1 ? 's' : ''}
                  </span>
                </td>
                <td style={styles.td}>{formatDate(u.joinDate)}</td>
                <td style={styles.td}>
                  <span style={{
                    fontSize: '11px', padding: '4px 10px', borderRadius: '20px', fontWeight: 500,
                    background: u.status === 'active' ? '#dcfce7' : '#fee2e2',
                    color: u.status === 'active' ? '#166534' : '#991b1b',
                  }}>
                    {u.status === 'active' ? '● Active' : '● Inactive'}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleToggle(u.id)}
                      style={{
                        padding: '6px 12px', borderRadius: '7px', fontSize: '12px', cursor: 'pointer',
                        border: '0.5px solid #e2e8f0', fontFamily: "'DM Sans', sans-serif",
                        background: u.status === 'active' ? '#fee2e2' : '#dcfce7',
                        color: u.status === 'active' ? '#991b1b' : '#166534',
                      }}>
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button style={{
                      padding: '6px 12px', borderRadius: '7px', fontSize: '12px', cursor: 'pointer',
                      border: '0.5px solid #e2e8f0', background: '#f8fafc', color: '#334155',
                      fontFamily: "'DM Sans', sans-serif",
                    }}>
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  toolbar: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  searchInput: {
    padding: '10px 14px', borderRadius: '9px', border: '0.5px solid #cbd5e1',
    fontSize: '13px', fontFamily: "'DM Sans', sans-serif", color: '#334155',
    background: '#fff', outline: 'none', width: '280px',
  },
  count: { fontSize: '13px', color: '#64748b', marginLeft: 'auto' },
  tableWrap: { background: '#fff', borderRadius: '14px', border: '0.5px solid #e2e8f0', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8',
    background: '#f8fafc', borderBottom: '0.5px solid #e2e8f0',
  },
  td: { padding: '13px 16px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#334155' },
};
