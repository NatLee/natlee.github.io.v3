"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { experienceData } from "@/data/experience";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import Image from "next/image";
import {
    Building2,
    MapPin,
    Calendar,
    Award,
    Zap,
    Download,
    Mail,
    Github,
    Linkedin,
    ExternalLink,
    Briefcase
} from "lucide-react";

export function StockProfile() {
    const yearsInMarket = new Date().getFullYear() - 2018;
    const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
    const totalProjects = projectsData.length;
    const currentPosition = experienceData[0];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Banner */}
            <div className="relative rounded-2xl overflow-hidden mb-6">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-stock-green/20 via-stock-accent/10 to-stock-panel" />
                <div className="absolute inset-0 opacity-30">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="0.5"/>
                            </pattern>
                        </defs>
                        <rect width="100" height="100" fill="url(#grid)" />
                    </svg>
                </div>

                <div className="relative z-10 p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Large Avatar */}
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-stock-green/50 shadow-2xl shadow-stock-green/20">
                                <Image
                                    src={personalInfo.avatar}
                                    alt={personalInfo.nameEn}
                                    width={160}
                                    height={160}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-stock-green rounded-xl p-2 border-4 border-stock-panel shadow-lg">
                                <Zap size={20} className="text-stock-bg" />
                            </div>
                        </div>
                        
                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-4xl font-bold text-stock-text">
                                    {personalInfo.nameEn}
                                </h1>
                                <span className="inline-flex items-center justify-center gap-1 text-stock-green font-mono font-bold text-sm px-3 py-1 bg-stock-green/20 rounded-lg border border-stock-green/30">
                                    <span className="w-2 h-2 bg-stock-green rounded-full animate-pulse" />
                                    NL.TECH
                                </span>
                            </div>
                            
                            <p className="text-xl text-stock-green font-medium mb-4">
                                {personalInfo.title}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-stock-muted">
                                <span className="flex items-center gap-2">
                                    <MapPin size={16} className="text-stock-accent" />
                                    {personalInfo.location}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Building2 size={16} className="text-stock-accent" />
                                    {currentPosition?.company}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} className="text-stock-accent" />
                                    {yearsInMarket}+ Years Experience
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
                                <a
                                    href={`mailto:${personalInfo.email}`}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-stock-green text-stock-bg font-semibold rounded-xl hover:bg-stock-green/90 transition-colors"
                                >
                                    <Mail size={18} />
                                    Contact Me
                                </a>
                                <a
                                    href="/cv.pdf"
                                    target="_blank"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-stock-panel text-stock-text font-semibold rounded-xl border border-stock-border hover:bg-stock-border transition-colors"
                                >
                                    <Download size={18} />
                                    Download CV
                                </a>
                                <a
                                    href="https://github.com/natlee"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-5 py-2.5 bg-stock-panel text-stock-text font-semibold rounded-xl border border-stock-border hover:bg-stock-border transition-colors"
                                >
                                    <Github size={18} />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats & Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <StatCard icon={<Calendar size={20} />} value={`${yearsInMarket}+`} label="Years Experience" color="green" />
                <StatCard icon={<Briefcase size={20} />} value={experienceData.length.toString()} label="Companies" color="accent" />
                <StatCard icon={<Zap size={20} />} value={totalSkills.toString()} label="Technologies" color="gold" />
                <StatCard icon={<Award size={20} />} value={`${totalProjects}+`} label="Projects" color="green" />
            </div>

            {/* About & Current Role */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* About Section */}
                <div className="lg:col-span-2 stock-card">
                    <h3 className="text-lg font-bold text-stock-text mb-4">About</h3>
                    <p className="text-stock-muted leading-relaxed mb-6">
                        {personalInfo.bio}
                    </p>
                    
                    {/* Interests */}
                    <div>
                        <h4 className="text-sm text-stock-muted font-mono mb-3">INTERESTS & FOCUS AREAS</h4>
                        <div className="flex flex-wrap gap-2">
                            {personalInfo.interests.map((interest, index) => (
                                <span 
                                    key={index}
                                    className="text-sm px-3 py-1.5 bg-stock-border/50 text-stock-muted rounded-lg hover:text-stock-text hover:bg-stock-border transition-colors"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Current Role & Social */}
                <div className="space-y-4">
                    {/* Current Position */}
                    {currentPosition && (
                        <div className="stock-card bg-stock-green/5 border-stock-green/20">
                            <div className="text-xs text-stock-green font-mono mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-stock-green rounded-full animate-pulse" />
                                CURRENT POSITION
                            </div>
                            <div className="text-lg text-stock-text font-semibold mb-1">{currentPosition.title}</div>
                            <div className="text-stock-muted">{currentPosition.company}</div>
                            <div className="text-sm text-stock-muted mt-1">{currentPosition.department}</div>
                        </div>
                    )}

                    {/* Social Links */}
                    <div className="stock-card">
                        <div className="text-xs text-stock-muted font-mono mb-3">CONNECT</div>
                        <div className="space-y-2">
                            <SocialLink 
                                href="https://github.com/natlee"
                                icon={<Github size={18} />}
                                label="GitHub"
                                username="@natlee"
                            />
                            <SocialLink 
                                href="https://www.linkedin.com/in/nat-lee-726525ba/"
                                icon={<Linkedin size={18} />}
                                label="LinkedIn"
                                username="Nat Lee"
                            />
                            <SocialLink 
                                href={`mailto:${personalInfo.email}`}
                                icon={<Mail size={18} />}
                                label="Email"
                                username={personalInfo.email}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatCard({ 
    icon, 
    value, 
    label, 
    color 
}: { 
    icon: React.ReactNode; 
    value: string; 
    label: string;
    color: "green" | "accent" | "gold";
}) {
    const colorClasses = {
        green: "bg-stock-green/10 border-stock-green/20 text-stock-green",
        accent: "bg-stock-accent/10 border-stock-accent/20 text-stock-accent",
        gold: "bg-stock-gold/10 border-stock-gold/20 text-stock-gold",
    };

    return (
        <div className={`rounded-xl p-4 border ${colorClasses[color]}`}>
            <div className="mb-2">{icon}</div>
            <div className="text-2xl font-bold text-stock-text font-mono">{value}</div>
            <div className="text-xs text-stock-muted">{label}</div>
        </div>
    );
}

function SocialLink({ 
    href, 
    icon, 
    label, 
    username 
}: { 
    href: string; 
    icon: React.ReactNode; 
    label: string; 
    username: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-stock-border/30 transition-colors group"
        >
            <span className="text-stock-muted group-hover:text-stock-green transition-colors">{icon}</span>
            <div className="flex-1 min-w-0">
                <div className="text-stock-text text-sm">{label}</div>
                <div className="text-stock-muted text-xs truncate">{username}</div>
            </div>
            <ExternalLink size={14} className="text-stock-muted opacity-0 group-hover:opacity-100 transition-opacity" />
        </a>
    );
}
