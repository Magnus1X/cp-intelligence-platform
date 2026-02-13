import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { Mail, Lock, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion'; // Added based on usage
import AuthLayout from '../components/auth/AuthLayout';
import { Button } from '../components/ui/button';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/auth/login', { email, password });
            login(data.token, data.user);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'The neural scan failed to identify your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Accelerate Your Ascent"
            subtitle="Access your neural growth dashboard and resume your journey to Grandmastery with human-verified insights."
        >
            <div className="space-y-8">
                <header>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest mb-4"
                    >
                        <Sparkles size={10} />
                        Neural Access Point
                    </motion.div>
                    <h2 className="text-4xl font-black text-white tracking-tighter">Welcome Back</h2>
                    <p className="text-zinc-500 mt-2 font-medium">Verify your identity to unlock intelligence.</p>
                </header>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center gap-3"
                    >
                        <AlertCircle className="shrink-0" size={18} />
                        <p className="text-xs font-bold">{error}</p>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Identity (Email)</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-primary" size={18} />
                            <input
                                type="email"
                                required
                                className="w-full bg-white/[0.02] border border-white/5 rounded-[20px] py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                placeholder="you@nebula.io"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Secret Key (Password)</label>
                            <button type="button" className="text-[10px] font-bold text-zinc-600 hover:text-primary transition-colors uppercase tracking-widest">Forgot?</button>
                        </div>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 transition-colors group-focus-within:text-primary" size={18} />
                            <input
                                type="password"
                                required
                                className="w-full bg-white/[0.02] border border-white/5 rounded-[20px] py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:border-primary/50 focus:bg-white/[0.05] transition-all"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-14 bg-white hover:bg-zinc-200 text-black font-black rounded-[20px] shadow-xl shadow-white/5 group relative overflow-hidden transition-all active:scale-[0.98]"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? 'Decrypting...' : (
                                <>
                                    Authorize Session
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-500" />
                    </Button>
                </form>

                <div className="pt-8 border-t border-white/5 text-center">
                    <p className="text-zinc-500 text-sm font-medium">
                        Not part of the elite?{' '}
                        <Link to="/register" className="text-white hover:text-primary font-bold transition-colors ml-1">Begin Onboarding</Link>
                    </p>
                </div>
            </div>
        </AuthLayout>
    );
};

export default Login;
