import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: 'Compute',
            links: [
                { name: 'Neural Engine', href: '#' },
                { name: 'Edge Runtime', href: '#' },
                { name: 'SDKs', href: '#' },
                { name: 'APIs', href: '#' },
            ],
        },
        {
            title: 'Academy',
            links: [
                { name: 'Workshops', href: '#' },
                { name: 'Curriculum', href: '#' },
                { name: 'Case Studies', href: '#' },
                { name: 'Insights', href: '#' },
            ],
        },
        {
            title: 'Ecosystem',
            links: [
                { name: 'Platform Status', href: '#' },
                { name: 'Changelog', href: '#' },
                { name: 'Security', href: '#' },
                { name: 'Privacy', href: '#' },
            ],
        },
    ];

    return (
        <footer className="relative bg-background-dark pt-32 pb-20 overflow-hidden">
            {/* Background elements */}
            <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-primary/5 to-transparent -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-20 mb-32">
                    {/* Branding */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="flex items-center gap-3 mb-8 group">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-[2px]">
                                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                                    <Terminal className="text-white w-5 h-5" />
                                </div>
                            </div>
                            <span className="text-2xl font-black text-white tracking-tighter">CP Intel</span>
                        </Link>
                        <p className="text-zinc-500 font-medium leading-relaxed mb-10 max-w-sm">
                            Building the infrastructure for the next generation of competitive programmers. Precise. Intelligent. Fast.
                        </p>

                        {/* Newsletter with shadcn */}
                        <div className="mb-10 max-w-sm">
                            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest">Join the Newsletter</h4>
                            <div className="flex gap-2">
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-white/5 border-white/10 rounded-2xl h-12"
                                />
                                <Button variant="premium" className="h-12 px-6 rounded-2xl font-bold">
                                    Join
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-all">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((column) => (
                        <div key={column.title} className="lg:col-span-1">
                            <h4 className="text-white font-black text-sm uppercase tracking-widest mb-10">{column.title}</h4>
                            <ul className="space-y-5">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="text-zinc-500 font-medium hover:text-white transition-colors flex items-center group/link">
                                            {link.name}
                                            <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover/link:opacity-50 transition-all" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-8">
                        <p className="text-zinc-600 font-bold text-xs">
                            © {currentYear} CP Intelligence.
                        </p>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-none">All Systems Operational</span>
                        </div>
                    </div>
                    <div className="flex gap-10 text-[10px] font-black text-zinc-600 uppercase tracking-widest">
                        <a href="#" className="hover:text-white transition-colors">Legal</a>
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
