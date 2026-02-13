import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
}

// Shared branding component
const AuthBranding: React.FC = () => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 mb-12"
    >
        <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Zap size={24} className="fill-current" />
        </div>
        <span className="text-xl font-black text-white tracking-tighter">CP Intelligence</span>
    </motion.div>
);

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
    return (
        <div className="min-h-screen bg-[#020617] flex overflow-hidden selection:bg-primary/30">
            {/* Left Column: Narrative/Branding (Desktop Only) */}
            <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-16 overflow-hidden">
                <div className="relative z-10">
                    <AuthBranding />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-6xl font-black text-white tracking-tighter italic mb-6 leading-[0.9]">
                            {title.split(' ').map((word, i) => (
                                <span key={i} className={i % 2 !== 0 ? "text-primary not-italic tracking-normal" : ""}>
                                    {word}{' '}
                                </span>
                            ))}
                        </h1>
                        <p className="text-zinc-500 text-xl max-w-md leading-relaxed">
                            {subtitle}
                        </p>
                    </motion.div>
                </div>

                <div className="relative z-10">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-white font-bold text-2xl mb-1">10k+</p>
                            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Active Analysts</p>
                        </div>
                        <div className="w-px h-12 bg-white/10" />
                        <div>
                            <p className="text-white font-bold text-2xl mb-1">99.9%</p>
                            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Neural Accuracy</p>
                        </div>
                    </div>
                </div>

                {/* Organic background shapes */}
                <div className="absolute top-0 left-0 w-full h-full noise opacity-5 pointer-events-none" />
                <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full" />
            </div>

            {/* Right Column: Form Area */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative">
                <div className="absolute top-0 left-0 w-full h-full lg:hidden overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-accent/10 blur-[100px] rounded-full" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    {children}
                </motion.div>
            </div>
        </div>
    );
};

export default AuthLayout;
