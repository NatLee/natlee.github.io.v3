"use client";

import { StockLayout } from "@/components/stock/StockLayout";
import { TradeHistory } from "@/components/stock/TradeHistory";

export default function ExperiencePage() {
  return (
    <StockLayout>
      <TradeHistory />
    </StockLayout>
  );
}
