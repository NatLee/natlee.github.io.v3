"use client";


import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { skillsData } from "@/data/skills";
import { projectsData } from "@/data/projects";
import { experienceData } from "@/data/experience";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Briefcase,
    Code2,
    ArrowRight,
    Github,
    Linkedin,
    Mail,
    Zap,
    Calendar
} from "lucide-react";



export function MarketWelcome() {
    // Calculate real metrics
    const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);
    const totalProjects = projectsData.length;
    const yearsExperience = new Date().getFullYear() - 2018;
    const currentPosition = experienceData[0];


    return (
        <motion.div
            className="relative overflow-hidden rounded-2xl min-h-[550px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background base */}
            <div className="absolute inset-0 bg-stock-panel" />

            {/* Gradient Overlays - softer transitions */}
            <div className="absolute inset-0 bg-gradient-to-r from-stock-panel/90 via-stock-panel/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-stock-panel/80 via-transparent to-stock-panel/40" />

            {/* Content */}
            <div className="relative z-10 p-6 md:p-8 lg:p-10">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-stock-green via-stock-accent to-stock-green" />

                <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left: Large Avatar */}
                    <div className="flex-shrink-0">
                        <div className="relative">
                            <div className="w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 rounded-3xl overflow-hidden border-4 border-stock-green/50 shadow-2xl shadow-stock-green/20">
                                <Image
                                    src={personalInfo.avatar}
                                    alt={personalInfo.nameEn}
                                    width={256}
                                    height={256}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-stock-green rounded-xl p-2.5 border-4 border-stock-panel shadow-lg">
                                <Zap size={20} className="text-stock-bg" />
                            </div>
                            {/* Status indicator */}
                            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-stock-bg/80 backdrop-blur-sm px-2 py-1 rounded-full">
                                <span className="w-2 h-2 bg-stock-green rounded-full animate-pulse" />
                                <span className="text-[10px] text-stock-green font-mono">ONLINE</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Info & Actions */}
                    <div className="flex-1 text-center lg:text-left space-y-5">
                        {/* Name & Title */}
                        <div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-stock-text mb-2">
                                Hi, I'm {personalInfo.nameEn}
                            </h1>
                            <p className="text-xl md:text-2xl text-stock-green font-medium">
                                {personalInfo.title}
                            </p>
                        </div>

                        {/* Location & Company */}
                        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 text-stock-muted">
                            <span className="flex items-center gap-2">
                                <MapPin size={16} className="text-stock-accent" />
                                {personalInfo.location}
                            </span>
                            <span className="hidden sm:inline text-stock-border">•</span>
                            <span className="flex items-center gap-2">
                                <Briefcase size={16} className="text-stock-accent" />
                                {currentPosition?.company}
                            </span>
                        </div>

                        {/* Bio */}
                        <p className="text-stock-muted leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {personalInfo.bio}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <StatBadge
                                value={`${yearsExperience}+`}
                                label="Years"
                                icon={<Calendar size={16} />}
                            />
                            <StatBadge
                                value={totalProjects.toString()}
                                label="Projects"
                                icon={<Code2 size={16} />}
                            />
                            <StatBadge
                                value={totalSkills.toString()}
                                label="Skills"
                                icon={<Zap size={16} />}
                            />
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                            <Link
                                href="/about"
                                className="flex items-center gap-2 px-6 py-3 bg-stock-green text-stock-bg font-semibold rounded-xl hover:bg-stock-green/90 transition-colors text-lg"
                            >
                                About Me
                                <ArrowRight size={18} />
                            </Link>
                            <Link
                                href="/projects"
                                className="flex items-center gap-2 px-6 py-3 bg-stock-border/50 text-stock-text font-semibold rounded-xl hover:bg-stock-border transition-colors backdrop-blur-sm"
                            >
                                View Projects
                            </Link>
                            <a
                                href={`mailto:${personalInfo.email}`}
                                className="flex items-center gap-2 px-6 py-3 border border-stock-border text-stock-muted font-semibold rounded-xl hover:border-stock-green hover:text-stock-green transition-colors backdrop-blur-sm"
                            >
                                <Mail size={18} />
                                Contact
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center lg:justify-start items-center gap-3 pt-2">
                            <span className="text-xs text-stock-muted">Find me on:</span>
                            <SocialIcon href="https://github.com/natlee" icon={<Github size={18} />} />
                            <SocialIcon href="https://www.linkedin.com/in/nat-lee-726525ba/" icon={<Linkedin size={18} />} />
                            <SocialIcon href={`mailto:${personalInfo.email}`} icon={<Mail size={18} />} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StatBadge({
    value,
    label,
    icon
}: {
    value: string;
    label: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-3 bg-stock-bg/50 backdrop-blur-sm rounded-xl px-5 py-3 border border-stock-border/50">
            <span className="text-stock-green">{icon}</span>
            <div>
                <span className="text-2xl font-bold text-stock-text font-mono">{value}</span>
                <span className="text-sm text-stock-muted ml-2">{label}</span>
            </div>
        </div>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-stock-bg/50 backdrop-blur-sm rounded-lg border border-stock-border/50 text-stock-muted hover:text-stock-green hover:border-stock-green/50 transition-colors"
        >
            {icon}
        </a>
    );
}
