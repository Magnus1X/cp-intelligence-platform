import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { Card } from '../ui/card';

const testimonials = [
    {
        name: 'Alexander Petrov',
        role: 'LGM @ Codeforces',
        content: "The level of detail in the AI analysis is unprecedented. It identifies edge cases I hadn't even considered. Professional grade software.",
        avatar: 'AP',
        gradient: 'from-blue-600/20 via-blue-900/40 to-transparent',
        border: 'border-blue-500/20'
    },
    {
        name: 'Sofia Chen',
        role: 'Senior Engineer @ Google',
        content: "I use this to stay sharp for interviews and internal competitions. The DX is better than any other platform I've used.",
        avatar: 'SC',
        gradient: 'from-purple-600/20 via-purple-900/40 to-transparent',
        border: 'border-purple-500/20'
    },
    {
        name: 'James Wilson',
        role: 'ICPC World Finalist',
        content: "Finally, a platform that understands the workflow of a high-performance coder. Zero friction, total focus.",
        avatar: 'JW',
        gradient: 'from-emerald-600/20 via-emerald-900/40 to-transparent',
        border: 'border-emerald-500/20'
    },
];

const Testimonials: React.FC = () => {
    return (
        <section id="testimonials" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col items-center text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-secondary font-bold tracking-[0.2em] text-[10px] uppercase mb-6"
                    >
                        Success Stories
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-black tracking-tight"
                    >
                        Built for the <span className="text-zinc-500 italic">1%</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="contents"
                        >
                            <Card className={`p-10 rounded-[48px] glass border-white/5 relative group transition-all duration-500 hover:border-white/10 bg-transparent`}>
                                {/* Decorative gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} rounded-[48px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                                <Quote className="text-white/10 w-12 h-12 mb-8 group-hover:text-white/20 transition-colors" />

                                <p className="text-xl font-medium text-white/90 leading-relaxed mb-10 group-hover:text-white transition-colors">
                                    "{t.content}"
                                </p>

                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white font-black text-xl border border-white/10 group-hover:scale-110 transition-transform`}>
                                        {t.avatar}
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-white font-bold tracking-tight">{t.name}</h4>
                                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
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

export default Testimonials;
