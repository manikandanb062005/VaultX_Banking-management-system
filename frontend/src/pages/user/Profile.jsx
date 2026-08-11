import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || 'Manikandan K',
    email: user?.email || 'mani@vaultx.com',
    phone: '9876543210',
    address: 'OMR, Sholinganallur, Chennai — 600119',
    dob: '2005-06-20',
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const inputStyle = (editable) => ({
    width: '100%', padding: '10px 14px', borderRadius: '9px',
    border: `0.5px solid ${editable ? '#0ea5e9' : '#e2e8f0'}`,
    fontSize: '14px', fontFamily: "'DM Sans', sans-serif",
    color: '#1e293b', background: editable ? '#fff' : '#f8fafc', outline: 'none',
  });
  const lbl = { display: 'block', fontSize: '11px', fontWeight: 500, color: '#64748b', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="My Profile" subtitle="Manage your personal information" />

      {saved && (
        <div style={{ background: '#dcfce7', color: '#166534', padding: '12px 20px', borderRadius: '10px', fontSize: '13px', marginBottom: '20px', border: '0.5px solid #bbf7d0' }}>
          ✓ Profile updated successfully
        </div>
      )}

      <div style={styles.layout}>
        {/* Left: avatar + quick info */}
        <div>
          <div style={styles.avatarCard}>
            <div style={styles.bigAvatar}>{form.name.charAt(0)}</div>
            <div style={styles.userName}>{form.name}</div>
            <div style={styles.userEmail}>{form.email}</div>
            <span style={styles.roleBadge}>{user?.role === 'ADMIN' ? '⚡ Administrator' : '👤 Account Holder'}</span>
            <div style={styles.memberSince}>Member since Nov 2025</div>
          </div>

          <div style={{ ...styles.panel, marginTop: '16px' }}>
            <h3 style={styles.panelTitle}>Account Security</h3>
            {[
              { label: '2-Factor Auth', status: 'Enabled', color: '#16a34a', bg: '#dcfce7' },
              { label: 'Login Alerts', status: 'Enabled', color: '#16a34a', bg: '#dcfce7' },
              { label: 'Password', status: 'Last changed 30d ago', color: '#d97706', bg: '#fef3c7' },
            ].map((s) => (
              <div key={s.label} style={styles.secRow}>
                <span style={{ fontSize: '13px', color: '#334155' }}>{s.label}</span>
                <span style={{ fontSize: '11px', padding: '3px 9px', borderRadius: '20px', background: s.bg, color: s.color, fontWeight: 500 }}>
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: edit form */}
        <div style={styles.panel}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px' }}>
            <h3 style={styles.panelTitle}>Personal Information</h3>
            {!editing ? (
              <button onClick={() => setEditing(true)} style={styles.editBtn}>✏ Edit</button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setEditing(false)} style={styles.cancelBtn}>Cancel</button>
                <button onClick={handleSave} style={styles.saveBtn}>Save Changes</button>
              </div>
            )}
          </div>

          <div style={styles.grid2}>
            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} disabled={!editing} style={inputStyle(editing)} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={lbl}>Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} disabled={!editing} style={inputStyle(editing)} />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={lbl}>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} disabled={!editing} style={inputStyle(editing)} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={lbl}>Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} disabled={!editing} style={inputStyle(editing)} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={lbl}>Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} disabled={!editing}
              rows={3} style={{ ...inputStyle(editing), resize: 'none' }} />
          </div>

          <div style={{ marginBottom: '0' }}>
            <label style={lbl}>KYC Status</label>
            <div style={styles.kycBadge}>✔ KYC Verified — Aadhaar & PAN linked</div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' },
  avatarCard: {
    background: '#fff', borderRadius: '14px', padding: '28px',
    border: '0.5px solid #e2e8f0', textAlign: 'center',
  },
  bigAvatar: {
    width: '72px', height: '72px', borderRadius: '50%',
    background: 'linear-gradient(135deg,#0ea5e9,#6366f1)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '28px', fontWeight: 600, color: '#fff',
    margin: '0 auto 14px',
  },
  userName: { fontSize: '18px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' },
  userEmail: { fontSize: '13px', color: '#64748b', marginBottom: '12px' },
  roleBadge: {
    display: 'inline-block', fontSize: '11px', padding: '4px 12px',
    borderRadius: '20px', background: '#dbeafe', color: '#1d4ed8',
    fontWeight: 500, marginBottom: '12px',
  },
  memberSince: { fontSize: '12px', color: '#94a3b8' },
  panel: { background: '#fff', borderRadius: '14px', padding: '24px', border: '0.5px solid #e2e8f0' },
  panelTitle: { fontSize: '15px', fontWeight: 600, color: '#0f172a', margin: 0 },
  secRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '10px 0', borderBottom: '0.5px solid #f1f5f9',
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  editBtn: {
    padding: '8px 16px', background: '#f8fafc', border: '0.5px solid #e2e8f0',
    borderRadius: '8px', fontSize: '13px', color: '#334155',
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  cancelBtn: {
    padding: '8px 16px', background: '#fff', border: '0.5px solid #e2e8f0',
    borderRadius: '8px', fontSize: '13px', color: '#64748b',
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  saveBtn: {
    padding: '8px 18px', background: '#0f172a', color: '#fff', border: 'none',
    borderRadius: '8px', fontSize: '13px', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  kycBadge: {
    background: '#f0fdf4', border: '0.5px solid #bbf7d0', borderRadius: '9px',
    padding: '10px 14px', fontSize: '13px', color: '#166534', fontWeight: 500,
  },
};
