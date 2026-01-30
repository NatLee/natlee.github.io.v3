"use client";

import { personalInfo } from "@/data/personal";
import Image from "next/image";
import {
    MapPin,
    Mail,
    Github,
    Linkedin,
    Download,
    ExternalLink,
    Zap,
    Activity
} from "lucide-react";
import { motion } from "framer-motion";

export function ProfileSidebar() {
    return (
        <div className="h-full">
            <div className="stock-card sticky top-24 space-y-6">
                {/* Avatar & Status */}
                <div className="relative">
                    <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-stock-panel shadow-xl">
                        <Image
                            src={personalInfo.avatar}
                            alt={personalInfo.nameEn}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute bottom-0 right-1/2 translate-x-10 translate-y-2 bg-stock-panel p-1.5 rounded-full border border-stock-border">
                        <div className="bg-stock-green rounded-full p-1.5 animate-pulse">
                            <Activity size={12} className="text-stock-bg" />
                        </div>
                    </div>
                </div>

                {/* Name & Title */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-stock-text">{personalInfo.nameEn}</h1>
                    <p className="text-stock-green font-medium">{personalInfo.title}</p>
                    <div className="flex items-center justify-center gap-2 mt-2 text-sm text-stock-muted">
                        <MapPin size={14} />
                        {personalInfo.location}
                    </div>
                </div>

                <div className="bg-stock-bg/50 rounded-lg p-4 border border-stock-border/50">
                    <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-stock-muted">Market Status</span>
                        <span className="text-stock-green font-mono text-xs border border-stock-green/20 px-2 py-0.5 rounded-full bg-stock-green/5">
                            BULLISH
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-stock-muted">Availability</span>
                        <span className="text-stock-text font-medium">Open</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                    <a
                        href={`mailto:${personalInfo.email}`}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-stock-green text-stock-bg font-bold rounded-lg hover:bg-stock-green/90 transition-colors"
                    >
                        <Mail size={16} />
                        Contact
                    </a>
                    <a
                        href="/cv.pdf"
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-2 bg-stock-panel border border-stock-border text-stock-text font-medium rounded-lg hover:bg-stock-border transition-colors"
                    >
                        <Download size={16} />
                        Resume
                    </a>
                </div>

                <div className="h-px bg-stock-border/50" />

                {/* Socials */}
                <div className="flex justify-center gap-4">
                    <SocialLink href="https://github.com/natlee" icon={<Github size={20} />} />
                    <SocialLink href="https://linkedin.com/in/nat-lee" icon={<Linkedin size={20} />} />
                </div>
            </div>
        </div>
    );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-stock-muted hover:text-stock-green transition-colors hover:scale-110 transform duration-200"
        >
            {icon}
        </a>
    );
}
