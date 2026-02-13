import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { Card, Button } from '../components/UI';
import { PerformanceChart } from '../components/DashboardCharts';
import {
    Trophy,
    Target,
    Zap,
    Activity,
    RefreshCcw,
    TrendingUp,
    BarChart3,
    Brain,
    Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const StatCard = ({ icon: Icon, label, value, color, description }: any) => (
    <Card className="p-8 transition-all hover:scale-[1.02] hover:border-primary/50 group bg-white/[0.03] border-white/5 rounded-[32px] overflow-hidden relative">
        <div className="flex flex-col gap-6 relative z-10">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110", `bg-${color}/10 text-${color}`)}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-3xl font-black text-white">{value}</p>
                {description && <p className="text-xs text-zinc-500 mt-2 font-medium">{description}</p>}
            </div>
        </div>
        <div className={cn("absolute -bottom-10 -right-10 w-32 h-32 blur-3xl rounded-full opacity-10 transition-opacity group-hover:opacity-20", `bg-${color}`)} />
    </Card>
);

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const demoStats = {
        currentRating: 1462,
        maxRating: 1510,
        solvedCount: 342,
        cpScore: 84,
        ratingHistory: [
            { date: 'Jan', rating: 1200 },
            { date: 'Feb', rating: 1350 },
            { date: 'Mar', rating: 1462 },
        ],
        tagStats: [
            { name: 'Greedy', count: 45 },
            { name: 'DP', count: 32 },
            { name: 'Math', count: 28 },
            { name: 'Graphs', count: 12 },
        ],
        weakTags: ['Dynamic Programming', 'Segment Trees']
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/cf/analytics');
                setStats(data);
            } catch (err: any) {
                // If it's a guest or API fails, use demo data
                setStats(demoStats);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return (
        <div className="p-12 max-w-7xl mx-auto space-y-12 animate-pulse">
            <div className="h-16 w-96 bg-white/5 rounded-3xl" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-44 bg-white/5 rounded-[32px]" />)}
            </div>
        </div>
    );

    return (
        <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12 bg-[#020617] min-h-screen selection:bg-primary/30">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-12">
                <div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4"
                    >
                        Intelligence Hub
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                        Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">{user?.name}</span>
                    </h1>
                    <p className="text-zinc-500 mt-4 text-lg max-w-xl font-medium leading-relaxed">
                        Your performance is currently <span className="text-green-500 font-bold">12% above</span> the global average.
                        We recommend focusing on binary search optimization today.
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" className="rounded-2xl px-6 py-6 h-auto border-white/10 hover:bg-white/5 transition-all">
                        <RefreshCcw size={20} className="mr-2" />
                        Sync Data
                    </Button>
                    <Button
                        variant="premium"
                        onClick={() => navigate('/analyzer')}
                        className="rounded-2xl px-8 py-6 h-auto shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        New Analysis
                        <Zap size={20} className="ml-2 fill-current" />
                    </Button>
                </div>
            </header>

            <div className="space-y-12">
                {/* Stats Grid - Artisanal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatCard icon={TrendingUp} label="Current Rating" value={stats.currentRating} color="indigo-500" description="+42 since last week" />
                    <StatCard icon={Trophy} label="Max Rating" value={stats.maxRating} color="amber-500" description="Achieved 12 days ago" />
                    <StatCard icon={Target} label="Solved Count" value={stats.solvedCount} color="emerald-500" description="Top 5% in your region" />
                    <StatCard icon={Brain} label="Inertia Score" value={stats.cpScore} color="violet-500" description="AI prediction: Stable Growth" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8">
                    {/* Main Chart Area */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="lg:col-span-8 group"
                    >
                        <Card className="p-10 bg-white/[0.02] border-white/5 rounded-[48px] overflow-hidden relative">
                            <div className="flex items-center justify-between mb-12 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                        <BarChart3 className="text-primary w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white">Growth Velocity</h3>
                                </div>
                                <div className="flex gap-2">
                                    {['7D', '1M', 'ALL'].map(t => (
                                        <button key={t} className="px-4 py-2 text-xs font-bold text-zinc-500 hover:text-white rounded-xl hover:bg-white/5 transition-all">
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="h-[400px] relative z-10 w-full">
                                <PerformanceChart data={stats.ratingHistory} />
                            </div>
                            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        </Card>
                    </motion.div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4 space-y-10">
                        <Card className="p-8 bg-white/[0.02] border-white/5 rounded-[40px] relative overflow-hidden group">
                            <h3 className="text-xl font-bold text-white mb-6">Quick Tools</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => navigate('/analyzer')}
                                    className="flex items-center gap-5 p-5 rounded-3xl bg-primary hover:bg-primary/90 transition-all group/btn shadow-lg shadow-primary/20"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                                        <Sparkles size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black text-white">Code DeepScan</p>
                                        <p className="text-[10px] text-white/60 font-medium uppercase tracking-wider">AI Analytics</p>
                                    </div>
                                </button>
                                <button
                                    onClick={() => navigate('/journey')}
                                    className="flex items-center gap-5 p-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group/btn"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                                        <Activity size={20} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-black text-white">Ascent Roadmap</p>
                                        <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Growth Path</p>
                                    </div>
                                </button>
                            </div>
                        </Card>

                        <Card className="p-8 bg-white/[0.02] border-white/5 rounded-[40px]">
                            <h3 className="text-xl font-bold text-white mb-6">Mastery Focus</h3>
                            <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Focus areas to reach Specialist</p>
                            <div className="flex flex-wrap gap-3">
                                {stats.weakTags?.map((tag: string) => (
                                    <div key={tag} className="px-5 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-[20px] text-sm font-bold flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        {tag}
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
