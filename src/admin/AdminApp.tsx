import { useState, useEffect, useCallback, useRef } from 'react';
import { LayoutDashboard, Store, ShoppingBag, Package, Crown, Users, LogOut, Plus, Pencil, Trash2, X, Check, Upload, Image as ImageIcon } from 'lucide-react';
import './admin.css';

const API = '/api/admin';

async function adminRequest(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
  });
  if (res.status === 401) { localStorage.removeItem('admin_token'); window.location.reload(); }
  if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Request failed'); }
  return res.json();
}

async function uploadImage(file: File): Promise<string> {
  const token = localStorage.getItem('admin_token');
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API}/upload`, {
    method: 'POST',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData,
  });
  if (!res.ok) throw new Error('Upload failed');
  const data = await res.json();
  return data.url;
}

// --- Image Upload Component ---
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {}
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="admin-label">Image</label>
      {value ? (
        <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', border: '1px solid #374151', marginBottom: 8 }}>
          <img src={value} alt="Preview" style={{ width: '100%', height: 200, objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 4 }}>
            <button onClick={() => fileRef.current?.click()} className="admin-btn-icon" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>
              <Pencil style={{ width: 14, height: 14 }} />
            </button>
            <button onClick={() => onChange('')} className="admin-btn-icon" style={{ background: 'rgba(0,0,0,0.6)', color: '#f87171' }}>
              <Trash2 style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragOver ? '#6b7280' : '#374151'}`,
            borderRadius: 12,
            padding: '32px 16px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragOver ? '#1f2937' : 'transparent',
            transition: 'all 0.15s',
            marginBottom: 8,
          }}
        >
          {uploading ? (
            <p style={{ color: '#9ca3af', fontSize: 14 }}>Uploading...</p>
          ) : (
            <>
              <Upload style={{ width: 24, height: 24, color: '#6b7280', margin: '0 auto 8px' }} />
              <p style={{ color: '#9ca3af', fontSize: 13 }}>Click or drag image here</p>
              <p style={{ color: '#4b5563', fontSize: 11, marginTop: 4 }}>JPG, PNG, WebP up to 10MB</p>
            </>
          )}
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); e.target.value = ''; }} />
    </div>
  );
}

// --- Login ---
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('admin@darvelour.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    try {
      const data = await adminRequest('/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      localStorage.setItem('admin_token', data.token);
      onLogin();
    } catch (e: any) { setError(e.message); }
  };

  return (
    <div className="admin-login-wrap">
      <div style={{ width: '100%', maxWidth: 384 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>DARVELOUR</h1>
          <p style={{ color: '#6b7280', fontSize: 14, marginTop: 4 }}>Admin Panel</p>
        </div>
        <div className="admin-login-card">
          <h2 style={{ fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 24 }}>Sign In</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label className="admin-label">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} className="admin-input" />
            </div>
            {error && <p style={{ color: '#f87171', fontSize: 12 }}>{error}</p>}
            <button onClick={handleLogin} className="admin-btn-primary">Sign In</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Stat Card ---
function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: any }) {
  return (
    <div className="admin-stat-card">
      <Icon style={{ width: 20, height: 20, color: '#6b7280' }} />
      <p className="admin-stat-value">{value}</p>
      <p className="admin-stat-label">{label}</p>
    </div>
  );
}

// --- Modal ---
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{title}</h3>
          <button onClick={onClose} className="admin-btn-icon"><X style={{ width: 20, height: 20 }} /></button>
        </div>
        <div className="admin-modal-body">{children}</div>
      </div>
    </div>
  );
}

// --- Dashboard ---
function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  useEffect(() => { adminRequest('/stats').then(setStats).catch(() => {}); }, []);
  if (!stats) return <p style={{ color: '#6b7280', padding: 32 }}>Loading...</p>;
  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Dashboard</h2>
      <div className="admin-grid-4" style={{ marginBottom: 16 }}>
        <StatCard label="Total Orders" value={stats.totalOrders} icon={Package} />
        <StatCard label="Revenue" value={`SAR ${stats.totalRevenue.toLocaleString()}`} icon={ShoppingBag} />
        <StatCard label="Customers" value={stats.totalCustomers} icon={Users} />
        <StatCard label="Dresses" value={stats.totalDresses} icon={ShoppingBag} />
      </div>
      <div className="admin-grid-3">
        <StatCard label="Boutiques" value={stats.totalBoutiques} icon={Store} />
        <StatCard label="Active Exclusives" value={stats.activeExclusives} icon={Crown} />
        <StatCard label="Pending Orders" value={stats.pendingOrders} icon={Package} />
      </div>
    </div>
  );
}

