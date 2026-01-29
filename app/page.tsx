"use client";

import { StockLayout } from "@/components/stock/StockLayout";
import { TopSkillsLeaderboard, RecentActivity } from "@/components/stock/MarketSummary";
import { MarketWelcome } from "@/components/stock/MarketWelcome";
import { SimulatedTradingSection } from "@/components/stock/SimulatedTradingSection";

export default function Home() {
  return (
    <StockLayout>
      <div className="space-y-24">
        {/* Hero Section - Personal Introduction */}
        <section className="animate-fade-in-up">
          <MarketWelcome />
        </section>

        {/* Simulated Trading Section */}
        <section className="animate-fade-in-up delay-100">
          <SimulatedTradingSection />
        </section>

        {/* Skills & Experience Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Skills */}
          <section className="animate-fade-in-up delay-100">
            <TopSkillsLeaderboard />
          </section>

          {/* Recent Experience */}
          <section className="animate-fade-in-up delay-200">
            <RecentActivity />
          </section>
        </div>
      </div>
    </StockLayout>
  );
}
