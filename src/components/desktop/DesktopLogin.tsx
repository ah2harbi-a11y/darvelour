import { useState } from 'react';
import { Page } from '../../App';
import { useAuth } from '../../context/AuthContext';

interface DesktopLoginProps {
  onNavigate: (page: Page) => void;
}

export default function DesktopLogin({ onNavigate }: DesktopLoginProps) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-porcelain flex items-center justify-center">
      <div className="w-full max-w-md mx-auto px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-widest mb-3">DARVELOUR</h1>
          <p className="text-sm text-charcoal/60 font-light">
            {isRegister ? 'Create your account' : 'Welcome back'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
                FULL NAME
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sarah Al-Rashid"
                required
                className="w-full px-5 py-4 bg-white border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sarah@example.com"
              required
              className="w-full px-5 py-4 bg-white border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-5 py-4 bg-white border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block text-[9px] tracking-[0.25em] uppercase text-charcoal/60 mb-3 font-light">
                PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966 50 123 4567"
                className="w-full px-5 py-4 bg-white border border-charcoal/20 text-charcoal font-light focus:border-charcoal focus:outline-none"
              />
            </div>
          )}

          {error && (
            <div className="text-burgundy text-sm bg-burgundy/5 px-5 py-3 border border-burgundy/20">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal text-porcelain py-4 text-xs tracking-[0.2em] uppercase font-light hover:bg-charcoal/90 disabled:opacity-50"
          >
            {loading ? 'Please wait...' : isRegister ? 'CREATE ACCOUNT' : 'SIGN IN'}
          </button>
        </form>

        <div className="text-center mt-8 space-y-4">
          <button
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            className="text-sm text-charcoal/60 hover:text-charcoal font-light underline"
          >
            {isRegister ? 'Already have an account? Sign in' : "Don't have an account? Register"}
          </button>
          <div>
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-charcoal/40 hover:text-charcoal/60 font-light"
            >
              Continue as guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
