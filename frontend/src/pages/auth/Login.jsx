import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <div style={styles.brand}>
          <div style={styles.logo}>Vault<span style={{ color: '#38bdf8' }}>X</span></div>
          <p style={styles.tagline}>Modern Banking, Simplified.</p>
          <div style={styles.features}>
            {['Instant Transfers', 'Real-time Notifications', 'Secure 256-bit SSL', 'Loan Management'].map((f) => (
              <div key={f} style={styles.featureItem}>
                <span style={styles.check}>✓</span> {f}
              </div>
            ))}
          </div>
        </div>
        <div style={styles.demoHint}>
          <strong>Demo Credentials:</strong><br />
          User: mani@vaultx.com / user123<br />
          Admin: admin@vaultx.com / admin123
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.formCard}>
          <h2 style={styles.formTitle}>Welcome back</h2>
          <p style={styles.formSub}>Sign in to your VaultX account</p>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                style={styles.input}
                required
              />
            </div>
            <div style={styles.forgotRow}>
              <a href="#" style={styles.forgot}>Forgot password?</a>
            </div>
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={styles.registerLink}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0ea5e9', fontWeight: 500 }}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    minHeight: '100vh',
    fontFamily: "'DM Sans', sans-serif",
  },
  left: {
    flex: 1,
    background: '#0f172a',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '48px',
  },
  brand: {},
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '36px',
    color: '#f8fafc',
    marginBottom: '12px',
  },
  tagline: {
    fontSize: '16px',
    color: '#94a3b8',
    marginBottom: '40px',
  },
  features: { display: 'flex', flexDirection: 'column', gap: '14px' },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    color: '#cbd5e1',
  },
  check: {
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    background: '#1e3a5f',
    color: '#38bdf8',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    flexShrink: 0,
  },
  demoHint: {
    background: '#1e293b',
    border: '0.5px solid #334155',
    borderRadius: '10px',
    padding: '14px 18px',
    fontSize: '12px',
    color: '#94a3b8',
    lineHeight: 1.8,
  },
  right: {
    width: '460px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f0f2f5',
    padding: '40px',
  },
  formCard: {
    background: '#fff',
    borderRadius: '20px',
    padding: '40px',
    width: '100%',
    border: '0.5px solid #e2e8f0',
    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
  },
  formTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '26px',
    color: '#0f172a',
    marginBottom: '6px',
  },
  formSub: {
    fontSize: '13px',
    color: '#94a3b8',
    marginBottom: '28px',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '13px',
    marginBottom: '16px',
    border: '0.5px solid #fecaca',
  },
  formGroup: { marginBottom: '18px' },
  label: {
    display: 'block',
    fontSize: '12px',
    fontWeight: 500,
    color: '#475569',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    borderRadius: '9px',
    border: '0.5px solid #cbd5e1',
    fontSize: '14px',
    fontFamily: "'DM Sans', sans-serif",
    color: '#1e293b',
    background: '#f8fafc',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  forgotRow: { textAlign: 'right', marginBottom: '20px' },
  forgot: { fontSize: '12px', color: '#0ea5e9' },
  submitBtn: {
    width: '100%',
    padding: '13px',
    background: '#0f172a',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginBottom: '20px',
  },
  registerLink: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#64748b',
  },
};
