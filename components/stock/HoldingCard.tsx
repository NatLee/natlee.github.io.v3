"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProjectDetail } from "@/data/projects";
import { 
    TrendingUp, 
    TrendingDown,
    ExternalLink,
    Github,
    Star,
    Clock,
    ChevronDown,
    ChevronUp,
    Calendar,
    Target,
    Briefcase,
    Activity,
    Zap
} from "lucide-react";

interface HoldingCardProps {
    project: ProjectDetail;
    index: number;
    viewMode: "grid" | "list";
}

export function HoldingCard({ project, index, viewMode }: HoldingCardProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [change] = useState(() => (Math.random() - 0.3) * 30); // Random change, biased positive
    const [price] = useState(() => 50 + Math.random() * 150);
    const [entryPrice] = useState(() => price * (0.7 + Math.random() * 0.2)); // Entry price lower than current
    const [positionSize] = useState(() => Math.floor(10 + Math.random() * 90)); // Position size 10-100

    // Calculate P&L
    const pnl = (price - entryPrice) * positionSize;
    const pnlPercent = ((price - entryPrice) / entryPrice) * 100;
    const isProfitable = pnl >= 0;

    // Calculate holding period
    const getHoldingPeriod = () => {
        if (!project.timeline.start) return "N/A";
        const start = new Date(project.timeline.start);
        const end = project.timeline.end ? new Date(project.timeline.end) : new Date();
        const months = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30));
        if (months < 1) return "< 1 month";
        if (months < 12) return `${months} months`;
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years} years`;
    };

    // Draw mini chart
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        
        // Generate random price data with trend
        const dataPoints = 25;
        const data: number[] = [];
        let value = 30 + Math.random() * 20;
        const trend = change >= 0 ? 0.8 : -0.3;
        
        for (let i = 0; i < dataPoints; i++) {
            value += (Math.random() - 0.5 + trend * 0.1) * 8;
            value = Math.max(10, Math.min(100, value));
            data.push(value);
        }

        // Clear
        ctx.clearRect(0, 0, width, height);

        // Draw line
        const isPositive = change >= 0;
        ctx.strokeStyle = isPositive ? "#22c55e" : "#ef4444";
        ctx.lineWidth = 2;
        ctx.beginPath();

        data.forEach((val, i) => {
            const x = (i / (dataPoints - 1)) * width;
            const y = height - (val / 100) * height;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();

        // Draw area fill
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, isPositive ? "rgba(34, 197, 94, 0.3)" : "rgba(239, 68, 68, 0.3)");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fill();
    }, [change]);

    const isPositive = change >= 0;
    const statusColor = project.status === "In Progress" 
        ? "text-stock-green bg-stock-green/20 border-stock-green/30"
        : project.status === "Completed"
        ? "text-stock-accent bg-stock-accent/20 border-stock-accent/30"
        : "text-stock-muted bg-stock-muted/20 border-stock-muted/30";

    // Get rating based on project attributes
    const getRating = () => {
        if (project.featured) return { label: "STRONG BUY", color: "text-stock-green bg-stock-green/20" };
        if (project.opensource) return { label: "BUY", color: "text-stock-green/80 bg-stock-green/10" };
        if (project.status === "In Progress") return { label: "HOLD", color: "text-stock-gold bg-stock-gold/20" };
        return { label: "WATCH", color: "text-stock-muted bg-stock-muted/20" };
    };

    const rating = getRating();

    if (viewMode === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
            >
                <div className="stock-panel-hover">
                    <Link href={`/projects/${project.id}`}>
                        <div className="p-4 flex items-center gap-4">
                            {/* Mini Chart */}
                            <div className="w-24 h-12 flex-shrink-0">
                                <canvas 
                                    ref={canvasRef} 
                                    width={96} 
                                    height={48}
                                    className="w-full h-full"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-stock-text font-semibold truncate">{project.title}</h3>
                                    {project.featured && <Star size={12} className="text-stock-gold fill-stock-gold" />}
                                    {project.opensource && <Github size={12} className="text-stock-muted" />}
                                </div>
                                <p className="text-stock-muted text-xs truncate">{project.category}</p>
                            </div>

                            {/* Position Info */}
                            <div className="hidden md:block text-center px-4">
                                <div className="text-[10px] text-stock-muted">POSITION</div>
                                <div className="text-stock-text font-mono">{positionSize} units</div>
                            </div>

                            {/* P&L */}
                            <div className="hidden lg:block text-center px-4">
                                <div className="text-[10px] text-stock-muted">P&L</div>
                                <div className={`font-mono ${isProfitable ? 'text-stock-green' : 'text-stock-red'}`}>
                                    {isProfitable ? '+' : ''}${pnl.toFixed(2)}
                                </div>
                            </div>

                            {/* Price & Change */}
                            <div className="text-right">
                                <div className="text-stock-text font-mono font-semibold">${price.toFixed(2)}</div>
                                <div className={`text-xs font-mono flex items-center justify-end gap-1 ${
                                    isPositive ? "text-stock-green" : "text-stock-red"
                                }`}>
                                    {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                    {isPositive ? "+" : ""}{change.toFixed(2)}%
                                </div>
                            </div>

                            {/* Rating */}
                            <div className={`text-[10px] font-mono px-2 py-1 rounded ${rating.color}`}>
                                {rating.label}
                            </div>

                            {/* Status */}
                            <div className={`text-[10px] font-mono px-2 py-1 rounded border ${statusColor}`}>
                                {project.status.toUpperCase()}
                            </div>
                        </div>
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
        >
            <div className="stock-panel-hover h-full flex flex-col">
                {/* Chart Area */}
                <div className="relative h-28 bg-stock-bg/50 rounded-t-lg overflow-hidden">
                    <canvas 
                        ref={canvasRef} 
                        width={250} 
                        height={112}
                        className="w-full h-full"
                    />
                    
                    {/* Status Badge */}
                    <div className={`absolute top-2 left-2 text-[10px] font-mono px-2 py-0.5 rounded border ${statusColor}`}>
                        {project.status.toUpperCase()}
                    </div>

                    {/* Rating Badge */}
                    <div className={`absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded ${rating.color}`}>
                        {rating.label}
                    </div>

                    {/* Featured Star */}
                    {project.featured && (
                        <div className="absolute bottom-2 right-2 text-stock-gold">
                            <Star size={14} fill="currentColor" />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <h3 className="text-stock-text font-semibold line-clamp-1">
                                    {project.title}
                                </h3>
                                {project.opensource && (
                                    <Github size={12} className="text-stock-muted flex-shrink-0" />
                                )}
                            </div>
                            <p className="text-stock-muted text-xs font-mono">
                                {project.category}
                            </p>
                        </div>
                        
                        <div className="text-right flex-shrink-0">
                            <div className="text-stock-text font-mono text-lg font-bold">
                                ${price.toFixed(2)}
                            </div>
                            <div className={`text-xs font-mono flex items-center justify-end gap-1 ${
                                isPositive ? "text-stock-green" : "text-stock-red"
                            }`}>
                                {isPositive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                {isPositive ? "+" : ""}{change.toFixed(2)}%
                            </div>
                        </div>
                    </div>

                    {/* Position Details */}
                    <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-stock-bg/30 rounded p-2">
                            <div className="text-[10px] text-stock-muted flex items-center gap-1">
                                <Target size={10} />
                                POSITION
                            </div>
                            <div className="text-stock-text font-mono text-sm">{positionSize} units</div>
                        </div>
                        <div className={`rounded p-2 ${isProfitable ? 'bg-stock-green/10' : 'bg-stock-red/10'}`}>
                            <div className="text-[10px] text-stock-muted flex items-center gap-1">
                                <Activity size={10} />
                                P&L
                            </div>
                            <div className={`font-mono text-sm ${isProfitable ? 'text-stock-green' : 'text-stock-red'}`}>
                                {isProfitable ? '+' : ''}${pnl.toFixed(2)} ({isProfitable ? '+' : ''}{pnlPercent.toFixed(1)}%)
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-stock-muted text-xs line-clamp-2 mb-3 flex-1">
                        {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                        {project.technologies.slice(0, 3).map(tech => (
                            <span 
                                key={tech}
                                className="text-[10px] px-1.5 py-0.5 bg-stock-border/50 text-stock-muted rounded"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="text-[10px] px-1.5 py-0.5 text-stock-muted">
                                +{project.technologies.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Expand Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsExpanded(!isExpanded);
                        }}
                        className="w-full py-2 text-[10px] text-stock-muted hover:text-stock-text flex items-center justify-center gap-1 border-t border-stock-border/50 transition-colors"
                    >
                        {isExpanded ? (
                            <>HIDE DETAILS <ChevronUp size={12} /></>
                        ) : (
                            <>TRADE DETAILS <ChevronDown size={12} /></>
                        )}
                    </button>

                    {/* Expanded Trade Details */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-3 space-y-2 border-t border-stock-border/30">
                                    <DetailRow 
                                        icon={<Calendar size={10} />}
                                        label="ENTRY DATE"
                                        value={project.timeline.start || "N/A"}
                                    />
                                    <DetailRow 
                                        icon={<Clock size={10} />}
                                        label="HOLDING PERIOD"
                                        value={getHoldingPeriod()}
                                    />
                                    <DetailRow 
                                        icon={<Zap size={10} />}
                                        label="ENTRY PRICE"
                                        value={`$${entryPrice.toFixed(2)}`}
                                    />
                                    <DetailRow 
                                        icon={<Briefcase size={10} />}
                                        label="ROLE"
                                        value={project.role}
                                    />
                                    {project.company && (
                                        <DetailRow 
                                            icon={<Target size={10} />}
                                            label="COMPANY"
                                            value={project.company}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Footer */}
                    <Link href={`/projects/${project.id}`}>
                        <div className="flex items-center justify-between pt-3 border-t border-stock-border/50 mt-auto">
                            <div className="flex items-center gap-3 text-stock-muted text-[10px]">
                                <span className="flex items-center gap-1">
                                    <Clock size={10} />
                                    {project.timeline.duration}
                                </span>
                            </div>
                            
                            <span className="flex items-center gap-1 text-stock-accent text-[10px] hover:text-stock-accent/80 transition-colors">
                                VIEW ANALYSIS
                                <ExternalLink size={10} />
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

function DetailRow({ 
    icon, 
    label, 
    value 
}: { 
    icon: React.ReactNode; 
    label: string; 
    value: string;
}) {
    return (
        <div className="flex items-center justify-between text-xs">
            <span className="text-stock-muted flex items-center gap-1">
                {icon}
                {label}
            </span>
            <span className="text-stock-text font-mono">{value}</span>
        </div>
    );
}
