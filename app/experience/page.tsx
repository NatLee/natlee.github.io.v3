"use client";

import { StockLayout } from "@/components/stock/StockLayout";
import { ExperienceChart } from "@/components/stock/ExperienceChart";

export default function ExperiencePage() {
  return (
    <StockLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-2">
            Career Timeline
          </h1>
          <p className="text-slate-400">
            Analyzing market performance and career growth over time.
          </p>
        </div>
        <ExperienceChart />
      </div>
    </StockLayout>
  );
}
