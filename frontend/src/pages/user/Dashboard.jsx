import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AccountCard from '../../components/AccountCard';
import TransactionTable from '../../components/TransactionTable';
import Footer from '../../components/Footer';
import { getMyAccounts } from '../../services/accountService';
import { getMyTransactions } from '../../services/transactionService';
import { useAuth } from '../../context/AuthContext';

const MetricCard = ({ label, value, badge, badgeType, sub }) => (
  <div style={{
    background: '#fff', borderRadius: '14px', padding: '20px',
    border: '0.5px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  }}>
    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
      {label}
    </div>
    <div style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', marginBottom: '6px' }}>{value}</div>
    {badge && (
      <span style={{
        fontSize: '11px', padding: '3px 9px', borderRadius: '20px', fontWeight: 500,
        background: badgeType === 'up' ? '#dcfce7' : '#fee2e2',
        color: badgeType === 'up' ? '#166534' : '#dc2626',
      }}>
        {badgeType === 'up' ? '▲' : '▼'} {badge}
      </span>
    )}
    {sub && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{sub}</div>}
  </div>
);

export default function Dashboard() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMyAccounts(), getMyTransactions()])
      .then(([accs, txns]) => { setAccounts(accs); setTransactions(txns); })
      .finally(() => setLoading(false));
  }, []);

  const totalBalance = accounts.reduce((sum, a) => sum + (a.balance || 0), 0);
  const monthlyCredit = transactions.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const monthlyDebit = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: '32px' }}>
        <Navbar
          title={`Good morning, ${user?.name?.split(' ')[0] || 'User'} 👋`}
          subtitle="Here's an overview of your finances"
        />

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading your data...</div>
        ) : (
          <>
            {/* Metric Cards */}
            <div style={styles.grid4}>
              <MetricCard
                label="Total Balance"
                value={`₹${totalBalance.toLocaleString('en-IN')}`}
                badge="4.2% this month"
                badgeType="up"
              />
              <MetricCard
                label="Monthly Income"
                value={`₹${monthlyCredit.toLocaleString('en-IN')}`}
                badge="2.1%"
                badgeType="up"
              />
              <MetricCard
                label="Monthly Spend"
                value={`₹${monthlyDebit.toLocaleString('en-IN')}`}
                badge="1.8%"
                badgeType="down"
              />
              <MetricCard
                label="Active Accounts"
                value={accounts.length}
                sub={`${accounts.filter(a => a.status === 'Active').length} active`}
              />
            </div>

            {/* Accounts */}
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>My Accounts</h2>
            </div>
            <div style={styles.grid3}>
              {accounts.map((acc) => (
                <AccountCard key={acc.id} {...acc} />
              ))}
            </div>

            {/* Virtual Card + Quick Actions */}
            <div style={styles.grid2} >
              <div>
                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Recent Transactions</h2>
                </div>
                <TransactionTable transactions={transactions.slice(0, 5)} />
              </div>

              <div>
                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Virtual Card</h2>
                </div>
                <div style={styles.virtualCard}>
                  <div style={styles.cardChip}></div>
                  <div style={styles.cardNum}>4728 •••• •••• 3914</div>
                  <div style={styles.cardRow}>
                    <div>
                      <div style={styles.cardLabel}>Card Holder</div>
                      <div style={styles.cardVal}>{user?.name}</div>
                    </div>
                    <div>
                      <div style={styles.cardLabel}>Expires</div>
                      <div style={styles.cardVal}>08 / 28</div>
                    </div>
                  </div>
                </div>

                <div style={styles.sectionHeader}>
                  <h2 style={styles.sectionTitle}>Quick Actions</h2>
                </div>
                <div style={styles.quickGrid}>
                  {[
                    { label: '⬆ Send Money', path: '/user/transfer' },
                    { label: '⬇ Deposit', path: '/user/deposit-withdraw' },
                    { label: '📄 Statement', path: '/user/transactions' },
                    { label: '👤 Profile', path: '/user/profile' },
                  ].map((btn) => (
                    <a key={btn.label} href={btn.path} style={styles.quickBtn}>
                      {btn.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  grid4: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' },
  grid3: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '28px' },
  grid2: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px', marginBottom: '28px' },
  sectionHeader: { marginBottom: '14px', marginTop: '4px' },
  sectionTitle: { fontSize: '15px', fontWeight: 600, color: '#0f172a' },
  virtualCard: {
    background: 'linear-gradient(135deg, #0f172a, #1e3a5f)',
    borderRadius: '16px', padding: '24px', color: '#fff', marginBottom: '16px',
  },
  cardChip: {
    width: '34px', height: '26px',
    background: 'linear-gradient(135deg,#fbbf24,#f59e0b)',
    borderRadius: '5px', marginBottom: '20px',
  },
  cardNum: { fontSize: '15px', letterSpacing: '2px', color: '#cbd5e1', marginBottom: '18px' },
  cardRow: { display: 'flex', justifyContent: 'space-between' },
  cardLabel: { fontSize: '9px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.8px' },
  cardVal: { fontSize: '13px', fontWeight: 500, marginTop: '2px' },
  quickGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  quickBtn: {
    padding: '12px', borderRadius: '10px', border: '0.5px solid #e2e8f0',
    background: '#fff', fontSize: '13px', fontWeight: 500, color: '#334155',
    cursor: 'pointer', textAlign: 'center', display: 'block',
    transition: 'background 0.2s',
  },
};
