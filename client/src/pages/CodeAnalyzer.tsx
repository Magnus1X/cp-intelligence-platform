import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Brain, Sparkles, Send, FileCode, History, LineChart } from 'lucide-react';

const CodeAnalyzer: React.FC = () => {
    const [code, setCode] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = () => {
        setIsAnalyzing(true);
        // Mock analysis
        setTimeout(() => {
            setResult({
                complexity: 'O(N^2)',
                efficiency: 72,
                feedback: 'Your nested loops might cause TLE on large constraints. Consider using a Frequency Map or Two Pointers.',
                suggestions: ['Optimize inner loop', 'Check for integer overflow', 'Use faster I/O'],
            });
            setIsAnalyzing(false);
        }, 2000);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-6 lg:px-12 bg-[#020617]">
            {/* Organic background shapes to make it feel "human" */}
            <div className="fixed top-0 right-0 w-[50vw] h-[50vh] bg-primary/5 blur-[120px] rounded-full -z-10 animate-pulse" />
            <div className="fixed bottom-0 left-0 w-[50vw] h-[50vh] bg-accent/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <Sparkles size={12} />
                        Next-Gen Analysis
                    </motion.div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-4">
                        Code <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">DeepScan</span>
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
                        Drop your solution here. Our neural engine doesn't just check for correctness; it understands your logic and suggests
                        human-readable optimizations used by Grandmasters.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Editor Area */}
                    <Card className="lg:col-span-7 bg-white/5 border-white/10 rounded-[32px] overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/20" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/20" />
                                </div>
                                <span className="text-zinc-500 font-mono text-sm ml-2">analyzer.cpp</span>
                            </div>
                            <Button variant="ghost" size="sm" className="text-zinc-500">
                                <History size={16} className="mr-2" />
                                History
                            </Button>
                        </div>

                        <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="// Paste your C++, Python or Java code here..."
                            className="w-full h-[400px] bg-transparent border-none focus:ring-0 text-zinc-300 font-mono text-base resize-none placeholder:text-zinc-700"
                        />

                        <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <p className="text-xs text-zinc-500 italic">
                                Support for C++17, Python 3.10 and Java 17
                            </p>
                            <Button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing || !code}
                                className="rounded-2xl px-8 h-12 bg-primary hover:bg-primary/90 text-white font-bold transition-all hover:scale-105 active:scale-95"
                            >
                                {isAnalyzing ? 'Scanning Logic...' : 'Analyze Code'}
                                <Send size={18} className="ml-2" />
                            </Button>
                        </div>
                    </Card>

                    {/* Right: Analysis Results */}
                    <div className="lg:col-span-5 space-y-6">
                        <AnimatePresence mode="wait">
                            {isAnalyzing ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    className="h-[500px] flex flex-col items-center justify-center text-center p-8 glass rounded-[40px] border-primary/20"
                                >
                                    <div className="relative mb-8">
                                        <div className="w-24 h-24 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                        <Brain className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-10 h-10 animate-pulse" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Neural Engine active</h3>
                                    <p className="text-zinc-500 max-w-xs">Deconstructing loops, checking constraints, and predicting complexity...</p>
                                </motion.div>
                            ) : result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <Card className="p-8 glass rounded-[40px] border-primary/30 bg-primary/5">
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                                                <LineChart size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-xl">Efficiency Score</h3>
                                                <p className="text-zinc-500 text-sm italic">Based on competitive benchmarks</p>
                                            </div>
                                            <div className="ml-auto text-4xl font-black text-primary">{result.efficiency}%</div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Complexity</p>
                                                <div className="text-3xl font-black text-white">{result.complexity}</div>
                                            </div>

                                            <div>
                                                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Feedback</p>
                                                <p className="text-zinc-300 leading-relaxed bg-white/5 p-4 rounded-2xl">
                                                    {result.feedback}
                                                </p>
                                            </div>
                                        </div>
                                    </Card>

                                    <div className="grid grid-cols-1 gap-4">
                                        {result.suggestions.map((s: string, i: number) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="p-5 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4 group hover:bg-white/10 transition-all cursor-default"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-primary" />
                                                <span className="text-zinc-300 font-medium">{s}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-[500px] flex flex-col items-center justify-center text-center p-8 border border-white/5 bg-white/[0.02] rounded-[40px]"
                                >
                                    <FileCode className="w-16 h-16 text-zinc-800 mb-6" />
                                    <h3 className="text-xl font-bold text-zinc-500 mb-2">Ready for analysis</h3>
                                    <p className="text-zinc-600 max-w-xs">Analysis results will appear here once you submit your code.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeAnalyzer;
