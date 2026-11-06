import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Lock, Mail, User, Phone, ShieldCheck, AlertCircle, Key } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, login, register, setCurrentView } = useStore();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    if (isRegistering) {
      if (!name || !email) return;
      register(name, email, phone);
    } else {
      if (!email) return;

      // Admin verification
      if (email.trim().toLowerCase() === 'arafatmazumder304@gmail.com') {
        if (password !== 'araFat@#4321') {
          setAuthError('Incorrect admin password. Required password: araFat@#4321');
          return;
        }
        login('arafatmazumder304@gmail.com', 'admin');
        setCurrentView('admin_dashboard');
        return;
      }

      login(email);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div 
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-xs" 
      />
      <div className="relative w-full max-w-md bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-auto z-10">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <h3 className="font-bold text-white text-base">
            {isRegistering ? 'Create Customer Account' : 'Sign In to Your Account'}
          </h3>
          <button
            type="button"
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {isRegistering && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arafat Mazumder"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">Mobile Phone (BD)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01915985602"
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/30"
          >
            {isRegistering ? 'Register & Access Downloads' : 'Sign In'}
          </button>

          {/* Quick Demo Logins for Testing */}
          <div className="pt-2 text-center border-t border-slate-800/80 space-y-2">
            <span className="text-[10px] text-slate-500 block font-mono">Quick Credential Fillers:</span>
            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail('arafatmazumder304@gmail.com');
                  setPassword('araFat@#4321');
                  setAuthError('');
                  login('arafatmazumder304@gmail.com', 'admin');
                  setCurrentView('admin_dashboard');
                }}
                className="px-3 py-1.5 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 text-xs rounded-xl border border-amber-500/40 font-semibold flex items-center justify-center gap-1.5 transition-colors"
                title="Log in with official admin email & password"
              >
                <Key className="w-3.5 h-3.5 text-amber-400" />
                <span>Admin Login (arafatmazumder304@gmail.com)</span>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs text-blue-400 hover:underline"
            >
              {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
