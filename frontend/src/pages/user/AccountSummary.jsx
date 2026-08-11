import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import AccountCard from '../../components/AccountCard';
import Footer from '../../components/Footer';
import { getMyAccounts } from '../../services/accountService';

export default function AccountSummary() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyAccounts().then(setAccounts).finally(() => setLoading(false));
  }, []);

  const totalBalance = accounts.reduce((s, a) => s + (a.balance || 0), 0);

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Account Summary" subtitle="All your linked accounts at a glance" />

      {/* Total balance strip */}
      <div style={styles.balanceStrip}>
        <div>
          <div style={styles.stripLabel}>Combined Net Worth</div>
          <div style={styles.stripValue}>₹{totalBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
        </div>
        <div style={styles.stripMeta}>
          <span>{accounts.length} accounts linked</span>
          <span style={{ color: '#16a34a' }}>● All systems normal</span>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading accounts...</div>
      ) : (
        <div style={styles.grid}>
          {accounts.map((acc) => <AccountCard key={acc.id} {...acc} />)}
        </div>
      )}

      {/* Loan EMI alert */}
      <div style={styles.alert}>
        <div style={styles.alertIcon}>⚠</div>
        <div>
          <div style={styles.alertTitle}>EMI Due Today — Personal Loan</div>
          <div style={styles.alertSub}>₹6,200 will be auto-debited from Savings ••3914 at 12:00 AM</div>
        </div>
        <button style={styles.alertBtn}>Pay Now</button>
      </div>

      {/* Loan progress */}
      <div style={styles.loanCard}>
        <h3 style={styles.panelTitle}>Active Loan — Personal Loan @ 10.5% p.a.</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Paid: ₹2,00,000 (40%)</span>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Remaining: ₹3,00,000</span>
        </div>
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: '40%' }}></div>
        </div>
        <div style={styles.loanMeta}>
          <div style={styles.metaItem}><div style={styles.metaVal}>₹6,200</div><div style={styles.metaLbl}>Monthly EMI</div></div>
          <div style={styles.metaItem}><div style={styles.metaVal}>24</div><div style={styles.metaLbl}>Months Left</div></div>
          <div style={styles.metaItem}><div style={styles.metaVal}>10.5%</div><div style={styles.metaLbl}>Interest Rate</div></div>
          <div style={styles.metaItem}><div style={styles.metaVal}>₹48,800</div><div style={styles.metaLbl}>Total Interest</div></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  balanceStrip: {
    background: '#0f172a', borderRadius: '16px', padding: '24px 28px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: '24px',
  },
  stripLabel: { fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' },
  stripValue: { fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#f8fafc', fontWeight: 600 },
  stripMeta: { display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'right', fontSize: '13px', color: '#94a3b8' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '24px' },
  alert: {
    background: '#fff7ed', border: '0.5px solid #fed7aa', borderRadius: '12px',
    padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px',
    marginBottom: '20px',
  },
  alertIcon: { fontSize: '20px', color: '#d97706', flexShrink: 0 },
  alertTitle: { fontSize: '14px', fontWeight: 600, color: '#c2410c', marginBottom: '2px' },
  alertSub: { fontSize: '12px', color: '#9a3412' },
  alertBtn: {
    marginLeft: 'auto', padding: '9px 20px', background: '#0f172a',
    color: '#fff', border: 'none', borderRadius: '8px',
    fontSize: '13px', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', flexShrink: 0,
  },
  loanCard: {
    background: '#fff', borderRadius: '14px', padding: '24px',
    border: '0.5px solid #e2e8f0', marginBottom: '24px',
  },
  panelTitle: { fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' },
  progressBar: { background: '#e2e8f0', borderRadius: '10px', height: '8px', marginBottom: '18px', overflow: 'hidden' },
  progressFill: { background: 'linear-gradient(90deg, #0ea5e9, #6366f1)', height: '100%', borderRadius: '10px' },
  loanMeta: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px' },
  metaItem: { background: '#f8fafc', borderRadius: '10px', padding: '14px', textAlign: 'center' },
  metaVal: { fontSize: '18px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' },
  metaLbl: { fontSize: '11px', color: '#94a3b8' },
};
