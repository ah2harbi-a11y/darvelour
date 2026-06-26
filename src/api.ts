const API_URL = import.meta.env.VITE_API_URL || '/api';

function getToken(): string | null {
  return localStorage.getItem('darvelour_token');
}

function setToken(token: string) {
  localStorage.setItem('darvelour_token', token);
}

function clearToken() {
  localStorage.removeItem('darvelour_token');
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Request failed');
  }
  return data;
}

// Auth
export async function register(name: string, email: string, password: string, phone?: string) {
  const data = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, phone }),
  });
  setToken(data.token);
  return data;
}

export async function login(email: string, password: string) {
  const data = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
  setToken(data.token);
  return data;
}

export function logout() {
  clearToken();
}

export function isLoggedIn(): boolean {
  return !!getToken();
}

export async function getProfile() {
  return request('/auth/me');
}

export async function updateProfile(data: Record<string, string>) {
  return request('/auth/me', { method: 'PUT', body: JSON.stringify(data) });
}

// Dresses
export async function getDresses(params?: Record<string, string>) {
  const query = params ? '?' + new URLSearchParams(params).toString() : '';
  return request(`/dresses${query}`);
}

export async function getDress(id: number) {
  return request(`/dresses/${id}`);
}

// Cart
export async function getCart() {
  return request('/cart');
}

export async function addToCart(dress_id: number, size = 'M', quantity = 1) {
  return request('/cart', {
    method: 'POST',
    body: JSON.stringify({ dress_id, size, quantity }),
  });
}

export async function updateCartItem(id: number, quantity: number) {
  return request(`/cart/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  });
}

export async function removeFromCart(id: number) {
  return request(`/cart/${id}`, { method: 'DELETE' });
}

export async function clearCart() {
  return request('/cart', { method: 'DELETE' });
}

// Wishlist
export async function getWishlist() {
  return request('/wishlist');
}

export async function toggleWishlist(dress_id: number) {
  return request('/wishlist', {
    method: 'POST',
    body: JSON.stringify({ dress_id }),
  });
}

export async function removeFromWishlist(dressId: number) {
  return request(`/wishlist/${dressId}`, { method: 'DELETE' });
}

// Orders
export async function getOrders() {
  return request('/orders');
}

export async function getOrder(id: number) {
  return request(`/orders/${id}`);
}

export async function placeOrder(details: {
  delivery_speed?: string;
  payment_method?: string;
  address_street?: string;
  address_city?: string;
  address_district?: string;
  address_postal?: string;
}) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(details),
  });
}

// Exclusives
export async function getExclusives() {
  return request('/exclusives');
}

export async function requestExclusivity(data: {
  dress_id: number;
  event_name: string;
  event_date: string;
  venue: string;
  occasion: string;
}) {
  return request('/exclusives', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function cancelExclusivity(id: number) {
  return request(`/exclusives/${id}`, { method: 'DELETE' });
}
