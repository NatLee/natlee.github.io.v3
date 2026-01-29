"use client";

import { StockLayout } from '@/components/stock/StockLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowLeft,
    TrendingUp,
    TrendingDown,
    Target,
    Shield,
    Crosshair,
    CheckCircle2,
    ExternalLink,
    Github,
    Clock,
    Building2,
    Star,
    BarChart3,
    Zap,
    Calendar,
    Users,
    Code2,
    Lightbulb,
    Award,
    Play,
    Pause
} from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { getProjectById } from '@/data/projects';

// Define the props interface based on what's passed
interface ProjectDetailClientProps {
    project: ReturnType<typeof getProjectById>;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
    // If project is undefined (e.g. from notFound), handle gracefully or let parent handle
    // In strict mode, we expect project to be defined here.
    if (!project) return null;

    return (
        <StockLayout>
            <ProjectContent project={project} />
        </StockLayout>
    );
}

function ProjectContent({ project }: { project: NonNullable<ReturnType<typeof getProjectById>> }) {
    const [price, setPrice] = useState(100);
    const [change, setChange] = useState(() => (Math.random() - 0.3) * 30);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const dataRef = useRef<number[]>([]);

    const isPositive = change >= 0;
    const symbol = project.title.replace(/\s+/g, '').toUpperCase().slice(0, 6);

    // Simulate price changes
    useEffect(() => {
        const interval = setInterval(() => {
            setPrice(prev => Math.max(50, prev + (Math.random() - 0.45) * 5));
            setChange(prev => Math.max(-20, Math.min(40, prev + (Math.random() - 0.45) * 2)));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Mini chart animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Initialize data
        if (dataRef.current.length === 0) {
            let value = 100;
            for (let i = 0; i < 60; i++) {
                value *= (1 + (Math.random() - 0.45) * 0.03);
                value = Math.max(50, Math.min(150, value));
                dataRef.current.push(value);
            }
        }

        const draw = () => {
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            const data = dataRef.current;
            const min = Math.min(...data) * 0.98;
            const max = Math.max(...data) * 1.02;

            // Draw area
            ctx.beginPath();
            ctx.moveTo(0, height);
            data.forEach((val, i) => {
                const x = (i / (data.length - 1)) * width;
                const y = height - ((val - min) / (max - min)) * height;
                ctx.lineTo(x, y);
            });
            ctx.lineTo(width, height);
            ctx.closePath();

            const gradient = ctx.createLinearGradient(0, 0, 0, height);
            gradient.addColorStop(0, isPositive ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)");
            gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw line
            ctx.beginPath();
            data.forEach((val, i) => {
                const x = (i / (data.length - 1)) * width;
                const y = height - ((val - min) / (max - min)) * height;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = isPositive ? "#22c55e" : "#ef4444";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Add new point if playing
            if (isPlaying) {
                const lastVal = data[data.length - 1];
                const newVal = lastVal * (1 + (Math.random() - 0.45) * 0.02);
                dataRef.current.push(Math.max(50, Math.min(150, newVal)));
                if (dataRef.current.length > 100) {
                    dataRef.current.shift();
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        draw();

        return () => cancelAnimationFrame(animationRef.current);
    }, [isPositive, isPlaying]);

    const statusConfig: Record<string, { color: string, bg: string, border: string, label: string }> = {
        "In Progress": { color: "text-stock-green", bg: "bg-stock-green/20", border: "border-stock-green/30", label: "ACTIVE" },
        "Completed": { color: "text-stock-accent", bg: "bg-stock-accent/20", border: "border-stock-accent/30", label: "COMPLETED" },
        "Archived": { color: "text-stock-muted", bg: "bg-stock-muted/20", border: "border-stock-muted/30", label: "ARCHIVED" },
    };

    const status = statusConfig[project.status] || { color: "text-stock-muted", bg: "bg-stock-muted/20", border: "border-stock-muted/30", label: "N/A" };

    return (
        <div className="space-y-6 pb-8">
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-stock-muted hover:text-stock-green transition-colors text-sm group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Portfolio
                </Link>
            </motion.div>

            {/* Hero Section with Chart */}
            <motion.div
                className="relative overflow-hidden rounded-2xl bg-stock-panel border border-stock-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {/* Background Chart */}
                <div className="absolute inset-0">
                    <canvas
                        ref={canvasRef}
                        width={800}
                        height={300}
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-stock-panel via-stock-panel/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stock-panel via-transparent to-stock-panel/60" />
                </div>

                <div className="relative p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                        {/* Left: Project Info */}
                        <div className="flex-1 space-y-4">
                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-mono px-2.5 py-1 rounded-lg border ${status.bg} ${status.color} ${status.border}`}>
                                    {status.label}
                                </span>
                                <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg border bg-stock-border/50 text-stock-muted border-stock-border">
                                    {project.category}
                                </span>
                                {project.opensource && (
                                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg border bg-stock-accent/20 text-stock-accent border-stock-accent/30 flex items-center gap-1">
                                        <Github size={10} />
                                        OPEN SOURCE
                                    </span>
                                )}
                                {project.featured && (
                                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg border bg-stock-gold/20 text-stock-gold border-stock-gold/30 flex items-center gap-1">
                                        <Star size={10} fill="currentColor" />
                                        FEATURED
                                    </span>
                                )}
                            </div>

                            {/* Symbol & Title */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-stock-green font-mono font-bold text-lg">{symbol}</span>
                                    <div className="h-6 w-px bg-stock-border" />
                                    <span className="text-stock-muted text-sm">Analysis Report</span>
                                </div>
                                <h1 className="text-3xl lg:text-4xl font-bold text-stock-text mb-2">
                                    {project.title}
                                </h1>
                                <p className="text-stock-muted text-lg">
                                    {project.subtitle}
                                </p>
                            </div>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-stock-muted">
                                <span className="flex items-center gap-2 bg-stock-bg/50 px-3 py-1.5 rounded-lg">
                                    <Clock size={14} className="text-stock-accent" />
                                    {project.timeline.duration}
                                </span>
                                {project.company && (
                                    <span className="flex items-center gap-2 bg-stock-bg/50 px-3 py-1.5 rounded-lg">
                                        <Building2 size={14} className="text-stock-accent" />
                                        {project.company}
                                    </span>
                                )}
                                <span className="flex items-center gap-2 bg-stock-bg/50 px-3 py-1.5 rounded-lg">
                                    <BarChart3 size={14} className="text-stock-accent" />
                                    {project.role}
                                </span>
                            </div>
                        </div>

                        {/* Right: Price Display */}
                        <div className="bg-stock-bg/80 backdrop-blur-sm rounded-xl p-5 border border-stock-border min-w-[200px]">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-stock-muted text-xs font-mono">Project Value</span>
                                <button
                                    onClick={() => setIsPlaying(!isPlaying)}
                                    className="p-1.5 bg-stock-border/50 rounded-lg hover:bg-stock-border transition-colors"
                                >
                                    {isPlaying ? <Pause size={12} className="text-stock-muted" /> : <Play size={12} className="text-stock-green" />}
                                </button>
                            </div>
                            <div className={`text-4xl font-bold font-mono ${isPositive ? 'text-stock-green' : 'text-stock-red'}`}>
                                ${price.toFixed(2)}
                            </div>
                            <div className={`flex items-center gap-2 mt-2 ${isPositive ? 'text-stock-green' : 'text-stock-red'}`}>
                                {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                <span className="font-mono text-sm">{isPositive ? '+' : ''}{change.toFixed(2)}%</span>
                                <span className="text-stock-muted text-xs">24h</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Links */}
                    {(project.links.github || project.links.demo) && (
                        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-stock-border/50">
                            {project.links.github && (
                                <a
                                    href={project.links.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 bg-stock-bg border border-stock-border rounded-xl text-stock-text hover:border-stock-green hover:text-stock-green transition-colors"
                                >
                                    <Github size={16} />
                                    View Source
                                    <ExternalLink size={12} className="ml-1 opacity-50" />
                                </a>
                            )}
                            {project.links.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 bg-stock-green text-stock-bg rounded-xl font-semibold hover:bg-stock-green/90 transition-colors"
                                >
                                    Live Demo
                                    <ExternalLink size={12} />
                                </a>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Description Card */}
            <motion.div
                className="stock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <Lightbulb size={18} className="text-stock-gold" />
                    <h2 className="text-lg font-bold text-stock-text">Overview</h2>
                </div>
                <p className="text-stock-muted leading-relaxed">
                    {project.longDescription}
                </p>
            </motion.div>

            {/* Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Features */}
                <motion.div
                    className="stock-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Target size={18} className="text-stock-green" />
                        <h2 className="text-lg font-bold text-stock-text">Key Features</h2>
                    </div>

                    <div className="space-y-3">
                        {project.features.map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.05 }}
                                className="flex items-start gap-3 p-3 bg-stock-bg/50 rounded-xl border border-stock-border/50"
                            >
                                <div className="w-7 h-7 rounded-lg bg-stock-green/10 flex items-center justify-center flex-shrink-0">
                                    <CheckCircle2 size={14} className="text-stock-green" />
                                </div>
                                <p className="text-stock-text text-sm">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Challenges */}
                <motion.div
                    className="stock-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Shield size={18} className="text-stock-red" />
                        <h2 className="text-lg font-bold text-stock-text">Challenges</h2>
                    </div>

                    <div className="space-y-3">
                        {project.challenges.map((challenge, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.05 }}
                                className="flex items-start gap-3 p-3 bg-stock-bg/50 rounded-xl border border-stock-border/50"
                            >
                                <div className="w-7 h-7 rounded-lg bg-stock-red/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-stock-red font-mono text-xs font-bold">!</span>
                                </div>
                                <p className="text-stock-text text-sm">{challenge}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Solutions */}
                <motion.div
                    className="stock-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Crosshair size={18} className="text-stock-accent" />
                        <h2 className="text-lg font-bold text-stock-text">Solutions</h2>
                    </div>

                    <div className="space-y-3">
                        {project.solutions.map((solution, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.05 }}
                                className="flex items-start gap-3 p-3 bg-stock-bg/50 rounded-xl border border-stock-border/50"
                            >
                                <div className="w-7 h-7 rounded-lg bg-stock-accent/10 flex items-center justify-center flex-shrink-0">
                                    <Zap size={14} className="text-stock-accent" />
                                </div>
                                <p className="text-stock-text text-sm">{solution}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Results */}
                <motion.div
                    className="stock-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Award size={18} className="text-stock-gold" />
                        <h2 className="text-lg font-bold text-stock-text">Results</h2>
                    </div>

                    <div className="space-y-3">
                        {project.results.map((result, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                                className="flex items-start gap-3 p-3 bg-stock-green/5 rounded-xl border border-stock-green/20"
                            >
                                <div className="w-7 h-7 rounded-lg bg-stock-green/20 flex items-center justify-center flex-shrink-0">
                                    <TrendingUp size={14} className="text-stock-green" />
                                </div>
                                <p className="text-stock-green text-sm">{result}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Technologies */}
            <motion.div
                className="stock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <div className="flex items-center gap-2 mb-4">
                    <Code2 size={18} className="text-stock-cyan" />
                    <h2 className="text-lg font-bold text-stock-text">Tech Stack</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + i * 0.03 }}
                            className="px-3 py-2 bg-stock-cyan/10 text-stock-cyan text-sm rounded-xl font-mono border border-stock-cyan/20 hover:bg-stock-cyan/20 transition-colors"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </div>
            </motion.div>

            {/* Timeline & Team */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Timeline */}
                <motion.div
                    className="stock-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar size={18} className="text-stock-accent" />
                        <h2 className="text-lg font-bold text-stock-text">Timeline</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-stock-bg/50 rounded-xl">
                            <span className="text-stock-muted text-sm">Start Date</span>
                            <span className="text-stock-text font-mono">{project.timeline.start}</span>
                        </div>
                        {project.timeline.end && (
                            <div className="flex justify-between items-center p-3 bg-stock-bg/50 rounded-xl">
                                <span className="text-stock-muted text-sm">End Date</span>
                                <span className="text-stock-text font-mono">{project.timeline.end}</span>
                            </div>
                        )}
                        <div className="flex justify-between items-center p-3 bg-stock-green/5 rounded-xl border border-stock-green/20">
                            <span className="text-stock-muted text-sm">Duration</span>
                            <span className="text-stock-green font-mono font-bold">{project.timeline.duration}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Team */}
                {project.team && project.team.length > 0 && (
                    <motion.div
                        className="stock-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Users size={18} className="text-stock-accent" />
                            <h2 className="text-lg font-bold text-stock-text">Team</h2>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {project.team.map((member, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-2 bg-stock-bg/50 text-stock-text text-sm rounded-xl border border-stock-border/50"
                                >
                                    {member}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
