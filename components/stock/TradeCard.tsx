"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Experience } from "@/data/experience";
import { 
    TrendingUp, 
    ChevronDown, 
    Building2, 
    MapPin, 
    Calendar,
    Target,
    Layers,
    CheckCircle2,
    ExternalLink
} from "lucide-react";

interface TradeCardProps {
    experience: Experience;
    index: number;
    isActive: boolean;
}

export function TradeCard({ experience, index, isActive }: TradeCardProps) {
    const [isExpanded, setIsExpanded] = useState(index === 0); // Expand first card by default

    // Calculate duration
    const calculateDuration = () => {
        const startDate = new Date(experience.start);
        const endDate = experience.end === "Present" ? new Date() : new Date(experience.end);
        const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                       (endDate.getMonth() - startDate.getMonth());
        const years = Math.floor(months / 12);
        const remainingMonths = months % 12;
        
        if (years > 0 && remainingMonths > 0) {
            return `${years}y ${remainingMonths}m`;
        } else if (years > 0) {
            return `${years}y`;
        }
        return `${remainingMonths}m`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative pl-8 md:pl-16"
        >
            {/* Timeline Node */}
            <div className={`absolute left-2 md:left-6 top-6 w-4 h-4 rounded-full border-2 ${
                isActive 
                    ? "bg-stock-green border-stock-green animate-pulse" 
                    : "bg-stock-panel border-stock-muted"
            }`}>
                {isActive && (
                    <div className="absolute inset-0 bg-stock-green rounded-full animate-ping opacity-50" />
                )}
            </div>

            {/* Card */}
            <div className={`stock-panel-hover ${isActive ? "border-stock-green/30" : ""}`}>
                {/* Card Header */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full p-4 text-left"
                >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        {/* Left: Position Info */}
                        <div className="flex-1">
                            {/* Status Badge */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                                    isActive 
                                        ? "bg-stock-green/20 text-stock-green border border-stock-green/30" 
                                        : "bg-stock-muted/20 text-stock-muted border border-stock-muted/30"
                                }`}>
                                    {isActive ? "POSITION OPEN" : "POSITION CLOSED"}
                                </span>
                                <span className="badge-long">LONG</span>
                                {isActive && <span className="badge-active">+ACTIVE</span>}
                            </div>

                            {/* Title & Company */}
                            <h3 className="text-lg font-bold text-stock-text mb-1">
                                {experience.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-stock-muted">
                                <span className="flex items-center gap-1">
                                    <Building2 size={14} />
                                    {experience.company}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {experience.location}
                                </span>
                            </div>
                        </div>

                        {/* Right: Date & Duration */}
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="flex items-center gap-2 text-stock-muted text-sm">
                                    <Calendar size={14} />
                                    <span className="font-mono">
                                        {experience.start} - {experience.end}
                                    </span>
                                </div>
                                <div className="text-xs text-stock-green font-mono mt-1">
                                    Duration: {calculateDuration()}
                                </div>
                            </div>

                            {/* Expand Icon */}
                            <ChevronDown 
                                size={20} 
                                className={`text-stock-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
                            />
                        </div>
                    </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                        >
                            <div className="px-4 pb-4 space-y-4 border-t border-stock-border/50 pt-4">
                                {/* Summary */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-stock-muted font-mono mb-2">
                                        <Target size={12} />
                                        TRADE SUMMARY
                                    </div>
                                    <p className="text-stock-text text-sm leading-relaxed">
                                        {experience.summary}
                                    </p>
                                </div>

                                {/* Responsibilities */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-stock-muted font-mono mb-2">
                                        <Layers size={12} />
                                        KEY OPERATIONS
                                    </div>
                                    <ul className="space-y-2">
                                        {experience.responsibilities.map((resp, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-stock-muted">
                                                <TrendingUp size={12} className="text-stock-green mt-1 flex-shrink-0" />
                                                <span>{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Achievements */}
                                {experience.achievements && experience.achievements.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 text-xs text-stock-muted font-mono mb-2">
                                            <CheckCircle2 size={12} />
                                            P&L HIGHLIGHTS
                                        </div>
                                        <ul className="space-y-2">
                                            {experience.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm">
                                                    <span className="text-stock-green">+</span>
                                                    <span className="text-stock-green">{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-stock-muted font-mono mb-2">
                                        <Layers size={12} />
                                        INSTRUMENTS USED
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {experience.techStack.map((tech, i) => (
                                            <span 
                                                key={i}
                                                className="px-2 py-1 bg-stock-accent/10 text-stock-accent text-xs rounded font-mono border border-stock-accent/20"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
