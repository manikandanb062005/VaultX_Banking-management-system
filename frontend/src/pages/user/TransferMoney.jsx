import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const BENEFICIARIES = [
  { id: 1, name: 'Ramesh Sharma', initials: 'RS', bank: 'SBI', accNum: '7812', mode: 'IMPS', color: '#dbeafe', text: '#1d4ed8' },
  { id: 2, name: 'Priya Kumar', initials: 'PK', bank: 'HDFC', accNum: '3309', mode: 'NEFT', color: '#dcfce7', text: '#166534' },
  { id: 3, name: 'Arjun Jain', initials: 'AJ', bank: 'ICICI', accNum: '5541', mode: 'IMPS', color: '#fef3c7', text: '#92400e' },
  { id: 4, name: 'Sneha Mani', initials: 'SM', bank: 'Axis', accNum: '0224', mode: 'UPI', color: '#fce7f3', text: '#9d174d' },
];

export default function TransferMoney() {
  const [selectedBene, setSelectedBene] = useState(null);
  const [form, setForm] = useState({ mode: 'IMPS', fromAccount: 'savings', amount: '', remarks: '', schedule: 'now' });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const charges = form.amount ? 5 : 0;
  const gst = charges * 0.18;
  const total = Number(form.amount || 0) + charges + gst;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedBene) { alert('Please select a beneficiary'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);
  };

  const inputStyle = {
    width: '100%', padding: '10px 14px', borderRadius: '9px',
    border: '0.5px solid #cbd5e1', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", color: '#1e293b',
    background: '#f8fafc', outline: 'none',
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
        <Navbar title="Transfer Money" subtitle="NEFT · IMPS · UPI" />
        <div style={{ maxWidth: '480px', margin: '60px auto', background: '#fff', borderRadius: '20px', padding: '48px', textAlign: 'center', border: '0.5px solid #e2e8f0' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', marginBottom: '8px', color: '#0f172a' }}>Transfer Successful!</h2>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '8px' }}>
            ₹{Number(form.amount).toLocaleString('en-IN')} sent to <strong>{selectedBene?.name}</strong>
          </p>
          <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '28px' }}>Reference: TXN{Date.now()}</p>
          <button onClick={() => { setSuccess(false); setForm({ mode: 'IMPS', fromAccount: 'savings', amount: '', remarks: '', schedule: 'now' }); setSelectedBene(null); }}
            style={{ padding: '12px 28px', background: '#0f172a', color: '#fff', border: 'none', borderRadius: '10px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', cursor: 'pointer' }}>
            New Transfer
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Transfer Money" subtitle="NEFT · IMPS · UPI — instant & scheduled" />

      <div style={styles.grid}>
        {/* Left: Form */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Transfer Details</h3>
          <form onSubmit={handleSubmit}>
            <div style={styles.fg}>
              <label style={styles.lbl}>Transfer Mode</label>
              <select name="mode" value={form.mode} onChange={handleChange} style={inputStyle}>
                <option value="IMPS">IMPS — Instant (24×7)</option>
                <option value="NEFT">NEFT — Next Settlement</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
            <div style={styles.fg}>
              <label style={styles.lbl}>From Account</label>
              <select name="fromAccount" value={form.fromAccount} onChange={handleChange} style={inputStyle}>
                <option value="savings">Savings — ••3914 (₹2,84,560)</option>
                <option value="current">Current — ••0041 (₹52,000)</option>
              </select>
            </div>
            <div style={styles.fg}>
              <label style={styles.lbl}>Amount (₹)</label>
              <div style={{ display: 'flex', border: '0.5px solid #cbd5e1', borderRadius: '9px', overflow: 'hidden', background: '#f8fafc' }}>
                <span style={{ padding: '10px 14px', background: '#f1f5f9', fontSize: '14px', color: '#334155', borderRight: '0.5px solid #cbd5e1' }}>₹</span>
                <input type="number" name="amount" value={form.amount} onChange={handleChange}
                  placeholder="0.00" style={{ ...inputStyle, border: 'none', borderRadius: 0, background: 'transparent' }} required />
              </div>
            </div>
            <div style={styles.fg}>
              <label style={styles.lbl}>Remarks</label>
              <input name="remarks" value={form.remarks} onChange={handleChange} placeholder="e.g. Rent, Groceries…" style={inputStyle} />
            </div>
            <div style={styles.fg}>
              <label style={styles.lbl}>Schedule</label>
              <select name="schedule" value={form.schedule} onChange={handleChange} style={inputStyle}>
                <option value="now">Transfer Now</option>
                <option value="later">Schedule for Later</option>
                <option value="recurring">Recurring Monthly</option>
              </select>
            </div>

            {/* Summary */}
            <div style={styles.summary}>
              <div style={styles.sumRow}><span>Transfer Amount</span><span>₹{Number(form.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
              <div style={styles.sumRow}><span>{form.mode} Charges</span><span>₹{charges.toFixed(2)}</span></div>
              <div style={styles.sumRow}><span>GST (18%)</span><span>₹{gst.toFixed(2)}</span></div>
              <div style={{ ...styles.sumRow, ...styles.sumTotal }}><span>Total Debit</span><span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span></div>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? 'Processing...' : 'Confirm Transfer →'}
            </button>
          </form>
        </div>

        {/* Right: Beneficiaries */}
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Select Beneficiary</h3>
          {BENEFICIARIES.map((b) => (
            <div key={b.id} onClick={() => setSelectedBene(b)} style={{
              ...styles.beneCard,
              border: selectedBene?.id === b.id ? '1.5px solid #0ea5e9' : '0.5px solid #e2e8f0',
              background: selectedBene?.id === b.id ? '#f0f9ff' : '#fff',
            }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: b.color, color: b.text, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, flexShrink: 0 }}>
                {b.initials}
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#1e293b' }}>{b.name}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{b.bank} ••{b.accNum} · {b.mode}</div>
              </div>
              {selectedBene?.id === b.id && <span style={{ marginLeft: 'auto', color: '#0ea5e9', fontSize: '18px' }}>✓</span>}
            </div>
          ))}
          <div style={{ ...styles.beneCard, border: '0.5px dashed #cbd5e1', justifyContent: 'center', color: '#64748b', fontSize: '13px', cursor: 'pointer' }}>
            + Add New Beneficiary
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  grid: { display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '20px' },
  panel: { background: '#fff', borderRadius: '14px', padding: '24px', border: '0.5px solid #e2e8f0' },
  panelTitle: { fontSize: '15px', fontWeight: 600, color: '#0f172a', marginBottom: '18px' },
  fg: { marginBottom: '16px' },
  lbl: { display: 'block', fontSize: '11px', fontWeight: 500, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' },
  summary: { background: '#f8fafc', borderRadius: '10px', padding: '14px', marginTop: '8px', marginBottom: '16px' },
  sumRow: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginBottom: '6px' },
  sumTotal: { fontSize: '13px', fontWeight: 600, color: '#0f172a', paddingTop: '8px', marginTop: '4px', borderTop: '0.5px solid #e2e8f0', marginBottom: 0 },
  submitBtn: {
    width: '100%', padding: '13px', background: '#0f172a', color: '#fff',
    border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  beneCard: {
    display: 'flex', alignItems: 'center', gap: '12px',
    padding: '12px', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
