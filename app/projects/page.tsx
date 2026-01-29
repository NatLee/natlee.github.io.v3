"use client";

import { StockLayout } from "@/components/stock/StockLayout";
import { PortfolioGrid } from "@/components/stock/PortfolioGrid";

export default function ProjectsPage() {
  return (
    <StockLayout>
      <section className="animate-fade-in-up">
        <PortfolioGrid />
      </section>
    </StockLayout>
  );
}
