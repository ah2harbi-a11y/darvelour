import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as api from '../api';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address_street?: string;
  address_city?: string;
  address_district?: string;
  address_postal?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Record<string, string>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    if (api.isLoggedIn()) {
      api.getProfile()
        .then(setUser)
        .catch(() => { api.logout(); })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await api.login(email, password);
    setUser(data.user);
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const data = await api.register(name, email, password, phone);
    setUser(data.user);
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  const updateProfile = async (data: Record<string, string>) => {
    const updated = await api.updateProfile(data);
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
