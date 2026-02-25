import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // SCHIMBĂ PAROLA AICI
    if (password === 'tata2026') {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin-panou-control');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl text-center"
      >
        <h2 className="text-3xl font-serif font-bold mb-6">Acces Admin</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="Introdu parola" 
            className={`w-full p-4 border rounded-xl outline-none transition-all ${error ? 'border-red-500' : 'border-stone-200 focus:ring-2 focus:ring-blue-500'}`}
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
          />
          {error && <p className="text-red-500 text-sm italic">Parolă incorectă!</p>}
          <button className="w-full bg-stone-800 text-white py-4 rounded-xl font-bold hover:bg-stone-700 transition-all">
            Intră în Panou
          </button>
        </form>
      </motion.div>
    </div>
  );
}