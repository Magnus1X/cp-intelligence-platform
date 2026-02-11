import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/UI';
import { Search, Code2, ChevronRight, Signal } from 'lucide-react';

const ProblemList: React.FC = () => {
    const [problems, setProblems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                // In a real app, we'd have a /problems endpoint. 
                // For now, let's mock some data or fetch from CF if implemented.
                const mockProblems = [
                    { _id: '1', title: 'Watermelon', difficulty: 800, tags: ['brute force', 'math'], solved: true },
                    { _id: '2', title: 'Way Too Long Words', difficulty: 800, tags: ['strings'], solved: true },
                    { _id: '3', title: 'Theatre Square', difficulty: 1000, tags: ['math'], solved: false },
                    { _id: '4', title: 'Next Round', difficulty: 800, tags: ['*special', 'implementation'], solved: true },
                ];
                // If backend has problems, we'd fetch them:
                // const { data } = await api.get('/problems');
                // setProblems(data);
                setProblems(mockProblems);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProblems();
    }, []);

    const filteredProblems = problems.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Problem Set</h1>
                    <p className="text-zinc-400">Master your skills with curated coding challenges</p>
                </div>

                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search problems or tags..."
                        className="w-full bg-secondary/50 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    [1, 2, 3, 4].map(i => <div key={i} className="h-24 bg-white/5 rounded-2xl animate-pulse" />)
                ) : filteredProblems.map(problem => (
                    <Link key={problem._id} to={`/editor/${problem._id}`}>
                        <Card className="p-5 hover:border-primary/30 transition-all group">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${problem.solved ? 'bg-primary/10 text-primary' : 'bg-white/5 text-zinc-500'}`}>
                                        <Code2 size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{problem.title}</h3>
                                        <div className="flex items-center gap-3 mt-1">
                                            <span className="flex items-center gap-1 text-xs text-zinc-500">
                                                <Signal size={12} />
                                                Rating: {problem.difficulty}
                                            </span>
                                            <div className="flex gap-2">
                                                {problem.tags.slice(0, 3).map((tag: string) => (
                                                    <span key={tag} className="text-[10px] uppercase tracking-wider px-2 py-0.5 bg-white/5 text-zinc-400 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="text-zinc-600 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ProblemList;
