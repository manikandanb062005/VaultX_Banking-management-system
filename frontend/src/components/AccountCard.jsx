export default function AccountCard({ type, balance, accountNumber, bank, status, extra }) {
  const typeConfig = {
    savings: { label: 'Savings Account', icon: '🏦', color: '#dcfce7', textColor: '#166534', tag: 'Active' },
    current: { label: 'Current Account', icon: '💼', color: '#dbeafe', textColor: '#1d4ed8', tag: 'Active' },
    fd: { label: 'Fixed Deposit', icon: '🔒', color: '#fef3c7', textColor: '#92400e', tag: 'Locked' },
    loan: { label: 'Loan Account', icon: '📋', color: '#fee2e2', textColor: '#991b1b', tag: 'Active' },
  };

  const cfg = typeConfig[type] || typeConfig.savings;
  const maskedNum = accountNumber
    ? `•••• •••• ${accountNumber.slice(-4)}`
    : '•••• •••• ••••';

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <span style={styles.icon}>{cfg.icon}</span>
        <span style={{ ...styles.tag, background: cfg.color, color: cfg.textColor }}>
          {status || cfg.tag}
        </span>
      </div>
      <div style={styles.label}>{cfg.label}</div>
      <div style={styles.balance}>
        ₹{Number(balance || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </div>
      <div style={styles.meta}>
        <span>{maskedNum}</span>
        {bank && <span style={styles.bank}>{bank}</span>}
      </div>
      {extra && <div style={styles.extra}>{extra}</div>}
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '14px',
    border: '0.5px solid #e2e8f0',
    padding: '20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    transition: 'box-shadow 0.2s',
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  },
  icon: {
    fontSize: '22px',
  },
  tag: {
    fontSize: '10px',
    fontWeight: 500,
    padding: '3px 10px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
  },
  label: {
    fontSize: '11px',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  },
  balance: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#0f172a',
    marginBottom: '8px',
    fontFamily: "'DM Sans', sans-serif",
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
    color: '#64748b',
  },
  bank: {
    fontSize: '10px',
    background: '#f1f5f9',
    padding: '2px 8px',
    borderRadius: '4px',
    color: '#475569',
  },
  extra: {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '0.5px solid #f1f5f9',
    fontSize: '12px',
    color: '#64748b',
  },
};
