"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { TradeCard } from "./TradeCard";
import { 
    TrendingUp, 
    Filter, 
    Calendar, 
    ArrowUpDown,
    BarChart3,
    Briefcase,
    Clock
} from "lucide-react";

type FilterType = "all" | "active" | "closed";
type SortType = "date" | "company";

export function TradeHistory() {
    const [filter, setFilter] = useState<FilterType>("all");
    const [sort, setSort] = useState<SortType>("date");

    // Calculate statistics
    const totalTrades = experienceData.length;
    const activeTrades = experienceData.filter(e => e.end === "Present").length;
    const closedTrades = totalTrades - activeTrades;
    const yearsActive = new Date().getFullYear() - 2018;

    // Filter and sort experiences
    const filteredExperiences = experienceData
        .filter(exp => {
            if (filter === "all") return true;
            if (filter === "active") return exp.end === "Present";
            return exp.end !== "Present";
        })
        .sort((a, b) => {
            if (sort === "company") return a.company.localeCompare(b.company);
            // Sort by date (most recent first) - already sorted in data
            return 0;
        });

    return (
        <div className="space-y-6">
            {/* Header Stats */}
            <motion.div
                className="stock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="text-stock-green" size={24} />
                        <div>
                            <h1 className="text-2xl font-bold text-stock-text">Trade History</h1>
                            <p className="text-stock-muted text-sm font-mono">NL.TECH Position Log</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-6">
                        <StatBadge 
                            icon={<Briefcase size={14} />}
                            label="Total Trades" 
                            value={totalTrades.toString()} 
                        />
                        <StatBadge 
                            icon={<TrendingUp size={14} />}
                            label="Active" 
                            value={activeTrades.toString()} 
                            highlight
                        />
                        <StatBadge 
                            icon={<Clock size={14} />}
                            label="Years Active" 
                            value={`${yearsActive}+`} 
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Filter size={14} className="text-stock-muted" />
                        <span className="text-stock-muted text-xs font-mono">FILTER:</span>
                        <div className="flex gap-1">
                            <FilterButton 
                                active={filter === "all"} 
                                onClick={() => setFilter("all")}
                                label="All"
                                count={totalTrades}
                            />
                            <FilterButton 
                                active={filter === "active"} 
                                onClick={() => setFilter("active")}
                                label="Active"
                                count={activeTrades}
                                highlight
                            />
                            <FilterButton 
                                active={filter === "closed"} 
                                onClick={() => setFilter("closed")}
                                label="Closed"
                                count={closedTrades}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ArrowUpDown size={14} className="text-stock-muted" />
                        <span className="text-stock-muted text-xs font-mono">SORT:</span>
                        <div className="flex gap-1">
                            <FilterButton 
                                active={sort === "date"} 
                                onClick={() => setSort("date")}
                                label="Date"
                            />
                            <FilterButton 
                                active={sort === "company"} 
                                onClick={() => setSort("company")}
                                label="Company"
                            />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Timeline & Trade Cards */}
            <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-stock-green via-stock-border to-stock-border" />

                {/* Trade Cards */}
                <div className="space-y-4">
                    {filteredExperiences.map((experience, index) => (
                        <TradeCard 
                            key={experience.id} 
                            experience={experience} 
                            index={index}
                            isActive={experience.end === "Present"}
                        />
                    ))}
                </div>
            </div>

            {/* Summary */}
            <motion.div
                className="stock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={18} className="text-stock-green" />
                        <span className="text-stock-muted">Total P&L</span>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-stock-green font-mono">+∞%</div>
                        <div className="text-xs text-stock-muted">Continuous Growth</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function StatBadge({ 
    icon, 
    label, 
    value, 
    highlight = false 
}: { 
    icon: React.ReactNode; 
    label: string; 
    value: string;
    highlight?: boolean;
}) {
    return (
        <div className="flex items-center gap-2">
            <span className={highlight ? "text-stock-green" : "text-stock-muted"}>{icon}</span>
            <div>
                <div className="text-[10px] text-stock-muted font-mono">{label}</div>
                <div className={`font-bold font-mono ${highlight ? "text-stock-green" : "text-stock-text"}`}>
                    {value}
                </div>
            </div>
        </div>
    );
}

function FilterButton({ 
    active, 
    onClick, 
    label, 
    count,
    highlight = false
}: { 
    active: boolean; 
    onClick: () => void; 
    label: string;
    count?: number;
    highlight?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                active 
                    ? highlight 
                        ? "bg-stock-green/20 text-stock-green border border-stock-green/50" 
                        : "bg-stock-accent/20 text-stock-accent border border-stock-accent/50"
                    : "bg-stock-border/50 text-stock-muted hover:bg-stock-border"
            }`}
        >
            {label}
            {count !== undefined && (
                <span className="ml-1 opacity-70">({count})</span>
            )}
        </button>
    );
}
