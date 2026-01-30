"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import { Code2 } from "lucide-react";

export function SkillsTreemap() {
    return (
        <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-stock-text">Asset Allocation</h2>
                <div className="h-px flex-1 bg-stock-border/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {skillsData.map((category, catIndex) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 }}
                        className="flex flex-col gap-3 p-5 bg-stock-panel/30 border border-stock-border/50 rounded-xl hover:bg-stock-panel/50 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded bg-stock-bg border border-stock-border text-stock-accent">
                                <Code2 size={16} />
                            </div>
                            <h3 className="font-bold text-stock-text">{category.name}</h3>
                        </div>

                        <div className="space-y-2">
                            {category.skills.map((skill) => {
                                const isExpert = skill.level === "Expert";
                                const isAdvanced = skill.level === "Advanced";

                                return (
                                    <div key={skill.name} className="group">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm text-stock-muted group-hover:text-stock-text transition-colors">
                                                {skill.name}
                                            </span>
                                            <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${isExpert
                                                    ? "bg-stock-green/10 text-stock-green"
                                                    : isAdvanced
                                                        ? "bg-stock-accent/10 text-stock-accent"
                                                        : "bg-stock-bg text-stock-muted"
                                                }`}>
                                                {skill.level}
                                            </span>
                                        </div>
                                        {/* Mini Bar */}
                                        <div className="h-1 w-full bg-stock-bg rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${isExpert ? "bg-stock-green" : isAdvanced ? "bg-stock-accent" : "bg-stock-muted"
                                                    }`}
                                                initial={{ width: 0 }}
                                                whileInView={{ width: getItemPercent(skill.level) + "%" }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

function getItemPercent(level: string) {
    switch (level) {
        case "Expert": return 100;
        case "Advanced": return 75;
        case "Intermediate": return 50;
        default: return 25;
    }
}
