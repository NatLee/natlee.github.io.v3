"use client";

import { Header } from "./Header";
import { TickerTape } from "./TickerTape";
import StockBackground from "./StockBackground";

interface StockLayoutProps {
    children: React.ReactNode;
    showTicker?: boolean;
}

export function StockLayout({ 
    children, 
    showTicker = true 
}: StockLayoutProps) {
    return (
        <div className="min-h-screen bg-stock-bg text-stock-text font-sans relative">
            {/* Animated Background */}
            <StockBackground />
            
            {/* Header with Navigation */}
            <Header />

            {/* Main Content - Full Width */}
            <main className="pt-20 relative z-10">
                {/* Ticker Tape */}
                {showTicker && <TickerTape />}
                
                {/* Content Area */}
                <div className="p-4 md:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-stock-border bg-stock-panel/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-stock-muted text-sm">
                            <span className="text-stock-green font-mono">NL.TECH</span>
                            <span className="mx-2">•</span>
                            <span>© {new Date().getFullYear()} Nat Lee. All rights reserved.</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-stock-muted font-mono">
                            <span className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-stock-green rounded-full animate-pulse" />
                                ONLINE
                            </span>
                            <span>ASIA/TAIPEI</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
