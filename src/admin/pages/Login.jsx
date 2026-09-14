import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login({ setAuthToken }) {
  const [email, setEmail] = useState('admin@prsaroller.com');
  const [password, setPassword] = useState('Admin@123456');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('prsa_admin_token', data.token);
        localStorage.setItem('prsa_admin_user', JSON.stringify(data.user));
        setAuthToken(data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed. Invalid credentials.');
      }
    } catch (err) {
      setError('Connection error. Server may be starting.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl p-space-xl shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-container to-primary text-on-primary-container flex items-center justify-center font-bold text-xl mx-auto shadow-lg">
            P
          </div>
          <h2 className="text-2xl font-bold text-primary tracking-tight">PRSA ADMIN PORTAL</h2>
          <p className="text-xs text-on-surface-variant">
            Secure Maintenance Portal for Academy Management
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              ADMIN EMAIL ADDRESS
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-outline absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@prsaroller.com"
                className="w-full bg-surface-container-high text-on-surface pl-10 pr-4 py-3 rounded-lg border border-outline-variant/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-on-surface-variant block mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-outline absolute left-3 top-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container-high text-on-surface pl-10 pr-4 py-3 rounded-lg border border-outline-variant/30 text-sm focus:outline-none focus:ring-1 focus:ring-primary-container"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-lg bg-primary-container text-on-primary-container font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : (
              <>
                <span>Sign In To Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-outline-variant/20 text-center space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-xs text-primary font-semibold">
            <ShieldCheck className="w-4 h-4 text-primary-container" />
            <span>256-Bit Encrypted Session</span>
          </div>
          <p className="text-[11px] text-outline">
            Default credentials: admin@prsaroller.com / Admin@123456
          </p>
        </div>
      </div>
    </div>
  );
}
