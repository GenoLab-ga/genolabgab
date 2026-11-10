"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface Slide {
    src: string;
    alt: string;
}

export default function HeroCarousel({
    slides,
    interval = 5000,
}: {
    slides: Slide[];
    interval?: number;
}) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || slides.length < 2) return;
        const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
        return () => clearInterval(id);
    }, [paused, slides.length, interval]);

    return (
        <div
        className="relative h-full w-full overflow-hidden rounded-l-full border-l-4 border-l-[#17a9e2] shadow-lg"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-roledescription="carousel"
        >
        {slides.map((s, i) => (
            <div
            key={s.src}
            className={`slide absolute inset-0 ${i === index ? "slide-active" : ""}`}
            >
            <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            />
            </div>
        ))}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((s, i) => (
            <button
            key={s.src}
            type="button"
            aria-label={`Image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            />
        ))}
        </div>
        </div>
    );
}
