"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";

interface TickerItem {
    symbol: string;
    price: number;
    change: number;
    volume: string;
}

export function TickerTape() {
    // Flatten all skills into ticker items
    const allSkills = skillsData.flatMap(category => 
        category.skills.map(skill => skill.name)
    );

    const [tickers, setTickers] = useState<TickerItem[]>(() => 
        allSkills.map(skill => ({
            symbol: skill.replace(/\s+/g, '').toUpperCase().slice(0, 6),
            price: 50 + Math.random() * 200,
            change: (Math.random() - 0.3) * 10, // Bias towards positive
            volume: ['HIGH', 'MED', 'LOW'][Math.floor(Math.random() * 3)]
        }))
    );

    // Update prices periodically
    useEffect(() => {
        const interval = setInterval(() => {
            setTickers(prev => prev.map(ticker => ({
                ...ticker,
                price: Math.max(10, ticker.price + (Math.random() - 0.45) * 5),
                change: Math.max(-15, Math.min(20, ticker.change + (Math.random() - 0.45) * 2)),
            })));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Duplicate for seamless loop
    const duplicatedTickers = [...tickers, ...tickers];

    return (
        <div className="w-full bg-stock-panel/80 backdrop-blur-sm border-b border-stock-border overflow-hidden py-2">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex"
                    animate={{ x: "-50%" }}
                    transition={{
                        ease: "linear",
                        duration: 30,
                        repeat: Infinity,
                    }}
                >
                    {duplicatedTickers.map((ticker, index) => {
                        const isPositive = ticker.change >= 0;
                        
                        return (
                            <div 
                                key={index} 
                                className="ticker-item border-r border-stock-border/50 last:border-r-0"
                            >
                                {/* Symbol */}
                                <span className="ticker-symbol">{ticker.symbol}</span>
                                
                                {/* Price */}
                                <span className="ticker-price">
                                    ${ticker.price.toFixed(2)}
                                </span>
                                
                                {/* Change */}
                                <span className={`flex items-center gap-1 ${
                                    isPositive ? 'ticker-change-up' : 'ticker-change-down'
                                }`}>
                                    <span className="text-[10px]">
                                        {isPositive ? '▲' : '▼'}
                                    </span>
                                    <span>
                                        {isPositive ? '+' : ''}{ticker.change.toFixed(2)}%
                                    </span>
                                </span>

                                {/* Volume indicator (desktop only) */}
                                <span className={`hidden lg:inline-block text-[10px] px-1.5 py-0.5 rounded ${
                                    ticker.volume === 'HIGH' 
                                        ? 'bg-stock-green/20 text-stock-green' 
                                        : ticker.volume === 'MED'
                                        ? 'bg-stock-gold/20 text-stock-gold'
                                        : 'bg-stock-muted/20 text-stock-muted'
                                }`}>
                                    {ticker.volume}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
}
