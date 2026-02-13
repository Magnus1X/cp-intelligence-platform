import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Terminal, LogOut, LayoutDashboard, Sparkles, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-dark/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center gap-2 group">
                        <Terminal className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                            CP Intelligence
                        </span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to="/dashboard" className="text-zinc-400 hover:text-primary flex items-center gap-2 transition-colors font-medium">
                                    <LayoutDashboard size={18} />
                                    <span>Intel</span>
                                </Link>
                                <Link to="/analyzer" className="text-zinc-400 hover:text-primary flex items-center gap-2 transition-colors font-medium">
                                    <Sparkles size={18} />
                                    <span>DeepScan</span>
                                </Link>
                                <Link to="/journey" className="text-zinc-400 hover:text-primary flex items-center gap-2 transition-colors font-medium">
                                    <Activity size={18} />
                                    <span>Journey</span>
                                </Link>
                                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                    <span className="text-zinc-300 font-medium">{user.name}</span>
                                    <button
                                        onClick={logout}
                                        className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-full transition-all"
                                        title="Logout"
                                    >
                                        <LogOut size={20} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <Link to="/login" className="text-zinc-300 hover:text-white transition-colors">Login</Link>
                                <Link to="/register" className="px-4 py-2 bg-primary text-black font-semibold rounded-md hover:bg-primary/90 transition-all">
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
