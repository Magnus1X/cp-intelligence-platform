import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Zap, Star, CheckCircle2, ChevronRight, Flag } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { cn } from '../lib/utils';

interface Milestone {
    id: number;
    title: string;
    description: string;
    level: string;
    status: 'completed' | 'current' | 'locked';
    icon: any;
    color: string;
}

const milestones: Milestone[] = [
    {
        id: 1,
        title: "The Genesis",
        description: "Master the basics: Time complexity, STL, and brute force basics.",
        level: "Newbie (800-1000)",
        status: 'completed',
        icon: Target,
        color: "blue-500"
    },
    {
        id: 2,
        title: "Binary Ascent",
        description: "Recursion, Binary Search, and the foundations of Greedy logic.",
        level: "Pupil (1000-1200)",
        status: 'completed',
        icon: Zap,
        color: "cyan-500"
    },
    {
        id: 3,
        title: "Dynamic Gateway",
        description: "The dreaded DP. Mastering subproblems and Memoization.",
        level: "Specialist (1200-1400)",
        status: 'current',
        icon: Star,
        color: "green-500"
    },
    {
        id: 4,
        title: "Graph Labyrinth",
        description: "BFS, DFS, Dijkstra, and the secrets of shortest paths.",
        level: "Expert (1400-1600)",
        status: 'locked',
        icon: Trophy,
        color: "purple-500"
    },
    {
        id: 5,
        title: "The Ultimate Summit",
        description: "Segment Trees, Flow networks, and Advanced Math.",
        level: "Candidate Master (1600+)",
        status: 'locked',
        icon: Flag,
        color: "red-500"
    }
];

const CPJourney: React.FC = () => {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 lg:px-12 bg-[#020617] relative selection:bg-primary/30">
            {/* Background Narrative elements */}
            <div className="absolute top-0 left-0 w-full h-full noise opacity-5 pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                <header className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block p-4 bg-primary/10 rounded-[32px] mb-6"
                    >
                        <Trophy className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-4 italic">
                        Your <span className="text-primary tracking-normal not-italic">Personal</span> Ascent
                    </h1>
                    <p className="text-zinc-500 text-lg max-w-xl mx-auto leading-relaxed">
                        Competitive programming is a marathon, not a sprint.
                        We've mapped out your unique path to Grandmastery based on human learning patterns.
                    </p>
                </header>

                <div className="relative">
                    {/* The Path Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/10 to-transparent -translate-x-1/2 hidden md:block" />

                    <div className="space-y-12">
                        {milestones.map((ms, index) => {
                            const isLeft = index % 2 === 0;
                            const isCompleted = ms.status === 'completed';
                            const isCurrent = ms.status === 'current';

                            return (
                                <motion.div
                                    key={ms.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className={cn(
                                        "relative flex flex-col md:flex-row items-center gap-8 md:gap-0",
                                        isLeft ? "md:flex-row" : "md:flex-row-reverse"
                                    )}
                                >
                                    {/* Milestone Card */}
                                    <div className="w-full md:w-[45%]">
                                        <Card className={cn(
                                            "p-8 rounded-[40px] transition-all relative overflow-hidden group",
                                            isCurrent ? "bg-primary/10 border-primary shadow-[0_0_40px_-10px_rgba(99,102,241,0.3)]" : "bg-white/5 border-white/10 opacity-70 hover:opacity-100"
                                        )}>
                                            {isCompleted && (
                                                <div className="absolute top-4 right-4 text-green-500">
                                                    <CheckCircle2 size={24} />
                                                </div>
                                            )}
                                            {isCurrent && (
                                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                                            )}

                                            <div className={cn(
                                                "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                                                `bg-${ms.color}/10 text-${ms.color}`
                                            )}>
                                                <ms.icon size={28} />
                                            </div>

                                            <h3 className="text-2xl font-black text-white mb-2">{ms.title}</h3>
                                            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">{ms.level}</p>
                                            <p className="text-zinc-400 text-sm leading-relaxed mb-6">{ms.description}</p>

                                            {isCurrent && (
                                                <Button size="lg" className="w-full rounded-2xl bg-white text-black font-bold hover:bg-zinc-200">
                                                    Continue Challenge
                                                    <ChevronRight size={18} className="ml-2" />
                                                </Button>
                                            )}
                                        </Card>
                                    </div>

                                    {/* Center Node */}
                                    <div className="relative z-10 w-16 h-16 rounded-full bg-[#020617] border-4 border-white/5 flex items-center justify-center">
                                        <div className={cn(
                                            "w-4 h-4 rounded-full",
                                            isCompleted ? "bg-green-500 shadow-[0_0_15px_#22c55e]" :
                                                isCurrent ? "bg-primary animate-pulse shadow-[0_0_15px_#6366f1]" :
                                                    "bg-zinc-800"
                                        )} />
                                    </div>

                                    {/* Empty Side for alignment */}
                                    <div className="hidden md:block w-[45%]" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-12 glass rounded-[60px] text-center border-white/5"
                >
                    <h2 className="text-3xl font-black text-white mb-4 italic">Not just code. It's an evolution.</h2>
                    <p className="text-zinc-500 mb-8 max-w-lg mx-auto">
                        Every submission is a synapse firing in your journey.
                        Keep pushing. Your next milestone is 42% closer than you think.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button variant="outline" className="rounded-full px-8 py-6 h-auto">View Detailed Stats</Button>
                        <Button variant="premium" className="rounded-full px-8 py-6 h-auto">Share Journey</Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CPJourney;
