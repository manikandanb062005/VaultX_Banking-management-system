const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('vaultx_token') || ''}`,
});

export async function getMyAccounts() {
  const res = await fetch(`${BASE_URL}/accounts/my`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch accounts');
  return res.json();
}

export async function depositAmount(accountId, amount) {
  const res = await fetch(`${BASE_URL}/accounts/${accountId}/deposit`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Deposit failed');
  }
  return res.json();
}

export async function withdrawAmount(accountId, amount) {
  const res = await fetch(`${BASE_URL}/accounts/${accountId}/withdraw`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ amount }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Withdrawal failed');
  }
  return res.json();
}

export async function getAllAccounts() {
  const res = await fetch(`${BASE_URL}/admin/accounts`, { headers: getHeaders() });
  if (!res.ok) throw new Error('Failed to fetch all accounts');
  return res.json();
}
