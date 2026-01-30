"use client";

import { personalInfo } from "@/data/personal";
import { experienceData } from "@/data/experience";
import Image from "next/image";
import {
    MapPin,
    Mail,
    Github,
    Linkedin,
    Download,
    Activity,
    TrendingUp,
    Star,
    Clock
} from "lucide-react";

export function ProfileSidebar() {
    const yearsExperience = new Date().getFullYear() - 2018;
    const currentPosition = experienceData[0];

    return (
        <div className="h-full">
            <div className="glass-card sticky top-24 space-y-5 p-5">
                {/* Header badge */}
                <div className="flex items-center justify-center">
                    <span className="text-[10px] font-mono text-stock-muted bg-stock-bg/50 px-3 py-1 rounded-full border border-stock-border/30">
                        ANALYST PROFILE
                    </span>
                </div>

                {/* Avatar & Status */}
                <div className="relative">
                    <div className="relative w-28 h-28 mx-auto rounded-xl overflow-hidden border-2 border-stock-green/30 shadow-xl shadow-stock-green/10">
                        <Image
                            src={personalInfo.avatar}
                            alt={personalInfo.nameEn}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute bottom-0 right-1/2 translate-x-12 translate-y-1 bg-stock-panel p-1 rounded-lg border border-stock-green/30">
                        <div className="bg-stock-green rounded-md p-1 animate-pulse">
                            <Activity size={12} className="text-stock-bg" />
                        </div>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="text-center">
                    <h1 className="text-xl font-bold text-stock-text font-mono">{personalInfo.nameEn}</h1>
                    <p className="text-stock-green font-medium text-sm mt-1">{personalInfo.title}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-2 text-xs text-stock-muted">
                        <MapPin size={12} />
                        {personalInfo.location}
                    </div>
                </div>

                {/* Quick Stats Panel */}
                <div className="bg-stock-bg/50 rounded-lg p-3 border border-stock-border/30 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-stock-muted flex items-center gap-1.5">
                            <TrendingUp size={10} />
                            Market Status
                        </span>
                        <span className="text-stock-green font-mono text-[10px] border border-stock-green/30 px-2 py-0.5 rounded bg-stock-green/10">
                            BULLISH
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-stock-muted flex items-center gap-1.5">
                            <Clock size={10} />
                            Experience
                        </span>
                        <span className="text-stock-text font-mono text-[10px]">{yearsExperience}+ YRS</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-stock-muted flex items-center gap-1.5">
                            <Star size={10} />
                            Availability
                        </span>
                        <span className="text-stock-green font-mono text-[10px]">OPEN</span>
                    </div>
                </div>

                {/* Current Position */}
                {currentPosition && (
                    <div className="bg-stock-bg/30 rounded-lg p-3 border border-stock-border/20">
                        <div className="text-[10px] font-mono text-stock-muted mb-1">CURRENT POSITION</div>
                        <div className="text-sm font-medium text-stock-text">{currentPosition.title}</div>
                        <div className="text-xs text-stock-green">{currentPosition.company}</div>
                    </div>
                )}

                {/* Actions */}
                <div className="space-y-2">
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-stock-green text-stock-bg font-bold rounded-lg hover:bg-stock-green/90 transition-all hover:shadow-lg hover:shadow-stock-green/20 text-sm"
                    >
                        <Mail size={14} />
                        Contact
                    </a>
                    <a
                        href="/cv.pdf"
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-2.5 bg-stock-bg/50 border border-stock-border/50 text-stock-text font-medium rounded-lg hover:bg-stock-border/50 hover:border-stock-green/30 transition-all text-sm"
                    >
                        <Download size={14} />
                        Resume
                    </a>
                </div>

                {/* Divider */}
                <div className="h-px bg-stock-border/30" />

                {/* Socials */}
                <div className="flex justify-center gap-3">
                    <SocialLink href="https://github.com/natlee" icon={<Github size={18} />} label="GitHub" />
                    <SocialLink href="https://www.linkedin.com/in/nat-lee-726525ba/" icon={<Linkedin size={18} />} label="LinkedIn" />
                </div>
            </div>
        </div>
    );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-stock-bg/50 rounded-lg border border-stock-border/30 text-stock-muted hover:text-stock-green hover:border-stock-green/30 transition-all"
        >
            {icon}
            <span className="text-xs font-mono">{label}</span>
        </a>
    );
}
