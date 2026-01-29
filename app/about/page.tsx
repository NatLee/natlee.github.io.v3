"use client";

import { StockLayout } from "@/components/stock/StockLayout";
import { StockProfile } from "@/components/stock/StockProfile";
import { FundamentalsTable } from "@/components/stock/FundamentalsTable";
import { LanguageDepth } from "@/components/stock/LanguageDepth";
import { InvestorRelations } from "@/components/stock/InvestorRelations";

export default function AboutPage() {
  return (
    <StockLayout>
      {/* Profile Header with Background */}
      <section className="animate-fade-in-up">
        <StockProfile />
      </section>

      {/* Skills & Languages - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Technical Skills - Takes 2 columns */}
        <section className="lg:col-span-2 animate-fade-in-up delay-100">
          <FundamentalsTable />
        </section>

        {/* Language Proficiency */}
        <section className="animate-fade-in-up delay-150">
          <LanguageDepth />
        </section>
      </div>

      {/* Contact Section */}
      <section className="animate-fade-in-up delay-200">
        <InvestorRelations />
      </section>
    </StockLayout>
  );
}
