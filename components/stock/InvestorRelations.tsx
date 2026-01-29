"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";
import { 
    Mail, 
    Github, 
    Linkedin, 
    Globe, 
    ExternalLink,
    BookOpen,
    Code2,
    Database,
    Sparkles,
    Send
} from "lucide-react";

// Map icon names to components
const iconMap: Record<string, React.ReactNode> = {
    github: <Github size={18} />,
    linkedin: <Linkedin size={18} />,
    medium: <BookOpen size={18} />,
    blog: <Globe size={18} />,
    kaggle: <Database size={18} />,
    leetcode: <Code2 size={18} />,
    huggingface: <Sparkles size={18} />,
};

export function InvestorRelations() {
    const { email, socialLinks } = personalInfo;

    return (
        <motion.div
            className="stock-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Send className="text-stock-accent" size={20} />
                <div>
                    <h2 className="text-lg font-bold text-stock-text">Get In Touch</h2>
                    <p className="text-xs text-stock-muted">Let's connect and collaborate</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primary Contact */}
                <div>
                    <div className="bg-stock-green/10 border border-stock-green/30 rounded-xl p-5">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-stock-green/20 rounded-xl">
                                <Mail size={24} className="text-stock-green" />
                            </div>
                            <div>
                                <div className="text-xs text-stock-muted mb-1">EMAIL</div>
                                <div className="text-stock-text font-medium">{email}</div>
                            </div>
                        </div>
                        <a 
                            href={`mailto:${email}`}
                            className="flex items-center justify-center gap-2 w-full bg-stock-green text-stock-bg px-4 py-3 rounded-lg font-semibold hover:bg-stock-green/90 transition-colors"
                        >
                            <Mail size={16} />
                            Send Message
                        </a>
                    </div>

                    {/* Availability */}
                    <div className="mt-4 p-4 bg-stock-bg/30 rounded-lg border border-stock-border/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-stock-muted text-sm">Response Time</span>
                            <span className="text-stock-green font-mono text-sm">{"< 24 Hours"}</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-stock-muted text-sm">Timezone</span>
                            <span className="text-stock-text font-mono text-sm">UTC+8 (Taipei)</span>
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                <div>
                    <div className="text-xs text-stock-muted font-mono mb-3">SOCIAL PROFILES</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {socialLinks.map((link, index) => (
                            <SocialLinkCard key={link.name} link={link} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function SocialLinkCard({ 
    link, 
    index 
}: { 
    link: { name: string; url: string; icon: string; description?: string }; 
    index: number 
}) {
    const icon = iconMap[link.icon] || <Globe size={18} />;

    return (
        <motion.a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 p-3 bg-stock-bg/30 rounded-lg border border-stock-border/50 hover:border-stock-accent/50 hover:bg-stock-border/30 transition-all group"
        >
            <div className="p-2 bg-stock-accent/10 rounded-lg text-stock-accent group-hover:bg-stock-accent/20 transition-colors">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-stock-text font-medium text-sm">{link.name}</div>
            </div>
            <ExternalLink size={14} className="text-stock-muted group-hover:text-stock-accent transition-colors" />
        </motion.a>
    );
}
