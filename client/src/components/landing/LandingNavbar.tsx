import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, ChevronRight } from 'lucide-react';
import { Button } from '../UI';

const LandingNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Dashboard', href: '#dashboard' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Pricing', href: '#pricing' },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled
                ? 'bg-background-dark/30 backdrop-blur-xl border-b border-white/5 py-4'
                : 'bg-transparent py-8'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group relative">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-[14px] flex items-center justify-center p-[2px] shadow-lg shadow-primary/20 rotate-0 group-hover:rotate-12 transition-transform duration-500">
                            <div className="w-full h-full bg-background-dark rounded-[12px] flex items-center justify-center">
                                <Terminal className="text-white w-5 h-5 group-hover:scale-110 transition-transform" />
                            </div>
                        </div>
                        <span className="text-xl font-extrabold tracking-tight text-white group-hover:opacity-80 transition-opacity">
                            CP<span className="text-zinc-500 font-light ml-1">Intel</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-all rounded-full hover:bg-white/5"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login">
                            <Button variant="ghost" className="text-zinc-400 hover:text-white">
                                Sign in
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="premium" size="lg" className="rounded-full px-6 py-2.5 h-auto group transition-all hover:pr-8">
                                Get Started
                                <ChevronRight className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                            </Button>
                        </Link>
                    </div>


                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-3 text-zinc-400 hover:text-white transition-colors glass rounded-2xl"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-4 right-4 mt-4 glass rounded-[32px] overflow-hidden"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-3 text-lg font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-6 flex flex-col gap-4">
                                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button variant="ghost" className="w-full py-4 text-zinc-400 font-medium">
                                        Sign in
                                    </Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full">
                                    <Button variant="premium" className="w-full py-4 text-black font-bold rounded-3xl h-auto">
                                        Get Started
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default LandingNavbar;
