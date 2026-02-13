import React from 'react';
import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import DashboardPreview from '../components/landing/DashboardPreview';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import Footer from '../components/landing/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';

const LandingPage: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative min-h-screen bg-background-dark text-white selection:bg-primary/30 selection:text-primary scroll-smooth overflow-x-hidden">
            {/* Noise texture overlay */}
            <div className="fixed inset-0 noise pointer-events-none z-[100]" />

            {/* Reading progress bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-[110] origin-left"
                style={{ scaleX }}
            />

            <LandingNavbar />

            <main className="relative z-10">
                <Hero />
                <div className="relative">
                    {/* Background Glows for sections */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10 animate-pulse-slow" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] -z-10 animate-pulse-slow" />

                    <Features />
                    <DashboardPreview />
                </div>
                <Testimonials />
                <Pricing />
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
