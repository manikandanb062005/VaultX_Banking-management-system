import { formatDate } from '../utils/formatDate';

export default function TransactionTable({ transactions = [], showAccount = false }) {
  const typeIcon = {
    credit: '⬇',
    debit: '⬆',
    transfer: '🔁',
  };

  return (
    <div style={styles.wrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Transaction</th>
            {showAccount && <th style={styles.th}>Account</th>}
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Date</th>
            <th style={{ ...styles.th, textAlign: 'right' }}>Amount</th>
            <th style={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan={showAccount ? 6 : 5}
                style={{ ...styles.td, textAlign: 'center', color: '#94a3b8', padding: '32px' }}
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((txn) => (
              <tr key={txn.id} style={styles.row}>
                <td style={styles.td}>
                  <div style={styles.txnCell}>
                    <div
                      style={{
                        ...styles.txnIcon,
                        background: txn.type === 'credit' ? '#dcfce7' : txn.type === 'debit' ? '#fee2e2' : '#f0f9ff',
                      }}
                    >
                      {typeIcon[txn.type] || '•'}
                    </div>
                    <div>
                      <div style={styles.txnName}>{txn.description}</div>
                      <div style={styles.txnRef}>Ref: {txn.referenceId || 'N/A'}</div>
                    </div>
                  </div>
                </td>
                {showAccount && (
                  <td style={styles.td}>
                    <span style={styles.acctNum}>••{txn.accountNumber?.slice(-4) || '0000'}</span>
                  </td>
                )}
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.typeBadge,
                      background:
                        txn.type === 'credit'
                          ? '#dcfce7'
                          : txn.type === 'debit'
                          ? '#fee2e2'
                          : '#f0f9ff',
                      color:
                        txn.type === 'credit'
                          ? '#166534'
                          : txn.type === 'debit'
                          ? '#991b1b'
                          : '#0369a1',
                    }}
                  >
                    {txn.type?.charAt(0).toUpperCase() + txn.type?.slice(1)}
                  </span>
                </td>
                <td style={{ ...styles.td, color: '#64748b', fontSize: '12px' }}>
                  {formatDate(txn.date)}
                </td>
                <td
                  style={{
                    ...styles.td,
                    textAlign: 'right',
                    fontWeight: 600,
                    color: txn.type === 'credit' ? '#16a34a' : '#dc2626',
                  }}
                >
                  {txn.type === 'credit' ? '+' : '-'}₹
                  {Number(txn.amount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      background:
                        txn.status === 'success'
                          ? '#dcfce7'
                          : txn.status === 'failed'
                          ? '#fee2e2'
                          : '#fef3c7',
                      color:
                        txn.status === 'success'
                          ? '#166534'
                          : txn.status === 'failed'
                          ? '#991b1b'
                          : '#92400e',
                    }}
                  >
                    {txn.status === 'success' ? '✔' : txn.status === 'failed' ? '✖' : '⏳'}{' '}
                    {txn.status?.charAt(0).toUpperCase() + txn.status?.slice(1)}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  wrapper: {
    overflowX: 'auto',
    borderRadius: '12px',
    border: '0.5px solid #e2e8f0',
    background: '#fff',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  },
  th: {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '11px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: '#94a3b8',
    background: '#f8fafc',
    borderBottom: '0.5px solid #e2e8f0',
  },
  td: {
    padding: '13px 16px',
    borderBottom: '0.5px solid #f1f5f9',
    color: '#334155',
    fontFamily: "'DM Sans', sans-serif",
  },
  row: {
    transition: 'background 0.15s',
  },
  txnCell: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  txnIcon: {
    width: '34px',
    height: '34px',
    borderRadius: '9px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '13px',
    flexShrink: 0,
  },
  txnName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#1e293b',
  },
  txnRef: {
    fontSize: '10px',
    color: '#94a3b8',
    marginTop: '1px',
  },
  acctNum: {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#64748b',
    background: '#f1f5f9',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  typeBadge: {
    fontSize: '10px',
    fontWeight: 500,
    padding: '3px 9px',
    borderRadius: '20px',
    textTransform: 'capitalize',
  },
  statusBadge: {
    fontSize: '10px',
    fontWeight: 500,
    padding: '3px 9px',
    borderRadius: '20px',
  },
};
