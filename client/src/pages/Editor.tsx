import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import api from '../api/api';
import { Card, Button } from '../components/UI';
import {
    Play,
    Send,
    ChevronLeft,
    Settings,
    Terminal as TerminalIcon,
    CheckCircle2,
    XCircle,
    Clock,
    BrainCircuit,
    Maximize2,
    RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CodeEditor: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [problem, setProblem] = useState<any>(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('71'); // 71 is Python, 54 is C++
    const [result, setResult] = useState<any>(null);
    const [submitting, setSubmitting] = useState(false);
    const [activeTab, setActiveTab] = useState<'problem' | 'output' | 'ai'>('problem');

    useEffect(() => {
        // Mock problem fetch - in production this would be api.get(`/problems/${id}`)
        const mockProblem = {
            _id: id,
            title: 'Watermelon',
            description: `One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed w kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem.

Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that's why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.

Input:
The first (and the only) input line contains integer number w (1 ≤ w ≤ 100) — the weight of the watermelon bought by the boys.

Output:
Print YES, if the boys can divide the watermelon into two parts, each of them weighing even number of kilos; and NO in the opposite case.`,
            difficulty: 800,
            testCases: [{ input: '8', output: 'YES' }]
        };
        setProblem(mockProblem);
        setCode(localStorage.getItem(`code-${id}`) || '# Write your code here\n');
    }, [id]);

    const handleRun = async () => {
        setSubmitting(true);
        setActiveTab('output');
        try {
            const { data } = await api.post('/submit/submit', {
                problemId: id,
                code,
                languageId: parseInt(language)
            });
            setResult(data);
        } catch (err: any) {
            setResult({ error: err.response?.data?.message || 'Execution failed' });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCodeChange = (value: string | undefined) => {
        if (value) {
            setCode(value);
            localStorage.setItem(`code-${id}`, value);
        }
    };

    return (
        <div className="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-dark">
            {/* Left Panel: Problem & Terminal */}
            <div className="w-full md:w-1/3 border-r border-white/10 flex flex-col overflow-hidden">
                <div className="flex border-b border-white/10 bg-secondary/20">
                    <button
                        onClick={() => setActiveTab('problem')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'problem' ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Problem
                    </button>
                    <button
                        onClick={() => setActiveTab('output')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'output' ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        Output
                    </button>
                    <button
                        onClick={() => setActiveTab('ai')}
                        className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'ai' ? 'text-primary border-b-2 border-primary' : 'text-zinc-500 hover:text-zinc-300'}`}
                    >
                        AI Insight
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    <AnimatePresence mode="wait">
                        {activeTab === 'problem' && (
                            <motion.div
                                key="problem"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="prose prose-invert prose-green"
                            >
                                <button onClick={() => navigate('/problems')} className="flex items-center gap-1 text-primary text-sm mb-4 hover:underline">
                                    <ChevronLeft size={16} /> Back to Problem Set
                                </button>
                                <h1 className="text-2xl font-bold mb-4">{problem?.title}</h1>
                                <div className="whitespace-pre-wrap text-zinc-300 leading-relaxed">
                                    {problem?.description}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'output' && (
                            <motion.div
                                key="output"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-2 text-zinc-400 mb-4">
                                    <TerminalIcon size={18} />
                                    <span className="text-sm font-mono">Execution Results</span>
                                </div>

                                {submitting ? (
                                    <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                                        <RefreshCcw className="animate-spin mb-4" size={32} />
                                        <p>Executing on Judge0...</p>
                                    </div>
                                ) : result ? (
                                    <Card className="bg-black/40 border-primary/20 p-4 font-mono text-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                {result.verdict === 'Accepted' ? (
                                                    <CheckCircle2 className="text-primary" size={20} />
                                                ) : (
                                                    <XCircle className="text-red-500" size={20} />
                                                )}
                                                <span className={`font-bold ${result.verdict === 'Accepted' ? 'text-primary' : 'text-red-500'}`}>
                                                    {result.verdict}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-zinc-500 text-xs">
                                                <span className="flex items-center gap-1"><Clock size={12} /> {result.time}ms</span>
                                                <span className="flex items-center gap-1"><Maximize2 size={12} /> {result.memory}KB</span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-zinc-500 mb-1 italic">// Standard Output</p>
                                                <pre className="bg-dark p-3 rounded-lg overflow-x-auto">{result.stdout || 'No output'}</pre>
                                            </div>
                                            {result.stderr && (
                                                <div>
                                                    <p className="text-red-500/50 mb-1 italic">// Standard Error</p>
                                                    <pre className="bg-red-500/5 text-red-400 p-3 rounded-lg overflow-x-auto">{result.stderr}</pre>
                                                </div>
                                            )}
                                        </div>
                                    </Card>
                                ) : (
                                    <div className="text-center py-12 text-zinc-600 italic">
                                        Run your code to see results here
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'ai' && (
                            <motion.div
                                key="ai"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-6"
                            >
                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                                    <BrainCircuit className="mx-auto text-primary mb-4" size={48} />
                                    <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
                                    <p className="text-zinc-400 text-sm mb-6">Request a deep-dive analysis of your solution for optimization and best practices.</p>
                                    <Button variant="primary" className="mx-auto" onClick={() => alert('AI Analysis API call coming soon!')}>
                                        Generate Report
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Panel: Editor */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="bg-secondary/40 px-4 py-2 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-dark/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-primary/50"
                        >
                            <option value="54">C++ (GCC 9.2.0)</option>
                            <option value="71">Python (3.8.1)</option>
                            <option value="62">Java (OpenJDK 13.0.1)</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="secondary" className="h-9 px-3">
                            <Settings size={18} />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-9 border-zinc-700 text-zinc-400"
                            onClick={handleRun}
                            disabled={submitting}
                        >
                            <Play size={16} fill="currentColor" /> Run
                        </Button>
                        <Button
                            variant="primary"
                            className="h-9 shadow-[0_0_15px_-5px_#00ff41]"
                            onClick={handleRun}
                            disabled={submitting}
                        >
                            <Send size={16} /> Submit
                        </Button>
                    </div>
                </div>

                <div className="flex-1">
                    <Editor
                        height="100%"
                        defaultLanguage="python"
                        theme="vs-dark"
                        value={code}
                        onChange={handleCodeChange}
                        options={{
                            minimap: { enabled: false },
                            fontSize: 14,
                            fontFamily: 'JetBrains Mono, Fira Code, monospace',
                            padding: { top: 20 },
                            scrollBeyondLastLine: false,
                            cursorSmoothCaretAnimation: 'on',
                            smoothScrolling: true,
                            lineNumbers: 'on',
                            glyphMargin: true,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
