export default function Footer() {
  return (
    <footer style={styles.footer}>
      <span style={styles.brand}>VaultX Banking System</span>
      <span style={styles.sep}>·</span>
      <span style={styles.text}>© {new Date().getFullYear()} All rights reserved</span>
      <span style={styles.sep}>·</span>
      <span style={styles.text}>Secured with 256-bit SSL</span>
    </footer>
  );
}

const styles = {
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '20px 32px',
    marginTop: '32px',
    borderTop: '0.5px solid #e2e8f0',
    fontSize: '12px',
    color: '#94a3b8',
  },
  brand: {
    fontWeight: 600,
    color: '#475569',
  },
  sep: {
    color: '#cbd5e1',
  },
  text: {
    color: '#94a3b8',
  },
};
