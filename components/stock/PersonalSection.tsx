"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { Heart, Globe, Cpu } from "lucide-react";

export function PersonalSection() {
    return (
        <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
                <h2 className="text-3xl font-bold text-stock-text">Alternative Investments</h2>
                <div className="h-px flex-1 bg-stock-border/50" />
                <span className="text-stock-muted text-sm uppercase tracking-widest">R&D / Interests</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Bio */}
                <div className="p-8 bg-gradient-to-br from-stock-panel to-stock-bg border border-stock-border rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-stock-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-stock-green/10 transition-colors duration-500" />

                    <h3 className="text-xl font-bold text-stock-text mb-4 flex items-center gap-2">
                        <Cpu size={20} className="text-stock-green" />
                        Core Philosophy
                    </h3>
                    <p className="text-stock-muted leading-relaxed relative z-10">
                        {personalInfo.bio}
                    </p>
                </div>

                {/* Interests Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {personalInfo.interests.map((interest, index) => (
                        <motion.div
                            key={interest}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center p-6 bg-stock-bg border border-stock-border rounded-xl text-center hover:border-stock-accent/50 hover:bg-stock-panel transition-all group cursor-default"
                        >
                            <Heart
                                className={`w-8 h-8 mb-3 transition-colors ${index % 2 === 0 ? "text-stock-green group-hover:text-stock-green/80" : "text-stock-accent group-hover:text-stock-accent/80"
                                    }`}
                            />
                            <span className="text-stock-text font-medium">{interest}</span>
                        </motion.div>
                    ))}

                    {/* Language Card */}
                    <div className="col-span-2 p-6 bg-stock-bg border border-stock-border rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Globe className="text-stock-gold w-6 h-6" />
                            <div>
                                <div className="text-stock-text font-medium">Languages</div>
                                <div className="text-xs text-stock-muted">Global Reach</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {personalInfo.languages.map(lang => (
                                <span key={lang.name} className="px-2 py-1 bg-stock-panel rounded text-xs text-stock-muted border border-stock-border">
                                    {lang.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
