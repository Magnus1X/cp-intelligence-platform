import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';
import { Card, Button } from '../components/UI';
import { PerformanceChart, TagsChart } from '../components/DashboardCharts';
import {
    Trophy,
    Target,
    Zap,
    Activity,
    RefreshCcw,
    Link as LinkIcon,
    AlertCircle,
    TrendingUp,
    BarChart3,
    Brain
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <Card className="p-6 transition-all hover:border-primary/30 group">
        <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <p className="text-sm text-zinc-400">{label}</p>
                <p className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{value}</p>
            </div>
        </div>
    </Card>
);

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const [handle, setHandle] = useState('');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [error, setError] = useState('');

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/cf/analytics');
            setStats(data);
        } catch (err: any) {
            if (err.response?.status !== 404) {
                setError('Failed to load stats');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setSyncing(true);
        setError('');
        try {
            await api.post('/cf/handle', { handle });
            await api.post('/cf/sync');
            fetchStats();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to link handle');
        } finally {
            setSyncing(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            await api.post('/cf/sync');
            fetchStats();
        } catch (err) {
            setError('Sync failed');
        } finally {
            setSyncing(false);
        }
    };

    if (loading) return (
        <div className="p-8 max-w-7xl mx-auto space-y-8 animate-pulse">
            <div className="h-10 w-64 bg-white/5 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
            </div>
        </div>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Welcome back, <span className="text-primary">{user?.name}</span>
                    </h1>
                    <p className="text-zinc-400 mt-1">Here is your competitive programming intelligence overview</p>
                </div>
                {stats && (
                    <Button
                        onClick={handleSync}
                        disabled={syncing}
                        variant="outline"
                    >
                        <RefreshCcw className={syncing ? 'animate-spin' : ''} size={18} />
                        {syncing ? 'Syncing...' : 'Sync Profile'}
                    </Button>
                )}
            </header>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center gap-3">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {!stats ? (
                <Card className="p-12 text-center max-w-2xl mx-auto border-dashed">
                    <div className="inline-flex p-4 rounded-full bg-primary/10 mb-6">
                        <LinkIcon className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Link Your Codeforces Handle</h2>
                    <p className="text-zinc-400 mb-8">Connect your Codeforces account to generate advanced analytics, performance graphs, and personalized AI growth reports.</p>
                    <form onSubmit={handleLink} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Codeforces Handle (e.g. touriste)"
                            className="flex-1 bg-dark/60 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
                            value={handle}
                            onChange={(e) => setHandle(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={syncing}>
                            {syncing ? 'Linking...' : 'Link Profile'}
                        </Button>
                    </form>
                </Card>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard icon={TrendingUp} label="Current Rating" value={stats.currentRating} color="primary" />
                        <StatCard icon={Trophy} label="Max Rating" value={stats.maxRating} color="yellow-500" />
                        <StatCard icon={Target} label="Solved Count" value={stats.solvedCount} color="blue-500" />
                        <StatCard icon={Brain} label="CP Performance Score" value={stats.cpScore} color="purple-500" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Card className="lg:col-span-2 p-6">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <BarChart3 className="text-primary" />
                                    <h3 className="text-xl font-bold text-white">Performance Overview</h3>
                                </div>
                            </div>
                            <div className="h-[400px]">
                                <PerformanceChart data={stats.ratingHistory} />
                            </div>
                        </Card>

                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Topic Accuracy</h3>
                                <TagsChart data={stats.tagStats} />
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    <Button variant="outline" className="justify-start">
                                        <Brain size={18} className="text-primary" />
                                        AI Strength Report
                                    </Button>
                                    <Button variant="outline" className="justify-start">
                                        <Zap size={18} className="text-primary" />
                                        Recommended Problems
                                    </Button>
                                    <Button variant="outline" className="justify-start">
                                        <Activity size={18} className="text-primary" />
                                        View Roadmap
                                    </Button>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-bold text-white mb-4">Weak Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {stats.weakTags?.length > 0 ? stats.weakTags.map((tag: string) => (
                                        <span key={tag} className="px-3 py-1 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full text-sm">
                                            #{tag}
                                        </span>
                                    )) : (
                                        <p className="text-zinc-500 text-sm italic">No data available yet</p>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
