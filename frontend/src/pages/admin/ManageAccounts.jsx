import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getMyAccounts } from '../../services/accountService';

const MOCK_ALL_ACCOUNTS = [
  { id: 1, owner: 'Manikandan K', type: 'savings', balance: 284560, accountNumber: '1234567893914', bank: 'SBI', status: 'Active' },
  { id: 2, owner: 'Manikandan K', type: 'fd', balance: 100000, accountNumber: '9876543210001', bank: 'SBI', status: 'Locked' },
  { id: 3, owner: 'Ravi Kumar', type: 'savings', balance: 68000, accountNumber: '1111222234567', bank: 'HDFC', status: 'Active' },
  { id: 4, owner: 'Arjun Jain', type: 'current', balance: 215000, accountNumber: '3333444456789', bank: 'ICICI', status: 'Active' },
  { id: 5, owner: 'Sneha Mani', type: 'savings', balance: 32400, accountNumber: '5555666678901', bank: 'Axis', status: 'Inactive' },
];

export default function ManageAccounts() {
  const [accounts] = useState(MOCK_ALL_ACCOUNTS);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = accounts.filter((a) => {
    const matchSearch = a.owner.toLowerCase().includes(search.toLowerCase()) ||
      a.accountNumber.includes(search);
    const matchType = typeFilter === 'all' || a.type === typeFilter;
    return matchSearch && matchType;
  });

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  const selectStyle = {
    padding: '9px 14px', borderRadius: '8px', border: '0.5px solid #cbd5e1',
    fontSize: '13px', fontFamily: "'DM Sans', sans-serif", color: '#334155',
    background: '#fff', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Manage Accounts" subtitle="All customer accounts across the system" />

      <div style={styles.statRow}>
        {[
          { label: 'Total Accounts', value: accounts.length },
          { label: 'Active', value: accounts.filter(a => a.status === 'Active').length },
          { label: 'System Balance', value: `₹${(totalBalance / 100000).toFixed(1)}L` },
          { label: 'Fixed Deposits', value: accounts.filter(a => a.type === 'fd').length },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statLabel}>{s.label}</div>
            <div style={styles.statVal}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.toolbar}>
        <input value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by owner or account number..."
          style={{ ...selectStyle, width: '280px' }} />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={selectStyle}>
          <option value="all">All Types</option>
          <option value="savings">Savings</option>
          <option value="current">Current</option>
          <option value="fd">Fixed Deposit</option>
        </select>
      </div>

      <div style={styles.tableWrap}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['Account Holder', 'Account No.', 'Type', 'Bank', 'Balance', 'Status', 'Action'].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td style={styles.td}>{a.owner}</td>
                <td style={{ ...styles.td, fontFamily: 'monospace', color: '#475569' }}>
                  ••{a.accountNumber.slice(-6)}
                </td>
                <td style={styles.td}>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 500,
                    background: a.type === 'savings' ? '#dbeafe' : a.type === 'current' ? '#fef3c7' : '#f0f9ff',
                    color: a.type === 'savings' ? '#1d4ed8' : a.type === 'current' ? '#92400e' : '#0369a1',
                  }}>
                    {a.type.charAt(0).toUpperCase() + a.type.slice(1)}
                  </span>
                </td>
                <td style={styles.td}>{a.bank}</td>
                <td style={{ ...styles.td, fontWeight: 600, color: '#0f172a' }}>
                  ₹{a.balance.toLocaleString('en-IN')}
                </td>
                <td style={styles.td}>
                  <span style={{
                    fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 500,
                    background: a.status === 'Active' ? '#dcfce7' : a.status === 'Locked' ? '#fef3c7' : '#fee2e2',
                    color: a.status === 'Active' ? '#166534' : a.status === 'Locked' ? '#92400e' : '#991b1b',
                  }}>
                    {a.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <button style={styles.actionBtn}>View Details</button>
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
  statRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '0.5px solid #e2e8f0' },
  statLabel: { fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' },
  statVal: { fontSize: '24px', fontWeight: 600, color: '#0f172a' },
  toolbar: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' },
  tableWrap: { background: '#fff', borderRadius: '14px', border: '0.5px solid #e2e8f0', overflow: 'hidden' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: {
    textAlign: 'left', padding: '12px 16px', fontSize: '11px', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.5px', color: '#94a3b8',
    background: '#f8fafc', borderBottom: '0.5px solid #e2e8f0',
  },
  td: { padding: '13px 16px', borderBottom: '0.5px solid #f1f5f9', fontSize: '13px', color: '#334155' },
  actionBtn: {
    padding: '6px 14px', borderRadius: '7px', border: '0.5px solid #e2e8f0',
    background: '#f8fafc', color: '#334155', fontSize: '12px',
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
};
