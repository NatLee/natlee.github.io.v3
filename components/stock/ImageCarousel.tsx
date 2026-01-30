"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AboutImage } from "@/data/about_images";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
    images: AboutImage[];
    autoPlayInterval?: number;
}

export function ImageCarousel({ images, autoPlayInterval = 5000 }: ImageCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [images.length, autoPlayInterval]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    if (images.length === 0) return null;

    return (
        <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-stock-border bg-stock-panel group">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
            >
                {/* Placeholder handling if image fails or for demo */}
                <div className="w-full h-full bg-stock-bg flex items-center justify-center text-stock-muted">
                    {/* We use a colored div as placeholder if URL is just a placeholder string */}
                    <div className="absolute inset-0 bg-gradient-to-br from-stock-panel to-stock-bg" />

                    {/* Actual Image - assuming valid URLs or local assets */}
                    {/* Note: For real images, uncomment below. For now using a styled placeholder 
                             since we don't have actual images yet. 
                         */}
                    {/* 
                         <Image
                            src={images[currentIndex].url}
                            alt={images[currentIndex].alt}
                            fill
                            className="object-cover"
                         /> 
                         */}

                    <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
                        <span className="text-4xl">📸</span>
                        <p className="text-lg font-mono">{images[currentIndex].caption || images[currentIndex].alt}</p>
                        <p className="text-xs text-stock-muted font-mono">{images[currentIndex].url}</p>
                    </div>
                </div>

                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-stock-bg/90 to-transparent">
                    <p className="text-stock-text font-medium text-lg">
                        {images[currentIndex].caption || images[currentIndex].alt}
                    </p>
                </div>
            </motion.div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stock-bg/50 text-stock-text hover:bg-stock-green hover:text-stock-bg transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-stock-bg/50 text-stock-text hover:bg-stock-green hover:text-stock-bg transition-colors opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all",
                            index === currentIndex
                                ? "bg-stock-green w-6"
                                : "bg-stock-muted/50 hover:bg-stock-text/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div >
    );
}
