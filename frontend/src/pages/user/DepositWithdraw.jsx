import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function DepositWithdraw() {
  const [tab, setTab] = useState('deposit');
  const [form, setForm] = useState({ account: 'savings', amount: '', note: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '9px',
    border: '0.5px solid #cbd5e1', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", color: '#1e293b',
    background: '#f8fafc', outline: 'none',
  };
  const lbl = {
    display: 'block', fontSize: '11px', fontWeight: 500, color: '#64748b',
    marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Deposit & Withdraw" subtitle="Manage your account funds" />

      <div style={styles.layout}>
        {/* Left form */}
        <div style={styles.panel}>
          {/* Tabs */}
          <div style={styles.tabs}>
            {['deposit', 'withdraw'].map((t) => (
              <button key={t} onClick={() => { setTab(t); setSuccess(false); }}
                style={{ ...styles.tab, ...(tab === t ? styles.tabActive : {}) }}>
                {t === 'deposit' ? '⬇ Deposit' : '⬆ Withdraw'}
              </button>
            ))}
          </div>

          {success ? (
            <div style={styles.successBox}>
              <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
              <div style={styles.successTitle}>
                {tab === 'deposit' ? 'Deposit Successful!' : 'Withdrawal Successful!'}
              </div>
              <div style={styles.successSub}>
                ₹{Number(form.amount).toLocaleString('en-IN')} has been {tab === 'deposit' ? 'added to' : 'withdrawn from'} your account.
              </div>
              <button onClick={() => { setSuccess(false); setForm({ account: 'savings', amount: '', note: '' }); }}
                style={styles.newBtn}>
                New Transaction
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '18px' }}>
                <label style={lbl}>Select Account</label>
                <select name="account" value={form.account} onChange={handleChange} style={inputStyle}>
                  <option value="savings">Savings Account — ••3914 (₹2,84,560)</option>
                  <option value="current">Current Account — ••0041 (₹52,000)</option>
                </select>
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={lbl}>Amount (₹)</label>
                <div style={{ display: 'flex', border: '0.5px solid #cbd5e1', borderRadius: '9px', overflow: 'hidden', background: '#f8fafc' }}>
                  <span style={{ padding: '11px 14px', background: '#f1f5f9', fontSize: '14px', color: '#334155', borderRight: '0.5px solid #cbd5e1' }}>₹</span>
                  <input type="number" name="amount" value={form.amount} onChange={handleChange}
                    placeholder="Enter amount" min="1"
                    style={{ ...inputStyle, border: 'none', borderRadius: 0, background: 'transparent' }} required />
                </div>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <label style={lbl}>Note (Optional)</label>
                <input name="note" value={form.note} onChange={handleChange} placeholder="e.g. Cash deposit at branch" style={inputStyle} />
              </div>

              {/* Quick amount pills */}
              <div style={{ marginBottom: '20px' }}>
                <label style={lbl}>Quick Select</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {[500, 1000, 5000, 10000, 25000, 50000].map((amt) => (
                    <button key={amt} type="button"
                      onClick={() => setForm({ ...form, amount: String(amt) })}
                      style={{
                        padding: '7px 14px', borderRadius: '20px', border: '0.5px solid #cbd5e1',
                        background: form.amount === String(amt) ? '#0f172a' : '#fff',
                        color: form.amount === String(amt) ? '#fff' : '#334155',
                        fontSize: '12px', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
                      }}>
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={loading} style={{
                ...styles.submitBtn,
                background: tab === 'deposit' ? '#0f172a' : '#dc2626',
              }}>
                {loading ? 'Processing...' : tab === 'deposit' ? 'Confirm Deposit →' : 'Confirm Withdrawal →'}
              </button>
            </form>
          )}
        </div>

        {/* Right info */}
        <div>
          <div style={styles.infoCard}>
            <h3 style={styles.infoTitle}>Account Balance</h3>
            <div style={styles.balRow}>
              <div style={styles.balItem}>
                <div style={styles.balLabel}>Savings ••3914</div>
                <div style={styles.balVal}>₹2,84,560</div>
              </div>
              <div style={styles.balItem}>
                <div style={styles.balLabel}>Current ••0041</div>
                <div style={styles.balVal}>₹52,000</div>
              </div>
            </div>
          </div>

          <div style={{ ...styles.infoCard, marginTop: '16px' }}>
            <h3 style={styles.infoTitle}>{tab === 'deposit' ? 'Deposit' : 'Withdrawal'} Limits</h3>
            <div style={styles.limitTable}>
              {[
                { label: 'Daily Limit', val: '₹2,00,000' },
                { label: 'Monthly Limit', val: '₹10,00,000' },
                { label: 'Min Amount', val: '₹100' },
                { label: 'Processing Time', val: 'Instant' },
              ].map((r) => (
                <div key={r.label} style={styles.limitRow}>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{r.label}</span>
                  <span style={{ fontSize: '12px', fontWeight: 500, color: '#0f172a' }}>{r.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...styles.infoCard, marginTop: '16px', background: '#f0fdf4', border: '0.5px solid #bbf7d0' }}>
            <div style={{ fontSize: '13px', color: '#166534', lineHeight: 1.6 }}>
              🔒 <strong>Secure Transaction</strong><br />
              All transactions are encrypted with 256-bit SSL and monitored 24×7 for fraud detection.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' },
  panel: { background: '#fff', borderRadius: '14px', padding: '28px', border: '0.5px solid #e2e8f0' },
  tabs: { display: 'flex', gap: '8px', marginBottom: '24px' },
  tab: {
    flex: 1, padding: '11px', borderRadius: '9px', border: '0.5px solid #e2e8f0',
    background: '#f8fafc', color: '#64748b', fontSize: '14px', fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  tabActive: { background: '#0f172a', color: '#fff', border: '0.5px solid #0f172a' },
  submitBtn: {
    width: '100%', padding: '13px', color: '#fff', border: 'none',
    borderRadius: '10px', fontSize: '14px', fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  successBox: { textAlign: 'center', padding: '32px 16px' },
  successTitle: { fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#0f172a', marginBottom: '8px' },
  successSub: { fontSize: '14px', color: '#64748b', marginBottom: '24px' },
  newBtn: {
    padding: '12px 28px', background: '#0f172a', color: '#fff', border: 'none',
    borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', cursor: 'pointer',
  },
  infoCard: { background: '#fff', borderRadius: '14px', padding: '20px', border: '0.5px solid #e2e8f0' },
  infoTitle: { fontSize: '14px', fontWeight: 600, color: '#0f172a', marginBottom: '14px' },
  balRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  balItem: { background: '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'center' },
  balLabel: { fontSize: '11px', color: '#94a3b8', marginBottom: '4px' },
  balVal: { fontSize: '18px', fontWeight: 600, color: '#0f172a' },
  limitTable: { display: 'flex', flexDirection: 'column', gap: '10px' },
  limitRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '8px 0', borderBottom: '0.5px solid #f1f5f9',
  },
};
