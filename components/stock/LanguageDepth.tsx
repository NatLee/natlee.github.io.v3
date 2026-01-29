"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { Globe2 } from "lucide-react";

export function LanguageDepth() {
    const { languages } = personalInfo;

    return (
        <motion.div
            className="stock-card h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Globe2 className="text-stock-accent" size={20} />
                <div>
                    <h2 className="text-lg font-bold text-stock-text">Languages</h2>
                    <p className="text-xs text-stock-muted">Communication proficiency</p>
                </div>
            </div>

            {/* Languages List */}
            <div className="space-y-4">
                {languages.map((lang, index) => {
                    const proficiency = getProficiencyScore(lang.level);
                    const levelLabel = getLevelLabel(proficiency);
                    
                    return (
                        <motion.div
                            key={lang.name}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-stock-bg/30 rounded-lg border border-stock-border/50"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-stock-accent/20 flex items-center justify-center">
                                        <span className="text-stock-accent font-bold text-sm">
                                            {lang.name.slice(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="text-stock-text font-semibold">{lang.name}</div>
                                        <div className="text-xs text-stock-muted">{lang.level}</div>
                                    </div>
                                </div>
                                
                                <div className="text-right">
                                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                                        proficiency >= 90 
                                            ? "bg-stock-green/20 text-stock-green"
                                            : proficiency >= 70
                                            ? "bg-stock-green/10 text-stock-green/80"
                                            : proficiency >= 50
                                            ? "bg-stock-gold/20 text-stock-gold"
                                            : "bg-stock-muted/20 text-stock-muted"
                                    }`}>
                                        {levelLabel}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="h-2 bg-stock-border/50 rounded-full overflow-hidden">
                                <motion.div 
                                    className={`h-full rounded-full ${
                                        proficiency >= 90 
                                            ? "bg-stock-green"
                                            : proficiency >= 70
                                            ? "bg-stock-green/80"
                                            : proficiency >= 50
                                            ? "bg-stock-gold"
                                            : "bg-stock-muted"
                                    }`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${proficiency}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                />
                            </div>

                            {lang.description && (
                                <p className="text-xs text-stock-muted mt-2">{lang.description}</p>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

function getProficiencyScore(level: string): number {
    if (level.includes("Native")) return 100;
    if (level.includes("N1") || level.includes("Professional")) return 85;
    if (level.includes("N2") || level.includes("Advanced")) return 70;
    if (level.includes("N3") || level.includes("Intermediate")) return 55;
    if (level.includes("N4") || level.includes("Elementary")) return 40;
    return 25;
}

function getLevelLabel(proficiency: number): string {
    if (proficiency >= 90) return "Native";
    if (proficiency >= 70) return "Fluent";
    if (proficiency >= 50) return "Proficient";
    return "Learning";
}
