"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/data/experience";
import { Calendar, Building2 } from "lucide-react";

export function ExperienceTimeline() {
    return (
        <section className="mb-12">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-xl font-bold text-stock-text">Experience Log</h2>
                <div className="h-px flex-1 bg-stock-border/50" />
            </div>

            <div className="relative border-l border-stock-border/50 ml-3 space-y-8 pb-4">
                {experienceData.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-8"
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 bg-stock-green rounded-full shadow-[0_0_8px_rgba(34,197,94,0.5)]" />

                        <div className="group">
                            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                                <h3 className="text-lg font-bold text-stock-text group-hover:text-stock-green transition-colors">
                                    {exp.title}
                                </h3>
                                <span className="text-xs font-mono text-stock-muted bg-stock-panel/50 px-2 py-1 rounded border border-stock-border/30">
                                    {exp.start} - {exp.end}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-stock-muted mb-3">
                                <Building2 size={14} />
                                <span>{exp.company}</span>
                            </div>

                            <p className="text-stock-muted text-sm leading-relaxed mb-3">
                                {exp.summary}
                            </p>

                            {/* Tech Stack - Minimalist */}
                            <div className="flex flex-wrap gap-1.5">
                                {exp.techStack.slice(0, 5).map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-[10px] px-1.5 py-0.5 bg-stock-bg rounded border border-stock-border/30 text-stock-muted"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
