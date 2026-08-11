import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getLoanApplications, approveLoan, rejectLoan } from '../../services/adminService';
import { formatDate } from '../../utils/formatDate';

export default function LoanApproval() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLoanApplications().then(setLoans).finally(() => setLoading(false));
  }, []);

  const handleAction = (id, action) => {
    setLoans((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: action === 'approve' ? 'approved' : 'rejected' } : l))
    );
  };

  const pending = loans.filter(l => l.status === 'pending');
  const approved = loans.filter(l => l.status === 'approved');
  const rejected = loans.filter(l => l.status === 'rejected');

  const statusColor = {
    pending: { bg: '#fef3c7', color: '#92400e' },
    approved: { bg: '#dcfce7', color: '#166534' },
    rejected: { bg: '#fee2e2', color: '#991b1b' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f2f5', fontFamily: "'DM Sans', sans-serif", padding: '32px' }}>
      <Navbar title="Loan Approval" subtitle="Review and action pending loan applications" />

      <div style={styles.statRow}>
        {[
          { label: 'Total Applications', value: loans.length, color: '#0f172a' },
          { label: 'Pending Review', value: pending.length, color: '#d97706' },
          { label: 'Approved', value: approved.length, color: '#16a34a' },
          { label: 'Rejected', value: rejected.length, color: '#dc2626' },
        ].map((s) => (
          <div key={s.label} style={styles.statCard}>
            <div style={styles.statLabel}>{s.label}</div>
            <div style={{ ...styles.statVal, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>Loading applications...</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {loans.map((loan) => (
            <div key={loan.id} style={styles.loanCard}>
              <div style={styles.loanLeft}>
                <div style={styles.loanHeader}>
                  <div style={styles.loanUser}>{loan.userName}</div>
                  <span style={{
                    ...styles.statusBadge,
                    background: statusColor[loan.status].bg,
                    color: statusColor[loan.status].color,
                  }}>
                    {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                  </span>
                </div>
                <div style={styles.loanType}>{loan.type}</div>
                <div style={styles.loanMeta}>
                  Applied: {formatDate(loan.appliedDate)} &nbsp;·&nbsp; Tenure: {loan.tenure} months
                </div>
              </div>

              <div style={styles.loanAmount}>
                <div style={styles.amtLabel}>Requested Amount</div>
                <div style={styles.amtVal}>₹{loan.amount.toLocaleString('en-IN')}</div>
                <div style={styles.emiEst}>
                  Est. EMI: ₹{Math.round((loan.amount * 0.01 * (1.1 ** (loan.tenure / 12))) / (loan.tenure / 12)).toLocaleString('en-IN')}/mo
                </div>
              </div>

              {loan.status === 'pending' && (
                <div style={styles.actions}>
                  <button onClick={() => handleAction(loan.id, 'approve')} style={styles.approveBtn}>
                    ✔ Approve
                  </button>
                  <button onClick={() => handleAction(loan.id, 'reject')} style={styles.rejectBtn}>
                    ✖ Reject
                  </button>
                </div>
              )}
              {loan.status !== 'pending' && (
                <div style={{ ...styles.actions, alignItems: 'center' }}>
                  <span style={{
                    fontSize: '13px', fontWeight: 500,
                    color: loan.status === 'approved' ? '#16a34a' : '#dc2626',
                  }}>
                    {loan.status === 'approved' ? '✔ Approved' : '✖ Rejected'}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

const styles = {
  statRow: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '14px', marginBottom: '20px' },
  statCard: { background: '#fff', borderRadius: '12px', padding: '16px 20px', border: '0.5px solid #e2e8f0' },
  statLabel: { fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' },
  statVal: { fontSize: '24px', fontWeight: 600 },
  loanCard: {
    background: '#fff', borderRadius: '14px', padding: '22px 24px',
    border: '0.5px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '24px',
  },
  loanLeft: { flex: 1 },
  loanHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' },
  loanUser: { fontSize: '15px', fontWeight: 600, color: '#0f172a' },
  statusBadge: { fontSize: '11px', padding: '3px 10px', borderRadius: '20px', fontWeight: 500 },
  loanType: { fontSize: '13px', color: '#64748b', marginBottom: '4px' },
  loanMeta: { fontSize: '12px', color: '#94a3b8' },
  loanAmount: { textAlign: 'center', padding: '0 24px', borderLeft: '0.5px solid #f1f5f9', borderRight: '0.5px solid #f1f5f9' },
  amtLabel: { fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.4px', marginBottom: '6px' },
  amtVal: { fontSize: '22px', fontWeight: 600, color: '#0f172a', marginBottom: '4px' },
  emiEst: { fontSize: '12px', color: '#64748b' },
  actions: { display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 },
  approveBtn: {
    padding: '9px 22px', background: '#0f172a', color: '#fff', border: 'none',
    borderRadius: '8px', fontSize: '13px', fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
  rejectBtn: {
    padding: '9px 22px', background: '#fff', color: '#dc2626',
    border: '0.5px solid #fecaca', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
    fontFamily: "'DM Sans', sans-serif", cursor: 'pointer',
  },
};
