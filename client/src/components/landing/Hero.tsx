import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Play, Star, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Hero: React.FC = () => {
    return (
        <section className="relative pt-44 pb-32 lg:pt-56 lg:pb-48 overflow-hidden">
            {/* Mesh Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-20%] w-[70%] h-[70%] bg-primary/20 rounded-full blur-[160px] animate-pulse-slow" />
                <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[140px] animate-bounce-slow" />
                <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-accent/15 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-10"
                    >
                        <Badge variant="premium" className="px-5 py-2 flex items-center gap-2">
                            <Star className="w-4 h-4 text-primary fill-primary" />
                            New: AI Solution Optimization 2.0
                            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
                        </Badge>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tight leading-[0.9] mb-12 text-center"
                    >
                        <span className="inline-block text-white">Solve at the</span><br />
                        <span className="inline-block bg-clip-text text-transparent bg-gradient-to-br from-primary via-secondary to-accent">
                            Speed of Light.
                        </span>
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-3xl mx-auto text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed mb-16 px-4"
                    >
                        The intelligent workstation for competitive programmers. <br className="hidden md:block" />
                        Built for those who demand performance, insights, and speed.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg"
                    >
                        <Button variant="premium" size="xl" className="w-full sm:w-auto relative group shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-[1.03]">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            <span className="flex items-center justify-center gap-2 relative z-10">
                                Start Training Free
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Button>
                        <Button variant="secondary" size="xl" className="w-full sm:w-auto font-bold rounded-3xl hover:bg-white/10 active:scale-95 group">
                            <span className="flex items-center justify-center gap-2">
                                <Play className="w-5 h-5 fill-current" />
                                Watch Demo
                            </span>
                        </Button>
                    </motion.div>

                    {/* Logo Cloud Section - Minimalist */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-32 w-full pt-10 border-t border-white/5 flex flex-wrap justify-between gap-8 opacity-40 grayscale pointer-events-none"
                    >
                        {['CODEFORCES', 'LEETCODE', 'CODECHEF', 'ATCODER', 'HACKERRANK'].map((p) => (
                            <span key={p} className="text-sm font-black tracking-widest text-zinc-500">{p}</span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