// --- Boutiques ---
function BoutiquesPage() {
  const [boutiques, setBoutiques] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', description: '', location: '', rating: '4.5', verified: false, specialties: '', phone: '', email: '', image_url: '' });

  const load = useCallback(() => { adminRequest('/boutiques').then(setBoutiques).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm({ name: '', description: '', location: '', rating: '4.5', verified: false, specialties: '', phone: '', email: '', image_url: '' }); setEditing(null); setShowForm(true); };
  const openEdit = (b: any) => { setForm({ name: b.name, description: b.description || '', location: b.location || '', rating: String(b.rating), verified: !!b.verified, specialties: b.specialties || '', phone: b.phone || '', email: b.email || '', image_url: b.image_url || '' }); setEditing(b); setShowForm(true); };

  const handleSave = async () => {
    const body = { ...form, rating: parseFloat(form.rating) || 4.5 };
    if (editing) await adminRequest(`/boutiques/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
    else await adminRequest('/boutiques', { method: 'POST', body: JSON.stringify(body) });
    setShowForm(false); load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this boutique?')) return;
    await adminRequest(`/boutiques/${id}`, { method: 'DELETE' }); load();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Boutiques ({boutiques.length})</h2>
        <button onClick={openNew} className="admin-btn-add"><Plus style={{ width: 16, height: 16 }} /> Add Boutique</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {boutiques.map(b => (
          <div key={b.id} className="admin-list-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {b.image_url ? (
                <img src={b.image_url} alt={b.name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }} />
              ) : (
                <div className="admin-avatar">{b.name.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}</div>
              )}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: '#fff', fontWeight: 500 }}>{b.name}</span>
                  {b.verified ? <span className="admin-badge admin-badge-green">Verified</span> : null}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4, fontSize: 12, color: '#6b7280' }}>
                  <span>{b.location || 'No location'}</span>
                  <span>★ {b.rating}</span>
                  <span>{b.dressCount} dresses</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button onClick={() => openEdit(b)} className="admin-btn-icon"><Pencil style={{ width: 16, height: 16 }} /></button>
              <button onClick={() => handleDelete(b.id)} className="admin-btn-icon danger"><Trash2 style={{ width: 16, height: 16 }} /></button>
            </div>
          </div>
        ))}
        {boutiques.length === 0 && <p style={{ color: '#6b7280', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No boutiques yet. Add one to get started.</p>}
      </div>
      {showForm && (
        <Modal title={editing ? 'Edit Boutique' : 'New Boutique'} onClose={() => setShowForm(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><label className="admin-label">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="admin-input" style={{ height: 80, resize: 'none' }} /></div>
            <div className="admin-grid-2">
              <div><label className="admin-label">Location</label><input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Rating</label><input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="admin-input" /></div>
            </div>
            <div><label className="admin-label">Specialties (comma-separated)</label><input value={form.specialties} onChange={e => setForm({ ...form, specialties: e.target.value })} placeholder="Evening Wear, Wedding Guest" className="admin-input" /></div>
            <div className="admin-grid-2">
              <div><label className="admin-label">Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Email</label><input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="admin-input" /></div>
            </div>
            <ImageUploader value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.verified} onChange={e => setForm({ ...form, verified: e.target.checked })} />
              <span style={{ fontSize: 14, color: '#d1d5db' }}>Verified Boutique</span>
            </label>
            <button onClick={handleSave} className="admin-btn-primary">{editing ? 'Update' : 'Create'} Boutique</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// --- Dresses ---
function DressesPage() {
  const [dresses, setDresses] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState({ name: '', boutique: '', price: '', rating: '4.0', reviews: '0', express: false, collection: 'Evening Collection', image_url: '', description: '', sizes: 'S,M,L' });

  const load = useCallback(() => { adminRequest('/dresses').then(setDresses).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  const openNew = () => { setForm({ name: '', boutique: '', price: '', rating: '4.0', reviews: '0', express: false, collection: 'Evening Collection', image_url: '', description: '', sizes: 'S,M,L' }); setEditing(null); setShowForm(true); };
  const openEdit = (d: any) => { setForm({ name: d.name, boutique: d.boutique, price: String(d.price), rating: String(d.rating), reviews: String(d.reviews), express: !!d.express, collection: d.collection, image_url: d.image_url || '', description: d.description || '', sizes: d.sizes || 'S,M,L' }); setEditing(d); setShowForm(true); };

  const handleSave = async () => {
    const body = { ...form, price: parseFloat(form.price), rating: parseFloat(form.rating), reviews: parseInt(form.reviews) };
    if (editing) await adminRequest(`/dresses/${editing.id}`, { method: 'PUT', body: JSON.stringify(body) });
    else await adminRequest('/dresses', { method: 'POST', body: JSON.stringify(body) });
    setShowForm(false); load();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this dress?')) return;
    await adminRequest(`/dresses/${id}`, { method: 'DELETE' }); load();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Dresses ({dresses.length})</h2>
        <button onClick={openNew} className="admin-btn-add"><Plus style={{ width: 16, height: 16 }} /> Add Dress</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr>
            <th></th><th>ID</th><th>Name</th><th>Boutique</th><th>Price</th><th>Rating</th><th>Collection</th><th>Express</th><th></th>
          </tr></thead>
          <tbody>
            {dresses.map(d => (
              <tr key={d.id}>
                <td style={{ width: 48 }}>
                  {d.image_url ? (
                    <img src={d.image_url} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#1f2937', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ImageIcon style={{ width: 16, height: 16, color: '#4b5563' }} />
                    </div>
                  )}
                </td>
                <td style={{ color: '#6b7280' }}>#{d.id}</td>
                <td style={{ color: '#fff', fontWeight: 500 }}>{d.name}</td>
                <td style={{ color: '#9ca3af' }}>{d.boutique}</td>
                <td style={{ color: '#fff' }}>SAR {d.price.toLocaleString()}</td>
                <td style={{ color: '#9ca3af' }}>★ {d.rating}</td>
                <td><span className="admin-badge admin-badge-gray">{d.collection}</span></td>
                <td>{d.express ? <Check style={{ width: 16, height: 16, color: '#4ade80' }} /> : <span style={{ color: '#374151' }}>—</span>}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button onClick={() => openEdit(d)} className="admin-btn-icon"><Pencil style={{ width: 14, height: 14 }} /></button>
                    <button onClick={() => handleDelete(d.id)} className="admin-btn-icon danger"><Trash2 style={{ width: 14, height: 14 }} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {dresses.length === 0 && <p style={{ color: '#6b7280', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No dresses yet.</p>}
      </div>
      {showForm && (
        <Modal title={editing ? 'Edit Dress' : 'New Dress'} onClose={() => setShowForm(false)}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div><label className="admin-label">Name *</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="admin-input" /></div>
            <div className="admin-grid-2">
              <div><label className="admin-label">Boutique *</label><input value={form.boutique} onChange={e => setForm({ ...form, boutique: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Price (SAR) *</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} className="admin-input" /></div>
            </div>
            <div className="admin-grid-2">
              <div><label className="admin-label">Rating</label><input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: e.target.value })} className="admin-input" /></div>
              <div><label className="admin-label">Reviews Count</label><input type="number" value={form.reviews} onChange={e => setForm({ ...form, reviews: e.target.value })} className="admin-input" /></div>
            </div>
            <div><label className="admin-label">Collection</label>
              <select value={form.collection} onChange={e => setForm({ ...form, collection: e.target.value })} className="admin-input">
                <option>Evening Collection</option><option>Spring Collection</option><option>New Arrivals</option><option>Summer Collection</option><option>Bridal Collection</option>
              </select>
            </div>
            <div><label className="admin-label">Sizes (comma-separated)</label><input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} className="admin-input" /></div>
            <div><label className="admin-label">Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="admin-input" style={{ height: 80, resize: 'none' }} /></div>
            <ImageUploader value={form.image_url} onChange={url => setForm({ ...form, image_url: url })} />
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.express} onChange={e => setForm({ ...form, express: e.target.checked })} />
              <span style={{ fontSize: 14, color: '#d1d5db' }}>Express Delivery</span>
            </label>
            <button onClick={handleSave} className="admin-btn-primary">{editing ? 'Update' : 'Create'} Dress</button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// --- Orders ---
function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const load = useCallback(() => { adminRequest('/orders').then(setOrders).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    await adminRequest(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    load();
  };

  const statusBadge: Record<string, string> = {
    processing: 'admin-badge-yellow',
    'in-transit': 'admin-badge-blue',
    delivered: 'admin-badge-green',
    cancelled: 'admin-badge-red',
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Orders ({orders.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {orders.map(o => (
          <div key={o.id} className="admin-list-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ color: '#fff', fontWeight: 500 }}>{o.order_number}</span>
                <span className={`admin-badge ${statusBadge[o.status] || 'admin-badge-gray'}`}>{o.status}</span>
              </div>
              <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} className="admin-select">
                <option value="processing">Processing</option>
                <option value="in-transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 12, color: '#6b7280' }}>
              <span>{o.customer_name} ({o.customer_email})</span>
              <span>SAR {o.total.toLocaleString()}</span>
              <span>{o.items?.length || 0} items</span>
              <span>{new Date(o.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {orders.length === 0 && <p style={{ color: '#6b7280', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No orders yet.</p>}
      </div>
    </div>
  );
}

// --- Exclusives ---
function ExclusivesPage() {
  const [exclusives, setExclusives] = useState<any[]>([]);
  const load = useCallback(() => { adminRequest('/exclusives').then(setExclusives).catch(() => {}); }, []);
  useEffect(() => { load(); }, [load]);

  const updateStatus = async (id: number, status: string) => {
    await adminRequest(`/exclusives/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    load();
  };

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Exclusivity Requests ({exclusives.length})</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {exclusives.map(e => (
          <div key={e.id} className="admin-list-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Crown style={{ width: 16, height: 16, color: '#facc15' }} />
                <span style={{ color: '#fff', fontWeight: 500 }}>{e.dress_name}</span>
                <span className={`admin-badge ${e.status === 'active' ? 'admin-badge-green' : e.status === 'cancelled' ? 'admin-badge-red' : 'admin-badge-gray'}`}>{e.status}</span>
              </div>
              <select value={e.status} onChange={ev => updateStatus(e.id, ev.target.value)} className="admin-select">
                <option value="active">Active</option>
                <option value="cancelled">Cancelled</option>
                <option value="expired">Expired</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 12, color: '#6b7280' }}>
              <span>{e.customer_name} ({e.customer_email})</span>
              <span>{e.venue}</span>
              <span>{e.occasion}</span>
              <span>{new Date(e.event_date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
        {exclusives.length === 0 && <p style={{ color: '#6b7280', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No exclusivity requests yet.</p>}
      </div>
    </div>
  );
}

// --- Customers ---
function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  useEffect(() => { adminRequest('/customers').then(setCustomers).catch(() => {}); }, []);

  return (
    <div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Customers ({customers.length})</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead><tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Joined</th>
          </tr></thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.id}>
                <td style={{ color: '#fff' }}>{c.name}</td>
                <td style={{ color: '#9ca3af' }}>{c.email}</td>
                <td style={{ color: '#9ca3af' }}>{c.phone || '—'}</td>
                <td style={{ color: '#6b7280' }}>{new Date(c.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {customers.length === 0 && <p style={{ color: '#6b7280', fontSize: 14, textAlign: 'center', padding: '32px 0' }}>No customers yet.</p>}
      </div>
    </div>
  );
}

// --- Main Admin App ---
type AdminPage = 'dashboard' | 'boutiques' | 'dresses' | 'orders' | 'exclusives' | 'customers';

export default function AdminApp() {
  const [authenticated, setAuthenticated] = useState(!!localStorage.getItem('admin_token'));
  const [page, setPage] = useState<AdminPage>('dashboard');

  useEffect(() => {
    if (authenticated) {
      adminRequest('/me').catch(() => { localStorage.removeItem('admin_token'); setAuthenticated(false); });
    }
  }, [authenticated]);

  if (!authenticated) return <AdminLogin onLogin={() => setAuthenticated(true)} />;

  const handleLogout = () => { localStorage.removeItem('admin_token'); setAuthenticated(false); };

  const nav: { id: AdminPage; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'boutiques', label: 'Boutiques', icon: Store },
    { id: 'dresses', label: 'Dresses', icon: ShoppingBag },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'exclusives', label: 'Exclusives', icon: Crown },
    { id: 'customers', label: 'Customers', icon: Users },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#030712', display: 'flex' }}>
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div style={{ padding: 24, borderBottom: '1px solid #111827' }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>DARVELOUR</h1>
          <p style={{ fontSize: 10, color: '#4b5563', letterSpacing: '0.05em', marginTop: 2 }}>ADMIN PANEL</p>
        </div>
        <nav style={{ flex: 1, padding: 12, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {nav.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`admin-nav-btn ${page === item.id ? 'active' : ''}`}
            >
              <item.icon style={{ width: 16, height: 16 }} />
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: 12, borderTop: '1px solid #111827' }}>
          <button onClick={handleLogout} className="admin-nav-btn" style={{ color: '#6b7280' }}>
            <LogOut style={{ width: 16, height: 16 }} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main">
        {page === 'dashboard' && <Dashboard />}
        {page === 'boutiques' && <BoutiquesPage />}
        {page === 'dresses' && <DressesPage />}
        {page === 'orders' && <OrdersPage />}
        {page === 'exclusives' && <ExclusivesPage />}
        {page === 'customers' && <CustomersPage />}
      </main>
    </div>
  );
}
