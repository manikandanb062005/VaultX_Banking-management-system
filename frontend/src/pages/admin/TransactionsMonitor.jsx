import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TransactionTable from '../../components/TransactionTable';
import Footer from '../../components/Footer';
import { getMyTransactions } from '../../services/transactionService';

export default function TransactionsMonitor() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: 'all', status: 'all', search: '' });

  useEffect(() => {
    getMyTransactions().then((data) => { setTransactions(data); setFiltered(data); }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = transactions;
    if (filter.type !== 'all') result = result.filter((t) => t.type === filter.type);
    if (filter.status !== 'all') result = result.filter((t) => t.status === filter.status);
    if (filter.search) result = result.filter((t) =>
      t.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      (t.referenceId || '').toLowerCase().includes(filter.search.toLowerCase())
    );
    setFiltered(result);
  }, [filter, transactions]);

  const totalVol = transactions.reduce((s, t) => s + t.amount, 0);
  const flagged = transactions.filter(t => t.amount > 10000).length;

  const selectStyle = {
    padding: '9px 14px', borderRadius: '8px', border: '0.5px solid #cbd5e1',
    fontSize: '13px', fontFamily: "'DM Sans', sans-serif", color: '#334155',
    background: '#fff', outline: 'none',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Transactions Monitor" subtitle="System-wide transaction surveillance" />

      <div style={styles.statRow}>
        {[
          { label: 'Total Volume', value: `₹${(totalVol / 1000).toFixed(1)}K`, color: '#0f172a' },
          { label: 'Total Count', value: transactions.length, color: '#0f172a' },
          { label: 'Successful', value: transactions.filter(t => t.status === 'success').length, color: '#16a34a' },
          { label: 'High-Value (>₹10K)', value: flagged, color: '#d97706' },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statLabel}>{s.label}</div>
            <div style={{ ...styles.statVal, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div style={styles.toolbar}>
        <input value={filter.search} onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          placeholder="Search transactions..." style={{ ...selectStyle, width: '260px' }} />
        <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })} style={selectStyle}>
          <option value="all">All Types</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="transfer">Transfer</option>
        </select>
        <select value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })} style={selectStyle}>
          <option value="all">All Statuses</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button style={styles.exportBtn}>⬇ Export</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading transactions...</div>
      ) : (
        <TransactionTable transactions={filtered} showAccount={true} />
      )}

      <Footer />
    </div>
  );
}

const styles = {
  statRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '0.5px solid #e2e8f0' },
  statLabel: { fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' },
  statVal: { fontSize: '22px', fontWeight: 600, color: '#0f172a' },
  toolbar: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '14px' },
  exportBtn: {
    marginLeft: 'auto', padding: '9px 18px', background: '#0f172a', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
};
