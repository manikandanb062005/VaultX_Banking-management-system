const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('vaultx_token') || ''}`,
});

export async function getMyTransactions() {
  const res = await fetch(`${BASE_URL}/transactions/my`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch transactions');
  return res.json();
}

export async function transferMoney({ fromAccount, toAccount, amount, mode, remarks }) {
  const res = await fetch(`${BASE_URL}/transactions/transfer`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ fromAccount, toAccount, amount, mode, remarks }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Transfer failed');
  }
  return res.json();
}

export async function getAllTransactions() {
  const res = await fetch(`${BASE_URL}/admin/transactions`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch all transactions');
  return res.json();
}
