"use client";

import { StockLayout } from "@/components/stock/StockLayout";
import { ProfileSidebar } from "@/components/stock/ProfileSidebar";
import { ExperienceTimeline } from "@/components/stock/ExperienceTimeline";
import { SkillsTreemap } from "@/components/stock/SkillsTreemap";
import { PersonalSection } from "@/components/stock/PersonalSection";
import { motion } from "framer-motion";
import { personalInfo } from "@/data/personal";

export default function AboutPage() {
  return (
    <StockLayout>
      <div className="max-w-7xl mx-auto pb-20 px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column - Sidebar (Sticky) */}
          <div className="lg:col-span-1">
            <ProfileSidebar />
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-3 space-y-12">
            {/* Bio Card */}
            <motion.section
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="stock-card relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-20 bg-stock-green/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h2 className="text-2xl font-bold text-stock-text mb-4">Executive Summary</h2>
              <p className="text-stock-muted leading-loose text-lg">
                {personalInfo.bio}
              </p>
            </motion.section>

            {/* Experience */}
            <ExperienceTimeline />

            {/* Skills */}
            <SkillsTreemap />

            {/* Interests */}
            <PersonalSection />
          </div>
        </div>
      </div>
    </StockLayout>
  );
}
