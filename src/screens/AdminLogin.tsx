import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAdmin } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'trishgaming.88@gmail.com' && password === 'tn4874442') {
      setIsAdmin(true);
      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fdfaf6] text-[#b32b1d]">
            <Lock size={32} />
          </div>
          <h1 className="font-serif text-2xl font-bold">Admin Portal</h1>
          <p className="text-sm text-gray-500">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@restaurant.com"
                className="w-full rounded-xl border border-gray-100 bg-gray-50 p-3 pl-10 text-sm focus:border-[#b32b1d] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold uppercase text-gray-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-gray-100 bg-gray-50 p-3 pl-10 text-sm focus:border-[#b32b1d] focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 p-3 text-xs text-red-500">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-[#b32b1d] py-4 font-bold text-white shadow-lg shadow-red-200 transition-transform active:scale-95"
          >
            Login
          </button>
        </form>
      </motion.div>
    </div>
  );
};
