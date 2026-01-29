"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projectsData, getAllCategories } from "@/data/projects";
import { HoldingCard } from "./HoldingCard";
import { 
    LayoutGrid, 
    List, 
    Filter, 
    Search,
    TrendingUp,
    FolderKanban,
    Briefcase,
    Code2
} from "lucide-react";

type ViewMode = "grid" | "list";
type FilterCategory = "all" | string;

export function PortfolioGrid() {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");

    const categories = getAllCategories();

    // Calculate portfolio stats
    const totalHoldings = projectsData.length;
    const activeProjects = projectsData.filter(p => p.status === "In Progress").length;
    const completedProjects = projectsData.filter(p => p.status === "Completed").length;
    const openSourceCount = projectsData.filter(p => p.opensource).length;

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projectsData.filter(project => {
            const matchesSearch = 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.technologies.some(tech => 
                    tech.toLowerCase().includes(searchQuery.toLowerCase())
                );
            
            const matchesCategory = 
                selectedCategory === "all" || project.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="space-y-6">
            {/* Header */}
            <motion.div
                className="stock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <FolderKanban className="text-stock-accent" size={24} />
                        <div>
                            <h1 className="text-2xl font-bold text-stock-text">My Projects</h1>
                            <p className="text-stock-muted text-sm">A collection of professional and open-source work</p>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex items-center gap-6">
                        <StatBadge 
                            icon={<Briefcase size={14} />}
                            label="Total Holdings" 
                            value={totalHoldings.toString()} 
                        />
                        <StatBadge 
                            icon={<TrendingUp size={14} />}
                            label="Active" 
                            value={activeProjects.toString()} 
                            highlight
                        />
                        <StatBadge 
                            icon={<Code2 size={14} />}
                            label="Open Source" 
                            value={openSourceCount.toString()} 
                        />
                    </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stock-muted" />
                        <input
                            type="text"
                            placeholder="Search holdings..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-stock-bg border border-stock-border rounded-lg text-stock-text text-sm placeholder:text-stock-muted focus:outline-none focus:border-stock-accent"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex items-center gap-2">
                        <Filter size={14} className="text-stock-muted" />
                        <div className="flex gap-1 flex-wrap">
                            <CategoryButton 
                                active={selectedCategory === "all"}
                                onClick={() => setSelectedCategory("all")}
                                label="All"
                            />
                            {categories.slice(0, 5).map(category => (
                                <CategoryButton 
                                    key={category}
                                    active={selectedCategory === category}
                                    onClick={() => setSelectedCategory(category)}
                                    label={category}
                                />
                            ))}
                        </div>
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex items-center gap-1 bg-stock-bg rounded-lg p-1">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded ${viewMode === "grid" ? "bg-stock-border text-stock-text" : "text-stock-muted hover:text-stock-text"}`}
                        >
                            <LayoutGrid size={16} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded ${viewMode === "list" ? "bg-stock-border text-stock-text" : "text-stock-muted hover:text-stock-text"}`}
                        >
                            <List size={16} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Projects Grid */}
            <div className={
                viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-3"
            }>
                {filteredProjects.map((project, index) => (
                    <HoldingCard 
                        key={project.id} 
                        project={project} 
                        index={index}
                        viewMode={viewMode}
                    />
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <motion.div
                    className="stock-card text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <FolderKanban size={48} className="mx-auto text-stock-muted mb-4" />
                    <h3 className="text-stock-text font-semibold mb-2">No Holdings Found</h3>
                    <p className="text-stock-muted text-sm">
                        Try adjusting your search or filter criteria
                    </p>
                </motion.div>
            )}

            {/* Portfolio Summary */}
            <motion.div
                className="stock-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <SummaryItem label="Total Value" value={`${totalHoldings} Assets`} trend="+25%" />
                    <SummaryItem label="Completed" value={`${completedProjects}`} trend="+12%" />
                    <SummaryItem label="In Progress" value={`${activeProjects}`} trend="+8%" />
                    <SummaryItem label="Tech Stack" value={`${new Set(projectsData.flatMap(p => p.technologies)).size}+`} trend="+15%" />
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

function CategoryButton({ 
    active, 
    onClick, 
    label 
}: { 
    active: boolean; 
    onClick: () => void; 
    label: string 
}) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
                active 
                    ? "bg-stock-accent/20 text-stock-accent border border-stock-accent/50"
                    : "bg-stock-border/50 text-stock-muted hover:bg-stock-border"
            }`}
        >
            {label}
        </button>
    );
}

function SummaryItem({ 
    label, 
    value, 
    trend 
}: { 
    label: string; 
    value: string; 
    trend: string 
}) {
    return (
        <div className="text-center p-3 bg-stock-bg/30 rounded-lg">
            <div className="text-stock-muted text-xs mb-1">{label}</div>
            <div className="text-stock-text font-bold text-lg font-mono">{value}</div>
            <div className="text-stock-green text-xs font-mono">{trend}</div>
        </div>
    );
}
