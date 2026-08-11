import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TransactionTable from '../../components/TransactionTable';
import Footer from '../../components/Footer';
import { getMyTransactions } from '../../services/transactionService';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ type: 'all', search: '' });

  useEffect(() => {
    getMyTransactions().then((data) => {
      setTransactions(data);
      setFiltered(data);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = transactions;
    if (filter.type !== 'all') result = result.filter((t) => t.type === filter.type);
    if (filter.search) result = result.filter((t) =>
      t.description.toLowerCase().includes(filter.search.toLowerCase()) ||
      t.referenceId?.toLowerCase().includes(filter.search.toLowerCase())
    );
    setFiltered(result);
  }, [filter, transactions]);

  const totalCredit = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalDebit = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  const selectStyle = {
    padding: '9px 14px', borderRadius: '8px', border: '0.5px solid #cbd5e1',
    fontSize: '13px', fontFamily: "'DM Sans', sans-serif", color: '#334155',
    background: '#fff', outline: 'none', cursor: 'pointer',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Transactions" subtitle="Complete history of your account activity" />

      {/* Summary chips */}
      <div style={styles.summaryRow}>
        <div style={styles.chip}>
          <span style={styles.chipLabel}>Total Credits</span>
          <span style={{ ...styles.chipVal, color: '#16a34a' }}>+₹{totalCredit.toLocaleString('en-IN')}</span>
        </div>
        <div style={styles.chip}>
          <span style={styles.chipLabel}>Total Debits</span>
          <span style={{ ...styles.chipVal, color: '#dc2626' }}>-₹{totalDebit.toLocaleString('en-IN')}</span>
        </div>
        <div style={styles.chip}>
          <span style={styles.chipLabel}>Net Flow</span>
          <span style={{ ...styles.chipVal, color: totalCredit - totalDebit >= 0 ? '#16a34a' : '#dc2626' }}>
            {totalCredit - totalDebit >= 0 ? '+' : ''}₹{(totalCredit - totalDebit).toLocaleString('en-IN')}
          </span>
        </div>
        <div style={styles.chip}>
          <span style={styles.chipLabel}>Total Transactions</span>
          <span style={styles.chipVal}>{transactions.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.filterRow}>
        <input
          type="text"
          placeholder="Search by description or reference..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          style={{ ...selectStyle, width: '280px' }}
        />
        <select value={filter.type} onChange={(e) => setFilter({ ...filter, type: e.target.value })} style={selectStyle}>
          <option value="all">All Types</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
          <option value="transfer">Transfer</option>
        </select>
        <button style={styles.exportBtn}>⬇ Export CSV</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading transactions...</div>
      ) : (
        <TransactionTable transactions={filtered} />
      )}

      <Footer />
    </div>
  );
}

const styles = {
  summaryRow: {
    display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px',
  },
  chip: {
    background: '#fff', borderRadius: '12px', padding: '16px 20px',
    border: '0.5px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '6px',
  },
  chipLabel: { fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
  chipVal: { fontSize: '20px', fontWeight: 600, color: '#0f172a' },
  filterRow: {
    display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '16px',
  },
  exportBtn: {
    marginLeft: 'auto', padding: '9px 18px', background: '#0f172a', color: '#fff',
    border: 'none', borderRadius: '8px', fontSize: '13px',
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
};
