"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { mockHeroSlides } from "@/lib/mock-data";

export function HeroSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const count = mockHeroSlides.length;

    useEffect(() => {
        if (!api) return;
        const onSelect = () => setCurrent(api.selectedScrollSnap());
        onSelect();
        api.on("select", onSelect);
        return () => { api.off("select", onSelect); };
    }, [api]);

    const scrollTo = useCallback(
        (index: number) => api?.scrollTo(index),
        [api],
    );

    return (
        <Section size="wide" py="sm">
            <div className="relative">
                <Carousel
                    setApi={setApi}
                    opts={{ loop: true }}
                    className="w-full"
                >
                    <CarouselContent className="ml-0">
                        {mockHeroSlides.map((slide, index) => (
                            <CarouselItem key={index} className="pl-0">
                                <div className="relative h-105 md:h-140 lg:h-160 rounded-2xl overflow-hidden">
                                    <Image
                                        src={slide.backgroundImage}
                                        alt={slide.title}
                                        fill
                                        className="object-cover scale-105 transition-transform duration-700"
                                        priority={index === 0}
                                    />
                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-black/10" />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-12 lg:px-16">
                                        <div className="max-w-2xl">
                                            {slide.subtitle && (
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="block w-6 h-0.5 bg-site-accent" />
                                                    <p className="text-xs font-bold tracking-widest uppercase text-site-accent">
                                                        {slide.subtitle}
                                                    </p>
                                                </div>
                                            )}
                                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white">
                                                {slide.title}
                                            </h1>
                                            {slide.description && (
                                                <p className="mt-4 text-sm md:text-base leading-relaxed text-white/75 max-w-lg">
                                                    {slide.description}
                                                </p>
                                            )}
                                            <div className="flex flex-wrap gap-3 mt-7">
                                                {slide.cta1 && (
                                                    <Button asChild variant="accent" size="lg">
                                                        <Link href={slide.cta1.href}>{slide.cta1.text}</Link>
                                                    </Button>
                                                )}
                                                {slide.cta2 && (
                                                    <Button
                                                        asChild
                                                        variant="outline"
                                                        size="lg"
                                                        className="border-white/40 text-white hover:bg-white/10 hover:text-white"
                                                    >
                                                        <Link href={slide.cta2.href}>{slide.cta2.text}</Link>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Bottom bar: dots + counter */}
                <div className="absolute bottom-5 right-6 md:right-12 lg:right-16 z-20 flex items-center gap-4">
                    {/* Dot indicators */}
                    <div className="flex items-center gap-1.5">
                        {Array.from({ length: count }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                aria-label={`Slide ${i + 1}`}
                                className={cn(
                                    "rounded-full transition-all duration-300",
                                    i === current
                                        ? "w-6 h-1.5 bg-site-accent"
                                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70",
                                )}
                            />
                        ))}
                    </div>
                    {/* Slide counter */}
                    <p className="text-xs font-mono text-white/60 tabular-nums">
                        {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(count).padStart(2, "0")}
                    </p>
                </div>

                {/* Navigation arrows — positioned top-right */}
                <div className="absolute top-5 right-6 md:right-12 lg:right-16 z-20 flex items-center gap-2">
                    <button
                        onClick={() => api?.scrollPrev()}
                        aria-label="Slide sebelumnya"
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        onClick={() => api?.scrollNext()}
                        aria-label="Slide berikutnya"
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-colors"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                            <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </Section>
    );
}

