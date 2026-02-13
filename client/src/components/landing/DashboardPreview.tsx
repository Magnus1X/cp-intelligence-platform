import React from 'react';
import { motion } from 'framer-motion';
import { Play, Cpu, Layout, FileCode, Search, Braces } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';

const DashboardPreview: React.FC = () => {
    return (
        <section id="dashboard" className="py-32 relative group">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="relative">
                    {/* Background glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

                    <div className="text-center mb-24">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black tracking-tighter"
                        >
                            The command center for <br />
                            <span className="text-accent underline decoration-accent/20 underline-offset-8">elite developers.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 40 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="rounded-[40px] border border-white/10 bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_0_100px_-20px_rgba(59,130,246,0.2)]"
                    >
                        <Tabs defaultValue="solution" className="w-full">
                            {/* Editor Header */}
                            <div className="px-8 py-6 bg-white/5 border-b border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-6 w-full md:w-auto">
                                    <div className="flex gap-2">
                                        <div className="w-3.5 h-3.5 rounded-full bg-red-500/30 border border-red-500/20" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/30 border border-yellow-500/20" />
                                        <div className="w-3.5 h-3.5 rounded-full bg-green-500/30 border border-green-500/20" />
                                    </div>
                                    <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />
                                    <TabsList className="bg-white/5 border border-white/10 p-1 h-auto rounded-xl">
                                        <TabsTrigger value="solution" className="flex items-center gap-2 px-4 py-1.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                                            <FileCode className="w-3.5 h-3.5" />
                                            solution.cpp
                                        </TabsTrigger>
                                        <TabsTrigger value="analysis" className="flex items-center gap-2 px-4 py-1.5 rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white">
                                            <Search className="w-3.5 h-3.5" />
                                            AI Analysis
                                        </TabsTrigger>
                                    </TabsList>
                                </div>
                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <Button variant="ghost" size="icon" className="text-zinc-500 hover:text-white">
                                        <Layout className="w-5 h-5" />
                                    </Button>
                                    <Button variant="premium" className="w-full md:w-auto rounded-2xl shadow-lg shadow-accent/20 flex items-center gap-2 h-11 px-6">
                                        <Play className="w-4 h-4 fill-current" />
                                        Run System
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
                                {/* Content Area */}
                                <div className="lg:col-span-8 p-10 font-mono text-base leading-relaxed overflow-x-auto selection:bg-accent/30 selection:text-white">
                                    <TabsContent value="solution" className="mt-0">
                                        <div className="flex gap-8">
                                            <div className="text-zinc-700 select-none text-right min-w-[30px] space-y-[2px]">
                                                {Array.from({ length: 14 }).map((_, i) => (
                                                    <div key={i}>{i + 1}</div>
                                                ))}
                                            </div>
                                            <pre className="text-zinc-300">
                                                <code>{`#include <bits/stdc++.h>
using namespace std;

typedef long long ll;

void solve() {
    int n, k;
    cin >> n >> k;
    
    // Neural Optimization: Line 12
    vector<int> a(n);
    for (int& x : a) cin >> x;
    
    sort(a.begin(), a.end());
    cout << a[k-1] << endl;
}`}</code>
                                            </pre>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="analysis" className="mt-0 h-full flex items-center justify-center">
                                        <div className="text-center py-20">
                                            <Braces className="w-16 h-16 text-primary/40 mx-auto mb-6" />
                                            <h3 className="text-xl font-bold text-white mb-2">Neural Scan Complete</h3>
                                            <p className="text-zinc-500 max-w-xs mx-auto">Click on specific code lines to see granular machine-learning insights.</p>
                                        </div>
                                    </TabsContent>
                                </div>

                                {/* Sidebar / Analysis Area */}
                                <div className="lg:col-span-4 bg-white/[0.02] border-l border-white/5 p-10">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                                            <Cpu className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold">Neural Engine</h4>
                                            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest">Active Monitoring</p>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <Card className="p-6 rounded-3xl glass border-primary/20 bg-transparent">
                                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2">Complexity</p>
                                            <p className="text-2xl font-black text-white">O(N log N)</p>
                                            <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full w-[85%] bg-primary rounded-full shadow-[0_0_10px_#6366f1]" />
                                            </div>
                                        </Card>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 group/item">
                                                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                                                <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">STL Sorting used correctly</p>
                                            </div>
                                            <div className="flex items-center gap-4 group/item">
                                                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-150 transition-transform" />
                                                <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">Memory footprint optimized</p>
                                            </div>
                                            <div className="flex items-center gap-4 group/item">
                                                <div className="w-2 h-2 rounded-full bg-yellow-500 group-hover:scale-150 transition-transform" />
                                                <p className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors font-medium">Potential overflow on line 5</p>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/5">
                                            <div className="flex items-center justify-between mb-4">
                                                <h5 className="text-sm font-bold text-white uppercase tracking-wider">Resources</h5>
                                                <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-zinc-400">LIVE</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-primary font-mono text-[8px]">
                                                {[60, 40, 80, 50, 90, 30, 70, 45, 85, 55, 65, 75].map((h, i) => (
                                                    <div
                                                        key={i}
                                                        className="flex-1 rounded-sm bg-white/5 group-hover:bg-accent/20 transition-all duration-500"
                                                        style={{ height: `${h}%` }}
                                                    />
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Tabs>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;
