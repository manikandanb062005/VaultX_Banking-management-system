const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('vaultx_token') || ''}`,
});

export async function getAllUsers() {
  const res = await fetch(`${BASE_URL}/admin/users`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function getLoanApplications() {
  const res = await fetch(`${BASE_URL}/admin/loans`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch loans');
  return res.json();
}

export async function approveLoan(loanId) {
  const res = await fetch(`${BASE_URL}/admin/loans/${loanId}/approve`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to approve loan');
  return res.json();
}

export async function rejectLoan(loanId) {
  const res = await fetch(`${BASE_URL}/admin/loans/${loanId}/reject`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to reject loan');
  return res.json();
}

export async function toggleUserStatus(userId) {
  const res = await fetch(`${BASE_URL}/admin/users/${userId}/toggle-status`, {
    method: 'PUT',
    headers: getHeaders(),
  });
  if (!res.ok) throw new Error('Failed to update user status');
  return res.json();
}
