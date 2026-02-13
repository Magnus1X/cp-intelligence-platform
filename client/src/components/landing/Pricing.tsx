import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

const plans = [
    {
        name: 'Starter',
        price: '0',
        description: 'For individuals starting their journey.',
        features: ['5 AI analyses / day', 'Basic performance tracking', 'Standard compiler', 'Community support'],
        buttonText: 'Start for free',
        highlight: false,
    },
    {
        name: 'Pro',
        price: '29',
        description: 'Advanced tools for serious competitors.',
        features: ['Unlimited AI analyses', 'Predictive rating insights', 'Priority compiler access', 'Custom mock contests', 'Neural optimization tips'],
        buttonText: 'Get Pro Access',
        highlight: true,
    },
    {
        name: 'Elite',
        price: '99',
        description: 'The ultimate set for teams and world-class pros.',
        features: ['Everything in Pro', 'Team performance analytics', 'Dedicated compute nodes', '1-on-1 performance review', 'Priority 24/7 support'],
        buttonText: 'Join the Elite',
        highlight: false,
    },
];

const Pricing: React.FC = () => {
    return (
        <section id="pricing" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.2em] text-[10px] uppercase mb-6"
                    >
                        Investment
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black tracking-tighter"
                    >
                        Pick your <span className="text-zinc-500">Tier.</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="contents"
                        >
                            <Card className={`p-10 rounded-[48px] glass relative overflow-hidden flex flex-col bg-transparent border-white/5 ${plan.highlight
                                ? 'border-primary/40 shadow-[0_0_100px_-20px_rgba(99,102,241,0.2)]'
                                : 'border-white/5'
                                }`}>
                                {plan.highlight && (
                                    <>
                                        <div className="absolute top-0 right-0 px-6 py-2 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-bl-3xl">
                                            Core Selection
                                        </div>
                                        <div className="absolute inset-0 bg-primary/5 -z-10" />
                                    </>
                                )}

                                <div className="mb-10">
                                    <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-5xl font-black text-white">${plan.price}</span>
                                        <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">/ month</span>
                                    </div>
                                    <p className="text-zinc-500 text-sm font-medium leading-relaxed">{plan.description}</p>
                                </div>

                                <div className="flex-grow">
                                    <ul className="space-y-5 mb-12">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-4 text-sm font-medium text-zinc-400">
                                                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                                    <Check className="w-3.5 h-3.5 text-primary" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    variant={plan.highlight ? "premium" : "secondary"}
                                    className={`w-full py-7 text-lg h-auto rounded-3xl font-black ${!plan.highlight && 'bg-white/5 hover:bg-white/10 text-white'}`}
                                >
                                    {plan.buttonText}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
