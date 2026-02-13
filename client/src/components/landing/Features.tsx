import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Code2, Zap, BarChart3, Globe, Sparkles } from 'lucide-react';
import { Card } from '../ui/card';

const features = [
    {
        title: 'Neural Logic Analysis',
        description: 'Deep-dive into logic flaws with transformer-based reasoning models optimized for competitive coding.',
        icon: Brain,
        className: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20',
        iconColor: 'text-primary'
    },
    {
        title: 'Zero-Latency Runtime',
        description: 'Execute C++, Python, and Java in micro-seconds on our edge-compute infrastructure.',
        icon: Zap,
        className: 'md:col-span-1 md:row-span-1 border-white/5',
        iconColor: 'text-yellow-500'
    },
    {
        title: 'Smart Editor v2',
        description: 'Vim-mode support and real-time complexity linting.',
        icon: Code2,
        className: 'md:col-span-1 md:row-span-1 border-white/5',
        iconColor: 'text-accent'
    },
    {
        title: 'Predictive Analytics',
        description: 'Know your rating changes before the contest finishes.',
        icon: BarChart3,
        className: 'md:col-span-1 md:row-span-2 border-white/5',
        iconColor: 'text-green-500'
    },
    {
        title: 'Global Mesh Infrastructure',
        description: 'Low-latency access from anywhere on the planet.',
        icon: Globe,
        className: 'md:col-span-2 md:row-span-1 border-white/5',
        iconColor: 'text-orange-500'
    }
];

const Features: React.FC = () => {
    return (
        <section id="features" className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-2 text-primary font-bold tracking-widest text-xs uppercase mb-4"
                        >
                            <Sparkles className="w-4 h-4" />
                            The Platform
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black tracking-tight leading-none"
                        >
                            Engineered for <br />
                            <span className="text-zinc-500">Peak Performance.</span>
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-zinc-400 text-lg max-w-sm"
                    >
                        We've obsessed over every millisecond and every pixel to create the ultimate training environment.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className={`${feature.className} contents`}
                        >
                            <Card className={`p-8 rounded-[40px] glass relative overflow-hidden group bg-transparent/5 border-white/10 ${feature.className}`}>
                                {/* Card Decoration */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-primary/10 transition-colors" />

                                <div className="flex flex-col h-full justify-between relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-500`}>
                                        <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-3 text-white tracking-tight">{feature.title}</h3>
                                        <p className="text-zinc-500 font-medium leading-normal group-hover:text-zinc-400 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
