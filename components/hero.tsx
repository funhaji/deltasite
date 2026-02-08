"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/lib/site-content-context";

export function Hero() {
  const { content } = useSiteContent();
  const slides = content?.heroSlides?.length ? content.heroSlides : [];
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      goToSlide((activeSlide + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, slides.length]);

  function goToSlide(index: number) {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveSlide(index);
    setTimeout(() => setIsAnimating(false), 800);
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-[60vh] md:h-[85vh] overflow-hidden bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">محتوای هیرو موجود نیست.</p>
      </section>
    );
  }

  const currentSlide = slides[activeSlide];
  const heroImage = currentSlide?.image_url || "/placeholder.svg";

  return (
    <section className="relative h-[60vh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt={currentSlide.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-foreground/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-7xl px-6 w-full">
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              className={cn(
                "absolute transition-all duration-700 max-w-xl",
                idx === activeSlide
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none"
              )}
            >
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-background leading-tight text-balance">
                {slide.title}
              </h2>
              <p className="mt-4 md:mt-6 text-background/80 text-sm md:text-lg leading-relaxed max-w-md">
                {slide.description}
              </p>
              <a
                href={slide.cta_link || "#services"}
                className="mt-6 md:mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-semibold text-sm rounded-md hover:brightness-110 transition-all duration-300 hover:gap-3"
              >
                <span>{slide.cta_text || "مشاهده خدمات"}</span>
                <ChevronLeft className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={`slide-${idx}`}
            type="button"
            onClick={() => goToSlide(idx)}
            className={cn(
              "h-2.5 rounded-full transition-all duration-500",
              idx === activeSlide
                ? "w-8 bg-primary"
                : "w-2.5 bg-background/50 hover:bg-background/80"
            )}
            aria-label={`اسلاید ${idx + 1}`}
          />
        ))}
      </div>

      {/* Nav Arrows */}
      <button
        type="button"
        onClick={() =>
          goToSlide((activeSlide - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/10 backdrop-blur-sm text-background hover:bg-background/20 transition-colors hidden md:flex items-center justify-center"
        aria-label="اسلاید قبلی"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        type="button"
        onClick={() => goToSlide((activeSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/10 backdrop-blur-sm text-background hover:bg-background/20 transition-colors hidden md:flex items-center justify-center"
        aria-label="اسلاید بعدی"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </section>
  );
}
