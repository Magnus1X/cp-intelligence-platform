import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={cn("bg-secondary/40 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden", className)}>
        {children}
    </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' | 'danger' }> = ({
    children,
    className,
    variant = 'primary',
    ...props
}) => {
    const variants = {
        primary: "bg-primary text-black hover:bg-primary/90",
        secondary: "bg-white/10 text-white hover:bg-white/20",
        outline: "border border-white/10 text-zinc-300 hover:border-primary/50 hover:text-primary",
        danger: "bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20"
    };

    return (
        <button
            className={cn(
                "px-4 py-2 rounded-xl font-semibold transition-all flex items-center justify-center gap-2",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
