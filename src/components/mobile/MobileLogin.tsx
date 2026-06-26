import { useState } from 'react';
import { Page } from '../../App';
import { useAuth } from '../../context/AuthContext';
import MobileNav from './MobileNav';

interface MobileLoginProps {
  onNavigate: (page: Page) => void;
  wishlistItems: number;
}

export default function MobileLogin({ onNavigate, wishlistItems }: MobileLoginProps) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password, phone || undefined);
      } else {
        await login(email, password);
      }
      onNavigate('home');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold tracking-widest mb-2">DARVELOUR</h1>
          <p className="text-sm text-gray-500">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        <div className="space-y-4 max-w-sm mx-auto w-full">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Al-Rashid"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 50 123 4567"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm bg-red-50 px-4 py-2 rounded-lg">{error}</div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white py-4 rounded-lg text-sm font-bold tracking-wider disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>

          <div className="text-center pt-4">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(''); }}
              className="text-sm text-gray-500 underline"
            >
              {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
            </button>
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-gray-400"
            >
              Continue as guest
            </button>
          </div>
        </div>
      </div>

      <MobileNav currentPage="profile" onNavigate={onNavigate} wishlistItems={wishlistItems} />
    </div>
  );
}
