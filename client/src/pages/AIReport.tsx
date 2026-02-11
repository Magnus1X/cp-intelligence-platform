import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button } from '../components/UI';
import {
    BrainCircuit,
    CheckCircle,
    TrendingUp,
    Target,
    ShieldCheck,
    Zap,
    ChevronLeft,
    Share2,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';

const AIReport: React.FC = () => {
    const { id } = useParams();
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                // Mocking AI Report data
                const mockReport = {
                    _id: id,
                    correctnessScore: 95,
                    timeComplexity: 'O(log N)',
                    spaceComplexity: 'O(1)',
                    optimizationScore: 88,
                    codeQualityScore: 92,
                    contestReadinessScore: 90,
                    strengths: ['Highly efficient approach', 'Clean variable naming', 'Edge cases handled'],
                    weaknesses: ['Could use bit manipulation for bit-parity checks'],
                    improvementSuggestions: ['Consider using bitwise XOR for even/odd check to save a few cycles', 'Add more comments for complex logic'],
                    overallVerdict: 'Excellent implementation of the Watermelon problem. Your logic is sound and the time complexity is optimal for the given constraints.'
                };
                setReport(mockReport);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, [id]);

    if (loading) return <div className="p-8 animate-pulse space-y-8">
        <div className="h-10 w-64 bg-white/5 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white/5 rounded-2xl" />)}
        </div>
    </div>;

    const MetricCard = ({ label, value, icon: Icon, color }: any) => (
        <Card className="p-6 border-white/5 bg-secondary/30">
            <div className="flex items-center justify-between mb-4">
                <span className="text-zinc-500 text-sm font-medium">{label}</span>
                <Icon className={`text-${color}`} size={20} />
            </div>
            <div className="flex items-end gap-2">
                <span className="text-3xl font-bold text-white">{value}</span>
                <span className="text-zinc-500 text-sm mb-1">%</span>
            </div>
            <div className="mt-4 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    className={`h-full bg-${color}`}
                />
            </div>
        </Card>
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <button className="flex items-center gap-1 text-primary text-sm mb-2 hover:underline">
                        <ChevronLeft size={16} /> Back to Dashboard
                    </button>
                    <div className="flex items-center gap-3">
                        <BrainCircuit className="text-primary" size={32} />
                        <h1 className="text-3xl font-bold text-white">AI Intelligence Report</h1>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="secondary">
                        <Share2 size={18} /> Share
                    </Button>
                    <Button variant="outline">
                        <Download size={18} /> Export
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard label="Correctness" value={report.correctnessScore} icon={ShieldCheck} color="green-400" />
                <MetricCard label="Optimization" value={report.optimizationScore} icon={Zap} color="blue-400" />
                <MetricCard label="Code Quality" value={report.codeQualityScore} icon={Target} color="purple-400" />
                <MetricCard label="Contest Readiness" value={report.contestReadinessScore} icon={TrendingUp} color="yellow-400" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="p-8 bg-black/40 border-primary/10">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <CheckCircle className="text-primary" size={24} />
                            Overall Analysis
                        </h2>
                        <p className="text-zinc-300 leading-relaxed text-lg">
                            {report.overallVerdict}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 p-6 bg-white/5 rounded-2xl border border-white/5">
                            <div>
                                <span className="text-zinc-500 text-sm block mb-1">Time Complexity</span>
                                <span className="text-xl font-mono text-primary">{report.timeComplexity}</span>
                            </div>
                            <div>
                                <span className="text-zinc-500 text-sm block mb-1">Space Complexity</span>
                                <span className="text-xl font-mono text-primary">{report.spaceComplexity}</span>
                            </div>
                        </div>
                    </Card>

                    <Card className="p-8">
                        <h2 className="text-xl font-bold text-white mb-6">Key Strengths</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {report.strengths.map((s: string, i: number) => (
                                <div key={i} className="flex items-start gap-3 p-4 bg-green-500/5 border border-green-500/10 rounded-xl">
                                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={18} />
                                    <span className="text-zinc-300 text-sm">{s}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="p-6 border-red-500/10 bg-red-500/5">
                        <h2 className="text-lg font-bold text-white mb-4">Areas to Improve</h2>
                        <ul className="space-y-4">
                            {report.weaknesses.map((w: string, i: number) => (
                                <li key={i} className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                    {w}
                                </li>
                            ))}
                        </ul>
                    </Card>

                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-white mb-4">Optimization Tips</h2>
                        <div className="space-y-4">
                            {report.improvementSuggestions.map((s: string, i: number) => (
                                <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-zinc-400">
                                    {s}
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AIReport;
