import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Shield, Lock, Eye, EyeOff, ArrowLeft, Loader2, AlertCircle, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter your admin password.');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await login(password);
    setLoading(false);

    if (res.success) {
      navigate('/admin');
    } else {
      setError(res.error || 'Incorrect password. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />

      <div className="relative z-10 w-full max-w-md">
        
        {/* Back link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0e1626]/90 border border-slate-700/60 backdrop-blur-xl shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center mx-auto shadow-lg shadow-sky-500/25">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-slate-400">
              Enter your master password to access the management dashboard
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Admin Password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                  required
                  className="w-full py-3.5 pl-10 pr-12 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Password...</span>
                </>
              ) : (
                <>
                  <span>Unlock Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
