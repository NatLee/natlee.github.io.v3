"use client";

import { motion } from "framer-motion";
import { skillsData, Skill } from "@/data/skills";
import { 
    ChevronRight,
    Code2,
    Zap
} from "lucide-react";
import { useState } from "react";

// Convert skill level to visual indicator
function getSkillLevel(level: string): { percentage: number; color: string } {
    switch (level) {
        case "Expert":
            return { percentage: 95, color: "bg-stock-green" };
        case "Advanced":
            return { percentage: 80, color: "bg-stock-green/80" };
        case "Intermediate":
            return { percentage: 60, color: "bg-stock-gold" };
        case "Beginner":
            return { percentage: 40, color: "bg-stock-muted" };
        default:
            return { percentage: 0, color: "bg-stock-muted" };
    }
}

export function FundamentalsTable() {
    const [expandedCategory, setExpandedCategory] = useState<string | null>("programming");
    const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);

    return (
        <motion.div
            className="stock-card h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Code2 className="text-stock-accent" size={20} />
                    <div>
                        <h2 className="text-lg font-bold text-stock-text">Technical Skills</h2>
                        <p className="text-xs text-stock-muted">{totalSkills} technologies across {skillsData.length} categories</p>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-2">
                {skillsData.map((category) => {
                    const isExpanded = expandedCategory === category.id;
                    const expertCount = category.skills.filter(s => s.level === "Expert" || s.level === "Advanced").length;

                    return (
                        <div 
                            key={category.id}
                            className="border border-stock-border/50 rounded-lg overflow-hidden"
                        >
                            {/* Category Header */}
                            <button
                                onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                                className="w-full flex items-center justify-between p-3 bg-stock-bg/30 hover:bg-stock-border/30 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <ChevronRight 
                                        size={16} 
                                        className={`text-stock-muted transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                    />
                                    <span className="text-stock-text font-medium">{category.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-stock-muted">
                                        {category.skills.length} skills
                                    </span>
                                    {expertCount > 0 && (
                                        <span className="text-xs text-stock-green bg-stock-green/10 px-2 py-0.5 rounded">
                                            {expertCount} expert
                                        </span>
                                    )}
                                </div>
                            </button>

                            {/* Skills List */}
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="border-t border-stock-border/50 p-3 space-y-2"
                                >
                                    {category.skills.map((skill, index) => (
                                        <SkillItem key={skill.name} skill={skill} index={index} />
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

function SkillItem({ skill, index }: { skill: Skill; index: number }) {
    const { percentage, color } = getSkillLevel(skill.level);
    
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center gap-3 py-2 px-1"
        >
            <Zap size={12} className="text-stock-accent flex-shrink-0" />
            
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-stock-text text-sm">{skill.name}</span>
                    <div className="flex items-center gap-2">
                        {skill.years && (
                            <span className="text-[10px] text-stock-muted">
                                {skill.years}y
                            </span>
                        )}
                        <span className={`text-[10px] font-medium ${
                            skill.level === "Expert" || skill.level === "Advanced" 
                                ? "text-stock-green" 
                                : skill.level === "Intermediate" 
                                ? "text-stock-gold" 
                                : "text-stock-muted"
                        }`}>
                            {skill.level}
                        </span>
                    </div>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1.5 bg-stock-border/50 rounded-full overflow-hidden">
                    <motion.div 
                        className={`h-full rounded-full ${color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: index * 0.03 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
