import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../services/authService';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', accountType: 'savings',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await registerUser(form);
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '9px',
    border: '0.5px solid #cbd5e1', fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif", color: '#1e293b',
    background: '#f8fafc', outline: 'none',
  };
  const labelStyle = {
    display: 'block', fontSize: '12px', fontWeight: 500,
    color: '#475569', marginBottom: '6px',
    textTransform: 'uppercase', letterSpacing: '0.5px',
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.logo}>Vault<span style={{ color: '#38bdf8' }}>X</span></div>
        <h2 style={styles.heading}>Open your account in minutes</h2>
        <p style={styles.sub}>Join thousands of customers who trust VaultX for secure and modern banking.</p>
        <div style={styles.steps}>
          {['Fill your details', 'Verify your identity', 'Start banking'].map((s, i) => (
            <div key={i} style={styles.step}>
              <div style={styles.stepNum}>{i + 1}</div>
              <span style={styles.stepLabel}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Create Account</h2>
          <p style={styles.formSub}>Fill in the details to get started</p>

          {error && (
            <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.grid2}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Manikandan K" style={inputStyle} required />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Phone Number</label>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="9876543210" style={inputStyle} required />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email Address</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} required />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Account Type</label>
              <select name="accountType" value={form.accountType} onChange={handleChange} style={inputStyle}>
                <option value="savings">Savings Account</option>
                <option value="current">Current Account</option>
              </select>
            </div>

            <div style={styles.grid2}>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 8 characters" style={inputStyle} required />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Confirm Password</label>
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat password" style={inputStyle} required />
              </div>
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#64748b', marginTop: '16px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#0ea5e9', fontWeight: 500 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" },
  left: {
    flex: 1, background: '#0f172a', padding: '56px 48px',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  logo: {
    fontFamily: "'Playfair Display', serif", fontSize: '30px',
    color: '#f8fafc', marginBottom: '32px',
  },
  heading: { fontFamily: "'Playfair Display', serif", fontSize: '26px', color: '#f1f5f9', marginBottom: '12px' },
  sub: { fontSize: '14px', color: '#94a3b8', lineHeight: 1.7, marginBottom: '40px' },
  steps: { display: 'flex', flexDirection: 'column', gap: '16px' },
  step: { display: 'flex', alignItems: 'center', gap: '14px' },
  stepNum: {
    width: '30px', height: '30px', borderRadius: '50%',
    background: '#1e3a5f', color: '#38bdf8', display: 'flex',
    alignItems: 'center', justifyContent: 'center', fontSize: '13px',
    fontWeight: 600, flexShrink: 0,
  },
  stepLabel: { fontSize: '14px', color: '#cbd5e1' },
  right: {
    width: '500px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', background: '#f0f2f5', padding: '40px',
  },
  formCard: {
    background: '#fff', borderRadius: '20px', padding: '40px',
    width: '100%', border: '0.5px solid #e2e8f0',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif", fontSize: '24px',
    color: '#0f172a', marginBottom: '6px',
  },
  formSub: { fontSize: '13px', color: '#94a3b8', marginBottom: '24px' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  submitBtn: {
    width: '100%', padding: '13px', background: '#0f172a',
    color: '#fff', border: 'none', borderRadius: '10px',
    fontSize: '15px', fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer', marginBottom: '4px',
  },
};
